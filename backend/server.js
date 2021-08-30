const express = require('express');

const app = express();

//Config DotENV 
require('dotenv').config();

//DB Config
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI)
        .then(console.log(`Database is connected......`))
        .catch(err => console.log(err));

//Routers


//Listening to port
let port = process.env.PORT || 5000;
let host = process.env.HOST || 'localhost';
app.listen(port,host,()=>{
    console.log(`Server is running.......`);
    console.log(`Visit: http://localhost:${port}`);
});