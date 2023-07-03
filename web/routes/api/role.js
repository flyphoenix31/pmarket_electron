const passport = require('passport');
const express = require('express');
const router = express.Router();
const { RoleController } = require('../../controller');

router.get('/list', RoleController.list);
router.get('/developerList', RoleController.developerList);

module.exports = router;