const express = require('express');
const path = require("path");
const fs = require('fs/promises')

const app = express();

app.use(express.static("public"));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'))
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve('./views/about.html'))
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

app.post("/registerToNewsletter", async (req, res) => {
    if (!req.body.email) {
        res.status(400).send({ error: "The request body must contain an email field." })
        return;
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(req.body.email)) {
        res.status(400).send({ error: "Email format is not valid." });
        return
    }
    
    const data = JSON.parse(await fs.readFile('./data/newsletter.json' , 'utf-8'));
    
    if (data.includes(req.body.email)) {
        res.status(400).send({ error: "Email already exists." });
        return;
    } else {
        data.push(req.body.email)
        await fs.writeFile('./data/newsletter.json', JSON.stringify(data), 'utf8');
        res.status(200).send({ data });
        return;
    }
    
})

app.listen(3000, () => console.log('Running on http://localhost:3000/'))
