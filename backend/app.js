const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'sfsd423423',
            title: "First server-side post",
            content: 'This is coming from the server'
        },
        {
            id: 'jtyrrtjty',
            title: "Second server-side post",
            content: 'This is coming from the server'
        },
        {
            id: '35hfggh',
            title: "Third server-side post",
            content: 'This is coming from the server'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched sucessfully!',
        posts: posts
    });
});

module.exports = app;