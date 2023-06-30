const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const member = require('./member');
const api = require('./api');

router.use('/api', api);

router.get('/', (req, res) => {
    console.log(123123);
    let filePath = path.resolve(__dirname, '..\\client\\landing.html');
    res.sendFile(filePath);
});
router.use('/member', member);
router.get('*', (req, res) => {
    console.log("unknown");
    // let filePath = path.resolve(__dirname, '..\\client\\index.html');
    // res.sendFile(filePath);
    // global.sendLog(filePath);
    res.status(404).end();
})
module.exports = router;