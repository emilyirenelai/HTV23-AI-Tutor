const express = require('express');
const router = express.Router();

const cohere = require('cohere-ai'); 
cohere.init(process.env.COHERE_API_KEY);

router.post('/', async function(req, res, next) {
    const context = req.body.text;
    const prompt = `Write questions based on this lesson: ${context}, giving one question for every main topic. Write an answer on the following line. The format should look like:\nQuestion:\nAnswer:\n\n`

    // Hit the `generate` endpoint on the `command` model
    const generateResponse = await cohere.generate({
        model: "command",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.5,
    });

    console.log(generateResponse.body);

    // Split response into array of questions and answers
    const arr = generateResponse.body.generations[0].text.split('\n').filter(str => str).map(str => str.trim());

    const questionRegex = new RegExp("^Question: ");
    const answerRegex = new RegExp("^Answer: ");
    const questions = arr.filter(function(str) { return questionRegex.test(str); }).map(str => str.slice(10));
    const answers = arr.filter(function(str) { return answerRegex.test(str); }).map(str => str.slice(8));
    res.status(200).send(
        { message: "Success", questions: questions, answers: answers }
    );
});

module.exports = router;