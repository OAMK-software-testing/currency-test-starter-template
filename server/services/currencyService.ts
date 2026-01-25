import { calculateConversion } from '../utils/convert'

// Read api from .env or use default value, if env has no value.
const FRANKFURTER_API = process.env.FRANKFURTER_API || 'https://api.frankfurter.app/latest'

/**
 * Convert function call API for real-time exchange rate and uses pure function to calculate conversion.
 * 
 * @param from string Code for source currency.
 * @param to string Code for target currency.
 * @param amount number Amount to be converted for source currency.
 * @returns object with amount property
 */
export const convert = async (from: string, to: string, amount: number): Promise<{ amount: number }> => {
  try {
    const { rate } = await fetchRate(from,to)
    const result = calculateConversion(amount,rate)
    return { amount: result }
  } catch (error) {
    throw Error(error instanceof Error ? error.message : 'Error calculating conversion.')
  }
}

/**
 * Fetch exchange rate from Frankfurter API for given currencies.
 * 
 * @param from string Code for source currency.
 * @param to string Code for target currency.
 * @returns object with rate property
 */
const fetchRate = async(from: string, to:string): Promise<{ rate: number }> => {
  const response = await fetch(`${FRANKFURTER_API}?from=${from}&to=${to}`);

  if (!response.ok) {
    throw new Error('Error retrieving exchange rate.')
  }

  const data = await response.json()
  const rate = data.rates?.[to] // Use to parameter to get required rate using bracket syntax since to is as string. 
  if (typeof rate !== 'number') throw Error("Exchange rate is not a number.")
  
  return { rate: rate}
}