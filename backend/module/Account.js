const ShopModel = require("../bin/model/ShopModel");
const StatusCode = require("../lib/status-code");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const saltRounds = 10;

async function setInit(id, data) {
    const shop = await ShopModel.findById(id);
    
    if(!shop) return StatusCode.auth;
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        shop.password = hash;
        shop.info = data.info;
        shop.state = 1;
        return await shop.save();
    } catch(err) {
        console.log(err);
        return StatusCode.error;
    }
}
async function getShopInfo(id) {
    try {
        let shop = await ShopModel.findById(id);
        if(!shop) return StatusCode.noData;
        else {
            shop = shop.toObject();
            delete shop.password;
            return shop;
        }
    } catch(err) {
        return StatusCode.error;
    }
    
}

module.exports = {
    setInit,
    getShopInfo
}