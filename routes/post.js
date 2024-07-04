const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema for the post
const postSchema = new Schema({
  imageText: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    type: String
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Array,
    default: [],
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

// Create a model using the schema
module.exports  = mongoose.model('Post', postSchema);
