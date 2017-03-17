const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const reviewSchema = new Schema({
  	stars: Number,
  	evaluation: String,
    date: Date,
    request: { type: Schema.Types.ObjectId, ref: 'Request' },
    expert: { type: Schema.Types.ObjectId, ref: 'User' },
    traveler: { type: Schema.Types.ObjectId, ref: 'User' }
	}, {
  	timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
	}
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Rating;
