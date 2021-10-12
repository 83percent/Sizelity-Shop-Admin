const Mongoose = require('mongoose');
const COLL_NAME = 'shop_notice';
const NoticeModel = new Mongoose.Schema({}, {collection: 'shop_notices'});
/* const NoticeModel = new Mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    important : {
        type: Boolean,
        default : false
    },
    text : {
        type: String,
        required: true
    },
    reg_date : {
        type: Date,
        default :Date.now()
    }
}, {
    versionKey: false
}); */

module.exports = Mongoose.model(COLL_NAME, NoticeModel);