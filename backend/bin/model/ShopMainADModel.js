const Mongoose = require('mongoose');
const COLL_NAME = 'admin_main';
const AdminMain = new Mongoose.Schema({},{collection: 'admin_mains'});

/* const AdminMain = new Mongoose.Schema({
    image : {
        type: String
    },
    url : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    }
}, {
    versionKey: false
}); */

module.exports = Mongoose.model(COLL_NAME, AdminMain);