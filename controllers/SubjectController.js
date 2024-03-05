const Subject = require("../models/SubjectModel");
const catchAsync = require("../utils/catchAsync");

const createSubject = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        const {title, description} = req.body
        const data = await Subject.create({
            title,
            description,
            url: path
        })
        res.send(data)
    }
)



module.exports = {
    createSubject
}