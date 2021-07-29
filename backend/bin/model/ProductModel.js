const Mongoose = require('mongoose');
const COLL_NAME = 'product';
const ProductSchema = new Mongoose.Schema({
    shopRef : {
        type: Mongoose.Schema.Types.ObjectId,
        ref : "shop",
        required : true
    },
    praw : {
        domain : {
            type: String,
            required : true
        },
        type : {
            type: String,
            required : true
        },
        code : {
            type: String,
            required : true
        },
        full : {
            type: String,
            required : true
        }
    },
    info : {
        sname : {
            type: String,
            required : true
        },
        pname : {
            type: String,
            required : true
        },
        ptype : {
            type: String,
            required : true
        },
        subtype : {
            type: String,
            required : true
        }
    },
    size : [],
    reg_date : {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

/* ProductSchema.index({
    sname : 1,
    code : 1
}, {
    unique : true
}); */
module.exports = Mongoose.model(COLL_NAME, ProductSchema);