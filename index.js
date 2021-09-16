const reverseString = (str) => {
  return str.split('').reverse().join('');
};

const isPalindrome = (str) => {
  const reversedStr = reverseString(str);
  if (str === reversedStr) {
    return true;
  } else {
    return false;
  }
};

const dateFromNumberToString = (date) => {
  let dayStr;
  let monthStr;
  let yearStr;
  if (date.day < 10) {
    dayStr = '0' + date.day;
  } else {
    dayStr = date.day.toString();
  }
  if (date.month < 10) {
    monthStr = '0' + date.month;
  } else {
    monthStr = date.month.toString();
  }
  yearStr = date.year.toString();

  return {
    dayStr,
    monthStr,
    yearStr,
  };
};

const allVariationsOfDate = (date) => {
  const dateStr = dateFromNumberToString(date);
  const ddmmyyyy = `${dateStr.dayStr}${dateStr.monthStr}${dateStr.yearStr}`;
  const mmddyyyy = `${dateStr.monthStr}${dateStr.dayStr}${dateStr.yearStr}`;
  const yyyymmdd = `${dateStr.yearStr}${dateStr.monthStr}${dateStr.dayStr}`;
  const ddmmyy = `${dateStr.dayStr}${dateStr.monthStr}${dateStr.monthStr.slice(
    -2
  )}`;
  const mmddyy = `${dateStr.monthStr}${dateStr.dayStr}${dateStr.monthStr.slice(
    -2
  )}`;
  const yymmdd = `${dateStr.monthStr.slice(-2)}${dateStr.monthStr}${
    dateStr.dayStr
  }`;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllVariations = (date) => {
  const arrayOfAllDateVariations = allVariationsOfDate(date);
  let flag = false;
  for (let i = 0; i < arrayOfAllDateVariations.length; i++) {
    if (isPalindrome(arrayOfAllDateVariations[i])) {
      flag = true;
      break;
    }
  }
  return flag;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};

const getNextDate = (date) => {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextPalindromeDate = (date) => {
  let nextDate = getNextDate(date);

  let ctr = 0;

  while (1) {
    ctr++;
    let isPalindrome = checkPalindromeForAllVariations(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
};

const date = {
  day: 31,
  month: 12,
  year: 2020,
};

console.log(getNextPalindromeDate(date));

const dateInput = document.querySelector('#bday-input');
const btn = document.querySelector('#show-btn');
const output = document.querySelector('#result');

const clickHandler = () => {
  const bdayStr = dateInput.value;

  if (bdayStr !== '') {
    let arr = bdayStr.split('-');
    let date = {
      day: Number(arr[2]),
      month: Number(arr[1]),
      year: Number(arr[0]),
    };
    console.log(date);

    let isPalindrome = checkPalindromeForAllVariations(date);
    if (isPalindrome) {
      output.innerText = `Yay! your birthday is a palindrome!!`;
    } else {
      let [ctr, nextDate] = getNextPalindromeDate(date);

      output.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}.You missed it by ${ctr} days`;
    }
  } else {
    output.innerText = `Please enter a date`;
  }
};

btn.addEventListener('click', clickHandler);
