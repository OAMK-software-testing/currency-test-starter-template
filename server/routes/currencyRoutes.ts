import { Router } from 'express';
import { convertAmount } from '../controllers/currencyController';

const router = Router();

/**
 * POST /convert/amount
 * Converts an amount from one currency to another
 * Controller: convertAmount
 */
router.post('/convert/amount', convertAmount);

export default router;