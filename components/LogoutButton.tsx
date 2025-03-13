import { logout } from "~/functions/auth.function";
import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { router } from "expo-router";

export default function LogoutButton() {
    const doLogout = async () => {
        await logout();
        router.navigate(`/login`)
    }

    return (
        <Button onPress={() => doLogout()}>
            <Text>Loogut</Text>
        </Button>
    )
}