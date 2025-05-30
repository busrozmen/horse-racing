export const getOrdinalSuffix = (num: number): string => {
  const suffixes = ['th', 'st', 'nd', 'rd']
  const remainder = num % 100
  return suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]
}