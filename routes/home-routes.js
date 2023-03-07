//require Router() from express
const router = require('express').Router();
const withAuth = require('../utils/auth');
//require all of the methods for CRUD from the users controller
const {
    gettingHomepage,
    blogWithID, 
    goingToDashboard,
    goingToSignIn,
    goingSignUp
} = require('../controllers/homepageController');

//route to homepage; localhost:3001/
router.route('/').get(gettingHomepage);

//blog with id; localhost:3001/:ids
router.route('/blog/:id').get(blogWithID);

//going to the dashboard; localhost:3001/dashboard
router.route('/dashboard', withAuth).get(goingToDashboard);

//going to the sign in page; localhost:3001/signin
router.route('/signin').get(goingToSignIn);

//going to the sign up page; localhost:3001/signup
router.route('/signup').get(goingSignUp);

module.exports = router;