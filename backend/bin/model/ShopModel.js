const Mongoose = require('mongoose');
const COLL_NAME = 'shop';
const ShopSchema = new Mongoose.Schema({
    sname : {
        type: String,
        required: true
    },
    password : {
        type: String,
        trim : true,
        default: "123456789a!",
    },
    domain : {
        type: String,
        required: true,
        unique: true
    },
    info : {
        ceo : {type: String},
        reg_number : {type: String},
        email: {type: String},
        tel : {type: String},
        address : {type: String}
    },
    product : {
        count : {
            type: Number,
            default: 0
        },
        request : {
            type: Number,
            default: 0
        }
    },
    state : {
        type: Number,
        default: -1
    },
    pay : {
        credit : {
            type: Number,
            default: 0
        },
        freetier: {
            type: Number,
            default: 0
        }
    },
    reg_date : {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, ShopSchema);