const express = require("express");
const router = express.Router();
const StatusCode = require("../lib/status-code");

const NoticeModel = require("../bin/model/AdminNoticeModel");

const MAX_COUNT = 10;

router.get('/list/:count', async (req, res) => {
    try {
        const count = Number(req.params.count);
        const sendData = {};
        if(count === 0) {
            const important = await NoticeModel.find({important : true});
            if(important?.length > 0) {
                sendData.important = important;
            }
        }
        const normal = await NoticeModel.find({important: false}).limit(MAX_COUNT).skip(count);
        sendData.normal = normal;
        res.send(sendData);
    } catch {
        res.status(StatusCode.error).send({error : "서버에 문제가 발생했습니다."});
    }
})
router.get('/detail/:id', async (req, res) => {
    NoticeModel.findById(req.params.id, (errorm, data) => {
        if(error) res.status(StatusCode.error).send({error : "서버에 문제가 발생했습니다."});
        else res.send(data);
    });
})

module.exports = router;