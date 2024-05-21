const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
    res.render('pages/home', { posts: posts });
});

app.get('/new-post', (req, res) => {
    res.render('pages/new-post');
});

app.post('/new-post', (req, res) => {
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    posts.push(post);
    res.redirect('/');
});

app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts[postId];
    if (post) {
        res.render('pages/post', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
