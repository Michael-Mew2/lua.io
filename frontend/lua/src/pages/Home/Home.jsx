import * as React from "react";
import { Title } from "@mantine/core";
import styles from "./Home.module.css";

import { NavLink, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.home} >
      <h1>
        <b>Discover</b><br/>new tracks.
      </h1>
    </div>
  );
}

/**
 * Route für den Sign-up Button: onClick={() => navigate("/sign-up")}
 * Route für den Sign-in Button: onClick={() => navigate("/sign-in")}
 * Sign-up vor sign-in.
 */
