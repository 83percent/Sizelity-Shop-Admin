const Mongoose = require("mongoose");
const COLL_NAME = "promotion_data";

const PromotionDataModel = new Mongoose.Schema({
    ShopRef : {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "shop",
        required: true
    },
    EventRef : {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "event",
        required: true
    },
    count : {
        type: Number,
        default : 0
    },
    data : []
});

module.exports = Mongoose.model(COLL_NAME, PromotionDataModel);