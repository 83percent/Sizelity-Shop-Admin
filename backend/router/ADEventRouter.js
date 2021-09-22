const express = require('express');
const router = express.Router();
const ADEventModule = require("../module/AD/Event");


router.post("/info", async (req, res) => {
    const result = await ADEventModule.setInfo({shopID : req.user.id, data : req.body});
    
});

router.post("/image/:id", async (req, res) => {
    
});

router.delete("/", async (req, res) => [

]);

module.exports = router;