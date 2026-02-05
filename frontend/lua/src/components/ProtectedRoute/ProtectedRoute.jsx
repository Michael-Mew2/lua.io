import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contextx/AuthContext";
import { LoadingOverlay, Box } from "@mantine/core";

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = React.useContext(AuthContext);

  if (loading) {
    return (
      <Box pos="relative">
        <LoadingOverlay
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "white", type: "bars" }}
        />{" "}
      </Box>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}
