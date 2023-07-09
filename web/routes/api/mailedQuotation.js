const passport = require('passport');
const express = require('express');
const router = express.Router();
const { MailedQuotationController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get ('/view-quotation', escapeHTMLMiddleware, MailedQuotationController.viewQuotation);

module.exports = router;