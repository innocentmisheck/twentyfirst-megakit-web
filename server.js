const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const compression = require('compression');
//const { registerViewEngineHelpers } = require('./Helpers/Handlebars.Helper')
const path = require('path');
//const { setApplicationRoutes } = require('./Config/Routes.Config')
//const sm = require("./Config/Session.Config")

//Routes used to go here
app.set('port', process.env.PORT || 2021)

// Handlebars Middleware
app.set("views", path.join(__dirname, 'Views'))
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/Views/layouts/',
    partialsDir: __dirname + '/Views/partials/'
}))
app.set('view engine', 'handlebars')


app.get('/', (req, res) =>
    res.render('home', {
        title: 'Home',
    })
);

app.get('/testimonials', (req, res) =>
    res.render('testimonials', {
        title: 'testimonials',
    })
);



app.use(compression());
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.set('trust proxy', 1);

//app = setApplicationRoutes(app, sm)
//registerViewEngineHelpers()


app.listen(app.get("port"), (e) => {
    console.log("21st_GENERATION >>> Initiating connection on port %s", app.get('port'))
})