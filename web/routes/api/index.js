const express = require('express');
const path = require('path');
const router = express.Router();

const user = require('./user');
const job = require('./job');
const chat = require('./chat');
const invoice = require('./invoice');
const role = require('./role');
const portfolio = require('./portfolio');
const quotation = require('./quotation');

router.use('/user', user);
router.use('/chat', chat);
router.use('/invoice', invoice);
router.use('/job', job);
router.use('/role', role);
router.use('/portfolio', portfolio);
router.use('/quotation', quotation);

router.get('*', (req, res) => {
    res.status(404).end();
})

module.exports = router;