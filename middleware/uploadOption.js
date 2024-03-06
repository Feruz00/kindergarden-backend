const multer = require('multer');
const AppError = require('../utils/appError');
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.mimetype.startsWith('image/')) {
        const uploadDirectory = './uploads';
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }
        if (!fs.existsSync('./uploads/image')) {
          fs.mkdirSync('./uploads/image');
        }
      
        cb(null, 'uploads/images');
      } 
      // else if (file.mimetype.startsWith('audio/')) {
      //   cb(null, 'uploads/audio');
      // } else if (file.mimetype.startsWith('video/')) {
      //   cb(null, 'uploads/video');
      // } else if (file.mimetype === 'application/pdf') {
      //   cb(null, 'uploads/pdf');
      // } else if (
      //   file.mimetype ===
      //   'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      // ) {
      //   cb(null, 'uploads/pptx');
      // } else if (
      //   file.mimetype ===
      //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      // ) {
      //   cb(null, 'uploads/docs');
      // } 
      else {
        // For unsupported file types
        cb(new AppError('Invalid file type', 401));
      }
    },
    filename: function (req, file, cb) {
      // Generate a unique filename
      cb(null, Date.now() + '-' + file.originalname);
    }
});
  
const upload = multer({ storage: storage });

module.exports = upload