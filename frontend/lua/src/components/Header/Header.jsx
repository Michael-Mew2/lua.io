import { useState } from "react";
import { Anchor, Burger, Container, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from "./Header.module.css";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export default function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Anchor href="/" className={classes.logo}>
          <Group gap={1}>
            <Image
              src="./icons/Tononónimo-icon-solo.svg"
              h={40} // Festgelegte Höhe in Pixeln (verhindert Springen beim Laden)
              w="auto" // Breite passt sich automatisch dem Seitenverhältnis an
              fit="contain" // Sorgt dafür, dass das SVG sauber skaliert
              alt="Tononónimo Logo"
            />
            <b fs={36}>Tononónimo</b>
          </Group>
        </Anchor>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
