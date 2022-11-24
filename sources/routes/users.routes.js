const {Router} = require('express');
const route = Router();
const controller = require('../controllers/users.controllers');
const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({storage:storage('../../assets/profile-pics')});
const loginValidator = require('../validations/login');
const registerValidator = require('../validations/register');

route.get('/login',controller.login);
route.post('/login/guardar', loginValidator ,controller.save);

route.get('/register',controller.register);
route.post('/register/guardar',upload.any(),registerValidator,controller.save);

route.get('/users/profile/:id',controller.profile);

route.get('/users/editar/:user',controller.edit);
route.put('/users/actualizar',upload.any(),registerValidator,controller.update);

route.delete('/users/borrar',controller.remove);

module.exports = route;