const catchAsync = require("../utils/catchAsync");
const { spawn } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path')
const sharp = require('sharp');
const AppError = require("../utils/appError");
const Gallery = require("../models/GalleryModel");
const { load } = require('@pspdfkit/nodejs');
// const fs = require('fs');
const { URL } = require('url');

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
const readFileAsync = promisify(fs.readFile);

const updateGalleryPdf = catchAsync(
    async (req,res,next)=>{
        const data = await Gallery.find();
        data.forEach(async i => {
            try {
                const filePath = path.join(__dirname, '../', i.url);
                const fileURL = new URL('file://' + filePath);
                const docBuffer = await readFileAsync(fileURL);
                // const docBuffer = await readFileAsync( path.join(__dirname, '../',i.url));
                const instance = await load({ document: docBuffer });
                
                const pages = instance.getDocumentInfo().pages;

                let images = [];
                for (let j = 0; j < pages; j++) {
                    const pageWidth = instance.getDocumentInfo().pages[j].width;
                    const result = await instance.renderPage(j, { width: pageWidth });
                    const name = "uploads/converted/" + new Date().toISOString() + "_" + j + ".png";
                    // console.log(name)
                    images.push(name);
                    fs.writeFileSync(name, Buffer.from(result));
                }
                instance.close();
                // console.log(images)
                await Gallery.findByIdAndUpdate(i._id, { images: images || [] });
            } catch (error) {
                console.error('Error processing PDF:', error);
            }
        });
        res.json({ message: 'PDFs processed successfully' });
    }
)
module.exports = {createGallery, updatePicture,updateGalleryPdf }