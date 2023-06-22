const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    console.log(123123);
    // res.send(fs.readFileSync(path.resolve(__dirname, '\\web\\client\\index.html')));
    res.send(fs.readFileSync(process.cwd() + '\\web\\client\\index.html'));
});
router.get('*', (req, res) => {
    res.send(fs.readFileSync(process.cwd() + '\\web\\client\\index.html') + 'asdfasdf');
})

module.exports = router;