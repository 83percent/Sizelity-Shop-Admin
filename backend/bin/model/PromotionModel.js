const Mongoose = require("mongoose");
const COLL_NAME = "promotion";

const PromotionModel = new Mongoose.Schema({
    shopRef : {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "shop",
        required: true
    },
    type : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    position : { // 어느 탭에 위치할건지 지정
        tag : {
            String : String,
            required: true
        },
        index : {
            type: Number,
            required: true
        }
    },
    image : {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    },
    expire : {
        type: Date,
        required: true
    }
}, {
    versionKey: false
});
PromotionModel.index({'position.tag' : 1, 'position.index' : 1});

module.exports = Mongoose.model(COLL_NAME, PromotionModel);