import { useState, useEffect } from 'react';
// import DOMParser from 'react-native-html-parser';
// import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
// import remarkHtml from 'remark-html'
import remarkImages from 'remark-images'
import { Remark } from 'react-remark';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

import README from '../../../README.md';

import {
  Button,
  ColorScheme,
  ColorSchemeProvider,
  Flex,
  Space,
  Tabs,
} from '@mantine/core';
import {
  IconSun,
  IconMoonStars,
  IconInfoCircle,
  IconUserCheck,
  IconSettings
} from '@tabler/icons-react';


export function InfoTab() {
  // const { classes } = useStyles();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'consensus-colors',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const dark = colorScheme === 'dark';
  const [activeTab, setActiveTab] = useState<string | null>('info');
  const [readmeTxt, setReadmeTxt] = useState('');

  useEffect(() => {
    fetch(README).then(res => res.text()).then(text => setReadmeTxt(text))
  })

  return (
    <>
      <Remark
        remarkPlugins={[remarkBreaks, remarkImages]}
        remarkToRehypeOptions={{ allowDangerousHtml: false }}
        rehypeReactOptions={{
          components: {
            p: (props) => <p className="custom-paragraph" {...props} />,
          },
        }}
      >
        {readmeTxt}
      </Remark>
      <Space h={100} />
      <Flex
        mih={50}
        gap="xl"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button variant="outline" color="cyan" onClick={() => setActiveTab('app')} leftIcon={
          <IconUserCheck size="1.1rem" />
        }>CONSENT NOW</Button>
      </Flex>
    </>
  );
}
