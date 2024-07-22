const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const contentRouter = require('./routes/content.router');
const userRouter = require('./routes/user.router');
const uploadRouter = require('./routes/upload.router');
const userInfoRouter = require('./routes/userInfo.router');
const thanksRouter = require('./routes/thanks.router');
const photoUploadRouter = require('./routes/photoUpload.router');
const occasionRouter = require('./routes/occasion.router');
const boxSetupRouter = require('./routes/boxSetup.router'); 

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/userInfo', userInfoRouter);
app.use('/api/thanks', thanksRouter);
app.use('/api/content', contentRouter);
app.use('/api/photoUpload', photoUploadRouter);
app.use('/api/occasion', occasionRouter);
app.use('/api/box-setup', boxSetupRouter); 

// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
