const Mongoose = require("mongoose");
const COLL_NAME = "ad_event"

const ADEventModel = Mongoose.Schema({
    ShopRef : {
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
        maxCount : {
            type: Number,
            default : 0,
            required: true
        },
    },
})

module.exports = Mongoose.model(COLL_NAME, ADEventModel);