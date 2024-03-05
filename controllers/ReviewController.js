const Review = require("../models/ReviewModel");
const catchAsync = require("../utils/catchAsync");

const createReview = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        const {review, name, job} = req.body
        const data = await Review.create({
            name,
            review,
            job,
            url: path
        })
        res.send(data)
    }
)

module.exports = {createReview}