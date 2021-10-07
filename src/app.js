const express=require("express");
const app=express();
app.use(express.json());
const port=process.env.PORT||5000;
 require("./db/conn");
 const Student=require("./models/student");
//app.post("/students",(req,res)=>{
   // console.log(req.body);
    
   
  // user.save().then(()=>{
      
   //}).catch((e)=>{
      
  // })
    
//})
app.post("/students",async(req,res)=>{
    try{
        const user=new Student(req.body);
    const createUser=await user.save();
    res.status(201).send(createUser);
    }
    catch(e){
        res.status(400).send(e)
    }
    

})
app.get("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
       const studentdata=await Student.findById({_id})
       if(!studentdata)
       {
           return res.status(404).send()
       }
       else{
        res.send(studentdata); 
       }
       
          
    }
    catch(e){
       res.status(400).send(e)
    }

})
app.patch("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id
        const update= await  Student.findByIdAndUpdate(_id,req.body,{new:true,
            useFindAndModify:false});
     
    res.status(200).send(update);
    }
    catch(e){
        res.status(400).send(e)
    }
    

})
app.get("/student",async(req,res)=>{
    try{
         const studentdata=await Student.find()
        
     
    res.status(200 ).send(studentdata);
    }
    catch(e){
        res.status(400).send(e)
    }
    

})
app.delete("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const Delete=await Student.findByIdAndDelete(_id);
        if(!_id){
            return res.status(400).send()
        }
        res.send(Delete)
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log(`connection is setup at ${port}`);
})
