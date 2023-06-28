const passport = require('passport');
const express = require('express');
const router = express.Router();


const { UserController } = require('../../controller');

router.post('/login', UserController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), UserController.current);
router.get('/list', passport.authenticate('jwt', { session: false}), UserController.list);
router.get('/jobUsers', passport.authenticate('jwt', { session: false}), UserController.jobUsers);

router.post('/register', passport.authenticate('jwt', { session: false}), UserController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), UserController.update);
router.post('/password/update', passport.authenticate('jwt', { session: false}), UserController.updatePassword);
router.post('/delete', passport.authenticate('jwt', { session: false}), UserController.delete);

module.exports = router;