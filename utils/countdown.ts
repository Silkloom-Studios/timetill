import { Colors } from "@/constants/theme";
import { parseLocalDateMidnight } from "./dates";

const msPerDay = 24 * 60 * 60 * 1000;
const msPerHour = 60 * 60 * 1000;
const msPerMinute = 60 * 1000;

export type CountdownResult = {
  hasPassed: boolean;
  isToday: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function computeCountdown(dateString: string, nowDate = new Date()): CountdownResult {
  const target = parseLocalDateMidnight(dateString);

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

export type DaysLeftResult = {
  hasPassed: boolean;
  isToday: boolean;
  days: number;
};

export function computeDaysLeft(dateString: string, nowDate = new Date()): DaysLeftResult {
  const target = parseLocalDateMidnight(dateString);

  const now = new Date(nowDate);
  const hasPassed = now.getTime() >= target.getTime();
  const todayMid = new Date(now);
  todayMid.setHours(0, 0, 0, 0);
  const isToday =
    target.getFullYear() === todayMid.getFullYear() &&
    target.getMonth() === todayMid.getMonth() &&
    target.getDate() === todayMid.getDate();

  if (hasPassed) {
    return { hasPassed: true, isToday, days: 0 };
  }

  let temp = new Date(now);
  let remainderMs = target.getTime() - temp.getTime();
  const days = Math.floor(remainderMs / msPerDay);

  return { hasPassed: false, isToday, days };
}

export const resolveDateWidgetOptions = (dateData: DaysLeftResult | CountdownResult) => {
  let status = "future";
  if (dateData.hasPassed && !dateData.isToday) {
    status = "past";
  } else if (dateData.isToday) {
    status = "today";
  } else if (dateData.days === 0) {
    status = "tomorrow";
  }
  return status;
};

export const resolveNumberStyleBasedOnDigits = (daysLeft: number) => {
  const base = { color: Colors.text, fontSize: 64 };
  if (daysLeft <= 0) return { ...base, color: Colors.red };

  const digits = daysLeft.toString().length;
  const sizeMap = [64, 64, 54, 40, 32, 28];
  const fontSize = sizeMap[Math.min(digits - 1, sizeMap.length - 1)];
  return { ...base, fontSize };
};

export const formatDaysLeft = (daysLeft: number) => {
  const str = daysLeft.toString();
  return str.length > 4 ? "9999+" : str;
};
