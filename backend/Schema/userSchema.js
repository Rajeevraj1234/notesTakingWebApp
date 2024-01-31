const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:30,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        minLength:5,
        maxLength:50,
    },
    password:{
        type:String,
        minLength:8,
        required:true
    },
    notesRef:[{
        type:String,
    }],
})


const User = model('user',userSchema);


module.exports = User;