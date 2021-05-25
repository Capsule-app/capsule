import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "• in %s",
    past: "• %s",
    s: "7s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1 month",
    MM: "%d months",
    y: "1y",
    yy: "%dy",
  },
});

export const getPostDate = (d: string): string => {
  var date = dayjs(new Date(Number(d)));

  return `${date.fromNow()}`;
};
