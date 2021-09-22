const express = require('express');
const router = express.Router();

const AccountModule = require("../module/Account");

router.get("/", async (req, res) => {
    const id = req.user.id;
    const result = await AccountModule.getShopInfo(id);
    if(typeof result === 'object') res.send(result);
    else res.status(result).send("서버에 문제가 발생했습니다.");
});


router.post("/init", async (req, res) => {
    const id = req.user.id;
    const result = await AccountModule.setInit(id, req.body);
    if(typeof result === 'object') {
        res.sendStatus(200);
    } else res.status(result).send("서버에 문제가 발생했습니다.");
});


module.exports = router;