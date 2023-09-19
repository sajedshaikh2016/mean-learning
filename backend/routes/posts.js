const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type!");
        if (isValid) {
            error = null;
        }
        callback(error, "backend/images")
    },
    filename: (request, file, callback) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE_MAP[file.mimetype];
        callback(null, name + '-' + Date.now() + '.' + extension);
    }
});

router.post('/api/posts', multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    });
    post.save().then((createdPost) => {
        res.status(201).json({
            message: 'Post added sucessfully!',
            post: {
                // ...createdPost,
                id: createdPost._id,
                title: createdPost.title,
                content: createdPost.content,
                imagePath: createdPost.imagePath
            }
        });
    });

});

router.put('/api/posts:id', multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
    });
    Post.updateOne({ _id: req.params.id }, post).then(() => {
        res.status(200).json({ message: 'Posts updated sucessfully!' });
    });
});

router.get('/api/posts', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then((documents) => {
            fetchedPosts = documents
            return Post.count();
        })
        .then(count => {
            res.status(200).json({
                message: 'Posts fetched sucessfully!',
                posts: fetchedPosts,
                maxPosts: count
            });
        });
});

router.get('/api/posts/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'Post not found!'
                });
            }
        });
});

router.delete('/api/posts/:id', (req, res, next) => {
    console.log("req.params.id", req.params.id);
    Post.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json({ message: 'Post deleted!' });
    });
});

module.exports = router;