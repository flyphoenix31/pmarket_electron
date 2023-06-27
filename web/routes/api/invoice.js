const passport = require('passport');
const express = require('express');
const router = express.Router();
const { InvoiceController } = require('../../controller');

router.post('/list', passport.authenticate('jwt', { session: false }), InvoiceController.list);
router.post('/findOne', passport.authenticate('jwt', { session: false }), InvoiceController.findOne);

module.exports = router;