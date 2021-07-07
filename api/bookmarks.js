const router = require('express').Router();
const bookmarksDb = require('../db/bookmarks');


router.post('/add', async (req, res)=>{
    await bookmarksDb.add(req.body);
    res.json({status:'ok'});
});

router.get('/getmybookmarks', async (req, res) => {
    const bookmarks = await bookmarksDb.getBookmarks(req.query.id);
    res.json(bookmarks);
});

router.post('/updatetitle', async (req, res)=>{
    await bookmarksDb.updateTitle(req.body);
    res.json({status:'ok'});
});

router.post('/delete', async (req, res)=>{
    await bookmarksDb.deleteBookmark(req.body);
    res.json({status:'ok'});
});

router.get('/topfive', async (req, res) => {
    const bookmarks = await bookmarksDb.topFive();
    res.json(bookmarks);
});

module.exports = router;