const Mongoose = require('mongoose');
const COLL_NAME = 'product_empty';
const RequestSchema = new Mongoose.Schema({},{collection: 'product_empties'});
module.exports = Mongoose.model(COLL_NAME, RequestSchema);
/*
const ProductEmptySchema = new Mongoose.Schema({
    domain : {
        type: String,
        required: true
    },
    code : {
        type: String,
        required: true
    },
    full : {
        type: String,
        required: true
    },
    reg_date : {
        type: Date,
        defualt: Date.now
    }
}, {
    versionKey: false
});

ProductEmptySchema.index({
    domain : 1,
    code : 1
}, {
    unique : true
});
*/  