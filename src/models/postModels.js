const pool = require("../helpers/connectionDB").getInstance();

const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts");
    // console.log(rows);
    return rows;
};

const createPost = async (payload) => {
    const query = {
        text: "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
        values: [payload.titulo, payload.url, payload.descripcion, 0],
    };
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al insertar los datos en tabla posts:", e.code, e.message);
        throw new Error(e);
    }
}

module.exports = { getPosts, createPost }