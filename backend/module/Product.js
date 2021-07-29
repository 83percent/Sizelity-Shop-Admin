const StatusCode = require("../lib/status-code");
const ShopModel = require("../bin/model/ShopModel");
const ProductModel = require("../bin/model/ProductModel");

async function set(id, data) {
    const shop = await ShopModel.findById(id);
    if(!shop) return StatusCode.noData;
    if(shop.domain !== data.praw.domain) return StatusCode.otherShopRequest;
    try {
        const product = new ProductModel({
            shopRef : shop._id,
            praw : data.praw,
            info : data.info,
            size : data.size
        });
        const result = await product.save();
        if(!result) {
            return StatusCode.error;
        }
        else {
            shop.product.count++;
            shop.save(); // async
            return {shop : result.praw.domain, code : result.praw.code};
        }
    } catch(err) {
        if(err.code === 11000) return StatusCode.already;
        else return StatusCode.error;
        
    }
}

module.exports = {
    set
}