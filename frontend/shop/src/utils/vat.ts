export const VAT_RATE = 0.23;
export const SHIPPING_COST = 19.99;

export const roundCurrency = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const getNetFromGross = (grossValue: number) =>
  roundCurrency(grossValue / (1 + VAT_RATE));

export const getVatFromGross = (grossValue: number) =>
  roundCurrency(grossValue - getNetFromGross(grossValue));
