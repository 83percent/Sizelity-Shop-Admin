const express = require('express');
const router = express.Router();
const Product = require("../module/Product");
const StatusCode = require("../lib/status-code");

router.get("/next", async (req, res) => {
    const result = await Product.nextIndex(req.user._id);

    if(typeof result === 'object') {
        return res.send(result);
    } else {
        switch(result) {
            case 500 :
            default : {
                return res.status(500).send({error: '서버에 문제가 발생했습니다.'});
            }
        }
    }
});

router.get("/list/:count", async(req, res) => {
    const count = req.params.count || 0;
    const result = await Product.getList(req.user._id, Number(count));
    if(typeof result === 'object') {
        return res.send(result);
    } else {
        switch(result) {
            case 500 :
            default : {
                return res.status(500).send({error: '서버에 문제가 발생했습니다.'});
            }
        }
    }

});
router.get("/check/:code", async(req, res) => {
    const domain = req.user?.domain;
    const code = req.params?.code;
    if(!domain || !code) return res.status(StatusCode.invalid).send({error : "잘못된 요청입니다."}); // 400
    
    const result = await Product.isExist(domain, code);
    switch(result) {
        case 200 : return res.status(200).send({exist: true});
        case 419 : return res.status(200).send({exist: false});
        case 500 :
        default : return res.status(500).send({error: '서버에 문제가 발생했습니다.'});
    }
});
router.post("/", async (req, res) => {
    const { shopRef } = req.body;
    if(shopRef !== req.user.id) {
        res.sendStatus(StatusCode.otherShopRequest); // 403 Auth But I know user
    } else if(!shopRef) {
        res.sendStatus(StatusCode.invalid); // 400 Bad Request
    } else {
        const result = await Product.set(shopRef, req.body.data);
        if(typeof result != 'number') {
            res.send(result);
        } else {
            res.sendStatus(result);
        }

    }
});

router.post("/search", async (req, res) => {
    try {
        const result = await Product.search(req.user.id, req.body);
        if(typeof result != 'number') {
            res.send(result);
        } else {
            res.sendStatus(result);
        }
    } catch {
        res.sendStatus(StatusCode.error);
    } 
});

router.delete("/", async (req, res) => {
    const deletes = req.body.deletes;
    const result = await Product.removes(deletes);
    switch(result) {
        case 200 : return res.sendStatus(result);
        case 500 :
        default : {
            return res.status(500).send({error: '서버에 문제가 발생했습니다.'});
        }
    }
});

router.patch("/", async (req, res) => {
    const {id, editData} = req.body;
    const result = await Product.edit({id, editData});
    switch(result) {
        case 200 : 
        case 204 : return res.sendStatus(result);
        case 500 :
        default : {
            return res.status(500).send({error: '서버에 문제가 발생했습니다.'});
        }
    }
});
module.exports = router;