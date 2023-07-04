const passport = require('passport');
const express = require('express');
const router = express.Router();
const { QuotationController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', escapeHTMLMiddleware, QuotationController.list);
router.get('/findOne', escapeHTMLMiddleware, QuotationController.findOne);

router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.update);
router.post('/updateStatus', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, QuotationController.updateStatus);

module.exports = router;