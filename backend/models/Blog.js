const mongoose = require("mongoose");
const { isURL } = require('validator');

const blogSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  image: urlSchema({ required: false }),
  author: {type: mongoose.Types.ObjectId, required: true},
  createdAt: { type: Date, default: Date.now }
});

function urlSchema (opts = {}) {
    const { required } = opts
    return {
      type: String,
      required: !!required,
      validate: {
        validator: isURL,
        message: props => `${props.value} is not a valid URL`
      }
    }
}

module.exports = mongoose.model("Blog", blogSchema);

