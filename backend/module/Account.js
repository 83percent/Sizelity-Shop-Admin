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
// Plan Handler
const Plan = {
    add : async function(id, planValue, type) {
        try {
            let shop = await ShopModel.findById(id, ['plan']);
            switch(type) {
                case 'popup' : {
                    if(shop.plan.popup === undefined) shop.plan.popup = 0;
                    shop.plan.popup = shop.plan.popup === undefined ? planValue : shop.plan.popup + planValue;
                    break;
                }
                case 'event' : {
                    if(shop.plan.event === undefined) shop.plan.event = 0;
                    shop.plan.event = shop.plan.event === undefined ? planValue : shop.plan.event + planValue;
                    break;
                }
                case 'product' : {
                    if(shop.plan.product === undefined) shop.plan.product = 0;
                    shop.plan.product = shop.plan.product === undefined ? planValue : shop.plan.product + planValue;
                    break;
                }
            }
            shop = await shop.save();
            if(shop._id) {
                return true;
            } else return false;
        } catch {
            return false;
        }
    },
    minus : async function(id, planValue, type) {
        try {
            let shop = await ShopModel.findById(id, ['plan']);
            switch(type) {
                case 'popup' : {
                    shop.plan.popup = shop.plan.popup - planValue;
                    break;
                }
                case 'event' : {
                    shop.plan.event = shop.plan.event - planValue;
                    break;
                }
                case 'product' : {
                    shop.plan.product = shop.plan.product - planValue;
                    break;
                }
            }
            shop = await shop.save();
            if(shop._id) {
                return true;
            } else return false;
        } catch {
            return false;
        }
    }
}

module.exports = {
    setInit,
    getShopInfo,

    Plan
}