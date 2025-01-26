// server.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require('multer-storage-cloudinary');
require('dotenv').config();

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Multer storage untuk Cloudinary
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'uploads',  // Folder di Cloudinary untuk gambar yang di-upload
  allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
});

const parser = multer({ storage: storage });

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (untuk frontend)
app.use(express.static('public'));

// Endpoint untuk upload gambar
app.post('/upload', parser.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Gambar berhasil di-upload ke Cloudinary
  const imageUrl = req.file.secure_url;  // Dapetin URL gambar yang telah di-upload

  res.status(200).json({
    message: 'File uploaded successfully',
    imageUrl: imageUrl,
  });
});

// Server berjalan di port 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
