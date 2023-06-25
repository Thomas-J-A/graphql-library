const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
  },
  born: Number,
});

authorSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Author', authorSchema);
