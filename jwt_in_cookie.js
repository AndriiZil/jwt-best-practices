const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// csrf protection
const csrf = require('csurf');
// session management using cookies
const session = require('express-session');

const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true  // httpOnly is true by default
    }
}));

app.get('/page', csrfProtection, function (req, res) {
    // pass the csrfToken to the page
    res.render('page', { csrfToken: req.csrfToken() });
});

app.post('/process', parseForm,
    csrfProtection, function (req, res) {
        res.send('Successfully Validated!!');
    });

app.listen(3000, err => {
    if (err) {
        console.log(err);
    }
    console.log('Server running on http://localhost:3000.');
});
