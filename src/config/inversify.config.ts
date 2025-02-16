import { Container } from "inversify";
import { PaymentController } from "../app/payment/payment.controller";
import { INJECT_TYPES } from "../common/constants/constant";
import { PaymentService } from "../domain/payment/payment.service";
import { PortOneApiProvider } from "../external/portone/portone-api.provider";

const DIContainer = new Container();

// 결제
DIContainer.bind<PaymentController>(INJECT_TYPES.PaymentController)
  .to(PaymentController)
  .inSingletonScope();

DIContainer.bind<PaymentService>(INJECT_TYPES.PaymentService)
  .to(PaymentService)
  .inSingletonScope();

// External Provider
DIContainer.bind<PortOneApiProvider>(INJECT_TYPES.PortOneApiProvider)
  .to(PortOneApiProvider)
  .inSingletonScope();

export { DIContainer };
