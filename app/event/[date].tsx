import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EventDetail() {
  const { date, title, subtitle } = useLocalSearchParams();
  return (
    <View>
      <View>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <Text>{date}</Text>
        <Link href="..">Go back to Home screen!</Link>
      </View>
    </View>
  );
}
