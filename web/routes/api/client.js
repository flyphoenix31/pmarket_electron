const passport = require('passport');
const express = require('express');
const router = express.Router();
const { ClientController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/list', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ClientController.list);
router.get('/findOne', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, ClientController.findOne);
router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ClientController.new);
router.post('/update', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ClientController.update);
router.post('/delete', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, ClientController.delete);

module.exports = router;