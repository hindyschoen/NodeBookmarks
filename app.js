require('dotenv').config();

const express = require('express');
const api = require('./api');
const { setupAuth } = require('./auth.js');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
    secret: 'LITRules@!',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    const original = res.json;
    res.json = function (obj) {
        if (obj) {
            delete obj.passwordHash;
        }
        original.call(this, obj);
    }

    next();
});

setupAuth(app);

app.use('/api', api);



app.listen(4000, () => console.log('server started'));