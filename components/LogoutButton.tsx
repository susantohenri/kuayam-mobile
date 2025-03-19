import { Button } from "./ui/button";
import { Text } from "./ui/text";
import { useContext } from "react";
import { AuthContext } from "~/contexts/auth.context";

export default function LogoutButton() {
    const { logout } = useContext(AuthContext);
    return (
        <Button onPress={() => logout()}>
            <Text>Loogut</Text>
        </Button>
    )
}