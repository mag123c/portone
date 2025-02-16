import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { INJECT_TYPES } from "../../common/constants/constant";
import { PaymentRequest } from "../../domain/payment/dto/payment-request.dto";
import { PaymentService } from "../../domain/payment/payment.service";

@injectable()
export class PaymentController {
  constructor(
    @inject(INJECT_TYPES.PaymentService)
    private readonly paymentService: PaymentService
  ) {}

  async createPayment(req: Request, res: Response) {
    const dto: PaymentRequest = req.body as PaymentRequest;
    const paymentInfo = await this.paymentService.createPayment(dto);
    return res.status(200).json(paymentInfo);
  }
}
