const express = require("express");
const router = express.Router();

const StatusCode = require("../lib/status-code");

const ShopMainADModel = require("../bin/model/ShopMainADModel");

router.get("/", async(_, res) => {
    ShopMainADModel.find({}).sort('priority').exec((error, data) => {
        if(error) res.status(StatusCode.error).send({error: "서버에 문제가 발샏했습니다."}) // 500
        else res.send(data);
    });
});

module.exports = router;