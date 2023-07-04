const passport = require('passport');
const express = require('express');
const router = express.Router();
const { PortfolioController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', escapeHTMLMiddleware, PortfolioController.list);
router.get('/findOne', escapeHTMLMiddleware, PortfolioController.findOne);

router.post('/new', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, PortfolioController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), escapeHTMLMiddleware, PortfolioController.update);

module.exports = router;