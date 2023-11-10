import mongoose from 'mongoose';

const Blog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isActive: Boolean,
});

export default mongoose.model('Blogs', Blog);
