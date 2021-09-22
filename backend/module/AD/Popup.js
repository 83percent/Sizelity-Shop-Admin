const PopupModel = require("../../bin/model/ADPopupModel");
const onPopupModel = require("../../bin/model/PopupOnGoingModel");
const StatusCode = require("../../lib/status-code");

const AccountModule = require("../Account");


async function getAll(shopID) {
    try {
        
        return {
            bid : await PopupModel.find({shopRef : shopID}),
            ongoing : await onPopupModel.find({shopRef : shopID})
        }
    } catch(err) {
        console.log(err);
        return StatusCode.error; // 500
    }
}
async function setInfo(shopID, {url, bid, plan, maxCount}) {
    try {
        const exists = await PopupModel.find({shopRef : shopID});
        if(exists?.length >= 4) return StatusCode.noCraete; // full 202 : 최대 4개 생성

        let popup = new PopupModel({
            shopRef : shopID,
            url, bid, plan, maxCount
        });
        popup = await popup.save();
        if(popup._id) { 
            await AccountModule.Plan.add(shopID, plan, 'popup');
            return popup;
        } // Object
        else return StatusCode.error; // 500
    } catch(err) {
        console.log(err);
        return StatusCode.error; // 500
    };
    
}
async function setImage(popupID, location) {
    const popup = await PopupModel.findByIdAndUpdate(popupID, {image : location});
    if(popup._id) return StatusCode.success;
    else return StatusCode.error;
}
async function remove(popupID) {
    try {
        const popup = await PopupModel.findByIdAndDelete(popupID).exec();
        if(popup._id) {
            await AccountModule.Plan.minus(popup.shopRef, popup.plan, 'popup')
            return StatusCode.success;
        }
        else return StatusCode.error
    } catch {
        return StatusCode.error
    }
}
module.exports = {
    getAll,
    setInfo,
    setImage,
    remove,
}