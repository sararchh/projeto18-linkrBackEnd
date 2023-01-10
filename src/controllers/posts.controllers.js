import connectDB from "../database/database.js";
import getMetaData from 'metadata-scraper'

const db = await connectDB();

export async function getPosts(req, res) {
    try {
        const posts = await db.query(
            'SELECT posts.*,posts.id AS "postId", users.* FROM posts JOIN users ON posts."userId" = users.id ORDER BY posts."createdAt" DESC LIMIT 20;'
        );
        
        //para pegar os usuários que curtiram cada post
        const usersLiked = await db.query(
            'SELECT users."username", likes."postId" FROM users JOIN likes ON users.id = likes."userId";'
        );
        //para pegar a lista de trending 
        const trendingList = await db.query(
            'SELECT name FROM hashtags;'
        )


        const userId = req.userId
        const dadosUser = await db.query('SELECT * FROM users WHERE id = $1;', [userId])
        const mainData = {
            posts: posts.rows,
            likes: usersLiked.rows,
            dadosUser: dadosUser.rows,
            trendingList: trendingList.rows
        }

        res.send(mainData);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function createPost(req, res) {
    const { url, content } = req.body
    const userId = req.userId


    const dadosUser = await db.query('SELECT * FROM users WHERE id = $1;', [userId])

    /*const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");*/

    //pegando as hashtags de content
    const contentArray = content.split(" ");
    const hashtag = contentArray.filter((c) => c.includes("#"));
    const hashtagName = hashtag.map((h) => h.replace("#", ""));

    try {
        
      
        const metadata = await getMetaData(url)
        
        
        await db.query(
            'INSERT INTO posts (url, content, "userId", title, image, description) VALUES ($1, $2, $3, $4, $5, $6);',
            [url, content, userId, metadata.title, metadata.image, metadata.description]
        );

        //pegando o id do post
        const { rows } = await db.query(
            "SELECT id FROM posts WHERE content = $1;",
            [content]
        );

        const postId = rows[0].id;

        //inserindo as hashtagas no banco
        hashtagName.map(async (h) => {
            const hashtagExists = await db.query(
                "SELECT id FROM hashtags WHERE name = $1;",
                [h]
            );

            //se a hashtag já existir no banco
            if (hashtagExists.rows.length !== 0) {
                const hashtagId = hashtagExists.rows[0].id;

                await db.query(
                    'INSERT INTO "postHashtags" ("hashtagId", "postId") VALUES ($1, $2);',
                    [hashtagId, postId]
                );
            } else {
                // se não existir no banco
                await db.query("INSERT INTO hashtags (name , count) VALUES ($1, $2);", [
                    h,
                    1,
                ]);

                const hashtagExistsNew = await db.query(
                    "SELECT id FROM hashtags WHERE name = $1;",
                    [h]
                );

                const hashtagIdNew = hashtagExistsNew.rows[0].id;

                await db.query(
                    'INSERT INTO "postHashtags" ("hashtagId", "postId") VALUES ($1, $2);',
                    [hashtagIdNew, postId]
                );
            }
        });

        res.send("post criado");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deletePost(req, res) {
    const { id } = req.params;
    try {
        //deletar as linhas da tabela postHashtags referentes ao post
        await db.query('DELETE FROM "postHashtags" WHERE "postId" = $1;', [id]);

        //deletar as linhas da tabela likes referentes ao post
        await db.query('DELETE FROM likes WHERE "postId" = $1;', [id] )

        //deletar o post
        await db.query("DELETE FROM posts WHERE id = $1;", [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function editPost(req, res) {
    const { content } = req.body
    const { id } = req.params
    try {
        

        await db.query('UPDATE posts SET content = $1 WHERE id = $2;', [content, id])
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
