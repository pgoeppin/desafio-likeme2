const express = require('express')
const router = express.Router()
const { getAllPosts, createNewPost, updatePostById } = require('../controllers/postControllers')

router.get('/posts', getAllPosts)
router.post('/posts', createNewPost)
router.put('/posts/like/:id', updatePostById)

module.exports = router