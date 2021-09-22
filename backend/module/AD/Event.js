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
    console.log(data);
    try {
        let event = await ADEventModel.find({shopRef : shopID});
        if(event?.length >= 10) return StatusCode.noCraete; // 202 Maximum 
        
        event = new ADEventModel({
            ShopRef : shopID,
            info : data.info,
            config : data.config
        });
        const result = await event.save();
        if(result._id) {
            await AccountModule.Plan.add(shopID, data.config.plan, 'event');
            return result;
        }
        else StatusCode.error;
    } catch(err) {
        console.error(err);
        return StatusCode.error;
    }
}

async function setImage(EventID, location) {
    try {
        const event = await ADEventModel.findByIdAndUpdate(EventID, {'info.image' : location});
        if(event._id) return StatusCode.success;
        else return StatusCode.error;
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
