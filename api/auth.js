const express = require('express')
const CryptoJS =  require('crypto-js')
const User = require('../models/User')
const jwt = require("jsonwebtoken");



const route =  express.Router()
const PASS_SEC = "BHANU"
const JWT_SEC = "Bhanu"

route.get('/register',  (req, res) => {
    res.send("I am working")
})

route.post('/register', async (req, res) => {
    const newUser = new User({
        username:req.body.username,
        password:CryptoJS.AES.encrypt(
            req.body.password,
            PASS_SEC
        ).toString(),
    })
    try{
        const savedUser =  await newUser.save();
        res.status(201).json(savedUser)

    }catch(e){
        res.status(500).json(e);

    }
})

route.post('/login', async (req, res) => {
    try{
        const user =  await User.findOne({
            username:req.body.username
        })
        !user && res.status(200).json("Wrong userName")

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            PASS_SEC
        )
        const originalPassword =  hashedPassword.toString(CryptoJS.enc.Utf8);
        const inputPassword = req.body.password
        originalPassword != inputPassword && 
            res.status(401).json("Wrong password")

        const accessToken =  jwt.sign({
            id:user._id
        },JWT_SEC,{expiresIn:'30d'}) 
        const {password,...other}  = user._doc;
        res.status(200).json({...other,accessToken})  
    }catch(e){

    }
})




module.exports = route