const express = require('express');
const router = express.Router();

const StatusCode = require('../lib/status-code');
const PopupModule = require("../module/AD/Popup");
const { Popup } = require("../config/s3");


router.get('/', async (req,res) => {
    const result = await PopupModule.getAll(req.user.id);
    if(typeof result === 'nunmber') {
        switch(result) {
            case 500 :
            default : {
                return res.status(StatusCode.error).send({error : '서버에 문제가 발생했습니다.'});
            }
        }
    } else {
        return res.send(result);
    }
});


// 최소 노출당 금액 (VAT 포함) = 1.540
// 최소 예산 = 30,000
// 최소 설정 노출 수 = 19480
router.post('/info', async (req, res) => {
    const { bid, plan, maxCount } = req.body;
    if(bid < 1.540 || plan < 30000 || maxCount < 19480) return res.status(StatusCode.invalid).send({'error' : "형식에 맞지 않는 요청입니다."});
    const result = await PopupModule.setInfo(req.user.id, req.body);
    if(result._id) {
        res.send(result._id);
        return;
    } else {
        switch(result) {
            case 202 : {
                return res.status(result).send({type : 'error', error : "생성 제한 개수를 초과하였습니다. (최대 4개)"})
            }
            case 500 :
            default : {
                return res.status(500).send({type : 'error', error : '서버에 문제가 발생했습니다.'});
            }
        }
    }
});

router.post('/image/:id', Popup.upload.single('image'), async (req, res) => {
    if(req.file?.location) {
        const result = await PopupModule.setImage(req.params.id, req.file.location);
        switch(result) {
            case 200 : {
                return res.sendStatus(result);
            }
            case 500 :
            default : {
                return res.status(StatusCode.error).send({error : '서버에 문제가 발생했습니다.'});
            }
        }
    } else {
        PopupModule.remove(req.params.id);
        return res.status(StatusCode.error).send({error : '서버에 문제가 발생했습니다.'});
    }
});

router.delete('/:ADID', async (req, res) => {
    const { ADID } = req.params;
    if(!ADID) return res.status(StatusCode.invalid).send({error : '잘못된 접근입니다.'}); // 400
    
    // Image Delete
    let result = await Popup.remove(ADID);
    if(result === true) {
        result = await PopupModule.remove(ADID);
    }
    switch(result) {
        case 200 : {
            res.sendStatus(result);
            break;
        }
        case 500 :
        default : {
            res.status(StatusCode.error).send({error : '서버에 문제가 발생했습니다..'}); // 500
        }
    }
});

module.exports = router;