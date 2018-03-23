const express=require('express');
const path = require('path');
const bodyparser=require('body-parser');
const cors=require('cors');
const config=require('./config/database');
const mongoose=require('mongoose');

//MongoDB Connection
mongoose.connect(config.connectionstring);

//Message on Successful Connection
mongoose.connection.on('connected',()=>{
    console.log(`Connected to Database at: ${config.connectionstring}`);
})

//Message on Error Connection
mongoose.connection.on('error',(err)=>{
    console.log(`Database Error: ${err}`);
})

//Get Api
const api=require('./routes/api');

const app=express();

//Cors MiddleWare
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser MiddleWare
app.use(bodyparser.json());

//Route for api
app.use('/api',api);

//Port Number
const port=process.env.PORT||3000;

//Server Listening Point
app.listen(port,()=>{
    console.log(`Server Started on Port:${port}`);
})

app.get('/',(req,res)=>{
    res.send("Welcome To Image Scraping");
})


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
})



