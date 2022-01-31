export function formatDateToButtonPattern(dateString) {
  const weekDayTranslator = {
    0: "Domingo",
    1: "Segunda",
    2: "Terça",
    3: "Quarta",
    4: "Quinta",
    5: "Sexta",
    6: "Sábado",
  };

  const unformattedDate = new Date(dateString);
  const weekDay = unformattedDate.getDay();
  const monthDay = unformattedDate.getDate();
  const month = unformattedDate.getMonth();
  return `${weekDayTranslator[weekDay]}, ${monthDay}/${month + 1}`;
}

export function formatHour(dateString) {
  const unformattedDate = new Date(dateString);
  const hour = unformattedDate.getHours();
  const minute = unformattedDate.getMinutes();

  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`;
}

export function getUnique(key, array) {
  const keyValues = array.map(obj => obj[key]);
  const uniqueArr = new Set(keyValues);
  return [...uniqueArr];
}
