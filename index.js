const express = require('express');
const path = require("path");

const app = express();

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve('./views/about.html'))
})

app.get('/grinders', (req, res) => {
    res.sendFile(path.resolve('./views/grinders.html'))
})

app.get('/beans', (req, res) => {
    res.sendFile(path.resolve('./views/beans.html'))
})

app.get('/accessories', (req, res) => {
    res.sendFile(path.resolve('./views/accessories.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve('./views/contact.html'))
})


app.listen(3000, () => console.log('Running on https://localhost:3000/'))