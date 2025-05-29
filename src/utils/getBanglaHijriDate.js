// utils/getBanglaHijriDate.js

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর
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

const toBanglaNumber = (str) =>
  str
    .toString()
    .split("")
    .map((d) => banglaDigits[d] || d)
    .join("");

// হিজরি মাসের বাংলা অনুবাদ
const banglaHijriMonths = {
  Muharram: "মুহাররম",
  Safar: "সফর",
  "Rabiʻ I": "রবিউল আউয়াল",
  "Rabiʻ II": "রবিউস সানি",
  "Jumada I": "জুমাদাল উলা",
  "Jumada II": "জুমাদাল সানি",
  Rajab: "রজব",
  Shaʻban: "শাবান",
  Ramadan: "রমজান",
  Shawwal: "শাওয়াল",
  "Dhuʻl-Qiʻdah": "জিলক্বদ",
  "Dhuʻl-Hijjah": "জিলহজ্ব",
};

/**
 * ইংরেজি তারিখ থেকে বাংলা হিজরি তারিখ রিটার্ন করে
 * @param {string | Date} gregDate ইংরেজি তারিখ (YYYY-MM-DD ফরম্যাটে string বা Date অবজেক্ট)
 * @returns {string} বাংলা হিজরি তারিখ (যেমনঃ "১৫ রমজান ১৪৪৬")
 */
export const getBanglaHijriDate = (gregDate) => {
  if (!gregDate) return "";

  const date = typeof gregDate === "string" ? new Date(gregDate) : gregDate;

  const formatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const dayEn = parts.find((p) => p.type === "day")?.value || "";
  const monthEn = parts.find((p) => p.type === "month")?.value || "";
  const yearEn = parts.find((p) => p.type === "year")?.value || "";

  const day = toBanglaNumber(dayEn);
  const month = banglaHijriMonths[monthEn] || monthEn;
  const year = toBanglaNumber(yearEn);

  return `${day} ${month} ${year}`;
};
