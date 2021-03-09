//importing the necessary packages/modules
const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const cors = require('cors');

//express app
const app= express();

//connecting to mongoDB and then listening for requests on port
const dbConnection=process.env.DBURL || "mongodb+srv://teacher_side:ssad_data@cluster0.8jxlk.mongodb.net/SSAD_Data?retryWrites=true&w=majority";
const port=process.env.PORT || 5000;
mongoose.connect(dbConnection, {useNewUrlParser:true, useUnifiedTopology:true})
.then(result=>{
    console.log(result);
    app.listen(port);
    console.log('listening at port'+port);
})
.catch(err=>console.log(err));

