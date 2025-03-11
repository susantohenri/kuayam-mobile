import { Link } from "expo-router";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <>
      <Text>{`Dashboard Screen \n`}</Text>
      <Link href="/users">Goto User List Screen</Link>
    </>
  )
}