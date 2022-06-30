const express = require('express');
const mongoose = require('mongoose');
const port  =  5000;
const app   = express();

const userRouter = require('./api/user')
const bookRouter = require('./api/book')
const authRouter = require('./api/auth')
app.use(express.json())

const MONGO_URL = "mongodb+srv://admin:admin@cluster0.tcjmf.mongodb.net/bookstore?retryWrites=true&w=majority"


mongoose.connect(MONGO_URL).then(()=>console.log("Db Connection Successful")).catch((err)=>{
    console.log(err)
})

app.use("/api/user",userRouter);
app.use("/api/book",bookRouter);
app.use("/",authRouter)



app.listen(port, ()=>{
    console.log('listening on port '+port);
})

