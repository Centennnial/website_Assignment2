// Imports
const express = require('express')
const expressLayouts=require('express-ejs-layouts')
const app = express()


const port = 8080


// db model config
require('./models/db');


// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use('/fonts', express.static(__dirname + 'public/fonts'))

//Set Template engine partials
app.use(expressLayouts)
app.set('layout','./layout/main')

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

//body-parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// route middleware
app.use('/',require('./routes/users'));



// Listen on Port 8080
app.listen(port, () => console.info(`App listening on port ${port}`))