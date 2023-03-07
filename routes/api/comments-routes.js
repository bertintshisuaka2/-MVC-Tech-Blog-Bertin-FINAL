//require Router() from express
const router = require('express').Router();
const withAuth = require('../../utils/auth');
//require all of the methods for CRUD from the comments controller
const {
    gettingComments,
    commentsById,
    creatingComments,
    deletingComments
} = require('../../controllers/commentsController');

//getting all the comments/creating a comment; localhost:3001/comments
router.route('/').get(gettingComments).post(creatingComments);

//getting a comment by id/deleting with id; localhost:3001/comments/:id
router.route('/:id', commentsById);

//deleting comment with id; localhost:3001/comments/:id
router.route('/:id', withAuth).delete(deletingComments);

module.exports =router;