const express = require('express');
const Book = require('../models/Book');
const {
    verifyToken,
    verifyTokenAndAuthorization,

  } = require("./middleware");
  

const route =  express.Router()


route.get('/getall', async (req, res) => {
   
  try {
    let { page, size } = req.query;

    if (!page) {
      page = 1;
  }
  if (!size) {
        size = 10;
    }

    const limit = parseInt(size);

   
    const user = await Book.find().sort(
        { votes: 1, _id: 1 }).limit(limit)
    res.send({
       size,
       page,
      Info: user,
    });
}
catch (error) {
    res.sendStatus(500);
}


})


route.post('/addbook',verifyToken, async (req, res) => {
    const newBook = new Book(req.body)

    try{
        const saveBook= await newBook.save()
        res.status(200).send(saveBook)

    }catch(err){
        res.status(500).json(err)
    }

})


route.put('/:id', verifyToken, async (req, res) => {
    try {
      const updateBook = await Book.findByIdAndUpdate( req.params.id,{$set: req.body,},{ new: true });
      console.log(updateBook)
      res.status(200).json(updateBook);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
route.delete("/del/:id", verifyToken, async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Book has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


 route.get('/author',async (req,res) => {
  try{
    let {author} =  req.query
    const getBook =  await Book.find({authorName:author})
    console.log(getBook,author)
    res.status(200).json(getBook)

  }catch(err){
    res.status(500).json(err);
  }
 }) 
  



module.exports = route