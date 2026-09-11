const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/** 15000 -> "R$ 15.000,00" */
export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

/** Texto de parcelamento do layout: "ou 2x de R$ 7.500,00 sem juros" */
export function formatInstallments(value: number, installments = 2): string {
  return `ou ${installments}x de ${formatPrice(value / installments)} sem juros`;
}
