import React, { useEffect, useState } from "react"
import axios from "axios"
import "@coreui/coreui/dist/css/coreui.min.css"
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react"
import { Navigate, useParams } from "react-router-dom"
export const FormProduct = () => {
  const { id } = useParams()
  const [code, setCode] = useState("")
  const [nama, setNama] = useState("")
  const [deskripsi, setDesc] = useState("")
  const [harga, setHarga] = useState("")
  const [uom, setUOM] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    if (!id) {
      return
    }
    axios.get("/form-product/" + id).then(res => {
      const { data } = res
      setCode(data.code)
      setNama(data.nama)
      setDesc(data.deskripsi)
      setHarga(data.harga)
      setUOM(data.uom)
    })
  }, [id])
  const saveProduct = async e => {
    e.preventDefault()

    const produkDatas = { code, nama, deskripsi, harga, uom }

    if (id) {
      await axios.put("/form-product", { id, ...produkDatas })
    } else {
      await axios.post("/form-product", produkDatas)
    }

    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to={"/list-product"} />
  }
  return (
    <CContainer>
      <h1>Form Produk</h1>
      <CForm
        className="px-5 py-3
      "
        onSubmit={saveProduct}
      >
        {/* Code Product */}
        <CFormInput
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          id="codeProduct"
          label="Code Product"
          placeholder="Code Product"
          required
        />
        {/* Name Product */}
        <CFormInput
          type="text"
          value={nama}
          onChange={e => setNama(e.target.value)}
          id="nameProduct"
          label="Nama Product"
          placeholder="Nama Product"
          required
        />
        {/* Deskripsi Product */}
        <CFormTextarea
          id="deskripsiProduct"
          label="Deskripsi Product "
          rows={3}
          value={deskripsi}
          onChange={e => setDesc(e.target.value)}
          required
        ></CFormTextarea>
        {/* Harga Product */}
        <CCol md={3}>
          <CInputGroup className="my-3">
            <CInputGroupText>Rp.</CInputGroupText>
            <CFormInput
              value={harga}
              onChange={e => setHarga(e.target.value)}
              type="number"
              id="hargaProduct"
              placeholder="Harga Product"
              required
            />
          </CInputGroup>
          {/* UOM (Option) SHEET, ROLL, PCS Product */}
          <CFormSelect
            aria-label="Default select example"
            value={uom}
            onChange={e => setUOM(e.target.value)}
            options={[
              "Open this select menu",
              { label: "SHEET", value: "SHEET" },
              { label: "ROLL", value: "ROLL" },
              { label: "PCS", value: "PCS" },
            ]}
            required
          />
        </CCol>
        <CCol className="mt-3" xs={12}>
          <CButton color="primary" type="submit">
            Submit form
          </CButton>
        </CCol>
      </CForm>
    </CContainer>
  )
}
