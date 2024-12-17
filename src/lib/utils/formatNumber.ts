import { isNil, min } from "lodash";
import numeral from "numeral";
import BigNumber from "bignumber.js";

export const formatNumberWithNumeral = (
  val: number | string,
  suffix = 4,
): string => {
  try {
    const num = new BigNumber(val);
    if (isNaN(num.toNumber())) return "0.000";

    // Handle very small numbers
    if (num.isLessThanOrEqualTo(1e-7)) {
      return num.toFixed(suffix);
    }

    const format = `0,0.${"0".repeat(suffix)}`;

    return numeral(val).format(format);
  } catch {
    return "0.000";
  }
};

export const truncateFractionAndFormat = (
  parts: Intl.NumberFormatPart[],
  digits: number,
) => {
  return parts
    .map(({ type, value }) => {
      if (type !== "fraction" || !value || value.length < digits) return value;

      let retVal = "";
      for (
        let idx = 0, counter = 0;
        idx < value.length && counter < digits;
        idx++
      ) {
        if (value[idx] !== "0") counter++;

        retVal += value[idx];
      }
      return retVal;
    })
    .reduce((string, part) => string + part);
};

export function formatAmount(
  n: number,
  decimals?: number,
  compactDisplay?: boolean,
  hiddenTrailingZeros = false,
) {
  if (isNil(compactDisplay))
    if (n < 1) decimals = min([decimals, 8]);
    else if (n < 10) decimals = min([decimals, 6]);
    else if (n < 100) decimals = min([decimals, 5]);
    else if (n < 1_000) decimals = min([decimals, 4]);
    else if (n < 10_000) decimals = min([decimals, 3]);
    else if (n < 100_000) decimals = min([decimals, 2]);
    else if (n < 1_000_000) decimals = min([decimals, 1]);
    else if (n < 1_000_000_000) decimals = 0;
    else {
      compactDisplay = true;
      decimals = 1;
    }

  const formatter = new Intl.NumberFormat("en", {
    minimumFractionDigits: hiddenTrailingZeros ? undefined : decimals,
    maximumFractionDigits: decimals,
    notation: compactDisplay ? "compact" : "standard",
  });
  return truncateFractionAndFormat(formatter.formatToParts(n), decimals!);
}

export const formatAirdropAmount = (val: number | string): string => {
  return numeral(val).format("0,0");
};

export const roundDownNumber = (num: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  const roundedNum = Math.floor(num * multiplier) / multiplier;
  return roundedNum;
};

export const roundUpNumber = (num: number, decimals: number): number => {
  const multiplier = Math.pow(10, decimals);
  const roundedNum = Math.ceil(num * multiplier) / multiplier;
  return roundedNum;
};

export const roundNumberDisplay = (num: number, decimals: number): string => {
  const n = roundDownNumber(num, decimals);
  const [integerPart, decimalPart = ""] = `${n}`.split(".");
  const paddedDecimalPart = decimalPart.padEnd(decimals, "0");
  return `${integerPart}${decimals > 0 ? "." : ""}${paddedDecimalPart}`;
};

export const formatNumberWithCommas = (
  number: number,
  decimalPlaces?: number,
) => {
  if (isNaN(number)) {
    return "0";
  }

  const fixedNumber =
    decimalPlaces !== undefined
      ? number.toFixed(decimalPlaces)
      : Math.floor(number).toString();

  if (Math.abs(number) < 1000) {
    return fixedNumber;
  } else {
    return fixedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const formatLargeNumber = (number: number, decimal = true) => {
  const decimalNumber = (n: number) => {
    if (n > 100) return 1;
    if (n > 10) return 2;
    return 3;
  };

  const format = (n: number) =>
    decimal
      ? roundDownNumber(n, decimalNumber(n)).toString()
      : Math.floor(n).toString();

  if (number >= 1000000000) {
    return `${format(number / 1000000000)}B`;
  } else if (number >= 1000000) {
    return `${format(number / 1000000)}M`;
  } else if (number >= 1000) {
    return `${format(number / 1000)}K`;
  } else {
    return format(number);
  }
};

export const formatPoint = (point: number) => {
  if (point > 99999) {
    return formatLargeNumber(point);
  }

  return formatNumberWithCommas(point);
};
