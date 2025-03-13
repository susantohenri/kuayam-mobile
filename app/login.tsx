import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { login } from "~/functions/auth.function";
import { router } from 'expo-router';

export default function Login() {

    const loginUser = async () => {
        await login();
        router.navigate('/');
    }

    return (
        <SafeAreaView>
            <Text>This is login page</Text>
            <Button onPress={() => loginUser()}>
                <Text>Login</Text>
            </Button>
        </SafeAreaView>
    )
}