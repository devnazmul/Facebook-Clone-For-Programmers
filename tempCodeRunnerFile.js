const express = require(`express`);
const user = require(`./routers/api/user.js`);
const app = express();
const mongoose = require(`mongoose`);

//DB Config
                // const db = require('./config/keys').mongoURI;
                // mongoose.connect(db)
                //         .then(console.log(`Database is connected......`))
                //         .catch(err => console.log(err));

//Routes
app.get('/', (req,res) => {
    res.send('ji');
});

//Listening to port
let PORT = 5000
app.listen(PORT,()=>{
    console.log(`Server is running.......`);
    console.log(`Visit: http://localhost:${PORT}`);
});