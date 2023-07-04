const passport = require('passport');
const express = require('express');
const router = express.Router();


const { UserController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/login', escapeHTMLMiddleware, UserController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, UserController.current);
router.get('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.list);
router.get('/jobUsers', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.jobUsers);

router.post('/register', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.update);
router.post('/password/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.updatePassword);
router.post('/delete', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.delete);

module.exports = router;