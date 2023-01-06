const {
    getPosts,
    createPost,
    updatePost,
    findPost
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
        const payload = req.body
        const posts = await getPosts();
        if(
            !payload.titulo || // Validacion de que tenga titulo
            !payload.url || // Validacion de que tenga url
            !payload.descripcion || // Validacion de que tenga descripcion
            (payload.url.endsWith(".jpg") === false && 
            payload.url.endsWith(".png") === false) || // Validaciones de que sea una imagen jpg o png
            (posts.findIndex((post) => post.img === payload.url) > -1) // Validacion de que no se repita la URL de la img
        ) {
            return res.status(400).json({
                message:
                "Error 400. Por favor, rellena todos los campos, y la URL debe ser unica y terminar en .jpg o .png",
            })
        }
        const newPost = await createPost(payload);
        console.log("Post agregado con exito!")
        res.json(newPost);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error 500. No se pudo crear el post" });
    }
};

const updatePostById = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    payload.id = id;
    try {
        const existPost = await findPost(id);
        payload.like = existPost[0].likes + 1
        if(existPost.length === 0){
            console.log("Post no existe")
            return res.status(404).json({ message: "El post no existe" })
        }
        const updatedPost = await updatePost(payload);
        res.json(updatedPost)
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error 500. No se pudo actualizar el post" })
    }
}

module.exports = {
    getAllPosts,
    createNewPost,
    updatePostById
};