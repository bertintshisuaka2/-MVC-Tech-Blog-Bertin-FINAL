//require Router() from express
const router = require('express').Router();
const withAuth = require('../../utils/auth');
//require all of the methods for CRUD from the users controller
const {
   creatingBlogs,
   deletingBlog
} = require('../../controllers/blogsController');

//creating a blog; localhost:3001/api/blogs
router.route('/', withAuth).post(creatingBlogs);

//deleting a blog based on id: localhost:3001/api/blogs/:d
router.route('/:id', withAuth).delete(deletingBlog);

module.exports = router;