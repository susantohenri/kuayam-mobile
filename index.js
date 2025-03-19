import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { AuthContextProvider } from '~/contexts/auth.context'

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  return (
    <AuthContextProvider>
      <ExpoRoot context={ctx} />
    </AuthContextProvider>
  );
}

registerRootComponent(App);
