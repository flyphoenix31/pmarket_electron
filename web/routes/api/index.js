const express = require('express');
const path = require('path');
const router = express.Router();

const user = require('./user');
const chat = require('./chat');
const invoice = require('./invoice');

router.use('/user', user);
router.use('/chat', chat);
router.use('/invoice', invoice);

router.get('*', (req, res) => {
    res.status(404).end();
})

module.exports = router;