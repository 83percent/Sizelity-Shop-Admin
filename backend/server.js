/*
    Sizelity Shop Admin Program Backend
    - Node.js
    - Auth : Jae Hoon Lee
    - Reg Date : 2021-07-27
    - Last Modify : 2021-07-27
*/
// Middle Ware
const express = require('express');
const __Mongoose = require('./lib/db/Mongo');
const cors = require('cors');


const server = express();

// Field
const PORT = 3003;

// Router


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






server.listen(PORT, () => {
    console.log(" Start Server.js PORT : ",PORT);
});