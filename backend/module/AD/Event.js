const StatusCode = require("../../lib/status-code");
const ADEventModel = require("../..//bin/model/ADEventModel");

const AccountModule = require("../Account");

async function get(shopID) {
    try {
        return await ADEventModel.find({shopRef : shopID});
    } catch {
        return StatusCode.error;
    }
    
    
}

async function setInfo(shopID, data) {
    try {
        let event = await ADEventModel.find({shopRef : shopID});
        if(event?.length >= 10) return StatusCode.noCraete; // 202 Maximum 
        
        event = new ADEventModel({

        });
        const reuslt = await event.save();
        if(result._id) {
            await AccountModule.Plan.add(ShopID, plan, 'event');
            return result;
        }
        else StatusCode.error;
    } catch {
        return StatusCode.error;
    }
}

async function setImage(EventID, location) {
    try {

    } catch {
        return StatusCode.error;
    }
}

async function remove(eventID) {

}

module.exports = {
    get,
    setInfo, setImage,
    remove
}
