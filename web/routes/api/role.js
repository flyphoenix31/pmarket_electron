const passport = require('passport');
const express = require('express');
const router = express.Router();
const { RoleController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', escapeHTMLMiddleware, RoleController.list);
router.get('/developerList', escapeHTMLMiddleware, RoleController.developerList);
router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, RoleController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, RoleController.update);
router.get('/list-with-permission', escapeHTMLMiddleware, RoleController.listWithPermission);
router.get('/findOne', escapeHTMLMiddleware, RoleController.findOne);

module.exports = router;