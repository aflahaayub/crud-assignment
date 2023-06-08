import React from "react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { CNav, CNavItem, CNavLink } from "@coreui/react"

export const Navbar = () => {
  return (
    <CNav className="m-2">
      <CNavItem>
        <CNavLink href="/list-product">List Produk</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="/form-product">Tambah Produk Baru</CNavLink>
      </CNavItem>
    </CNav>
  )
}
