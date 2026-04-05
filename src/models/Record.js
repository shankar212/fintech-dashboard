const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to optimize common queries (e.g. dashboard aggregations by user and date)
recordSchema.index({ createdBy: 1, date: -1 });
recordSchema.index({ type: 1 });
recordSchema.index({ category: 1 });

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;
