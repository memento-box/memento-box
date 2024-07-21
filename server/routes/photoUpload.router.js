const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const router = express.Router();
const pool = require('../modules/pool');
const cloudinary = require('cloudinary').v2;
require('dotenv').config;
const multer = require('multer');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/multer',
  rejectUnauthenticated,
  upload.array('files', 5),
  async (req, res) => {
    // Max of 5 accepted per arg. Can change
    const user = req.user;
    const fileType = req.body.fileType; // This can be generic so you can reuse all this logic for every media type in one component workflow
    try {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'testImages' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
      });

      const results = await Promise.all(uploadPromises);

      results.forEach((file) => {
        sendFileToDB(file, fileType, user);
      });

      res.json({
        message: `Uploading successful for ${fileType} media to Cloudinary:`,
        result: results,
      });
    } catch (error) {
      console.error(`Error uploading ${fileType} media to Cloudinary:`, error);
      res.status(500).json({
        message: `Error uploading ${fileType} media to Cloudinary:`,
        result: error,
      });
    }
  }
);

const sendFileToDB = async (file, fileType, user) => {
  const { box_id, public_id, secure_url } = file;
  const queryText = `
  INSERT INTO "box_item"
    ("box_id", "user_id", "media_url", "media_type", "public_id")
  VALUES
    ($1, $2, $3, $4, $5);
  `;
  // Transform back to your mediaType
  fileType = mediaType.photo;
  const queryValues = [box_id, user.id, secure_url, fileType, public_id];

  try {
    await pool.query(queryText, queryValues);
    return { success: true, status: 201 };
  } catch (error) {
    console.log('Error in Sending a file to DB:', error);
    return { success: false, status: 500, error: error };
  }
};

/************************** FILES (Images) TYPE VARIABLES **************************/
router.get('/files', rejectUnauthenticated, (req, res) => {
  const user_id = req.user.id;
  // You could query just off of fileType/mediaType and use the same posting/viewing logic
  const queryText = `
    SELECT * FROM "box_item" 
    WHERE "media_type" = 1 AND "user_id" = $1;
  `;
  const queryValues = [user_id];

  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error in /GET FILES:', err);
      res.sendStatus(500);
    });
});

/************************** MEDIA TYPE VARIABLES **************************/
const mediaType = {
  // Refers to table in database
  photo: 1,
  video: 2,
  photoLetter: 3,
  textLetter: 4,
  voice: 5,
};

module.exports = router;
