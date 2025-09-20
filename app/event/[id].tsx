import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

/*
**
TODO:
1. check if date has passed or is today
  a. show celebration message
  b. handle time calculations
2. check how many years left
  a. months
  b. days
  c. hours
**
*/

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
