const passport = require('passport');
const express = require('express');
const router = express.Router();
const { HistoryController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, HistoryController.list);
router.get('/findOne', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, HistoryController.findOne);
router.get('/categories', HistoryController.categories);

router.post('/new', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, HistoryController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, HistoryController.update);
router.post('/closeJob', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, HistoryController.closeJob);

module.exports = router;