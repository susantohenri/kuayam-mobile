import { Slot } from "expo-router";
import { getCurrentUser } from "~/functions/auth";
import Login from "./login";

export default function RootLayout() {
  const user = getCurrentUser();
  if (!!user) return (<Slot />);
  return <Login />
}