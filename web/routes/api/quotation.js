const passport = require('passport');
const express = require('express');
const router = express.Router();
const { QuotationController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/list', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.findOne);

router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.update);
router.post('/send-quotation', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.sendQuotation);
// router.get ('/view-quotation', escapeHTMLMiddleware, QuotationController.customerView);

module.exports = router;