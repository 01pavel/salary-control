export const toRubleFormat = (num: number) =>
  num.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  });
