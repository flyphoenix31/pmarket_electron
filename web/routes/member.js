const path = require('path');
const express = require('express');
const router = express.Router();

const renderIndex = (req, res) => {
    let filePath = path.resolve(__dirname, '..\\client\\member.html');
    res.sendFile(filePath);
};

router.get('/', renderIndex);
router.get("*", renderIndex);

module.exports = router;