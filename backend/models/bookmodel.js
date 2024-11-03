const { default: mongoose } = require("mongoose");

const bookschema=mongoose.Schema(
    {

    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishyear:{
        type:Number,
        required:true
    },
},
{
    timestamps:true
}

);

const bookmodel=mongoose.model('bookmodel',bookschema);

module.exports={
    bookmodel
}