import { PaymentRequest } from "../../domain/payment/dto/payment-request.dto";
import { PaymentService } from "../../domain/payment/payment.service";
import { PortOneApiProvider } from "../../external/portone/portone-api.provider";

describe("PaymentService", () => {
  let paymentService: PaymentService;
  let portOneApiProvider: PortOneApiProvider;

  beforeEach(() => {
    portOneApiProvider = new PortOneApiProvider();
    paymentService = new PaymentService(portOneApiProvider);
  });

  it("status가 'paid'가 아닐 경우 cancelPayment가 호출되지 않는다.", async () => {
    // given
    const mockDto: PaymentRequest = { impUid: "mock_imp_uid" };
    jest.spyOn(portOneApiProvider, "getPaymentInfo").mockResolvedValue({
      response: { status: "failed", merchantUid: "mock_merchant_uid" },
    });

    const cancelSpy = jest.spyOn(portOneApiProvider, "cancelPayment");

    // when
    const sut = await paymentService.createPayment(mockDto);

    // then
    expect(sut.status).toBe("failed");
    expect(cancelSpy).not.toHaveBeenCalled(); // cancelPayment가 호출되지 않음
  });

  it("status가 'paid'일 경우 cancelPayment가 호출된다.", async () => {
    // given
    const mockDto: PaymentRequest = { impUid: "mock_imp_uid" };
    jest.spyOn(portOneApiProvider, "getPaymentInfo").mockResolvedValue({
      response: { status: "paid", merchantUid: "mock_merchant_uid" },
    });

    const cancelSpy = jest
      .spyOn(portOneApiProvider, "cancelPayment")
      .mockResolvedValue({ response: { status: "cancelled" } });

    // when
    const sut = await paymentService.createPayment(mockDto);

    // then
    expect(sut.response.status).toBe("cancelled"); // 결제 취소 확인
    expect(cancelSpy).toHaveBeenCalledWith("mock_imp_uid", "mock_merchant_uid"); // cancelPayment가 호출됨
  });
});
