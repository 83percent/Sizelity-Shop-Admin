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
const __Mongoose = require('./config/mongo');

const bodyParser = require('body-parser');
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
const RequestRouter = require('./router/RequestRouter');
const EventRouter = require('./router/EventRouter');
const ADPopupRouter = require('./router/ADPopupRouter');
const ADEventRouter = require('./router/ADEventRouter');
const ADRouter = require('./router/ADRouter');
const NoticeRouter = require('./router/NoticeRouter');

const copsOption = {
    //origin : 'https://adminserver.sizelity.com',
    origin: 'http://localhost:3000',
    credentials :true
}


server.use(express.static('public'));
server.use(cookieParser({secret: '83percent'}));
server.use(cookieSession({
    name: 'shop',
    keys: ['83percent']
})); 

server.use(cors(copsOption));
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

/* ================================
            Server start
================================ */

server.get('/healthCheck', (req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Health Check Page");
    res.end();
});
server.use("/login", LoginRouter);
server.use('/account', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.status(401).send({error: "로그인 후 이용해주세요."});
    }
},AccountRouter);
server.use('/product', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.sendStatus(401);
    }
},ProductRouter);

server.use('/request', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.sendStatus(401);
    }
},RequestRouter);
server.use('/event', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.status(401).send({error: "로그인 후 이용해주세요."});
    }
},EventRouter);

server.use("/notice", NoticeRouter);

// AD Router
server.use('/ad/main', ADRouter);

server.use('/ad/popup', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.status(401).send({error: "로그인 후 이용해주세요."});
    }
},ADPopupRouter);
server.use('/ad/event', (req, res, next) => {
    if(req.isAuthenticated()) next();
    else {
        res.status(401).send({error: "로그인 후 이용해주세요."});
    }
},ADEventRouter);

server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});