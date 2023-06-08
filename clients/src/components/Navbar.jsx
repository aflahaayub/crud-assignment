import React from "react"
import "@coreui/coreui/dist/css/coreui.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { CNav, CNavItem, CNavLink } from "@coreui/react"

export const Navbar = () => {
  return (
    <CNav>
      <CNavItem>
        <CNavLink href="/list-product">List Product</CNavLink>
      </CNavItem>
      <CNavItem>
        <CNavLink href="/form-product">Form Product</CNavLink>
      </CNavItem>
    </CNav>
  )
}
