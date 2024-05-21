// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Database
const comments = [
    {
        id: 1,
        username: 'Alice',
        comment: 'Hello World',
    },
    {
        id: 2,
        username: 'Bob',
        comment: 'Hi there!',
    },
    {
        id: 3,
        username: 'Charlie',
        comment: 'Good morning!',
    },
];

// GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        username: req.body.username,
        comment: req.body.comment,
    };
    comments.push(comment);
    res.status(201).json(comment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comment.username = req.body.username;
    comment.comment = req.body.comment;
    res.json(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(comment => comment.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Comment not found' });
    }
    comments.splice(index, 1);
    res.status(204).json();
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});