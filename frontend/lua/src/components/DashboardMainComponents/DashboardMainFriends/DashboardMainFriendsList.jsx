import * as React from "react";
import classes from "./DashboardMainFriendsList.module.css";
import { Avatar, Container } from "@mantine/core";

export default function DashboardMainFriendsList() {
  return (
    <div className={classes.outerBox}>
      <Container m="md" className={classes.innerBox}>
        <Avatar.Group spacing="sm">
          <Avatar radius="xl" variant="filled" color="blue">
            du
          </Avatar>
          <Avatar radius="xl" variant="filled" color="red">
            mm
          </Avatar>
          <Avatar radius="xl" variant="filled" color="yellow">
            yy
          </Avatar>
          <Avatar radius="xl" variant="filled" color="purple">
            fr
          </Avatar>
          <Avatar radius="xl" variant="filled" color="pink">
            ie
          </Avatar>
          <Avatar radius="xl" variant="filled" color="lime">
            nd
          </Avatar>
          <Avatar radius="xl" variant="filled" color="orange">
            s.
          </Avatar>
          <Avatar radius="xl" variant="filled" color="aqua">
            ab
          </Avatar>
          <Avatar radius="xl" variant="filled" color="brown">
            cd
          </Avatar>
          <Avatar radius="xl" variant="light" >
            +4
          </Avatar>
        </Avatar.Group>
      </Container>
    </div>
  );
}
