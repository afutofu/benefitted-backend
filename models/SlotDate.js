const mongoose = require("mongoose");

let today = new Date();

const SlotDateSchema = mongoose.Schema({
  // The day pressed by the admin
  day: {
    type: Number,
    required: true,
  },
  // Current month
  month: {
    type: Number,
    default: today.getMonth() + 1,
  },
  // Current year
  year: {
    type: Number,
    default: today.getFullYear(),
  },
});

module.exports = mongoose.model("slotDate", SlotDateSchema);
