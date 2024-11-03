const express=require("express");
const {PORT}=require("./config");
const app=express();
const mongoose = require("mongoose");
app.use(express.json());
const {bookmodel}=require("./models/bookmodel");
const {router}=require('./routes/bookroutes');
const cors=require('cors');

app.use(cors());


app.use('/books',router);  // to get rid of writing /book in every route

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/bookstore");
  console.log("Connected to MongoDB");
}


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})