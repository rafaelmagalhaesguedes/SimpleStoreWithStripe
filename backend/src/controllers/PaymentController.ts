import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';
import { statusCode } from '../utils/httpStatusCodeMap';

/**
 * Payment Controller
 * 
 * @export
 * @class PaymentController
 */
export class PaymentController {

  /**
   * Creates an instance of PaymentController.
   */
  constructor(private paymentService: PaymentService) {}


  /**
   * Create a new Stripe session
   * 
   * @param {Request} req
   * @param {Response} res
   */
  async createStripeSession(req: Request, res: Response): Promise<Response> {
    const userId = 2;
    const { items } = req.body;

    const { status, data } = await this.paymentService.createStripeSession(userId, items);

    return res.status(statusCode(status)).json(data);
  }


  /**
   * Handle Stripe webhook
   * 
   * @param {Request} req
   * @param {Response} res
   */
  async handleStripeWebhook(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string[];

    const { status, data } = await this.paymentService.handleStripeWebhooks(sig, req.body);

    return res.status(statusCode(status)).json(data);
  }
}