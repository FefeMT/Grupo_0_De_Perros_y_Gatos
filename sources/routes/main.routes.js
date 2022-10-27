const {Router} = require('express');
const route = Router();
const { home } = require('../controllers/main.controllers');

route.get('/', home);

module.exports = route;