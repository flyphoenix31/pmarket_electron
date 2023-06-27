const passport = require('passport');
const express = require('express');
const router = express.Router();
const { ChatController } = require('../../controller');

router.post('/contacts', passport.authenticate('jwt', { session: false }), ChatController.contacts);
router.post('/list', passport.authenticate('jwt', { session: false }), ChatController.list);
router.post('/unreadCounts', passport.authenticate('jwt', { session: false }), ChatController.unreadCounts);
router.post('/sendMessage', passport.authenticate('jwt', { session: false }), ChatController.sendMessage);
router.post('/makeRead', passport.authenticate('jwt', { session: false }), ChatController.makeRead);

module.exports = router;