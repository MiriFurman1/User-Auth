const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');
var routes = require('./routes');
const connection = require('./config/database');
const { log } = require('console');


const MongoStore = require('connect-mongo')(session);
var app = express();

require('./config/passport');
app.use(passport.initialize())
app.use(passport.session())
/**
 * -------------- GENERAL SETUP ----------------
 */


require('dotenv').config();

// Create the Express application


app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

 const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' })
 app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

//!for debugging 
// app.use((req,res,next)=>{
//     console.log(req.session);
//     console.log(req.user);
//     next();
// })

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);