const passport = require('passport');
const express = require('express');
const router = express.Router();
const { HistoryController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/list', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, HistoryController.list);
router.post('/delete', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, HistoryController.delete);
module.exports = router;