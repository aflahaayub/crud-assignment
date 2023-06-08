import { useState } from "react"
import { Route, Routes } from "react-router-dom"

//Components
import { Navbar } from "./components/Navbar"
import { Home } from "./pages/Home"
import { ListProduct } from "./pages/ListProduct"
import { FormProduct } from "./pages/FormProduct"

//api
import axios from "axios"

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list-product" element={<ListProduct />} />
        <Route path="/form-product" element={<FormProduct />} />
        <Route path="/form-product/:id" element={<FormProduct />} />
      </Routes>
    </>
  )
}

export default App
