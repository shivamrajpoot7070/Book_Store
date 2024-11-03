const express=require('express');
const {bookmodel}=require('../models/bookmodel');
const router=express.Router();

// sab jagah /books ke jgh / rahega qki router ko de diye /book
// server.js me check kr lo

// to save  books in database
router.post('/',async(req,res)=>{ 

    try{

        if(!req.body.title ||
            !req.body.author ||
            !req.body.publishyear
        ){
            return res.status(400).send({message:"Please fill all the fields"});
        }


        // creating book using body comning from postman or react
        const newbook={
            title:req.body.title,
            author:req.body.author,
            publishyear:req.body.publishyear
        }

        const book=await bookmodel.create(newbook);  // putting into database
        console.log(book);
        return res.status(201).send(book);
    }

    catch(e){
        console.log(e);
        res.status(500).send({message:e.message})
    }  
})

// to get all books 
// use find function in model to get all the books 
// on route /allbooks

router.get('/',async(req,res)=>{

    try{

    const allbooks=await bookmodel.find({});
    console.log(allbooks);
    return res.status(200).json(allbooks);
    }

    catch(e){
        console.log(e);
        res.status(500).send({message:e.message})
    }
})


// to get book by id

router.get('/:id',async(req,res)=>{

    try{

    const {id}=req.params;  // fetch id from param

    const book=await bookmodel.findById(id);  // now find by id
    console.log(book);
    return res.status(200).json(book);
    }

    catch(e){
        console.log(e);
        res.status(500).send({message:e.message})
    }
})

// update book using put , id and req.body.data

router.put('/:id', async (req, res) => {
    try {
        // Check if all required fields are provided
        if (!req.body.title || !req.body.author || !req.body.publishyear) {
            return res.status(400).send({ message: "Please fill all fields" });
        }

        const { id } = req.params; // Fetch id from params

        // Update the document and return the new document after update
        const result = await bookmodel.findByIdAndUpdate(id, req.body, {
            new: true,            // Return the updated document
            runValidators: true,  // Ensure validators are run on update
        });

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Send the updated document as the response
        return res.status(200).send({message:'book updated succesfully'});

    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: 'book not found with this id' });
    }
});


// delete a book with mongoose
router.delete('/:id',async(req,res)=>{
    try{

        const id=req.params.id;

        const result=await bookmodel.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:'book not found cannot delete'});
        }

        return res.status(200).send({message:'book deleted successfully'});


    }

    catch(e){

        console.log(e.message);
        res.status(500).send({ message: 'book not found with this id so i cant delete' });

    }

})



module.exports={
    router
}