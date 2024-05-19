var express = require('express');
var router = express.Router();
const logger = require('../config/logger');

router.get('/', function(req, res, next) {
    logger.info('GET /');
    res.render('index', { title: 'Express' });
});

module.exports = router;
