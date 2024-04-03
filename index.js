const express = require("express");
const port = 8000;
const app = express();

app.use(express.json());
app.use('/', require('./routes'));

app.listen(port, (err)=>{
    if(err){
        return console.log(`Error while running server: ${err}`);
    }
    console.log(`Server is up & running on port: ${port}`);
});