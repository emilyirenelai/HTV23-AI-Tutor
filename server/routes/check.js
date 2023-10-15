const express = require('express');
const router = express.Router();

router.post('/', function(req, res) {
    var spawn = require("child_process").spawn; 
    var process = spawn('/Users/chaunguyen/workspace/HTV23-AI-Tutor/server/assets/bin/python3.9',["../assets/check.py", req.body.usrAns, req.body.boAns]); 
    process.stdout.on('data', function(data) { 
        res.send(data.toString()); 
    }); 
})

module.exports = router;