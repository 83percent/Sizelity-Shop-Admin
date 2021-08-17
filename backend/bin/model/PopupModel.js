const Mongoose = require('mongoose');
const COLL_NAME = 'ad_popup';

const ADPopupModel = new Mongoose.Schema({
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
        required: true
    },
    active : {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    versionKey : false
});

module.exports = Mongoose.model(COLL_NAME, ADPopupModel);