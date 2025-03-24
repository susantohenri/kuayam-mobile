import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { ApiContext } from "~/contexts/api.context";

export default function Users() {
    const { apiGet } = useContext(ApiContext);
    const [users, setUsers] = useState<{
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
    }[] | []>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getUsers() {
            setIsLoading(true);
            const json = await apiGet(`/superadmin?page=1&limit=10&sortBy=id&sortOrder=asc`)
            setIsLoading(false);
            const { message } = json;
            if (message) Alert.alert(``, Array.isArray(message) ? message[0] : message,);
            else setUsers(json.superadmins);
        }
        getUsers();
    }, []);

    return (
        <>
            <Button variant="outline" className="mx-5 my-5" onPress={() => router.push(`/superadmins/form`)}>
                <Text>Add New Super Admin</Text>
            </Button>
            {isLoading ?
                <ActivityIndicator /> :
                <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <Card className='mx-5 mb-2'>
                            <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>{item.email}</CardDescription>
                                <CardDescription>{!!item.status ? `Active` : `Inactive`}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-end">
                                <Button size="sm" variant="outline" onPress={() => router.push(`/superadmins/form?id=${item.id}`)}>
                                    <Text>Edit</Text>
                                </Button>
                            </CardFooter>
                        </Card>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            }
        </>
    );
}