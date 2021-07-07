  
const router = require('express').Router();
const account = require('./account');
const bookmarks = require('./bookmarks');
//const { ensureAuthenticated } = require('../auth');

router.use('/account', account);
router.use('/bookmarks', bookmarks);
//router.use('/secretdata', ensureAuthenticated, secretData);

module.exports = router;