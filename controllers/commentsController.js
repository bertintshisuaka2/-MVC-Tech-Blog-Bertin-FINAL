const { Comments } = require('../models');

const commentsController = {
    
    gettingComments(req, res) {
        Comments.findAll({})
        .then(commentsData => res.json(commentsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    commentsById(req, res) {
        Comments.findAll({
            where: {id: req.params.id}
        })
        .then(commentsData => res.json(commentsData))
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    async creatingComments(req, res) {
        try{ 
            const newComment = await Comments.create({
                ...req.body,
                user_id: req.session.user_id
            });

            res.json(newComment);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deletingComments(req, res) {
        try {
            const commentsData = await Comments.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            });

            if(!commentsData) {
                return res.status(404).json({message: "Sorry, there was no Blog found"});
            }
            res.status(200).json(commentsData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};


//exports 
module.exports = commentsController;