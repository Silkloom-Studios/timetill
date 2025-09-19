import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function EventForm() {
  return (
    <View>
      <Text>This is the form page</Text>
      <View>
        <Link href="..">Go back to Home screen!</Link>
      </View>
    </View>
  );
}
