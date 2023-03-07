//import the Router() method from express, the necessary models and the authentication
const session = require('express-session');
const { Blogs, Users, Comments } = require('../models');


const homepageController = { 

     async gettingHomepage(req, res) {
        try {
            const blogsData = await Blogs.findAll({
                include: [{
                    model: Users,
                    attributes: ['username']
                }]
            });

            //getting the serialized data
            const blogging = blogsData.map((blogs) => blogs.get({plain: true}));

            res.render('homepage', {
                blogging, signed_in: session.signed_in
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async blogWithID(req, res) {
        try {
            const blogsData = await Blogs.findByPk(req.params.id, {
                include: [
                    {
                        model: Users,
                        attributes: ['username']
                    },
                    {
                        model: Comments,
                        include: [
                            Users
                        ]
                    }
                ]
            });

            const blogging = blogsData.get({plain: true});

            res.render('blog', {
                ...blogging,
                signed_in: req.session.signed_in
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async goingToDashboard(req, res) {
        try {
            const usersData = await Users.findByPk(req.session.users_id, {
                attributes: {exclude: ['password']},
                include: [{model: Blogs}]
            });

            const user = usersData.get({plain: true});

            res.render('dashboard', {
                ...user,
                signed_in: true
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    goingToSignIn(req, res) {
        if (req.session.signed_in) {
            return res.redirect('/dashboard');
        }

        res.render('signInPage');
    },

    goingSignUp(req, res) {
        if (req.session.signed_in) {
            return res.redirect('/dashboard');
        }    
        res.render('signUpPage');
    }
};

//exporting 
module.exports = homepageController;