const {
    getPosts,
    createPost
} = require('../models/postModels');

const getAllPosts = async (req, res) => {
    try {
        const posts = await getPosts();
        res.json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error 500. No se pudo obtener los datos" })
    }
}

const createNewPost = async (req, res) => {
    try {
        const newPost = await createPost(req.body);
        if(
            !newPost.titulo ||
            !newPost.url ||
            !newPost.descripcion ||
            (newPost.url.endsWith(".jpg") === false &&
            newPost.url.endsWith(".png") === false)
        ) {
            return res.status(400).json({
                message:
                "Error 400. Por favor, rellena todos los campos, y la URL debe terminar en .jpg o .png",
            })
        }
        res.json(newPost);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error 500. No se pudo crear el post" });
    }
};

module.exports = {
    getAllPosts,
    createNewPost,
};