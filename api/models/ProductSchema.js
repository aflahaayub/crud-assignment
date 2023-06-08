const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  uom: {
    type: String,
    enum: ["SHEET", "ROLL", "PCS"],
    required: true,
  },
})

module.exports = mongoose.model("Product", ProductSchema)
