const passport = require('passport');
const express = require('express');
const router = express.Router();
const { InvoiceController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.findOne);
router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.update);
router.get('/status/list', InvoiceController.statusList);

module.exports = router;