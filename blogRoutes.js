const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController')


router.post('/create', blogController.createBlog);
router.get('/getblogs', blogController.getBlogs)
router.put('/updateblogs/:id',blogController.updateBlogs)
router.delete('/:id',blogController.deleteBlogs)

module.exports = router;