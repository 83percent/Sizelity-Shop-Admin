const EventModel = require("../bin/model/EventModel");
const StatusCode = require("../lib/status-code");

async function get(id) {
    try {
        const data = await EventModel.find({shopRef: id});
        return data;
    } catch {
        return StatusCode.error;
    }
}


async function set(id, data) {
    try {
        const {name, text, type, target,date, url} = data;

        let _event = await EventModel.find({shopRef : id}, ["_id"]);
        if(_event.length > 10) {
            return StatusCode.noCraete;
        }

        _event = new EventModel({
            shopRef : id,
            name, text, type, date, url, target
        });
        const result = await _event.save();
        if(result._id) return result; // object
        else return StatusCode.error; // 500
    } catch(err) {
        console.error(err);
        return StatusCode.error; // 500
    }
    
}

async function update(eventID, data) {
    try {
        const _event = await EventModel.findByIdAndUpdate(eventID, data);
        if(_event._id) return StatusCode.success; // 200
        else return StatusCode.error; // 500
    } catch(err) {
        console.error(err);
        return StatusCode.error; // 500
    }
}

async function remove(eventID) {
    try {
        const _event = await EventModel.findByIdAndDelete(eventID);
        if(_event._id) return StatusCode.success; // 200
        else return StatusCode.error; // 500
    } catch(err) {
        console.error(err);
        return StatusCode.error; // 500
    }
}
module.exports = {
    get,
    set,
    update,
    remove
}