const Mongoose = require('mongoose');
const COLL_NAME = 'ad_popup';

const onADEventModel = new Mongoose.Schema({
    shopRef : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'shop',
        required: true
    },
    info : {
        url : {
            type: String,
            required: true
        },
        type : {
            type: String,
            required: true
        },
        image : {
            type: String
        },
        expire : {
            type : Date,
            required: true
        },
    },
    config : {
        bid : {
            type: Number,
            default : 0,
            required: true
        },
        plan : {
            type: Number,
            default : 0,
            required: true
        },
        target : {
            type: String,
            required: true
        },
        active : {
            type: Boolean,
            default: false
        },
    },
    statistics : {
        maxCount : {
            type: Number,
            required: true
        },
        count : {
            type: Number,
            default: 0
        },
        countData : [],
    },
}, {versionKey : false});

module.exports = Mongoose.model(COLL_NAME, ADEventModel);
