const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.get('/', async (req,res) => {
    
});

router.post('/', upload.fields([]),async (req, res) => {
    const {uploadImage, info} = req.body;
    console.log("--------------")
    console.log(req.files);
})

module.exports = router;