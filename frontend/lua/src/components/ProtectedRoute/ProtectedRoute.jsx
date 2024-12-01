import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthContext} from "../../contextx/AuthContext"

export default function ProtectedRoute() {
  const { isLoggedIn } = React.useContext(AuthContext)

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
     <Outlet />
  )
}
