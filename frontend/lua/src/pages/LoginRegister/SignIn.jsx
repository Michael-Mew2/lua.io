import * as React from "react";
// import {loginApi} from "../../api/api"
import { AuthContext } from "../../contextx/AuthContext";
import styles from "./SignIn.module.css";

// ----------
import { useNavigate } from "react-router-dom";
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
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

// -----------

export default function signInPage() {

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    }
  })

  // ----- Styling options -----
  const generalGap = "xs";
  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} h={"100%"} spacing="lg">
        {/* Quote-generato */}
        <Center className="" h="100%" p="md" radius="lg">
          <Card className={styles.baseBackground} shadow="sm" p="sm" radius="lg">
            <Blockquote
              color="violet"
              radius="md"
              cite='- Sunrise, Sunset: "Fiddler on the Roof"'
            >
              "I don’t remember growing older, when did they?"
            </Blockquote>
          </Card>
        </Center>

        {/* Sign-In-Form */}
        <Center className="" h="100%" radius="lg">
          <Card
            className={styles.baseBackground}
            w="100%"
            shadow="sm"
            p="md"
            radius="lg"
          >
            <Title order={2} ml="lg" mb="md" c="violet">
              Welcome back
            </Title>
            <Card className={styles.baseBackground} p="md" radius="md">
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
            </Card>
            <Flex direction="column" ml="lg" mr="lg">
              <Flex
                direction="row-reverse"
                align="center"
                justify="space-between"
                mt="lg"
              >
                <Button variant="filled" color="violet">Sign in</Button>
                <Anchor fw={500} c="violet" href="#"  >Forgot your password?</Anchor>
              </Flex>
              <Anchor fw={500} c="violet" href="/sign-up" mt="lg" ta="center">
                Don't have an account? Sign up
              </Anchor>
            </Flex>
          </Card>
        </Center>
      </SimpleGrid>
    </>
  );
}
