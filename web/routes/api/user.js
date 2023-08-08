const passport = require('passport');
const express = require('express');
const router = express.Router();


const { UserController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/login', escapeHTMLMiddleware, UserController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, UserController.current);
router.post('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.list);
router.post('/fulllist', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.fulllist);
router.get('/jobUsers', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.jobUsers);

router.post('/register', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.update);
router.post('/emailupdate', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, UserController.emailupdate)
router.post('/password/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.updatePassword);
router.post('/delete', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.delete);
router.post('/getroleinfo', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, UserController.getroleinfo);
router.post('/checkemail', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, UserController.checkemail);

module.exports = router;