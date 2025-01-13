import mongoose from 'mongoose'

let userSechmea = new mongoose.Schema({
    username:{
        type:String,
        redquired:true,
       unique:true
    },
    email:{
        type:String,
        redquired:true,
       unique:true
    },
    password:{
        type:String,
        redquired:true
    }
},
 {timestamps:true}
)
let User = mongoose.model('User',userSechmea)
export default User