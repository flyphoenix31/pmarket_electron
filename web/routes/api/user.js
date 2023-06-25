const passport = require('passport');
const express = require('express');
const router = express.Router();


const { UserController } = require('../../controller');

router.post('/login', UserController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), UserController.current);
router.get('/list', passport.authenticate('jwt', { session: false}), UserController.list);

router.post('/register', passport.authenticate('jwt', { session: false}), UserController.new);

module.exports = router;