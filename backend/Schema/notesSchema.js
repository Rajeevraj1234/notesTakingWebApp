const {Schema,model} = require('mongoose');

const notesSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minLength:1,
        maxLength:30,
    },
    description:{
        type:String,
        required:true,
    },
    permission:[{
        type:String,
    }],
    visibility:{
        type:String,
        required:true,
    },
})


const Notes = model('notes',notesSchema);


module.exports = Notes;