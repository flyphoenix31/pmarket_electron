const passport = require('passport');
const express = require('express');
const router = express.Router();
const { InvoiceController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post ('/list', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.list);
router.get ('/findOne', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.findOne);
router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.new);
router.post('/delete', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, InvoiceController.delete);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.update);
router.post('/updateinvoicepreview', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.updateinvoicepreview);
router.get ('/status/list', InvoiceController.statusList);
router.post('/send-quotation', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, InvoiceController.sendQuotation);
// router.get ('/view-invoice', escapeHTMLMiddleware, InvoiceController.customerView);
router.get('/new-possible-invoice-number', InvoiceController.newPossibleInvoiceNumber)

module.exports = router;