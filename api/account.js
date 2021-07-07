const router = require('express').Router();
const usersDb = require('../db/users');
const passport = require('passport');

router.post('/signup', async (req, res) => {
    await usersDb.add(req.body);
    res.json({ status: 'ok' });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (!user) {
            res.json(null);
            return;
        }
        req.logIn(user, function (err) {
            return res.json(user);
        });
    })(req, res, next);
});

router.get('/getcurrentuser', (req, res) => {
    res.json(req.user);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ status: 'ok' });
})

module.exports = router;