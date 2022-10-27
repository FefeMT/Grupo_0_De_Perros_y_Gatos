const {Router} = require('express');
const route = Router();
const controller = require('../controllers/users.controllers');
const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({storage:storage('../../uploads/users')});

route.get('/login',controller.login);

route.get('/register',controller.register);

route.get('/users/profile/:user',controller.profile);

route.get('/users/nuevo',controller.create);

route.post('/users/guardar',upload.any(),controller.save);

route.get('/users/editar/:user',controller.edit);

route.put('/users/actualizar',upload.any(),controller.update);

route.delete('/users/borrar',controller.remove);

/*route.get('/pruebaSession', function (req,res){
    if (req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas++
    res.send('Session tiene el numero: ' + req.session.numeroVisitas);
});

route.get('/mostrarNumeroSession', function (req,res){
    res.send('Session tiene el numero: ' + req.session.numeroVisitas);
})*/

module.exports = route;