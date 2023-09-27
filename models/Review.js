const { Schema, models, model } = require('mongoose');

const reviewSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId },
    title: String,
    description: String,
    stars: Number,
  },
  { timestamps: true }
);

export const Review = models?.Review || model('Review', reviewSchema);
