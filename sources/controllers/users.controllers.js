const {index,one,write,generate} = require('../models/users.model');
const {unlinkSync} = require('fs');
const {resolve} = require('path');
const controller = {
    login: (req,res) => {
        res.render('login',{style:'login'});
    },
    register: (req,res) => {
        res.render('register',{style:'register',})
    },
    profile: (req,res) => {
        res.render('profile',{style:'profile'})
    },
    save: (req,res) => {
        let all = index();
        req.body.avatar = req.files && req.files[0] ? req.files[0].filename : null
        req.body.id = all.length > 0 ? all.pop().id + 1 : 1
        let user = {...req.body};
        all.push(user)
        write(all)
        return res.redirect('/users/profile/:user')
    },
    edit: (req,res) => {
        let product = one(req.params.producto)
        return res.render('edit',{product})
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