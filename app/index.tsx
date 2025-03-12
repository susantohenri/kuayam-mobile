import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { postLogout } from "~/functions/auth.function";

export default function Screen() {
  return (
    <>
      <Text>{`Dashboard Screen \n`}</Text>
      <Link href="/users">Goto User List Screen</Link>
      <Button onPress={() => postLogout()}>
        <Text>Logout</Text>
      </Button>
    </>
  )
}