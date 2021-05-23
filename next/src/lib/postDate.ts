import dayjs from "dayjs";

export const getPostDate = (d: string): string => {
  var date = dayjs(new Date(Number(d)));

  if (date.format("D") === String(new Date().getDate()))
    return `Today at ${date.format("h:mm a")}`;

  if (date.format("D") === String(new Date().getDate() - 1))
    return `Yesterday at ${date.format("h:mm a")}`;

  return `${date.format("MMM D")}`;
};
