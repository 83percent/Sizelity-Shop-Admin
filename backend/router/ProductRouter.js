const express = require('express');
const router = express.Router();
const Product = require("../module/Product");
const StatusCode = require("../lib/status-code");

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

module.exports = router;