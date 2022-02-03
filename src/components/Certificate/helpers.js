import dayjs from "dayjs";

export default function countDuration(startTime, endTime) {
  const startDate = dayjs(startTime);
  const endDate = dayjs(endTime);
  return endDate.diff(startDate, "hour");
}
