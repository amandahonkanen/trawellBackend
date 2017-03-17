const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username    : {type: String, required: true},
  password    : {type: String, required: true},
  name        : {type: String, required: true},
  role        : {
       required: true,
       type: String,
       enum : ['EXPERT', 'TRAVELER'],
       default : 'EXPERT'
   },

  age: Number,
  interests: String,
  description: String,
  city: Array,
  languages: Array,
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  agendas      : [{ type: Schema.Types.ObjectId, ref: 'Agenda' }],
  image: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
