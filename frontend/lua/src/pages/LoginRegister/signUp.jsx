import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextx/AuthContext";
import { registerApi } from "../../api/api";
import {
  Fieldset,
  Group,
  Paper,
  Stepper,
  Title,
  TextInput,
  PasswordInput,
  Popover,
  Progress,
  Text,
  Box
} from "@mantine/core";
import styles from "./SignUp.module.css";
import { IconAt, IconCheck, IconX } from "@tabler/icons-react";

const planets = [
  "Earth",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "It will always be Pluto",
  "I love them all",
  "I hate them all",
];

function PasswordRequirement({meets, label}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{display: "fley", alignItems: "center"}}
      mt={7}
      size="sm"
      >
        {meets ? <IconCheck size={14} /> : <IconX size={14} />}
        <Box ml={10}>{label}</Box>
      </Text>
  )
}

const requirements = [
  {re:/[0-9]/, label:"Includes number"},
  {re:/[a-z]/, label:"Includes lowercase letter"},
  {re:/[A-Z]/, label:"Includes uppercase letter"},
  {re:/[$&+,:;=?@€#|'<>^*()%!-]/, label:"Includes special symbol"},
]

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100/ (requirements.length + 1)) * multiplier, 10)
}

export default function SignUp() {
  const [popoverOpened, setPopoverOpened] = React.useState(false);
  const [value, setValue] = React.useState("");

  const [favoritePlanet, setFavoritePlanet] = React.useState("");
  const [favoriteColor, setFavoriteColor] = React.useState("#000000");

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} met={requirement.re.test(value)} />
  ))

  const strength = getStrength(value);
  const strengthColor = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");
    const profilePic = data.get("favoritePlanet");
    const color = data.get("favoriteColor");
    const birthdate = data.get("birthdate");

    await registerApi(username, email, password, profilePic, color, birthdate);
  };


  const emailIcon = <IconAt size={16} />;

  return (
    <>
      <Group>
        <Paper className={styles.form} p="md" bdrs="lg">
          <Title order={2} className={styles.title}>
            Welcome to lua.io
          </Title>
          <form onSubmit={handleSignUp}>
            <Stepper radius="md" active={0}>
              <Stepper.Step label="Step 1" description="Log-in Credentials">
                <TextInput
                  label="Email"
                  description="Enter your Email"
                  placeholder="beispiel@email.de"
                  withAsterisk
                  leftSection={emailIcon}
                  error="You shall not pass (without entering an Email-address)"
                />
                <Popover
                  opened={popoverOpened}
                  position="bottom"
                  widh="target"
                  transitionProps={{ transition: "pop" }}
                >
                  <Popover.Target>
                    <div
                      onFocusCapture={() => setPopoverOpened(true)}
                      onBlurCapture={() => setPopoverOpened(false)}
                    >
                      <PasswordInput
                        withAsterisk
                        label="Password"
                        placeholder="Enter your Password"
                        value={value}
                        onChange={(event) =>
                          setValue(event.currentTarget.value)
                        }
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress color={strengthColor} value={strength} size={5} mb="xs" />
                    <PasswordRequirement label= "Includes at least 6 characters" meets={value.length > 5} />
                      {checks}
                  </Popover.Dropdown>
                </Popover>
              </Stepper.Step>
              <Stepper.Step
                label="Step 2"
                description="Tell me about yourself"
              ></Stepper.Step>
              <Stepper.Step
                label="Step 3"
                description="The legal Stuff"
              ></Stepper.Step>
            </Stepper>
          </form>
        </Paper>
      </Group>
    </>
  );
}
