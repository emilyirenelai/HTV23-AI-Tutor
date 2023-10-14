const express = require('express');
const router = express.Router();
const fs = require('fs');

const vision = require('@google-cloud/vision');

router.get('/image', async function(req, res, next) {
    // creates a client
    const client = new vision.ImageAnnotatorClient();

    const bucketName = process.env.BUCKET_NAME;
    const fileName = 'image.png';

    // performs text detection on the gcs file
    const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text));
    res.send(detections[0].description);
});

router.get('/handwritten', async function(req, res, next) {
    // creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = '/Users/chaunguyen/workspace/HTV23-AI-Tutor/server/routes/handwritten.jpeg';

    // read a local image as a text document
    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
    fullTextAnnotation.pages.forEach(page => {
        page.blocks.forEach(block => {
            console.log(`Block confidence: ${block.confidence}`);
            block.paragraphs.forEach(paragraph => {
                console.log(`Paragraph confidence: ${paragraph.confidence}`);
                paragraph.words.forEach(word => {
                    const wordText = word.symbols.map(s => s.text).join('');
                    console.log(`Word text: ${wordText}`);
                    console.log(`Word confidence: ${word.confidence}`);
                    word.symbols.forEach(symbol => {
                    console.log(`Symbol text: ${symbol.text}`);
                    console.log(`Symbol confidence: ${symbol.confidence}`);
                    });
                });
            });
        });
    });
});

router.get('/pdf', async function(req, res, next) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    // Bucket where the file resides
    // const bucketName = 'my-bucket';
    // Path to PDF file within bucket
    // const fileName = 'path/to/document.pdf';
    // The folder to store the results
    // const outputPrefix = 'results'

    const gcsSourceUri = `gs://${bucketName}/${fileName}`;
    const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

    const inputConfig = {
        // Supported mime_types are: 'application/pdf' and 'image/tiff'
        mimeType: 'application/pdf',
        gcsSource: {
            uri: gcsSourceUri,
        },
    };
    const outputConfig = {
        gcsDestination: {
            uri: gcsDestinationUri,
        },
    };
    const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
        const request = {
        requests: [
            {
            inputConfig: inputConfig,
            features: features,
            outputConfig: outputConfig,
            },
        ],
    };

    const [operation] = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation.promise();
    const destinationUri =
    filesResponse.responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
});

module.exports = router;