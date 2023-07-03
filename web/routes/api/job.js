const passport = require('passport');
const express = require('express');
const router = express.Router();
const { JobController } = require('../../controller');

router.get('/list', passport.authenticate('jwt', { session: false}), JobController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false}), JobController.findOne);
router.get('/categories', JobController.categories);

router.post('/new', passport.authenticate('jwt', { session: false}), JobController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), JobController.update);
router.post('/closeJob', passport.authenticate('jwt', { session: false}), JobController.closeJob);

module.exports = router;