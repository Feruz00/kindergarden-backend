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

const app = express()

app.use(express.json())
// app.enable('trust proxy');
app.use(
    helmet()
  );


app.use(cors({
    origin: [process.env.CLIENT],
    credentials: true
}))

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

app.all("*", (req,res)=>{
    return res.status(404).json({
        message: 'Bu sahypa kesgitlenmedik'
    })
})



// app.use(compression())



module.exports = app