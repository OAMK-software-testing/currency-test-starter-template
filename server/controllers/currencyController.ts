import { Request, Response } from "express";
import { convert } from "../services/currencyService";

/**
 * Convert currency amount from one currency to another.
 * Validates input parameters and calls the convert service to perform the conversion.
 * Returns early with error responses if validation fails.
 * 
 * @param req Request object with body containing from, to, and amount properties.
 * @param res Response object to send the converted amount or error messages.
 * @returns Promise<Response | void> - Returns Response object with early error returns, or void on successful completion.
 */
export const convertAmount = async(req: Request, res: Response): Promise<Response | void> => {
  try {
    const { from, to, amount } = req.body

    // Normalize and validate currency code inputs
    // Ensure they are strings and convert to uppercase for consistency
    const fromCode = typeof from === 'string' ? from.trim().toUpperCase() : '';
    const toCode = typeof to === 'string' ? to.trim().toUpperCase() : '';
    const currencyCodePattern = /^[A-Z]{3}$/;

    // Validate that both currency codes are provided
    if (!fromCode || !toCode) {
      return res.status(400).json({ error: 'Body parameters "from" and "to" are required.' });
    }

    // Validate currency codes match ISO 4217 format (3 uppercase letters)
    if (!currencyCodePattern.test(fromCode) || !currencyCodePattern.test(toCode)) {
      return res.status(400).json({ error: 'Currency codes must be 3-letter ISO abbreviations (e.g., USD, EUR).' });
    }

    // Parse and validate the conversion amount
    // Convert to number if provided as string, validate it's a finite number
    const parsedAmount = typeof amount === 'number' ? amount : Number(amount);
    if (!Number.isFinite(parsedAmount)) {
      return res.status(400).json({ error: 'Amount must be a valid number.' });
    }

    // Validate that the amount is positive (must be greater than zero)
    if (parsedAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be greater than zero.' });
    }

    // All validation passed, call the conversion service
    const data = await convert(from,to,amount)
    res.status(200).json(data)
  } catch (error) {
    // Handle any errors from the conversion service
    // Extract status code and message, default to 500 if not provided
    const err = error as any
    const status: number = err.status ? err.status : 500
    const message: string = err.message
    res.status(status).json({error: message})
  }
}