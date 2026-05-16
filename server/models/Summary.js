import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    facts: {
      type: String,
    },
    issues: {
      type: String,
    },
    decision: {
      type: String,
    },
    ratio: {
      type: String,
    },
    precedents: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Summary", summarySchema);
