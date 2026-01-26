import * as React from "react";
import { useNavigate } from "react-router-dom";
import { RegContext } from "../../contextx/RegContext";
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
  TagsInput,
  Checkbox,
  Anchor,
  Blockquote,
  SimpleGrid,
  Stack,
  Badge,
  Avatar,
  Typography
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import styles from "./SignUp.module.css";
import {
  IconAlien,
  IconUniverse,
  IconGalaxy,
  IconMoon,
  IconSun,
  IconAt,
  IconCalendar,
  IconCheck,
  IconLock,
  IconNorthStar,
  IconPlanet,
  IconQuote,
  IconTag,
  IconUser,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import Background from "../../components/Background/Background";
import BackgroundAnimation from "../../components/BackgroundAnimation/BackgroundAnimation";
import { notifications } from "@mantine/notifications";
import { de, pt, en, es, fr, it, ar, hi, cn } from "naughty-words";

// ----------

// Hilfsfunktion

// Legal
const CURRENT_AGB_VERSION = "v1.0.0-2026-01";
const CURRENT_PRIVACY_POLICY_VERSION = "v1.0.0-2026-01";

const allBadWords = [...new Set([...en, ...de, ...fr, ...es, ...it, ...pt])];
const isUsernameOffensive = (username) => {
  const lowerCaseUsername = username.toLowerCase();
  const words = lowerCaseUsername.split(/[\s\-_]+/); // Korrigierter Regex
  return words.some(word => allBadWords.includes(word));
};

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
  "Don't stress me",
];

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
  const [previewData, setPreviewData] = React.useState({
    username: "",
    birthdate: "",
    favoritePlanet: "",
    favoriteColor: "#000000",
    badges: [],
  });

  const [favoritePlanet, setFavoritePlanet] = React.useState("");
  const [favoriteColor, setFavoriteColor] = React.useState("#000000");
  const { registerNewUser } = React.useContext(RegContext);
  const navigate = useNavigate();

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
      badges: [],
      acceptedTerms: false,
      acceptedDataAgreement: false,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (val, values) =>
        val !== values.password ? "Passwords do not match" : null,
      username: (val) => {
        if (!val.trim()) return "Username is required!";
        if (val.length < 3)
          return "All good usernames have at least 3 characters";
        if (val.length > 20)
          return "This field is for your username, not your memoirs";
        if (!/^[a-zA-Z0-9_]+$/.test(val))
          return "Username can only contain letters, numbers, and underscores";
        if (isUsernameOffensive(val))
          return "Your username contains inappropriate content";
        return null;
      },
      birthdate: (val) => {
        if (!val) return "It's very important that you tell us your birthdate!";
        const birthDate = new Date(val);
        const today = new Date();
        const minAge = new Date(
          today.getFullYear() - 16,
          today.getMonth(),
          today.getDate(),
        );
        if (birthDate > today)
          return "Welcome Timetraveler! I'm sure you are old enough in the future to enter, but right now you need to stay outside.";
        if (birthDate > minAge)
          return "You must be at least 16 years old to register!";
        return null;
      },
      favoritePlanet: (val) =>
        !val ? "You have to choose one from the list" : null,
      favoriteColor: (val) =>
        !val ? "I know the selection isn't huge, but please choose one." : null,
      acceptedTerms: (val) =>
        val !== true ? "You must accept the terms and conditions" : null,
      acceptedDataAgreement: (val) =>
        val !== true ? "You must accept the data agreement" : null,
    },
  });

  // ----------

  // Live aktualisierung der Preview

  React.useEffect(() => {
    setPreviewData({
      username: form.values.username,
      birthdate: form.values.birthdate,
      favoritePlanet: form.values.favoritePlanet,
      favoriteColor: form.values.favoriteColor,
      badges: form.values.badges || [],
    });
  }, [form.values]);

  const formatBirthdate = (date) => {
    if (!date) return "";

    const d = new Date(date);
    return `${d.getMonth() + 1}.${d.getDate()}`;
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? "black" : "white";
  };

  const getPlanetIcon = (planet, iconColor) => {
    switch (planet) {
      case "Earth":
        return <IconWorld size={40} color={iconColor} />;

      case "Saturn":
        return <IconPlanet size={40} color={iconColor} />;

      case "Sun (It's not a planet)":
        return <IconSun size={40} color={iconColor} />;

      case "Moon (Also not a planet)":
        return <IconMoon size={40} color={iconColor} />;

      case "I love them all":
        return <IconUniverse size={40} color={iconColor} />;

      case "I hate them all":
        return <IconGalaxy size={40} color={iconColor} />;

      default:
        return <IconAlien size={40} color={iconColor} />;
    }
  };

  // ----------

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
      const resultUsername = form.validateField("username");
      const resultBirthdate = form.validateField("birthdate");

      if (!resultUsername.hasError && !resultBirthdate.hasError) {
        setActive((current) => current + 1);
      }
    } else if (active === 2) {
      const resultPlanet = form.validateField("favoritePlanet");
      const resultColor = form.validateField("favoriteColor");

      if (!resultPlanet.hasError && !resultColor.hasError) {
        setActive((current) => current + 1);
      }
    } else if (active === 3) {
      const resultTerms = form.validateField("acceptedTerms");
      const resultData = form.validateField("acceptedDataAgreement");
      if (!resultTerms.hasError && !resultData.hasError) {
       setActive((current => current +1));
      }
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  // ---------
  // Passwort Anforderungen

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
  // Registrieren:
  const handleRegister = async () => {
    try {
      const userData = {
        email: form.values.email,
        password: form.values.password,
        username: form.values.username,
        birthdate: form.values.birthdate,
        favoritePlanet: form.values.favoritePlanet,
        favoriteColor: form.values.favoriteColor,
        badges: form.values.badges || [],

        agb_accepted_at: new Date().toISOString(),
        agb_version: CURRENT_AGB_VERSION,
        privacy_accepted_at: new Date().toISOString(),
        privacy_version: CURRENT_PRIVACY_POLICY_VERSION,
      };

      await registerNewUser(userData);

      notifications.show({
        title: "Success",
        message: "A verification email has been sent to your email address. Please verify your email to complete the registration.",
        color: "green",
        icon: <IconCheck size={20} />,
      });

      navigate("/sign-in"); // Weiterleitung
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
        icon: <IconX size={20} />,
      });
    }
  };
  // ---------

  const emailIcon = <IconAt size={16} />;
  const generalGap = "xs";

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} h={"100%"} spacing="lg">
        <Stack
          className={styles.form}
          p="md"
          bdrs="lg"
          h={"100%"}
          w={"100%"}
          justify="space-between"
        >
          <Title order={2} ml="sm">
            Welcome to lua.io
          </Title>
          {/* <form onSubmit={handleSignUp}> */}
          <Stepper
            className={styles.formStepper}
            p="sm"
            bdrs="md"
            size="xs"
            radius="md"
            active={active}
            allowNextStepsSelect={false}
          >
            {/* ----- Step 1 ----- */}
            <Stepper.Step>
              <Stack gap={generalGap}>
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
              </Stack>
            </Stepper.Step>
            {/* ----- End of Step 1 ----- */}

            {/* ----- Step 2 ----- */}
            <Stepper.Step>
              {" "}
              {/* label="Step 2" description="Tell me about yourself" */}
              <Stack gap={generalGap}>
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
                  // dropdownType="modal"
                  label="Birthdate"
                  description="Why do you need to enter your Birthdate?"
                  placeholder="Enter your Birthday"
                  leftSection={<IconCalendar size={16} stroke={1.5} />}
                  maxDate={new Date()}
                  {...form.getInputProps("birthdate")}
                />
              </Stack>
            </Stepper.Step>
            {/* ----- End of Step 2 ----- */}

            {/* ----- Step 3 ----- */}
            <Stepper.Step>
              <Stack gap={generalGap}>
                {/* label="Step 3" description="What do you like" */}
                <NativeSelect
                  label="Favorite Planet"
                  withAsterisk
                  leftSection={<IconNorthStar size={16} stroke={1.5} />}
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
                <TagsInput
                  label="Describe yourself"
                  description="Describe yourself with up to 5 badges. Confirm with either 'Enter' or 'Tab'"
                  placeholder="Enter a tag"
                  maxTags={5}
                  data={exampleBadges}
                  clearable
                  leftSection={<IconTag size={16} stroke={1.5} />}
                  {...form.getInputProps("badges")}
                />
              </Stack>
            </Stepper.Step>
            {/* ------ End of Step 3 ----- */}

            {/* ----- Step 4 ----- */}
            <Stepper.Step>
              <Stack gap={generalGap}>
                {" "}
                {/* label="Step 4" description="The legal Stuff" */}
                <Checkbox
                  mt="sm"
                  label={
                    <>
                      I have read and accept the{" "}
                      <Anchor target="_blank" inherit>
                        Terms and Conditions
                      </Anchor>
                    </>
                  }
                  checked={form.values.acceptedTerms}
                  onChange={(event) =>
                    form.setFieldValue(
                      "acceptedTerms",
                      event.currentTarget.checked,
                    )
                  }
                />
                <Checkbox
                  mt="sm"
                  label={
                    <>
                      I have read and accept the{" "}
                      <Anchor target="_blank" inherit>
                        Data agreement
                      </Anchor>
                    </>
                  }
                  checked={form.values.acceptedDataAgreement}
                  onChange={(event) =>
                    form.setFieldValue(
                      "acceptedDataAgreement",
                      event.currentTarget.checked,
                    )
                  }
                />
                <Blockquote color="violet" p="sm" mt="lg">
                  Accepting this is like signing a contract, so please read
                  these contracts carefully!
                </Blockquote>
              </Stack>
            </Stepper.Step>
            {/* ----- End of Step 4 ----- */}

            {/* ----- Step 5 ----- */}
            <Stepper.Step>
              <Stack>
                  <Title order={3}>Almost Done!</Title>
                  <Typography>Please make sure everything is right in order to proceed with your registration.</Typography>
              </Stack>
            </Stepper.Step>
          </Stepper>

          {/* ----- Buttons ----- */}
          <SimpleGrid
            className={styles.buttonsStack}
            cols={{ base: 1, md: 2 }}
            p="sm"
          >
            <Group justify="flex-start">
              {active !== 0 && (
                <Button variant="default" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active < 4 ? (
                <Button variant="filled" color="violet" onClick={nextStep}>
                  Next step
                </Button>
              ) : (
                <Button
                  variant="filled"
                  color="violet"
                  onClick={handleRegister}
                >
                  Submit
                </Button>
              )}
            </Group>
            <Anchor href="/sign-in">Already have an account? Sign in</Anchor>
          </SimpleGrid>
          {/* ----- End of Buttons ----- */}
        </Stack>

        {/* ---------- */}

        {/* right side */}

        <Center className={styles.center} p="md" radius="lg">
          <Card className={styles.card} shadow="sm" p="sm" radius="md">
            <Card.Section h={140}>
              <BackgroundAnimation
                key={previewData.favoriteColor}
                favoriteColor={previewData.favoriteColor}
              />
            </Card.Section>
            <Avatar
              bg={previewData.favoriteColor}
              size={80}
              radius={80}
              mx="auto"
              mt={-30}
              className={styles.avatarPreview}
            >
              {getPlanetIcon(
                previewData.favoritePlanet,
                getContrastColor(previewData.favoriteColor),
              )}
            </Avatar>
            <Text ta="center" fz="lg" fw={500} mt="sm">
              {previewData.username}
            </Text>
            <Text ta="center" c="dimmed" fz="sm">
              {previewData.birthdate &&
                `Birthday: ${formatBirthdate(previewData.birthdate)}`}
            </Text>
            <Group justify="center" mt="md" pl="xl" pr="xl">
              {previewData.badges.map((badge, index) => (
                <Badge
                  key={index}
                  color={colors[index % colors.length].value}
                  variant="filled"
                >
                  {badge}
                </Badge>
              ))}
            </Group>
          </Card>
        </Center>
      </SimpleGrid>
    </>
  );
}
