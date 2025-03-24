import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { ApiContextProvider } from '~/contexts/api.context'


// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  return (
    <ApiContextProvider>
      <ExpoRoot context={ctx} />
    </ApiContextProvider>
  );
}

registerRootComponent(App);
