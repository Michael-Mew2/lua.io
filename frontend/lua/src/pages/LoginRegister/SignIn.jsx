import * as React from "react";
// import {loginApi} from "../../api/api"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextx/AuthContext";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

// ----------
// Style imports
import {
  Anchor,
  Card,
  Center,
  Container,
  SimpleGrid,
  Blockquote,
  Title,
  TextInput,
  Stack,
  PasswordInput,
  Flex,
  Button,
  Box,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import styles from "./SignIn.module.css";

// -----------

export default function signInPage() {
  const {loginApi} = React.useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
  });

  // ----- Log-In Function -----
  const handleLogin = async () => {
    try {
      await loginApi(form.values.email, form.values.password);
      notifications.show({
        title: `Welcome back ${response.data.username}`,
        message: `u rock!`,
        color: "green",
        icon: <IconCheck size={20} />,
      });
      navigate("/"); // Weiterleitung
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please Check your credentials"
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon:<IconX size={20} />,
      })
    }
  } 

  // ----- Styling options -----
  const generalGap = "xs";
  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} h={"100%"} spacing="lg">
        {/* Quote-generato */}
        <Center className="" h="100%" p="md" radius="lg">
          <Box
            className={styles.baseBackground}
            shadow="sm"
            p="sm"
            radius="lg"
          >
            <Blockquote
              color="violet"
              radius="md"
              cite='- Sunrise, Sunset: "Fiddler on the Roof"'
            >
              "I don’t remember growing older, when did they?"
            </Blockquote>
          </Box>
        </Center>

        {/* Sign-In-Form */}
        <Center className="" h="100%" radius="lg">
          <Box
            className={styles.baseBackground}
            w="100%"
            shadow="sm"
            p="md"
            radius="lg"
          >
            <Title order={2} ml="lg" mb="md" c="violet">
              Welcome back
            </Title>
            <Box className={styles.baseBackground} p="md" radius="md">
              <Stack gap={generalGap}>
                <TextInput
                  label="Email"
                  description="Enter the emailo adress you registered with"
                  placeholder="john@the-moon.de"
                  withAsterisk
                  radius="sm"
                  leftSection={<IconAt size={16} />}
                />
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  description="The key for new discoveries"
                  withAsterisk
                  radius="sm"
                  mb="sm"
                  leftSection={<IconLock size={16} stroke={1.5} />}
                />
              </Stack>
            </Box>
            <Flex direction="column" ml="lg" mr="lg">
              <Flex
                direction="row-reverse"
                align="center"
                justify="space-between"
                mt="lg"
              >
                <Button variant="filled" color="violet" onClick={handleLogin}>
                  Sign in
                </Button>
                <Anchor fw={500} c="violet" href="#">
                  Forgot your password?
                </Anchor>
              </Flex>
              <Anchor fw={500} c="violet" href="/sign-up" mt="lg" ta="center">
                Don't have an account? Sign up
              </Anchor>
            </Flex>
          </Box>
        </Center>
      </SimpleGrid>
    </>
  );
}
