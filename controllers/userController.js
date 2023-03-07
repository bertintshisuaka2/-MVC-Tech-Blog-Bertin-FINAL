const {Users} = require('../models');

const usersController = {
    async creatingUsers(req, res) {
        try {
            const usersData = await Users.create(req.body);

            req.session.save(() => {
                req.session.user_id = usersData.id;
                req.session.signed_in = true;

                res.status(200).json(usersData);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async userSignIn(req, res) {
        try {
            const usersData = await Users.findOne({
                where: {username: req.body.username}
            });

            if (!usersData) {
                return res.status(400).json({message: "Username or password is incorrect...Try again"});
            }

            const correctPassword = await usersData.checkPassword(req.body.password);

            if (!correctPassword) {
                return res.status(400).json({message: "Username or password is incorrect...Try again"});
            }

                req.session.save(() => {
                    req.session.user_id = usersData.id;
                    req.session.signed_in = true;

                    res.json({user: usersData, message: "Signed In!!"});  
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    userSignOut(req, res) {
        if(req.session.logged_in) {
            req.session.destroy(() => {
                res.status(400).end();
            });
        } else {
            res.status(404).end();
        }
    }
};

//exports 
module.exports = usersController;