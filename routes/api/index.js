const router = require('express').Router();
const blogRoutes = require('./blogs-routes');
const commentRoutes = require('./comments-routes');
const userRoutes = require('./user-routes');

//url is to localhost:3001/api/blogs
router.use('/blogs', blogRoutes);

//url is to localhost:3001/api/comments
router.use('/comments', commentRoutes);

//url is to localhost:3001/api/users
router.use('/users', userRoutes);

module.exports = router;