import { Link, router } from "expo-router";
import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { AuthContext } from "~/contexts/auth.context";

export default function SuperadminMenu() {
    const { logout } = useContext(AuthContext);

    return (
        <>
            <Button variant="outline" className="mx-auto my-2 w-80" onPress={() => router.push(`/users`)}>
                <Text>Users</Text>
            </Button>
            <Button variant="outline" className="mx-auto my-2 w-80" onPress={() => logout()}>
                <Text>Logout</Text>
            </Button>
        </>
    )
}