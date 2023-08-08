const passport = require('passport');
const express = require('express');
const router = express.Router();
const { JobsController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobsController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobsController.findOne);
router.get('/categories', JobsController.categories);

router.post('/new', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobsController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobsController.update);
router.post('/delete', passport.authenticate('jwt', { session: false}) , escapeHTMLMiddleware, JobsController.delete);
router.post('/closeJob', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, JobsController.closeJob);

module.exports = router;