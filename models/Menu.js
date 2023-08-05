import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    restoranName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", MenuSchema);
