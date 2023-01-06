const express = require('express')
const router = express.Router()
const { getAllPosts, createNewPost } = require('../controllers/postControllers')

router.get('/posts', getAllPosts)
router.post('/posts', createNewPost)

module.exports = router