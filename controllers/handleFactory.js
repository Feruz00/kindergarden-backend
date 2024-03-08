const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fs = require('fs')

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    if(doc?.url && fs.existsSync(doc.url)) fs.unlinkSync(doc.url);    
    res.status(204).json({
      status: 'success',
      data: null
    });
});

const deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany();
    doc.forEach(i=>{
      if(i?.url && fs.existsSync(i.url)) fs.unlinkSync(i.url);
    })
    res.status(204).json({
      status: 'success',
      data: null
    });
});

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

const createOne = (Model) => 
  catchAsync(async (req, res, next) => {
    // console.log(req.body)
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).populate(popOptions || []);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc
    });
});

const getAll = (Model, filter, popOptions) =>
  catchAsync(async (req, res, next) => {
    const fil = req.query ? req.query : filter ? filter: {};
    // console.log(req.query)
    const doc = await Model.find(fil).populate(popOptions || [])
    // console.log(popOptions, filter)
    // const doc = await features.query.populate(popOptions || []);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc
    });
  });

const updatePhoto = Model=> catchAsync(
    async (req,res,next)=>{
      // console.log(req.file)
        const {path} = req.file
        await Model.findByIdAndUpdate(req.params.id, {
            url:path
        })

        res.send(req.file)
    }
)
module.exports = { deleteOne, deleteAll, updateOne, createOne, getOne, getAll, updatePhoto };
