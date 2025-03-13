import { Slot, router, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PortalHost } from '@rn-primitives/portal';
import { useEffect } from "react";
import { getUser } from '~/functions/auth.function';

export default function RootLayout() {
  const [segments] = useSegments();

  useEffect(() => {
    const getCurrentUser = async () => {
      const isLoggedIn = null !== await getUser();
      const isLoginPage = `login` === segments;

      if (isLoggedIn && isLoginPage) router.navigate(`/`);
      if (!isLoggedIn) router.navigate(`/login`);
    }
    getCurrentUser();
  }, [segments])

  return (
    <>
      <StatusBar style="light" />
      <Slot />
      <PortalHost />
    </>
  );
}