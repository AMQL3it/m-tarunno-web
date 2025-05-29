import { useState } from 'react';

const banglaDigits = {
  '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
  '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

const banglaMonthNames = [
  "বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন",
  "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"
];

const monthStarts = [
  [3, 14], [4, 15], [5, 15], [6, 16], [7, 16], [8, 16],
  [9, 17], [10, 16], [11, 16], [0, 15], [1, 13], [2, 15]
];

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

const toBanglaNumber = (str) =>
  str.toString().split('').map(d => banglaDigits[d] || d).join('');

export const useBanglaDate = (gregDateString) => {
  const [banglaDate, setBanglaDate] = useState('');

  const convertDate = () => {
    if (!gregDateString) return;

    const date = new Date(gregDateString);
    const gYear = date.getFullYear();
    let bYear = gYear - 593;
    const isLeap = isLeapYear(gYear);
    let bMonth, bDay;

    for (let i = 11; i >= 0; i--) {
      const [m, d] = monthStarts[i];
      const start = new Date(gYear, m, d);
      if (i === 10 && isLeap) start.setDate(start.getDate() - 1);

      if (date >= start) {
        bMonth = i;
        bDay = Math.floor((date - start) / (1000 * 60 * 60 * 24)) + 1;
        break;
      }
    }

    if (date.getMonth() < 3 || (date.getMonth() === 3 && date.getDate() < 14)) {
      bYear--;
    }

    const banglaText = `${toBanglaNumber(bDay)} ${banglaMonthNames[bMonth]} ${toBanglaNumber(bYear)}`;
    setBanglaDate(banglaText);
  };

  return [banglaDate, convertDate];
};
