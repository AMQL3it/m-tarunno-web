// utils/getBanglaDate.js

const banglaDigits = {
  0: "০",
  1: "১",
  2: "২",
  3: "৩",
  4: "৪",
  5: "৫",
  6: "৬",
  7: "৭",
  8: "৮",
  9: "৯",
};

const banglaMonthNames = [
  "বৈশাখ",
  "জ্যৈষ্ঠ",
  "আষাঢ়",
  "শ্রাবণ",
  "ভাদ্র",
  "আশ্বিন",
  "কার্তিক",
  "অগ্রহায়ণ",
  "পৌষ",
  "মাঘ",
  "ফাল্গুন",
  "চৈত্র",
];

const monthStarts = [
  [3, 14],
  [4, 15],
  [5, 15],
  [6, 16],
  [7, 16],
  [8, 16],
  [9, 17],
  [10, 16],
  [11, 16],
  [0, 15],
  [1, 13],
  [2, 15],
];

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

const toBanglaNumber = (str) =>
  str
    .toString()
    .split("")
    .map((d) => banglaDigits[d] || d)
    .join("");

const getDateDifferenceInDays = (d1, d2) => {
  const date1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const date2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
};

export function getBanglaDate(gregDateInput) {
  if (!gregDateInput) return "";

  const date = new Date(gregDateInput);
  const gYear = date.getFullYear();

  const bYear = date >= new Date(gYear, 3, 14) ? gYear - 593 : gYear - 594;
  const isLeap = isLeapYear(gYear);

  let bMonth = 0;
  let bDay = 0;

  for (let i = 0; i < 12; i++) {
    const [startM, startD] = monthStarts[i];
    const [nextStartM, nextStartD] = monthStarts[(i + 1) % 12];

    const start = new Date(gYear, startM, startD);
    const next = new Date(gYear, nextStartM, nextStartD);

    if (i === 10 && isLeap) start.setDate(start.getDate() - 1); // ফাল্গুন কমে যাবে
    if (i === 11) {
      // চৈত্র মাস, পরের মাস হলে বছর বাড়াতে হবে
      next.setFullYear(next.getFullYear() + 1);
    }

    if (date >= start && date < next) {
      bMonth = i;
      bDay = getDateDifferenceInDays(date, start) + 1;
      break;
    }
  }

  return `${toBanglaNumber(bDay)} ${banglaMonthNames[bMonth]} ${toBanglaNumber(
    bYear
  )}`;
}
