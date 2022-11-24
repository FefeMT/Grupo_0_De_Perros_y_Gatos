const {body} = require('express-validator');

let email = body('email').notEmpty().withMessage('Complete este campo.').bail().isEmail().withMessage('Email invalido');
let password = body('password').notEmpty().withMessage('Complete este campo.').bail().isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres');

let validator = [email,password];

module.exports = validator;