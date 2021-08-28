const express = require('express');
const user = require('./routers/api/user.js')
const app = express();



app.get('/', (req,res) => {
    res.send('ji');
});

let PORT = 5000
app.listen(PORT,()=>{
    console.log(`Server is running.......`);
    console.log(`Visit: http://localhost:${PORT}`);
})