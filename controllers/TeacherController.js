const Teacher =require( "../models/TeacherModel");

const catchAsync = require("../utils/catchAsync");

const createTeacher = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        const {name, job, description} = req.body
        const data = await Teacher.create({
            name,
            job,
            description,
            url: path
        })
        res.send(data)
    }
)

const updatePhotoTeacher = catchAsync(
    async (req,res,next)=>{
        const {path} = req.file
        await Teacher.findByIdAndUpdate(req.params.id, {
            url:path
        })

        res.send(req.file)
    }
)

module.exports = {createTeacher}