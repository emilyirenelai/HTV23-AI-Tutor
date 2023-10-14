const express = require('express');
const router = express.Router();
const fs = require('fs');

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const bucketName = process.env.BUCKET_NAME;

router.post('/', async function(req, res) {
    if (!req.body.blobName) {
        return res.status(400).send({ message: "Please specify a file name!" });
    }
    const fileName = req.body.blobName;

    // Handle PDF file
    if (fileName.slice(-3).toLowerCase() == 'pdf') {
         // The folder to store the results
        const outputPrefix = 'results'

        // Set up Google Cloud Storage URI for target and result
        const gcsSourceUri = `gs://${bucketName}/${fileName}`;
        const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

        const inputConfig = {
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
        const destinationUri = filesResponse.responses[0].outputConfig.gcsDestination.uri;
        console.log('Json saved to: ' + destinationUri);
        res.end();
    }
    // Hanlde image file
    else {
        const [result] = await client.documentTextDetection(
            `gs://${bucketName}/${fileName}`
        );
        const fullTextAnnotation = result.fullTextAnnotation;
        console.log(fullTextAnnotation.text);
        res.send(fullTextAnnotation.text);
    }
})

module.exports = router;