const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
require("dotenv").config;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint to get a sugned upload URL
router.get("/signed-url", rejectUnauthenticated, (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
        timestamp: timestamp,
        upload_preset: process.env.UPLOAD_PRESET
    },
    cloudinary.config().api_secret
  );

  res.json({ // Response (JSON)
    timestamp:timestamp,
    signature: signature,
    cloud_name: cloudinary.config().cloud_name,
    api_key:cloudinary.config().api_key,
    upload_preset: process.env.UPLOAD_PRESET
  });
});

module.exports = router;
