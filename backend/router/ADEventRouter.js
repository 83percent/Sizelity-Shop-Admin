const express = require('express');
const router = express.Router();
const ADEventModule = require("../module/AD/Event");

const StatusCode = require("../lib/status-code");


router.post("/info", async (req, res) => {
    const result = await ADEventModule.setInfo(req.user.id, req.body);
    console.log(result);
});

router.post("/image/:id", async (req, res) => {
    const eventID = req.params.id;
    if(!eventID) return res.status(StatusCode.invalid).send({error : "잘못된 요청 입니다."}); // 400
    const result = await ADEventModule.setImage(eventID, req.file.location);
});

router.delete("/", async (req, res) => [

]);

module.exports = router;