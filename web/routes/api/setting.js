const passport = require('passport');
const express = require('express');
const router = express.Router();
const { SettingController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get ('/get', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, SettingController.get);
router.post('/set', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, SettingController.set);

module.exports = router;