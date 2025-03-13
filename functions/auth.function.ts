import * as SecureStore from 'expo-secure-store';

export async function getUser() {
    return await SecureStore.getItemAsync(`user`);
}

export async function login() {
    const user = {
        name: `henri`,
        roleId: 12
    }
    await SecureStore.setItemAsync(`user`, JSON.stringify(user));
}

export async function logout() {
    await SecureStore.deleteItemAsync(`user`);
}