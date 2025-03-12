import '~/global.css';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { getCurrentUser } from '~/functions/auth.function';
import Login from './login';
import { useEffect, useState } from 'react';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }
    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    hasMounted.current = true;
  }, []);

  const [user, setUser] = useState<String | null>(null);
  useEffect(() => {
    const getUser = async function () {
      setUser(await getCurrentUser())
    }
    getUser();
  }, []);

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <StatusBar style="light" />
      {null !== user ? <Slot /> : <Login />}
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;