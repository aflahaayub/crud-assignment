import React, { useState, useEffect } from "react"
import axios from "axios"
import "@coreui/coreui/dist/css/coreui.min.css"
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react"
import { Modal } from "../components/Modal"
export const ListProduct = () => {
  const [products, setProducts] = useState([])
  const [visible, setVisible] = useState(false)
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

  return (
    <>
      <CContainer>
        <h1 className="align-items-center">List Produk</h1>
        {products.length === 0 && <h3>Tidak Ada Data Product</h3>}
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
      </CContainer>
      {data && <Modal handleVisible={visible} data={data} />}
    </>
  )
}
