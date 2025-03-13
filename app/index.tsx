import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { logout } from "~/functions/auth.function";
import { Link, router } from 'expo-router';

export default function Screen() {

  const logoutUser = async () => {
    await logout();
    router.navigate('/login');
  }

  return (
    <SafeAreaView>
      <Text>This is dashboard page</Text>
      <Button onPress={() => logoutUser()}>
        <Text>Logout</Text>
      </Button>
      <Link href="/login">Go to login page without logout</Link>
    </SafeAreaView>
  )
}