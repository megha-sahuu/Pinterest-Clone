const mongoose = require('mongoose');
const plm=require("passport-local-mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/pinterestt");
// Create a schema for the user
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  dp: {
    type: String, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

userSchema.plugin(plm);
module.exports= mongoose.model('User', userSchema);
