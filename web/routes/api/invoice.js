const passport = require('passport');
const express = require('express');
const router = express.Router();
const { InvoiceController } = require('../../controller');

router.get('/list', passport.authenticate('jwt', { session: false }), InvoiceController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false }), InvoiceController.findOne);
router.post('/new', passport.authenticate('jwt', { session: false }), InvoiceController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), InvoiceController.update);
router.get('/status/list', InvoiceController.statusList);

module.exports = router;