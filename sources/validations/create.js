const {body} = require('express-validator');

let productName = body('product-name').notEmpty().withMessage('Complete este campo.');
let price = body('price').notEmpty().withMessage('Complete este campo.').bail().isEmail().withMessage('Email invalido');
let category = body('category').notEmpty().withMessage('Complete este campo.');
let productImage = body('product-image').notEmpty().withMessage('Complete este campo.');

let validaciones = [productName,price,category,productImage]

module.exports = validaciones;