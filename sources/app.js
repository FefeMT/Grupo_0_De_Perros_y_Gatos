const express = require('express');
const app = express();
const methodOverride = require('method-override');
const { resolve } = require('path');
const { port, start } = require('./modules/server');
const session = require('express-session');
app.listen(port,start());

app.set('views', resolve(__dirname,'./views'));
app.set('view engine', 'ejs');

app.use(express.static(resolve(__dirname,"../public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('m'));

app.use(session({ secret: "Shhhh es secreto"}));
app.use(require('./middlewares/style'));

app.use(require("./routes/main.routes"));
app.use(require('./routes/users.routes'));
app.use(require('./routes/products.routes'));