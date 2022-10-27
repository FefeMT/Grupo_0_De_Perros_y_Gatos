const fs = require('fs');
const {resolve} = require('path');

let model = {
    index: () => JSON.parse(fs.readFileSync(resolve(__dirname,'..','data','users.json'))),
    one: id => index().find(e => e.id == id),
    write: data => fs.writeFileSync(resolve(__dirname,'..','data','users.json'),JSON.stringify(data,null,2)),
    generate: function(data){
        let all = model.all();
        let last = all.pop();
        let user = {}
        user.name = data.name;
        user.price = parseInt(data.price);
        user.category = data.category;
        user.sku = last.sku + 1;
        user.image = data.image
        return user;
    },
};

module.exports = model;