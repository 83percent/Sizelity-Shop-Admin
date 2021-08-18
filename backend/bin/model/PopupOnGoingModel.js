const Mongoose = require('mongoose');
const COLL_NAME = 'ad_ongoing_popup';

const onADPopupModel = new Mongoose.Schema({
    shopRef : {
        type : Mongoose.Schema.Types.ObjectId,
        ref : 'shop',
        required: true
    },
    url : {
        type: String,
        required: true
    },
    image : {
        type: String,
    },
    bid : { // CPM s/ 1000
        type: Number,
        required : true
    },
    plan : {
        type: Number,
        required : true
    },
    maxCount : {
        type: Number,
        required : true
    },
    countData : [],
    reg_date : {
        type: Date,
        default : Date.now()
    }
}, {
    versionKey : false
});

module.exports = Mongoose.model(COLL_NAME, onADPopupModel);