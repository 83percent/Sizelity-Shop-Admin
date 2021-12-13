const express = require('express');
const router = express.Router();

const AccountModule = require("../module/Account");

router.get("/", async (req, res) => {
    const id = req.user.id;
    console.log(req.user);
    const result = await AccountModule.getShopInfo(id);
    if(typeof result === 'object') res.send(result);
    else {
        switch(result) {
            case 204 : return res.sendStatus(result);
            case 500 : 
            default : return res.status(500).send({error : "서버에 문제가 발생했습니다."});
        }
    }
});


router.post("/init", async (req, res) => {
    const id = req.user.id;
    const result = await AccountModule.setInit(id, req.body);
    
    if(typeof result === 'object') {
        res.sendStatus(200);
    } else res.status(500).send({error : "서버에 문제가 발생했습니다."});
});

router.post("/chpwd", async (req, res) => {
    const {oldPwd, newPwd} = req.body;
    const result = await AccountModule.changePassword({id: req.user._id, oldPwd, newPwd})
    switch(result) {
        case 200 : return res.sendStatus(result);
        case 401 : return res.status(result).send({error : "현재 비밀번호가 일치하지 않습니다."});
        case 500 :
        default : return res.status(500).send({error : "서버에 문제가 발생했습니다."});
    } 
})

router.patch("/", async (req, res) => {
    const data = req.body.data;
    const result = await AccountModule.changeInfo({id: req.user._id, data});
    switch(result) {
        case 200 : return res.sendStatus(result);
        case 500 :
        default : return res.status(500).send({error : "서버에 문제가 발생했습니다."});
    }        
});
module.exports = router;