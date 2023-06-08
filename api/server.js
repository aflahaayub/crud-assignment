const express = require("express")
const cors = require("cors")

const cookieParser = require("cookie-parser")

const mongoose = require("mongoose")

require("dotenv").config()
const app = express()

mongoose
  .connect("mongodb://127.0.0.1:27017/crud-assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN!")
  })
  .catch(err => {
    console.log("ERROR")
    console.log(err)
  })

const Product = require("./models/ProductSchema")

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
)

//GET / READ DATA PRODUCT
app.get("/list-product", async (req, res) => {
  res.json(await Product.find({}))
})
//GET PRODUCT BY ID
app.get("/form-product/:id", async (req, res) => {
  const { id } = req.params
  res.json(await Product.findById(id))
})

// CREATE
app.post("/form-product", async (req, res) => {
  const { code, nama, harga, deskripsi, uom } = req.body

  Product.create({ code, nama, harga, deskripsi, uom })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      throw err
    })
})
// UPDATE
app.put("/form-product", async (req, res) => {
  const { id, code, nama, harga, deskripsi, uom } = req.body

  const produkDatas = await Product.findById(id)
  if (produkDatas) {
    produkDatas.set({ code, nama, harga, deskripsi, uom })
    await produkDatas.save()
    res.json(produkDatas)
  } else {
    res.json("There is no product with that ID")
  }
})
// DELETE

app.delete("/list-product/:id", async (req, res) => {
  const { id } = req.params
  await Product.findOneAndDelete({ _id: id })
})
app.listen(4000)
