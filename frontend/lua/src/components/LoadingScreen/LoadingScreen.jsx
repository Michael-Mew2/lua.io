import * as React from "react";
import classes from "./LoadingScreen.module.css";
import { Box, Center, Container, Title } from "@mantine/core";

export default function LoadingScreen() {
  return (
    <Container w="100%" h="100%" className={classes.baseBackground}>
        <div className={classes.loaderContainer}>
        <div className={classes.loader}></div>
        <div className={classes.loader}></div>
        <div className={classes.loader}></div>
        <div className={classes.loader}></div>
        <div className={classes.loader}></div>
        </div>
      <Center h="100%">
        <Box bg="black" pl="sm" pr="sm" style={{zIndex:"10"}} clr="white">
        <Title order={1} style={{color: "white", fontFamily: '"Intel One Mono", monospace'}}>Loading...</Title>
        </Box>
      </Center>
    </Container>
  );
}
