const passport = require('passport');
const express = require('express');
const router = express.Router();
const { EnquiryController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get ('/list', escapeHTMLMiddleware, EnquiryController.list);
router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, EnquiryController.new);
router.get ('/findOne', escapeHTMLMiddleware, EnquiryController.findOne);
router.post('/moveToContact', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, EnquiryController.moveToContact);

module.exports = router;