const express = require('express');
const router = express.Router();

const vision = require('@google-cloud/vision');

router.get('/', async function(req, res, next) {
    // creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = '/Users/chaunguyen/workspace/HTV23-AI-Tutor/server/routes/test-img.png';

    // performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
    res.send(detections[0].description);
});

module.exports = router;