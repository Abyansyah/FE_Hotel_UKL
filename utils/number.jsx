export const _renderCurrency = (value) => {
  let number = Number(value);
  return number?.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};

export const _renderNumeric = (value, maxFragtionDigits = 0) => {
  let number = Number(value);
  return number?.toLocaleString('id-ID', {
    maximumFractionDigits: maxFragtionDigits,
    minimumFractionDigits: 0,
  });
};
