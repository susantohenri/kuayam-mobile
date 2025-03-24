import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useContext, useEffect } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { ApiContext } from "~/contexts/api.context";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";

export default function FormSuperAdmin() {
    const [name, setName] = useState(``)
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const [status, setStatus] = useState(`1`);
    const [isLoading, setIsLoading] = useState(false);
    const { apiPost, apiGet, apiPut } = useContext(ApiContext);

    const { id } = useLocalSearchParams();
    useEffect(() => {
        async function fetchUser() {
            if (isLoading) return false;
            setIsLoading(true);
            const json = await apiGet(`/superadmin/${id}`)
            setIsLoading(false);
            const { message } = json;
            if (message) {
                Alert.alert(
                    ``,
                    Array.isArray(message) ? message[0] : message,
                );
            } else {
                setName(json.name)
                setEmail(json.email)
                setStatus(!!json.status ? `1` : `0`)
            }
        }
        !!id && fetchUser();
    }, []);

    const createSuperAdmin = async () => {
        if (isLoading) return false;
        setIsLoading(true);
        const json = await apiPost(`/superadmin`, { name, email, password, status: `1` === status })
        setIsLoading(false);
        const { message } = json;
        if (message) {
            Alert.alert(
                ``,
                Array.isArray(message) ? message[0] : message,
            );
        } else router.replace(`/superadmins`)
    }

    const updateSuperAdmin = async () => {
        if (isLoading) return false;
        setIsLoading(true);
        const user: { name: string, email: string, status: boolean; password?: string; } = { name, email, status: `1` === status }
        if (`` !== password) user.password = password;
        const json = await apiPut(`/superadmin/${id}`, user)
        setIsLoading(false);
        const { message } = json;
        if (message) {
            Alert.alert(
                ``,
                Array.isArray(message) ? message[0] : message,
            );
        } else router.replace(`/superadmins`)
    }

    return (
        <View className="mx-5 mt-10">
            <View>
                <Label className="ml-2">Name</Label>
                <Input
                    className="my-3"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View>
                <Label className="ml-2">Email</Label>
                <Input
                    className="my-3"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View>
                <Label className="ml-2">Password</Label>
                <Input
                    className="my-3"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <View>
                <Label className="ml-2">Status</Label>
                <Select value={{ value: status, label: `1` === status ? `Active` : `Inactive` }} className="my-3" onValueChange={(value: any) => setStatus(value.value)}>
                    <SelectTrigger>
                        <SelectValue
                            className='text-foreground text-sm native:text-lg'
                            placeholder='Select a status'
                        />
                    </SelectTrigger>
                    <SelectContent className="w-11/12">
                        <SelectGroup>
                            <SelectItem label='Active' value='1'>
                                Active
                            </SelectItem>
                            <SelectItem label='Inactive' value='0'>
                                Inactive
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </View>
            <View className="mt-10">
                {isLoading ?
                    <ActivityIndicator /> :
                    <Button className="w-full" onPress={() => !!id ? updateSuperAdmin() : createSuperAdmin()}>
                        <Text>Save</Text>
                    </Button>
                }
            </View>
        </View>
    )
}