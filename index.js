const express = require('express')
const cors = require('cors')
const compression = require('compression')
const path = require('path')
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const session = require('express-session')
const passport = require('passport');
const User = require('./models/UserModel');
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.enable('trust proxy');
app.use(
    helmet()
  );


app.use(cors({
    origin: [process.env.CLIENT],
    credentials: true
}))

app.get('/uploads/video/:name', (req, res) => {
    const path = `${__dirname}/uploads/video/${req.params.name}`;
    console.log(path)
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});
app.use( '/uploads', express.static( path.join(__dirname, 'uploads')))

app.use(mongoSanitize());

app.use(xss());
app.use(morgan('tiny'))

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser( (user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id)
    return done(null, user)
})



// app.use('/login', limiter);
app.use(
    hpp({
      whitelist: [
        'type',
      ]
    })
);
app.use('/api/education', require('./routes/EducationRoute'))
app.use('/api/teachers', require('./routes/TeacherRoute'))
app.use('/api/reviews', require('./routes/ReviewRoute'))
app.use('/api/subjects', require('./routes/SubjectRoute'))
app.use('/api/galtype', require('./routes/GalleryTypeRoute'))
app.use('/api/gallery', require('./routes/GalleryRoute'))

app.use('/api/auth', require('./routes/AuthRoute'))
app.use('/api/users', require('./routes/UserRoute'))
app.use('/api/about', require('./routes/AboutRoute'))

app.all("*", (req,res)=>{
    return res.status(404).json({
        message: 'Bu sahypa kesgitlenmedik'
    })
})



// app.use(compression())



module.exports = app