const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  datePost: {
    type: String,
    
  }
})

PostSchema.index({ name: 'text', content: 'text' });

const POST = mongoose.model("Post", PostSchema)

module.exports = POST