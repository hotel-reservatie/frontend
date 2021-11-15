const localizedPrice = (price: number, locale: string | undefined) => {
  const currencySign: { [key: string]: string } = {
    nl: '€',
    en: '$',
  }
  const localeStringConfig = { minimumFractionDigits: price % 1 === 0 ? 0 : 2 }
  return `${currencySign[locale ? locale : 'nl']} ${price.toLocaleString(
    locale,
    localeStringConfig,
  )}`
}

export default localizedPrice
