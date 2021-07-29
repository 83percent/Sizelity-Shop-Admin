/*
    Sizelity Shop Admin Program Backend
    - Node.js
    - Auth : Jae Hoon Lee
    - Reg Date : 2021-07-27
    - Last Modify : 2021-07-27
*/
// Middle Ware
const express = require('express');
const cors = require('cors');
const __Mongoose = require('./lib/db/Mongo');

const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const server = express();

// Field
const PORT = 3003;

// Router
const LoginRouter = require('./router/LoginRouter');
const AccountRouter = require('./router/AccountRouter');
const ProductRouter = require('./router/ProductRouter');

server.use(express.static('public'));
server.use(cookieParser({secret: '83percent'}));
server.use(cookieSession({
    name: 'shop',
    keys: ['83percent']
})); 
server.use(cors({
    //origin: 'https://www.sizelity.com',
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));
server.use(express.json());
server.use(session({
    resave: false,
    saveUninitialized : false,
    cookie: {
        secure: false
    },
    secret: '83percent'
}));
server.use(passport.initialize());
server.use(passport.session());

// Cors Option
server.use(cors({
    //origin: 'https://www.sizelity.com',
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

/* ================================
            Server start
================================ */

server.use("/login", LoginRouter);
server.use('/account', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.sendStatus(401);
    }
},AccountRouter);
server.use('/product', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.sendStatus(401);
    }
},ProductRouter);


server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});