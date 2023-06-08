import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react"
import { Navigate } from "react-router-dom"
export const Modal = ({ handleVisible, data }) => {
  const [visible, setVisible] = useState(false)
  const [deleteData, setDelete] = useState(false)
  const [dataId, setDataId] = useState("")

  useEffect(() => {
    setVisible(handleVisible)
    setDataId(data._id)
  }, [])

  if (deleteData) {
    if (dataId) {
      axios.delete("/list-product/" + dataId).then(res => {
        console.log(res)
        console.log("Deleted product")
      })
    }
    return <Navigate to={"/list-product"} />
  }

  return (
    <CModal visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader onClose={() => setVisible(false)}>
        <CModalTitle>Delete Product</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Product dengan nama "{data.nama}" akan dihapus. Apakah kamu yakin?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={() => setDelete(true)}>
          Hapus
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
