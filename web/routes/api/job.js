const passport = require('passport');
const express = require('express');
const router = express.Router();
const { JobController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobController.findOne);
router.get('/categories', JobController.categories);

router.post('/new', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobController.update);
router.post('/closeJob', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobController.closeJob);

module.exports = router;