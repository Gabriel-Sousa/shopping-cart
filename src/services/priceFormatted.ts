export function priceFormatted(price: number) {
  const formattedNumber = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)

  return formattedNumber
}
