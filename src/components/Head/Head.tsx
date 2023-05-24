import { useState, useEffect } from 'react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  createStyles,
  Button,
  Center,
  Container,
  Header,
  Image
} from '@mantine/core';
import {
  IconSun,
  IconMoonStars,
  IconInfoCircle,
  IconUserCheck,
  IconSettings
} from '@tabler/icons-react';
import { ConsensusLogo } from '../../shared/ConsensusLogo';

const useStyles = createStyles((theme) => ({
  root: {
    // backgroundColor: theme.colorScheme === 'dark' ? "#454545" : "#cccccc",
    // borderBottom: theme.colorScheme === 'dark' ? "#333 1px solid": "#ccc 1px solid",
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  }
}));

export function Head() {
  const { classes } = useStyles();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'consensus-colors',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';

  return (
    <>
      <Header
        height={150}
        mb={120}
        className={classes.root}
        style={{
          backgroundColor: dark ? "#181818" : "#fafafa",
          borderBottom: dark ? "#333 1px solid": "#aaa 1px solid"
        }}
        fixed={true}
      >
        <Container className={classes.header} size="xl">
          <Center>
            <ConsensusLogo width={250} />
            <Image maw={240} mx="auto" style={{width: 500, height: 250}} source={require("../../assets/images/logo_500.png")} alt="Random image" />
          </Center>
          <Button variant="outline" color={dark ? 'cyan' : 'dark'} onClick={() => toggleColorScheme()}>
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </Button>
        </Container>
      </Header>
    </>
  );
}
