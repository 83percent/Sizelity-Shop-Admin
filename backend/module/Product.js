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
const MAX_COUNT = 20;
async function search(id, data) {
    let {way, ptype, date, count} = data;
    let query = {
        shopRef : id
    };

    // way
    switch(way) {
        case "pname" : {
            if(data.value.length > 0) {
                query["info.pname"] = {$regex:data.value};
            }
            break;
        }
        case "url" : {
            const {domain, code} = data;
            if(!domain || !code) return StatusCode.invalid;
            query["praw.domain"] = domain;
            query["praw.code"] = code;
            break;
        }
        default : {
            return StatusCode.invalid;
        }
    }
    
    // ptype
    if(ptype === undefined) return StatusCode.invalid;
    if(ptype != "all") {
        query["info.ptype"] = ptype;
    }

    // Date
    const _d = new Date();
    _d.setHours(0,0,0)
    if(date != "all") {
        switch(date) {
            case "today" : {
                break;
            }
            case "week" : {
                _d.setDate(_d.getDate() - 7);
                break;
            }
            case "month" : {
                _d.setMonth(_d.getMonth()-1, 1);
                break;
            }
            case "quarterYear" : {
                _d.setMonth(_d.getMonth()-3, 1);
                break;
            }
            case "halfYear" : {
                _d.setMonth(_d.getMonth()-6, 1);
                break;
            }
            case "year" : {
                _d.setMonth(_d.getMonth()-12, 1);
                break;
            }
            default : {
                return StatusCode.invalid;
            }
        }
        query["reg_date"] = {$gte : _d}
    }
    if(count == undefined) count = 0;
    return await ProductModel.find(query).limit(MAX_COUNT).skip(count);
}

async function getList(id, count) {
    try {
        const products = await ProductModel.find({shopRef : id}).limit(MAX_COUNT).skip(count);
        return products;
    } catch(error) {
        return StatusCode.error;
    }
    
}

async function removes(deleteArray) {
    try {
        const deletes = await ProductModel.deleteMany({_id: { $in : deleteArray}}).exec();
        if(deletes?.deletedCount > 0) {
            return StatusCode.success;
        } else return StatusCode.error;
    } catch {
        return StatusCode.error;
    }
}

async function edit({id, editData}) {
    try {
        let product = await ProductModel.findById(id);
        if(!product) return StatusCode.noData;

        product.size = editData.size;
        if(editData.info?.pname) product.info.pname = editData.info.pname;
        if(editData.info?.subtype) product.info.subtype = editData.info.subtype;
        if(editData.praw) {
            product.praw.code = editData.praw.code;
            product.praw.full = editData.praw.full;
        }
        product = await product.save();
        console.log(product);
        return StatusCode.success;
    } catch {
        return StatusCode.error;
    }
}
async function nextIndex(id) {
    try {
        const allProductCount = await ProductModel.count({shopRef: id});
        return {lastIndex : allProductCount};
    } catch {
        return StatusCode.error;
    }
}
async function isExist(domain, code) {
    try {
        const product = await ProductModel.findOne({'praw.domain' : domain, 'praw.code' : code});
        if(product) return StatusCode.success; // 200
        else return StatusCode.already; // 419
    } catch {
        return StatusCode.error; // 500
    }
}
module.exports = {
    set,
    search,
    getList,
    removes,
    edit,
    nextIndex,
    isExist
}