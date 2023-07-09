const passport = require('passport');
const express = require('express');
const router = express.Router();
const { PermissionController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, PermissionController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, PermissionController.update);
router.get ('/findOne', escapeHTMLMiddleware, PermissionController.findOne);
router.get ('/list', escapeHTMLMiddleware, PermissionController.list);

module.exports = router;