const Post = require("../models/posts");

exports.createPost = async (req, res) => {
    try {
        const {title, content} = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Please enter all required fields"
            });
        }

        const post = await Post.create(req.body);

        return res.status(201).json({
            message: "Post created successfully",
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        return res.status(200).json({
            posts
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        return res.status(200).json({
            post
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators : true});

        return res.status(200).json({
            message: "Post updated successfully",
            updatedPost
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}