const {index,one,write,generate} = require('../model/users.model');
const {unlinkSync} = require('fs');
const {resolve} = require('path');
const controller = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/register'),
    profile: (req,res) => {
        let user = one(req.params.id)
          if(user){
              return res.render('users/profile/' + user)
          }
          return res.render('404')
    },
    save: (req,res) => {
        let result = validationResult(req);
        if (!result.isEmpty()) {
            let errors = result.mapped();
            return res.render('users/register', { 
                style: 'register',
                errors: errors,
                data: req.body
            });
        } else {
            let all = index();
            req.body.avatar = req.files && req.files[0] ? req.files[0].filename : null
            req.body.id = all.length > 0 ? all.pop().id + 1 : 1
            let user = {...req.body};
            all.push(user)
            write(all)
            res.redirect('/users/profile/:user')
        }
    },
    edit: (req,res) => {
        let product = one(req.params.producto)
        return res.render('products/product-edit',{product})
    },
    update: (req,res)=>{
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
        write(actualizados)
        return res.redirect('/profile')
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
        return res.redirect('/profile/')
    }
}
module.exports = controller;