const express = require('express');
const router = express.Router();

const cohere = require('cohere-ai'); 
cohere.init(process.env.COHERE_API_KEY);


router.get('/', async function(req, res, next) {
    // Hit the `generate` endpoint on the `large` model
    const generateResponse = await cohere.generate({
        model: "large",
        prompt: "Once upon a time in a magical land called",
        max_tokens: 50,
        temperature: 1,
    });

    /*
    {
        statusCode: 200,
        body: {
        text: "Eldorado, the anointed monarchs of the ancient world and the ruling family were divided into three kingdoms, each of which was ruled by an individual leader."
        }
    }
    */
});

module.exports = router;