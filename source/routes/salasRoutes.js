const express = require('express');
const router = express.Router();
const salasController = require('../controllers/salasController');

router.get('/', salasController.Listar);

module.exports = router;