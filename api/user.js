const express = require('express')

const route =  express.Router()


route.get('/register',  (req, res) => {
    res.send("I am working")
})

module.exports = route