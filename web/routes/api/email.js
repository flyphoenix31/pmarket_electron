const passport = require('passport');
const express = require('express');
const router = express.Router();
const { EmailController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, EmailController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, EmailController.findOne);
router.get('/categories', EmailController.categories);

router.post('/new', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, EmailController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, EmailController.update);
router.post('/closeJob', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, EmailController.closeJob);
router.post('/compose', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, EmailController.compose);

module.exports = router;