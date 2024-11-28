import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {AuthProvider} from "../../contextx/AuthContext"

export default function ProtectedRoute() {
  const { isLoggedIn } = AuthProvider();

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
     <Outlet />
  )
}
