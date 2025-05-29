// useHijriDate.js
import { useState } from 'react';

const arabicDigits = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
};

const toArabicNumber = (str) =>
  str.toString().split('').map(d => arabicDigits[d] || d).join('');

export const useHijriDate = (gregDateString) => {
  const [hijriDate, setHijriDate] = useState('');

  const convertDate = () => {
    if (!gregDateString) return;

    const date = new Date(gregDateString);
    const formatter = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const parts = formatter.formatToParts(date);
    const day = toArabicNumber(parts.find(p => p.type === 'day').value);
    const month = parts.find(p => p.type === 'month').value;
    const year = toArabicNumber(parts.find(p => p.type === 'year').value);

    const hijri = `${day} ${month} ${year}`;
    setHijriDate(hijri);
  };

  return [hijriDate, convertDate];
};
