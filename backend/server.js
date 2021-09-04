const express = require('express');
const bodyParser = require('body-parser');
//Init Express App
const app = express();

//Config DotENV 
require('dotenv').config();

//Using Middlewares
app.use(express.json());

//DB Config
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017')
        .then(console.log(`Database is connected......`))
        .catch(err => console.log(err));


//Routers
const userRouter = require('./routers/api/user');
app.use('/routers/api/user', userRouter);
 

//Listening to port
let port = process.env.PORT || 3000;
let host = process.env.HOST || 'localhost';
app.listen(port,()=>{ 
    console.log(`Server is running.......`);
    console.log(`Visit: http://${host}:${port}`); 
});