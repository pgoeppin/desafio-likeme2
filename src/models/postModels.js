const pool = require("../helpers/connectionDB").getInstance();

const getPosts = async () => {
    const { rows } = await pool.query("SELECT * FROM posts ORDER BY id ASC");
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

const updatePost = async (payload) => {
    const query = {
        text: "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
        values: [payload.like , payload.id],
    };
    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al actualizar los likes en tabla posts:", e.code, e.message);
        throw new Error(e);
    }
}

const findPost = async (payload) => {
    try {
        const query = {
            text: "SELECT * FROM posts WHERE id = $1",
            values: [payload],
        };
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al buscar el post en tabla posts:", e.code, e.message);
        throw new Error(e);
    }
}

const deletePost = async (payload) => {
    try {
        const query = {
            text: "DELETE FROM posts WHERE id = $1",
            values: [payload],
        };
        const result = await pool.query(query);
        return result.rows;
    } catch (e) {
        console.log("Error al eliminar datos en tabla posts:", e.code, e.message)
        throw new Error(e);
    }
}

module.exports = { getPosts, createPost, updatePost, findPost, deletePost }