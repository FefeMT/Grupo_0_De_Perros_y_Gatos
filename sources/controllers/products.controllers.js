const {all,one,write,generate} = require('../model/products.model');
const {unlinkSync} = require('fs');
const {resolve} = require('path');
const { validationResult} = require('express-validator');
const controller = {
    cart: (req,res) => {
        res.render('./products/cart')
    },
    index: (req,res) =>{
        let products = all()
        if(req.params.categoria){
            products = products.filter(e => e.category == req.params.categoria)
            return res.render('list',{products})
        }
        return res.render('list',{products})
    },
    show: (req,res) =>{
          let product = one(req.params.producto)
          if(product){
              return res.render('detail',{product})
          }
          return res.render('detail',{product:null})
    },
    create: (req,res) => {
        return res.render('create')
    },
    save: (req,res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            req.body.image = req.files && req.files.length > 0 ? req.files[0].filename : 'default.png'
            let nuevo = generate(req.body)
            let todos = all()
            todos.push(nuevo)
            write(todos)
            return res.redirect('/productos/detalle/' + nuevo.sku)
        } else {
            return res.render('create', { errors: errors.array() });
        }
    },
    edit: (req,res) => {
        let product = one(req.params.producto)
        return res.render('edit',{product})
    },
    update: (req,res)=>{
        let errors = validationResult(req);
        let todos = all();
        let actualizados = todos.map(elemento => {
            if(elemento.sku == req.body.sku){
                elemento.name = req.body.name;
                elemento.price = parseInt(req.body.price)
                elemento.category = req.body.category
                elemento.image = req.files && req.files.length > 0 ? req.files[0].filename : elemento.image
            }
            return elemento
        })
        if (!errors.isEmpty()){
            return res.render('edit', { errors: errors.mapped() })
        } else {
            write(actualizados)
            return res.redirect('/productos/detalle/' + req.body.sku)
        }
    },
    remove: (req,res) => {
        let product = one(req.body.sku)
        if(product.image != 'default.png'){
            let file = resolve(__dirname,'..','..','public','products',product.image)
            unlinkSync(file)
        }
        let todos = all()
        let noEliminados = todos.filter(elemento => elemento.sku != req.body.sku)
        write(noEliminados)
        return res.redirect('/productos/')
    }
}

module.exports = controller;