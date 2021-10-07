const mongoose=require("mongoose");
const validator=require("validator");
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email is already present"],
        validate(value){
            if(!validator.isEmail(value)){
              throw new Error("invalid email");
            }
    }
},
phone:{
    type:Number,
    minlength:10,
    maxlength:10,
    required:true,
    unique:true,


},
address:{
    type:String,
    required:true,
}
      
});
const Student=new mongoose.model("Student",studentSchema);
module.exports=Student;