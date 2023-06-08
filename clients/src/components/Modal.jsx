import React, { useState, useEffect, useContext } from "react"
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

export const Modal = ({ handleVisible, data, handleClose, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const [dataId, setDataId] = useState("")

  useEffect(() => {
    setVisible(handleVisible)
    setDataId(data._id)
  }, [])

  const handleModal = deleteData => {
    handleClose(false)
    setVisible(false)
    if (deleteData) {
      handleDelete(data)
    }
  }

  return (
    <CModal visible={visible} onClose={() => handleModal(false)}>
      <CModalHeader onClose={() => handleModal(false)}>
        <CModalTitle>Delete Product</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Product dengan nama "{data.nama}" akan dihapus. Apakah kamu yakin?
      </CModalBody>
      <CModalFooter>
        <CButton onClick={() => handleModal(false)} color="secondary">
          No
        </CButton>
        <CButton color="primary" onClick={() => handleModal(true)}>
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
