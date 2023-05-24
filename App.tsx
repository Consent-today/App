import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  createStyles,
  getStylesRef,
  rem,
  useMantineColorScheme,
  ActionIcon,
  Button,
  Center,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  Flex,
  Group,
  // Header,
  // Image,
  List,
  MantineProvider,
  Space,
  Tabs,
  Text
} from '@mantine/core';
import {
  IconSun,
  IconMoonStars,
  IconInfoCircle,
  IconUserCheck,
  IconSettings
} from '@tabler/icons-react';

import { StoryWrapper } from './src/components/StoryWrapper/StoryWrapper';
import { InfoTab } from './src/components/Tabs';
import { Head } from './src/components/Head';

import menu from './src/assets/menu.json';
// console.log(content);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#232323',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
const useStyles = createStyles((theme) => ({
  container: {
    // backgroundColor: '#232323',
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
  },
  lineBreak: {
    whiteSpace: "pre-wrap"
  }
}));

export default function App() {
  const { classes } = useStyles();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'consensus-colors',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<string | null>('info');

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <View style={{width: "100%"}}>
      <StatusBar style="auto" barStyle="dark-content" />

      <Head />

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
          <Tabs value={activeTab} onTabChange={setActiveTab} keepMounted={false}>
            <Container size="xl" fluid={false}>
              <Tabs.List>
                <Tabs.Tab value="info" icon={
                  <IconInfoCircle size="1.1rem" color="gray" />
                } color="gray">About</Tabs.Tab>
                <Tabs.Tab value="app" icon={
                  <IconUserCheck size="1.1rem" color="cyan" />
                }>CONSENT NOW</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="info" pt="xs">
                <StoryWrapper attributes={menu} component={InfoTab} />
              </Tabs.Panel>
              <Tabs.Panel value="app" pt="xs">
                <Group position="center">
                  <Button variant="outline">Danger variant</Button>
                  <Button variant="outline" color={dark ? 'yellow' : 'blue'} onClick={() => toggleColorScheme()}>
                    {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
                    Toggle background color
                  </Button>
                </Group>
              </Tabs.Panel>
            </Container>
          </Tabs>

          <Space h={100} />
        </MantineProvider>
      </ColorSchemeProvider>
    </View>
  );
}
