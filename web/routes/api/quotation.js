const passport = require('passport');
const express = require('express');
const router = express.Router();
const { QuotationController } = require('../../controller');

router.get('/list', QuotationController.list);
router.get('/findOne', QuotationController.findOne);

router.post('/new', passport.authenticate('jwt', { session: false}), QuotationController.new);
router.post('/update', passport.authenticate('jwt', { session: false}), QuotationController.update);
router.post('/updateStatus', passport.authenticate('jwt', { session: false}), QuotationController.updateStatus);

module.exports = router;