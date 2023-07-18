const passport = require('passport');
const express = require('express');
const router = express.Router();
const { SharedController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.post('/new', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, SharedController.new);
router.post('/list', passport.authenticate('jwt', { session: false }), escapeHTMLMiddleware, SharedController.list);
router.post('/fileupload', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, SharedController.fileupload);
router.post('/editname', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, SharedController.editname);
router.post('/delete', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, SharedController.delete);
router.post('/savetp', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, SharedController.savetp);
router.post('/savem', passport.authenticate('jwt', {session: false}), escapeHTMLMiddleware, SharedController.savem);

router.post('/sharelogin', SharedController.sharelogin);
router.post('/sharelist', SharedController.sharelist);
router.post('/gettoken', SharedController.gettoken);

module.exports = router;