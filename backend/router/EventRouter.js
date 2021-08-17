const express = require("express");
const router = express.Router();
const EventModule = require("../module/Event");
const StatusCode = require("../lib/status-code");

router.get("/", async (req, res) => {
    const result = await EventModule.get(req.user.id);
    if(typeof result === 'object') {
        res.send(result);
    } else {
        switch(result) {
            case 500 :
            default : {
                res.status(500).send({error : "문제가 발생했습니다."});
            }
        }
    }
});

router.post("/", async (req, res) => {
    const {name, type, date, url} = req.body;
    if(!name || !type || !date || !url) {
        res.status(StatusCode.invalid).send({error : "올바른 형식이 아닙니다."}); // 400
        return;
    }
    const result = await EventModule.set(req.user.id, req.body);
    if(typeof result === 'object') {
        res.send(result);
        return;
    } else {
        switch(result) {
            case 202 : {
                res.status(result).send({error : "생성 개수를 초과하였습니다. (최대 10개)"})
                break;
            }
            case 500 :
            default : {
                res.status(500).send({error : "문제가 발생했습니다."})
            }
        }
    }
});
router.patch("/", async (req, res) => {
    const {eventID , data} = req.body;
    const result = await EventModule.update(eventID, data);
    switch(result) {
        case 200 : {
            res.sendStatus(StatusCode.success);
            break;
        }
        case 500 :
        default : {
            res.status(500).send({error : "문제가 발생했습니다."})
        }
    }
});
router.delete("/", async (req, res) => {
    const eventID = req.body.eventID;
    if(!eventID) {
        res.status(StatusCode.invalid).send({error : "잘못된 접근입니다."});
        return;
    }
    const result = await EventModule.remove(eventID);
    switch(result) {
        case 200 : {
            res.sendStatus(StatusCode.success);
            break;
        }
        case 500 :
        default : {
            res.status(500).send({error : "문제가 발생했습니다."})
        }
    }
});

module.exports = router;