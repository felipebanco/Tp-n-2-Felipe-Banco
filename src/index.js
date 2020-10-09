const express= require('express');
const morgan = require('morgan');
const exphbs = require('handlebars');
const path = require('path');

//Initializations
const app = express()

//Settings: Puerto al que se conecta
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs=>({
    defaultLayout: 'main',
    layaoutsDir: path.join(app.get('views'),'layaouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),

}))
app.set('view engine', '.hbs');

//Middlewares: Muestra peticiones del usuario
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Solo acepta datos sencillos del tipo string
app.use(express.json());

//Global Variables
app.use((req,res,next)=>{ //Toma la información del usuario, el servidor y una funct para ejecutar
    next();
});


//Routes: Define las URLs a las que accede el servidor
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public: Sección del código a la que accede el navegador
app.use(express.static(path.join(__dirname,'public')));

//Satrting Server:
app.listen(app.get('port'),()=>{
    console.log(' Server on port', app.get('port'));
}
)