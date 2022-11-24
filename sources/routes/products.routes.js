const {Router} = require('express');
const route = Router();
const controller = require('../controllers/products.controllers');
const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({storage:storage('../../assets/products-pics')});
const createValidator = require('../validations/create');

route.get('/cart', controller.cart);

route.get('/productos/nuevo',controller.create)
route.post('/productos/guardar',upload.any(),createValidator,controller.save)

route.get('/productos/detalle/:producto',controller.show)

route.get('/productos/editar/:producto',controller.edit)
route.put('/productos/actualizar',upload.any(),createValidator,controller.update)

route.delete('/productos/borrar',controller.remove);

route.get('/productos/:categoria?',controller.index);

module.exports = route;