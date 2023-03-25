const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("../../middleware/auth");

const SlotDate = require("../../models/SlotDate");

// @route   GET /api/slotDate/:year/:month
// @desc    Get all slot dates in year and month
// @access  Private
router.get("/:year/:month", (req, res) => {
  const { year, month } = req.params;

  // Find all slot dates within the given year and month
  SlotDate.find(
    {
      year,
      month,
    },
    (err, foundSlotDates) => {
      if (err)
        return res.status(500).json({ msg: "Error retreiving slot dates" });

      res.send(foundSlotDates);
    }
  );
});

// @route   POST /api/slotDate
// @desc    Book a slot date
// @access  Private
router.post("/", auth, (req, res) => {
  const { year, month, day } = req.body;

  // Find slot date if exists
  SlotDate.findOne({ year, month, day }, (err, foundSlotDate) => {
    if (err) return res.status(500).json({ msg: "Error finding slot date" });

    // If exists, send an error message notifying that the slot is already booked
    if (foundSlotDate)
      return res
        .status(400)
        .json({ msg: "The slot is already booked for that date" });

    // Create a new slot date for the day
    const newSlotDate = new SlotDate({ day });

    newSlotDate.save((err) => {
      if (err)
        return res.status(500).json({ msg: "Could not create new slot date" });

      res.send(newSlotDate);
    });
  });
});

// @route   DELETE /api/slotDate/:year/:month/:day
// @desc    Delete slot date
// @access  Private
router.delete("/:year/:month/:day", auth, (req, res) => {
  const { year, month, day } = req.params;

  // Find an delete slot date
  SlotDate.deleteOne({ year, month, day }, (err, deletedSlotDate) => {
    if (err)
      return res.status(500).json({ msg: "Error in deleting slot date" });

    res.send(deletedSlotDate);
  });
});

module.exports = router;
