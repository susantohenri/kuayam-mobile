import { router } from "expo-router";
import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { ApiContext } from "~/contexts/api.context";

export default function SuperadminMenu() {

    const { authenticate } = useContext(ApiContext);

    return (
        <>
            <Button variant="outline" className="mx-auto my-2 w-80" onPress={() => router.push(`/superadmins`)}>
                <Text>Super Admins</Text>
            </Button>
            <Button variant="outline" className="mx-auto my-2 w-80" onPress={() => authenticate(null)}>
                <Text>Logout</Text>
            </Button>
        </>
    )
}