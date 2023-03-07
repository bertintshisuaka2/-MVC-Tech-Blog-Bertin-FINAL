//require Router() from express
const router = require('express').Router();
//require all of the methods for CRUD from the users controller
const {
   creatingUsers,
   userSignIn,
   userSignOut
} = require('../../controllers/userController');

//creating a user; localhost:3001/users
router.route('/').post(creatingUsers);

//signing in as a user; localhost:3001/users/login
router.route('/signin').post(userSignIn);

//user signing out; localhost:3001/users/signout
router.route('/signout').post(userSignOut);

module.exports = router;
