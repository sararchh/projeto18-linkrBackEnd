import db from "../database/database.js";
import bcrypt from "bcrypt";

async function getByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email=$1;`, [email.toLowerCase()]);
};

async function insertUser(data) {
    const { email, password, username, pictureUrl } = data;
    const passwordHash = bcrypt.hashSync(password, 12);
    try {
        await db.query(`INSERT INTO users (email, password, username, pictureUrl) VALUES ($1, $2, $3, $4);`, [email.toLowerCase(), passwordHash, username, pictureUrl]);
    } catch (err) {
        console.log(err);
    }
}

const userRepository = {
    getByEmail,
    insertUser,
};

export default userRepository;