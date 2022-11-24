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
        user.username = data.username;
        user.email = data.email;
        user.password = data.password;
        user.id = last.id + 1;
        user.image = data.image
        return user;
    },
};

module.exports = model;