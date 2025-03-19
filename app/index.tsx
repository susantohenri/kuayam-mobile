import { SafeAreaView } from "react-native-safe-area-context";
import SuperadminMenu from "~/components/SuperadminMenu";

export default function RootIndex() {
  return (
    <SafeAreaView>
      <SuperadminMenu />
    </SafeAreaView>
  );
}