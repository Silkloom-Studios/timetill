import { parseLocalDateMidnight } from "@/utils/dates";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CountdownProps {
  date: string;
}

type CountdownResult = {
  hasPassed: boolean;
  isToday: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeCountdown(dateString: string, nowDate = new Date()): CountdownResult {
  const target = parseLocalDateMidnight(dateString);

  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerHour = 60 * 60 * 1000;
  const msPerMinute = 60 * 1000;

  const now = new Date(nowDate);
  const hasPassed = now.getTime() >= target.getTime();
  const todayMid = new Date(now);
  todayMid.setHours(0, 0, 0, 0);
  const isToday =
    target.getFullYear() === todayMid.getFullYear() &&
    target.getMonth() === todayMid.getMonth() &&
    target.getDate() === todayMid.getDate();

  if (hasPassed) {
    return { hasPassed: true, isToday, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let temp = new Date(now);

  let remainderMs = target.getTime() - temp.getTime();
  const days = Math.floor(remainderMs / msPerDay);
  remainderMs -= days * msPerDay;
  const hours = Math.floor(remainderMs / msPerHour);
  remainderMs -= hours * msPerHour;
  const minutes = Math.floor(remainderMs / msPerMinute);
  remainderMs -= minutes * msPerMinute;
  const seconds = Math.floor(remainderMs / 1000);

  return { hasPassed: false, isToday, days, hours, minutes, seconds };
}
export default function Countdown({ date }: CountdownProps) {
  const [cdData, setCdData] = useState<CountdownResult | undefined>();

  useEffect(() => {
    setCdData(computeCountdown(date));

    const interval = setInterval(() => {
      setCdData(computeCountdown(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (!cdData) {
    return null;
  }

  const { hasPassed, isToday, days, hours, minutes, seconds } = cdData;

  return (
    <View style={countdownStyles.container}>
      <View style={countdownStyles.countdownWrapper}>
        {hasPassed ? (
          <Text>Event has passed.</Text>
        ) : isToday ? (
          <Text>Event is today!</Text>
        ) : (
          <Text>
            {days}d {hours}h {minutes}m {seconds}s
          </Text>
        )}
      </View>
    </View>
  );
}

const countdownStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  countdownWrapper: {
    padding: 10,
  },
});

// function computeCountdown(dateString: string, nowDate = new Date()): CountdownResult {
//   const target = parseLocalDateTime(dateString);

//   const msPerDay = 24 * 60 * 60 * 1000;
//   const msPerHour = 60 * 60 * 1000;
//   const msPerMinute = 60 * 1000;

//   const now = new Date(nowDate);
//   const hasPassed = now.getTime() >= target.getTime();
//   const todayMid = new Date(now);
//   todayMid.setHours(0, 0, 0, 0);
//   const isToday =
//     target.getFullYear() === todayMid.getFullYear() &&
//     target.getMonth() === todayMid.getMonth() &&
//     target.getDate() === todayMid.getDate();

//   if (hasPassed) {
//     return {
//       hasPassed: true,
//       isToday,
//       // years: 0,
//       // months: 0,
//       days: 0,
//       hours: 0,
//       minutes: 0,
//       seconds: 0,
//     };
//   }

//   let temp = new Date(now);
//   // let years = 0;
//   // while (true) {
//   //   const tryYear = new Date(
//   //     temp.getFullYear() + 1,
//   //     temp.getMonth(),
//   //     temp.getDate(),
//   //     temp.getHours(),
//   //     temp.getMinutes(),
//   //     temp.getSeconds(),
//   //     0
//   //   );
//   //   if (tryYear.getTime() <= target.getTime()) {
//   //     temp = tryYear;
//   //     years++;
//   //   } else {
//   //     break;
//   //   }
//   // }

//   // let months = 0;
//   // while (true) {
//   //   const tryMonth = new Date(
//   //     temp.getFullYear(),
//   //     temp.getMonth() + 1,
//   //     temp.getDate(),
//   //     temp.getHours(),
//   //     temp.getMinutes(),
//   //     temp.getSeconds(),
//   //     0
//   //   );
//   //   if (tryMonth.getTime() <= target.getTime()) {
//   //     temp = tryMonth;
//   //     months++;
//   //   } else {
//   //     break;
//   //   }
//   // }

//   let remainderMs = target.getTime() - temp.getTime();
//   const days = Math.floor(remainderMs / msPerDay);
//   remainderMs -= days * msPerDay;
//   const hours = Math.floor(remainderMs / msPerHour);
//   remainderMs -= hours * msPerHour;
//   const minutes = Math.floor(remainderMs / msPerMinute);
//   remainderMs -= minutes * msPerMinute;
//   const seconds = Math.floor(remainderMs / 1000);

//   return {
//     hasPassed: false,
//     isToday,
//     // years,
//     // months,
//     days,
//     hours,
//     minutes,
//     seconds,
//   };
// }
// export default function Countdown({ date }: CountdownProps) {
//   const [cdData, setCdData] = useState<CountdownResult | undefined>();

//   useEffect(() => {
//     setCdData(computeCountdown(date));

//     const interval = setInterval(() => {
//       setCdData(computeCountdown(date));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [date]);

//   if (!cdData) {
//     return null;
//   }

//   const {
//     hasPassed,
//     isToday,
//     // years,
//     // months,
//     days,
//     hours,
//     minutes,
//     seconds,
//   } = cdData;

//   return (
//     <View style={countdownStyles.container}>
//       <View style={countdownStyles.countdownWrapper}>
//         {hasPassed ? (
//           <Text>Event has passed.</Text>
//         ) : isToday ? (
//           <Text>Event is today!</Text>
//         ) : (
//           <Text>
//             {/* {years > 0 && `${years}y `}
//             {months > 0 && `${months}m `} */}
//             {days}d {hours}h {minutes}m {seconds}s left
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// }

// function parseLocalDateTime(dateString: string): Date {
//   const [y, m, d] = dateString.split("-").map(Number);
//   return new Date(y, m - 1, d, 0, 0, 0, 0);
// }
