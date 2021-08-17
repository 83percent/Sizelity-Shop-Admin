const express = require("express");
const router = express.Router();
const StatusCode = require("../lib/status-code");

const RequestProduct = require("../module/RequestProduct");

router.get("/:count", async (req, res) => {
    const {count=0} = req.params;
    const result = await RequestProduct.get({domain : req.user.domain, count});
    if(typeof result === 'object') res.send(result);
    else {
        switch(result) {
            case 500 :
            default : {
                res.status(result).send({error : "문제가 발생했습니다."});
                break;
            }
        }
    }
});

router.delete("/", async (req, res) => {
    const { requestID } = req.body;
    if(!requestID) res.sendStatus(StatusCode.invalid); // 400
    else {
        const result = await RequestProduct.remove(requestID);
        res.sendStatus(result);
    }
})

module.exports = router;