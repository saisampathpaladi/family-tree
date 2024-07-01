const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

let users = {
    alpha: 'admin',
    beta: 'admin'
};

let familyTree = {
    'John Doe': {
        gender: 'male',
        children: ['Jane Doe', 'Jim Doe']
    },
    'Jane Doe': {
        gender: 'female',
        children: []
    },
    'Jim Doe': {
        gender: 'male',
        children: []
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        req.session.user = username;
        res.redirect('/');
    } else {
        res.send('Invalid login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/api/tree', (req, res) => {
    if (req.session.user) {
        res.json(familyTree);
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.post('/api/tree', (req, res) => {
    if (req.session.user) {
        familyTree = req.body;
        res.send('Family tree updated');
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

