const Education = require("../models/EducationModel");
const catchAsync = require("../utils/catchAsync");

const createEducation = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        const {title, description, link} = req.body
        const data = await Education.create({
            title,
            description,
            link,
            url: path
        })
        res.send(data)
    }
)

const updatePhotoEducation = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        await Education.findByIdAndUpdate(req.params.id, {
            url:path
        })

        res.send(req.file)
    }
)



module.exports = {
    createEducation,
    updatePhotoEducation
}