import * as React from "react";
import { Button, Group, Title, Typography } from "@mantine/core";
import styles from "./Home.module.css";

import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home}>
      <h1>
        <b>Discover</b>
        <br />
        new tracks.
      </h1>
      <Group>
        <Button
          variant="gradient"
          gradient={{ from: "grape", to: "cyan", deg: 125 }}
          size="lg"
          onClick={() => navigate("/sign-up")}
        >
          Sign up
        </Button>
        <Button variant="outline" color="white" size="lg" onClick={() => navigate("/sign-in")}>
          Sign in
        </Button>
      </Group>
    </div>
  );
}

/**
 * Route für den Sign-up Button: onClick={() => navigate("/sign-up")}
 * Route für den Sign-in Button: onClick={() => navigate("/sign-in")}
 * Sign-up vor sign-in.
 */
