import React, { useContext, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { AuthContext } from "~/contexts/auth.context";

export default function LoginForm() {
    const [email, setEmail] = useState(``)
    const [password, setPassword] = useState(``)
    const { login } = useContext(AuthContext);

    const doLogin = async () => {
        const { message } = await login(email, password);
        if (message) {
            Alert.alert(
                'Login Failed',
                Array.isArray(message) ? message[0] : message,
                [{
                    text: 'OK',
                    style: 'cancel'
                }]
            );
        }
    }

    return (
        <SafeAreaView className="flex flex-1 min-h-svh w-full items-center justify-center p-6 md:p-10">
            <View className="w-full max-w-sm">
                <View className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                <Text>Login</Text>
                            </CardTitle>
                            <CardDescription>
                                <Text>Enter your email below to login to your account</Text>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <View className="flex flex-col gap-6">
                                <View className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        placeholder="m@example.com"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>
                                <View className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <Button className="w-full" onPress={() => doLogin()}>
                                    <Text>Login</Text>
                                </Button>
                            </View>
                        </CardContent>
                    </Card>
                </View>

            </View>
        </SafeAreaView>
    )
}