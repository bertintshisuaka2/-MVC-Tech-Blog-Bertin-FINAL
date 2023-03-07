const {Blogs} = require('../models');

const blogsController = {
    async creatingBlogs(req, res) {
        try{ 
            const newBlog = await Blogs.create({
                ...req.body,
                user_id: req.session.user_id
            });

            res.status(200).json(newBlog);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deletingBlog(req, res) {
        try {
            const blogsData = await Blogs.destroy({
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id
                }
            });

            if (!blogsData) {
                return res.status(404).json({message: "Blog Not Found"});
            }

            res.status(200).json(blogsData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = blogsController;