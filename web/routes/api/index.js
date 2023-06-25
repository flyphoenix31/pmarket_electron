const express = require('express');
const path = require('path');
const router = express.Router();

const user = require('./user');

router.use('/user', user);

router.get('*', (req, res) => {
    res.status(404).end();
})

module.exports = router;