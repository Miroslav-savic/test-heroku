import express, { Router } from 'express';
import mongoose from 'mongoose';
const path = require('path');
var compression = require('compression');

const app = new express();

var mongoDB = 'mongodb+srv://miroslav:qkTo6uNn9jZVRMu4@cluster0.xapjf.mongodb.net/biblioteka?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(compression()); //Compress all routes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);  // Add catalog routes to middleware chain.

app.listen(4000, () => {
    console.log('Server is running...');
});