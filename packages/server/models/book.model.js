const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  published: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [String],
});

bookSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model('Book', bookSchema);
