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
    },
    avatar:{
        type:String,
        default: "https://www.google.com/imgres?q=profile&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1495088043%2Fvector%2Fuser-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3DdhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fillustrations%2Fprofile&docid=OtbBHgo4pKJUUM&tbnid=JnYbuAB5ppWaIM&vet=12ahUKEwi2g7TO_vaKAxX4VqQEHX5KOeMQM3oECBsQAA..i&w=612&h=612&hcb=2&ved=2ahUKEwi2g7TO_vaKAxX4VqQEHX5KOeMQM3oECBsQAA"
    }
},
 {timestamps:true}
)
let User = mongoose.model('User',userSechmea)
export default User