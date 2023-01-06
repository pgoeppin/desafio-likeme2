const express = require('express')
const router = express.Router()
const { getAllPosts, createNewPost, updatePostById, deletePostById } = require('../controllers/postControllers')

router.get('/posts', getAllPosts)
router.post('/posts', createNewPost)
router.put('/posts/like/:id', updatePostById)
router.delete('/posts/:id', deletePostById)

module.exports = router