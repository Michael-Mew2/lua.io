import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import axiosInstance from "../../api/axiosInstance";
import { Title } from "@mantine/core";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  React.useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`user/verify/${token}`);
        notifications.show({
          title: "Success!",
          message: response.data.msg,
          color: "green",
        });
        navigate("/sign-in");
      } catch (error) {
        notifications.show({
          title: "Error",
          message: error.response?.data?.msg || "Email verification failed",
          color: "red",
        });
        navigate("/sign-in");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      notifications.show({
        title: "Error",
        message: "No verification token provided",
        color: "red",
      });
      navigate('/sign-in');
    }

  }, [token, navigate]);
  return <div>
    <Title order={0}>Verifying your email...</Title>
  </div>;
}
