const passport = require('passport');
const express = require('express');
const router = express.Router();
const { PortfolioController } = require('../../controller');

router.get('/list', PortfolioController.list);
router.get('/findOne', PortfolioController.findOne);

router.post('/new', passport.authenticate('jwt', { session: false}), PortfolioController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), PortfolioController.update);

module.exports = router;