const mongoose=require('mongoose')
 
const UserSchema=new mongoose.Schema(
    {
        firstname:{type:String,required:true},
        lastname:{type:String,required:true},
        supervisor:{type:String,required:true},
        department:{type:String,required:true},
        username:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true}
    }
)
 
mongoose.model("User",UserSchema)
 