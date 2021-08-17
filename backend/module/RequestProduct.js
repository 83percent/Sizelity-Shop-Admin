const StatusCode = require("../lib/status-code");
const RequestModel = require("../bin/model/RequsetModel");

const readMaximum = 30;

async function get({domain, count}) {
    try {
        return await RequestModel.find({domain : domain}).limit(readMaximum).skip(Number(count));
    } catch(err) {
        console.log(err);
        return StatusCode.error;
    }
}
async function remove(requestID) {
    try {
        const result = await RequestModel.findByIdAndDelete(requestID);
        if(result._id) {
            return StatusCode.success;
        } else {
            return StatusCode.error;
        }
    } catch(err) {
        console.log(err);
        return StatusCode.error;
    }
}
module.exports = {
    get, remove
}