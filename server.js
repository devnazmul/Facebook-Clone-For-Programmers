const express = require('express');
const app = express();
const mongoose = require('mongoose');

//DB Config
const db = require('./config/keys').mongoURI;
mongoose.connect(db)
        .then(console.log(`Database is connected......`))
        .catch(err => console.log(err));

//Listening to port
let PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running.......`);
    console.log(`Visit: http://localhost:${PORT}`);
});