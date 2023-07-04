const passport = require('passport');
const express = require('express');
const router = express.Router();
const { RoleController } = require('../../controller');
const { escapeHTMLMiddleware } = require('../../utils');

router.get('/list', escapeHTMLMiddleware, RoleController.list);
router.get('/developerList', escapeHTMLMiddleware, RoleController.developerList);

module.exports = router;