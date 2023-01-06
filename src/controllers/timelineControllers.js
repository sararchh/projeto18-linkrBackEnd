import timelineRepository from "../repositories/timelineRepository.js";

export async function getUserById(req, res) {
    const { id } = req.params;

    try {
        const userTimeline = await timelineRepository.getPostByUserId(id);
        const userInfo = await timelineRepository.getUserById(id);

        if (userTimeline.rows.length === 0) {
            return res.send("Esse usuario não há publicações!").status(404);
        }

        const body = {
            id: id,
            username: userInfo.username,
            pictureUrl: userInfo.pictureUrl,
            posts: userTimeline
        }

        res.send(body).status(200);

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}