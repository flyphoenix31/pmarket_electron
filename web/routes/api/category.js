const passport = require('passport');
const express = require('express');
const router = express.Router();
const { CategoryController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get ('/list', escapeHTMLMiddleware, CategoryController.list);
router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, CategoryController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, CategoryController.update);
router.get ('/findOne', escapeHTMLMiddleware, CategoryController.findOne);

module.exports = router;