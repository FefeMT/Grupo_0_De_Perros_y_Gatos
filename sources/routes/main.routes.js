const {Router} = require('express');
const route = Router();
const { home } = require('../controllers/main.controllers');

route.get('/', home);

route.get('/prueba', function(req, res) {
    if (req.session.numeroVisitas == undefined) {
        req.session.numeroVisitas = 0
    }
    req.session.numeroVisitas++;
    res.send('Visitas: ' + req.session.numeroVisitas);
})

module.exports = route;