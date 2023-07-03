const passport = require('passport');
const express = require('express');
const router = express.Router();
const { NotificationController } = require('../../controller');

router.get('/unreadList', passport.authenticate('jwt', { session: false}), NotificationController.unreadList);
router.post('/makeRead', passport.authenticate('jwt', { session: false}), NotificationController.makeRead);

module.exports = router;