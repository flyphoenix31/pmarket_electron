const passport = require('passport');
const express = require('express');
const router = express.Router();
const { NotificationController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/unreadList', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, NotificationController.unreadList);
router.post('/makeRead', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, NotificationController.makeRead);

module.exports = router;