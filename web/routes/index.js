const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

const api = require('./api');

router.use('/api', api);

router.get('/', (req, res) => {
    let filePath = path.resolve(__dirname, '..\\client\\index.html');
    res.sendFile(filePath);
});
router.get('*', (req, res) => {
    let filePath = path.resolve(__dirname, '..\\client\\index.html');
    res.sendFile(filePath);
    global.sendLog(filePath);
})
module.exports = router;