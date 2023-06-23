const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    console.log(123123);
    // res.send(fs.readFileSync(path.resolve(__dirname, '\\web\\client\\index.html')));
    // res.send(fs.readFileSync(process.cwd() + '\\web\\client\\index.html'));
    // res.send(fs.readFileSync(__dirname + '\\..\\client\\index.html'));
    // res.render(fs.readFileSync(__dirname + '\\..\\client\\index.html').toString());
    let filePath = path.resolve(__dirname, '..\\client\\index.html');
    res.sendFile(filePath);
    global.sendLog(filePath);
});
router.get('/test', (req, res) => {
    res.json({test: "test"});
})
router.get('*', (req, res) => {
    let filePath = path.resolve(__dirname, '..\\client\\index.html');
    res.sendFile(filePath);
    global.sendLog(filePath);
})

module.exports = router;