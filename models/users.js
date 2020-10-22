// Schema for Instructor 
var mongoose = require('mongoose');
var contactSchema = mongoose.Schema({
            contactName : {type:String,require: true},
            contactNumber : {type:Number,require: true},
            contactEmail : {type:String,require: true}
}) 

var userSchema = mongoose.Schema({
            username: String,
            email : String,
            password : String,
            contacts : [contactSchema]
})

var user = mongoose.model('GUser',userSchema);
module.exports = user;