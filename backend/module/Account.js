const ShopModel = require("../bin/model/ShopModel");
const StatusCode = require("../lib/status-code");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PriceModule = require("../lib/Price");

async function setInit(id, data) {
    const shop = await ShopModel.findById(id);

    if(!shop) return StatusCode.auth;
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data.password, salt);
        shop.password = hash;
        shop.price = PriceModule.getPrice(data.price);
        shop.info = data.info;
        shop.state = 1;
        await shop.save();
        return shop;
    } catch(err) {
        console.log(err);
        return StatusCode.error;
    }
}
async function getShopInfo(id) {
    try {
        let shop = await ShopModel.findById(id);
        if(!shop) return StatusCode.noData; // 204
        else {
            shop = shop.toObject();
            delete shop.password;
            delete shop.state;
            return shop;
        }
    } catch(err) {
        return StatusCode.error;
    }
    
}

async function changePassword({id, oldPwd, newPwd}) {
    try {
        const shop = await ShopModel.findById(id);
        if(bcrypt.compareSync(oldPwd, shop.password)) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(newPwd, salt);
            shop.password = hash;
            await shop.save();
            return StatusCode.success; // 200
        } else {
            return StatusCode.auth; //401
        }
    } catch(error) {
        return StatusCode.error;
    }
}

async function changeInfo({id, data}) {
    try {
        const shop = await ShopModel.findByIdAndUpdate(id, {info : data});
        if(!shop) return StatusCode.error;
        else return StatusCode.success;
    } catch {
        return StatusCode.error;
    }
}


module.exports = {
    setInit,
    getShopInfo,
    changePassword,
    changeInfo
}