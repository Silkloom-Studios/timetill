import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function EventDetail() {
  return (
    <View>
      <Text>This is the detail page</Text>
      <View>
        <Link href="..">Go back to Home screen!</Link>
      </View>
    </View>
  );
}
