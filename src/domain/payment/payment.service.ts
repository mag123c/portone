import { inject, injectable } from "inversify";
import { INJECT_TYPES } from "../../common/constants/constant";
import { PortOneApiProvider } from "../../external/portone/portone-api.provider";
import { PaymentRequest } from "./dto/payment-request.dto";

@injectable()
export class PaymentService {
  constructor(
    @inject(INJECT_TYPES.PortOneApiProvider)
    private readonly portOneApiProvider: PortOneApiProvider
  ) {}
  async createPayment(dto: PaymentRequest) {
    const paymentInfo = await this.portOneApiProvider.getPaymentInfo(
      dto.impUid
    );

    // 결제가 완료되지 않은 경우
    if (paymentInfo.response.status !== "paid") {
      return paymentInfo.response;
    }

    // 결제 완료 된 경우 취소 후 반환
    return await this.portOneApiProvider.cancelPayment(
      dto.impUid,
      paymentInfo.response.merchantUid
    );
  }
}
