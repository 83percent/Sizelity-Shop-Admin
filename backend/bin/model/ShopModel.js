const Mongoose = require('mongoose');
const COLL_NAME = 'shop';
const ShopSchema = new Mongoose.Schema({
    sname : {
        type: String,
        trim : true,
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
    count : {
        provide : 0,
        compare : 0
    },
    price : {
        name : {
            type: String,
            enum: ['basic','standard','deluxe','premium'],
            default: 'basic'
        },
        base : {
            type: Number,
            default : 0
        },
        price : {
            type: Number,
            default : 1.2
        },
        income : {
            type: Number,
            default: 0.4
        },
        expire : {
            type: Number,
            default : 0
        },
        free_count : {
            type: Number,
            default : 0
        },
        pre_pay : {
            price : {
                type: Number,
                default: 0
            },
            check : {
                type: Boolean,
                default: false
            },
            pay_date: {
                type: Date
            }
        },
        start_date : {
            type: Date,
            required: true
        }
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
    reg_date : {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
});

module.exports = Mongoose.model(COLL_NAME, ShopSchema);