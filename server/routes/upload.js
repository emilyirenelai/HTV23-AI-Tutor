const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
const { v4: uuidv4 } = require('uuid');

// Instantiate a storage client with credentials
const storage = new Storage({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
  const bucket = storage.bucket(process.env.BUCKET_NAME);

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 25 * 1024 * 1024, // no larger than 5MB
    },
});

router.post("/", multer.single("file"), function(req, res) {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
    
        const extension = req.file.originalname.split('.').pop();
        const blob = bucket.file(uuidv4() + '.' + extension);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
    
        blobStream.on("error", (err) => {
            res.status(500).send({ message: err.message });
        });
    
        blobStream.on("finish", async (data) => {
            res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
                blobName: blob.name,
            });
        });
        blobStream.end(req.file.buffer);
    } 
    catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 25MB!",
            });
        }
    
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
});

module.exports = router;