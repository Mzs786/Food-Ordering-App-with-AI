const mongoose = require('mongoose');

const suggestedItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  recipe: { type: String, default: null },
  image: { type: String, required: true },
  category: { type: String, default: null },
  price: { type: Number, required: true },
  similarity: { type: Number, default: 0 },
  email: { type: String, required: true },
});

const suggesteditems = mongoose.model("suggested_items", suggestedItemSchema);

module.exports = suggesteditems;