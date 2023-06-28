const passport = require('passport');
const express = require('express');
const router = express.Router();
const { RoleController } = require('../../controller');

router.get('/list', passport.authenticate('jwt', { session: false}), RoleController.list);

module.exports = router;