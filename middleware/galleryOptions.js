const multer = require('multer');
const AppError = require('../utils/appError');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDirectory = './uploads';
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory);
        }
       
      if (file.mimetype.startsWith('image/')) {
        if (!fs.existsSync('./uploads/image')) {
          fs.mkdirSync('./uploads/image');
        }
        cb(null, 'uploads/images');
      } 
      else if (file.mimetype.startsWith('audio/')) {
        if (!fs.existsSync('./uploads/audio')) {
          fs.mkdirSync('./uploads/audio');
        }
        cb(null, 'uploads/audio');
      } else if (file.mimetype.startsWith('video/')) {
        if (!fs.existsSync('./uploads/video')) {
          fs.mkdirSync('./uploads/video');
        }
        cb(null, 'uploads/video');
      } else if (file.mimetype === 'application/pdf') {
        if (!fs.existsSync('./uploads/pdf')) {
          fs.mkdirSync('./uploads/pdf');
        }
        cb(null, 'uploads/pdf');
      } 
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
  
const galleryOptions = multer({ storage: storage });

module.exports = galleryOptions