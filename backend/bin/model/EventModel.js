const Mongoose = require('mongoose');
const COLL_NAME = 'event';
const EventModel = new Mongoose.Schema({
    shopRef : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : "shop",
        required : true
    },
    name : {
        type: String,
        required: true
    },
    text : {
        type: String
    },
    type : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    url : {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, EventModel);
