const express = require('express');
const router = express.Router();

const toReadList = [];
const haveReadList = [];
const toReadIdList = [];
const haveReadIdList = [];

router.get('/toread/', (req, res) => res.send(toReadList));
router.get('/haveread/', (req, res) => res.send(haveReadList));

router.post('/toread/', (req, res) => {
    const body = req.body;
    console.log(body)
    toReadIdList.push(body.id)
    toReadList.push({
        bookId: body.id,
        title: body.volumeInfo.title,
        subtitle: body.volumeInfo.subtitle,
        authors: body.volumeInfo.authors,
    });
    res.status(200).send({message: 'Success!', ToIdList: toReadIdList});
});

router.post('/haveread/', (req, res) => {
    const body = req.body;
    haveReadIdList.push(body.id)
    haveReadList.push({
        bookId: body.id,
        title: body.volumeInfo.title,
        subtitle: body.volumeInfo.subtitle,
        authors: body.volumeInfo.authors,
    });
    res.status(200).send({message: 'Success!', HaveIdList: haveReadIdList});
});

// DELETE requests can take a body, but we
// can typically handle the request with
// just the ID
router.delete('/haveread/:bookId', function (req, res) {
    const bookId = req.params.bookId;
    for (var i = haveReadList.length - 1; i >= 0; i--) {
        if (haveReadList[i].bookId === bookId) {
            haveReadList.splice(i, 1);
        }
    }
    // Note that DELETE requests are ALWAYS successful,
    // even if the resource is already delete
    res.status(200).send({message: 'Success!', havereadlist: haveReadList.length, HaveIdList: haveReadIdList});
});

router.delete('/toread/:bookId', function (req, res) {
    const bookId = req.params.bookId;
    for (var i = toReadList.length - 1; i >= 0; i--) {
        if (toReadList[i].bookId === bookId) {
            toReadList.splice(i, 1);
        }
    }
    // Note that DELETE requests are ALWAYS successful,
    // even if the resource is already delete
    res.status(200).send({message: 'Success!', toreadlist: toReadList.length, ToIdList: toReadIdList});
});

module.exports = router;