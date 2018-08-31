export function getCurrencyValue(value) { // todo: rename 'formatCurrency'
  if (Number.isNaN(parseFloat(value))) return '...';
  return parseFloat(value).toLocaleString(undefined, { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 });
}