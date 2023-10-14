const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', async function(req, res, next) {
    var imageAsBase64 = fs.readFileSync('/Users/chaunguyen/workspace/HTV23-AI-Tutor/server/routes/image.png', 'base64');
    console.log(imageAsBase64);
    res.send(imageAsBase64);
});

module.exports = router;