const { createAbout, updateAboutImages } = require('../controllers/AboutController');
const { protect } = require('../controllers/AuthController');
const { getAll, updateOne, deleteOne } = require('../controllers/handleFactory');
const { restrictTo } = require('../middleware/restrictTo');
const upload = require('../middleware/uploadOption');
const About = require('../models/AboutUsModel');

const router = require('express').Router()

router.route('/')
    .get(getAll(About))
    .post( protect, restrictTo('admin'), upload.fields([
        {name: 'mainImg', maxCount: 1},
        {name: 'smallImg', maxCount: 1},
    ]), createAbout )

router.use(protect,restrictTo('admin') );
router.route('/:id')
    .put(updateOne(About))
    .patch(upload.fields([
        {name: 'mainImg', maxCount: 1},
        {name: 'smallImg', maxCount: 1},
    ]), updateAboutImages)
    .delete(deleteOne(About))
module.exports = router;