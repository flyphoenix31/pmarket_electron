const passport = require('passport');
const express = require('express');
const router = express.Router();
const { ChatController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/contacts', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ChatController.contacts);
router.post('/list', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ChatController.list);
router.post('/unreadCounts', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ChatController.unreadCounts);
router.post('/sendMessage', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ChatController.sendMessage);
router.post('/makeRead', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ChatController.makeRead);

module.exports = router;