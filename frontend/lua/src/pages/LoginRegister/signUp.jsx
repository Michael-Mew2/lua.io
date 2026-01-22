import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextx/AuthContext";
import { registerApi } from "../../api/api";
import {
  Grid,
  Container,
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
  Box,
  Button,
  Card,
  Center,
  NativeSelect,
  Radio,
  TagsInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import styles from "./SignUp.module.css";
import {
  IconAt,
  IconCalendar,
  IconCheck,
  IconLock,
  IconNorthStar,
  IconTag,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import Background from "../../components/Background/Background";
import BackgroundAnimation from "../../components/BackgroundAnimation/BackgroundAnimation";

// ----------

// Hilfsfunktion

const planets = [
  "Earth",
  "Saturn",
  "I love them all",
  "I hate them all",
  "Sun (It's not a planet)",
  "Moon (Also not a planet)",
];

const colors = [
  { value: "#FF5733", label: "Red" },
  { value: "#33FF57", label: "Green" },
  { value: "#3357FF", label: "Blue" },
  { value: "#f08716", label: "Orange" },
  { value: "#FF33F3", label: "Pink" },
];

const exampleBadges = [
  "Crazy",
  "I have no idea",
  "Ugly",
  "Looking for cool music",
  "Don't stress me"
]

function PasswordRequirement({ meets, label }) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&§/{}°_+,.:;=?@€#|'<>^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

// ==========

// Eigentliche Funktion
export default function SignUp() {
  const [active, setActive] = React.useState(0);
  const [popoverOpened, setPopoverOpened] = React.useState(false);

  const [favoritePlanet, setFavoritePlanet] = React.useState("");
  const [favoriteColor, setFavoriteColor] = React.useState("#000000");

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      favoritePlanet: "",
      favoriteColor: "#000000",
      birthdate: "",
      acceptedTerms: false,
      acceptedDataAgreement: false,
    },

    validate: {
      // Einfache Regeln pro Feld
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
      username: (val) =>
        active === 1 && val.trim().length < 3 ? "Username too short" : null,
    },
  });

  const nextStep = () => {
    if (active === 0) {
      // Validiert nur Email und Passwörter
      const result = form.validateField("email");
      const resultPw = form.validateField("password");
      const resultConfirm = form.validateField("confirmPassword");

      if (!result.hasError && !resultPw.hasError && !resultConfirm.hasError) {
        setActive((current) => current + 1);
      }
    } else if (active === 1) {
      const result = form.validateField("username");
      if (!result.hasErrors) {
        setActive((current) => current + 1);
      }
    } else {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // ---------
  // Passwort Anforderungen
  const navigate = useNavigate();

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(form.values.password)}
    />
  ));

  const strength = getStrength(form.values.password);
  const strengthColor =
    strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  // ---------

  const emailIcon = <IconAt size={16} />;

  return (
    <>
      <Grid h={"100%"} align="center">
        <Grid.Col span={6} h={"100%"}>
          <Paper className={styles.form} p="md" bdrs="lg" h={"100%"}>
            <Title order={2} className={styles.title}>
              Welcome to lua.io
            </Title>
            {/* <form onSubmit={handleSignUp}> */}
            <Stepper
              size="xs"
              radius="md"
              active={active}
              allowNextStepsSelect={false}
            >
              {/* ----- Step 1 ----- */}
              <Stepper.Step label="Step 1" description="Log-in Credentials">
                <TextInput
                  label="Email"
                  description="Enter your Email"
                  placeholder="beispiel@email.de"
                  withAsterisk
                  leftSection={emailIcon}
                  {...form.getInputProps("email")}
                />
                <Popover
                  opened={popoverOpened}
                  position="bottom"
                  width="target"
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
                        leftSection={<IconLock size={16} stroke={1.5} />}
                        {...form.getInputProps("password")}
                      />
                    </div>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Progress
                      color={strengthColor}
                      value={strength}
                      size={5}
                      mb="xs"
                    />
                    <PasswordRequirement
                      label="Includes at least 6 characters"
                      meets={form.values.password.length > 5}
                    />
                    {checks}
                  </Popover.Dropdown>
                </Popover>
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your Password"
                  withAsterisk
                  {...form.getInputProps("confirmPassword")}
                  leftSection={<IconLock size={16} stroke={1.5} />}
                />
              </Stepper.Step>
              {/* ----- End of Step 1 ----- */}

              {/* ----- Step 2 ----- */}
              <Stepper.Step label="Step 2" description="Tell me about yourself">
                <TextInput
                  label="Username"
                  leftSection={<IconUser size={16} stroke={1.5} />}
                  description="Choose a Unique Username (Be yourself but anonymous, so don't use your real name)"
                  placeholder="Enter your Username"
                  withAsterisk
                  {...form.getInputProps("username")}
                />
                <DatePickerInput
                  clearable
                  withAsterisk
                  dropdownType="modal"
                  label="Birthdate"
                  description="Why do you need to enter your Birthdate?"
                  placeholder="Enter your Birthday"
                  leftSection={<IconCalendar size={16} stroke={1.5} />}
                  {...form.getInputProps("birthdate")}
                />
              </Stepper.Step>
              {/* ----- End of Step 2 ----- */}

{/* ----- Step 3 ----- */}
<Stepper.Step label="Step 3" description="What do you like">
                <NativeSelect
                  withAsterisk
                  leftSection={<IconNorthStar size={16} stroke={1.5} />}
                  label="Favorite Planet"
                  description="Choose your favorite Planet"
                  data={planets}
                  {...form.getInputProps("favoritePlanet")}
                />

                <Radio.Group
                  name="favoriteColor"
                  label="Favorite Color"
                  description="Choose your favorite Color"
                  withAsterisk
                  {...form.getInputProps("favoriteColor")}
                >
                  <Group mt="xs">
                    {colors.map((color) => (
                      <Radio
                        key={color.value}
                        value={color.value}
                        label={color.label}
                        color={color.value}
                        styles={{
                          radio: {
                            borderColor: color.value,
                          },
                          radioIcon: {
                            color: color.value,
                          },
                        }}
                      />
                    ))}
                  </Group>
                </Radio.Group>

                <TagsInput label="Describe yourself" description="Describe yourself with up to 5 badges. Confirm with either 'Enter' or 'Tab'" placeholder="Enter a tag" maxTags={5} data={exampleBadges} clearable leftSection={<IconTag size={16} stroke={1.5} />} />

</Stepper.Step>
{/* ------ End of Step 3 ----- */}

              {/* ----- Step 4 ----- */}
              <Stepper.Step
                label="Step 4"
                description="The legal Stuff"
              ></Stepper.Step>
              {/* ----- End of Step 4 ----- */}
            </Stepper>

            {/* ----- Buttons ----- */}
            <Group justify="flex-end" mt="xl">
              {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
            </Group>
            {/* ----- End of Buttons ----- */}
          </Paper>
        </Grid.Col>

        {/* ---------- */}

        {/* right side */}
        <Grid.Col span={6}>
          <Center className={styles.center} h="100%" p="md" radius="lg">
            <Card className={styles.card} shadow="sm" padding="xs" radius="md">
              <Card.Section
                h={"50%"}
                styling={{ borderRadius: "var(--mantine-radius-md)" }}
              >
                <BackgroundAnimation />
              </Card.Section>
              <Text mt="md" mb="xs">
                Username
              </Text>
            </Card>
          </Center>
        </Grid.Col>
      </Grid>
    </>
  );
}
