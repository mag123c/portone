import { Request, Response, Router } from "express";
import { INJECT_TYPES } from "../../common/constants/constant";
import AsyncHandler from "../../common/middlewares/async.handler";
import { ValidateRequestBodyPipe } from "../../common/middlewares/validation-body.pipe";
import { DIContainer } from "../../config/inversify.config";
import { PaymentRequest } from "../../domain/payment/dto/payment-request.dto";
import { PaymentController } from "./payment.controller";

const paymentRoutes = Router();
const paymentController = DIContainer.get<PaymentController>(
  INJECT_TYPES.PaymentController
);

paymentRoutes.post(
  "/",
  ValidateRequestBodyPipe(PaymentRequest),
  AsyncHandler(async (req: Request, res: Response) => {
    await paymentController.createPayment(req, res);
  })
);

export default paymentRoutes;
