import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
//style
import "@coreui/coreui/dist/css/coreui.min.css"
//components
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CContainer,
} from "@coreui/react"

import { Modal } from "../components/Modal"

export const ListProduct = () => {
  const [products, setProducts] = useState([])
  const [visible, setVisible] = useState(false)
  const [deletedProduk, setDeletedProduk] = useState([])
  const [data, setData] = useState("")

  useEffect(() => {
    axios.get("/list-product").then(res => {
      setProducts([...res.data])
    })
  }, [])

  const passData = data => {
    setVisible(!visible)
    setData(data)
  }

  const handleClose = data => {
    setVisible(data)
  }

  const handleDelete = data => {
    removeProduct(data)
    console.log(data)
  }

  const removeProduct = data => {
    const filterProduk = products.filter(product => {
      return product !== data
    })
    setProducts(filterProduk)

    const deleteProduk = products.filter(product => {
      return product === data
    })
    setDeletedProduk(deleteProduk)
  }

  if (deletedProduk.length !== 0) {
    const { _id } = deletedProduk[0]
    console.log(_id)
    axios.delete("/list-product/" + _id).then(res => {
      console.log(res)
      console.log("Deleted product")
    })
  }

  return (
    <>
      <CContainer>
        <h1 className=" text-justify">List Produk</h1>

        <CTable className="my-3 mx-3">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">No.</CTableHeaderCell>
              <CTableHeaderCell scope="col">Code Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nama Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col">Deskripsi Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col">Harga Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col">UOM Produk</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delete</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {products.length > 0 &&
              products.map((data, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{data.code}</CTableDataCell>
                  <CTableDataCell>{data.nama}</CTableDataCell>
                  <CTableDataCell>{data.deskripsi}</CTableDataCell>
                  <CTableDataCell>{data.harga}</CTableDataCell>
                  <CTableDataCell>{data.uom}</CTableDataCell>
                  <CTableDataCell>
                    <CButton href={`/form-product/${data._id}`} color="info">
                      Edit
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      datas={data}
                      color="danger"
                      onClick={() => passData(data)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
          </CTableBody>
        </CTable>
        {products.length === 0 && <h4>Tidak Ada Data Produk</h4>}
      </CContainer>
      {visible && (
        <Modal
          handleClose={handleClose}
          handleDelete={handleDelete}
          handleVisible={visible}
          data={data}
        />
      )}
    </>
  )
}
