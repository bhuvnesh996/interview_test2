const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
        userId : { type:mongoose.Schema.Types.ObjectId , ref:'User'},
        bookName:{type: String, required: true,unique: true},
        bookPrice:{type: String, required: true},
        authorName:{type: String, required: true},
 },{timestamps: true})

 module.exports =   mongoose.model("Book",bookSchema)