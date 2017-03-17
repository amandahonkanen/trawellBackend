const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Request          = require("./request");

const agendaSchema = new Schema({
  request            : {type: Schema.Types.ObjectId, ref: 'Request'},
  user               : {type: Schema.Types.ObjectId, ref: 'User'},
  city               : String,
  day                : Number,
  breakfast1         : String,
  breakfast2         : String,
  breakfast3         : String,
  lunch1             : String,
  lunch2             : String,
  lunch3             : String,
  dinner1            : String,
  dinner2            : String,
  dinner3            : String,
  morningActivity1   : String,
  morningActivity2   : String,
  morningActivity3   : String,
  afternoonActivity1 : String,
  afternoonActivity2 : String,
  afternoonActivity3 : String,
  eveningActivity1   : String,
  eveningActivity2   : String,
  eveningActivity3   : String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Agenda = mongoose.model('Agenda', agendaSchema);
module.exports = Agenda;
