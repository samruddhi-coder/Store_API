import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  store_name: { type: String, require: true },
  store_email: { type: String, require: true, unique: true },
  store_phone: { type: Number, require: true },
  store_no: { type: Number, require: true, unique: true },
  store_brand: { type: String, require: true },
  store_address: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId },
});

export const Store = mongoose.model("store", storeSchema);
