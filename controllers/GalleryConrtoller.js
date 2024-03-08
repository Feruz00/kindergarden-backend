const catchAsync = require("../utils/catchAsync");
const { spawn } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const sharp = require('sharp');
const AppError = require("../utils/appError");
const Gallery = require("../models/GalleryModel");

const exec = promisify(require('child_process').exec);

const createGallery = catchAsync(
    async (req, res, next)=>{
        const {picture, file} = req.files
        const picturePath = picture[0].path
        const filePath = file[0].path
        // console.log(filePath, picturePath)
        const {title, type,author} = req.body
        const data = await Gallery.create({
            title, type, 
            author,
            picture: picturePath,
            url: filePath
        })
        res.send(data)

    }
)

const updatePicture = catchAsync(
    async (req, res, next)=>{
        const {path} = req.file
        
        const data = await Gallery.findByIdAndUpdate(req.params.id,{
            picture: path
        })
        res.send(data)

    }
)

module.exports = {createGallery, updatePicture}