import axios from "axios";
import { injectable } from "inversify";

@injectable()
export class PortOneApiProvider {
  private baseUrl: string;
  private apiKey: string;
  private apiSecret: string;
  private token: string | null = null;
  private tokenExpiration: number | null = null;

  constructor() {
    this.baseUrl = process.env.PORTONE_BASE_API_URL!;
    this.apiKey = process.env.PORTONE_TEST_API_KEY!;
    this.apiSecret = process.env.PORTONE_TEST_API_SECRET!;
  }

  public async getToken(): Promise<string> {
    if (
      this.token &&
      this.tokenExpiration &&
      Date.now() < this.tokenExpiration
    ) {
      return this.token;
    }

    try {
      const response = await axios.post(`${this.baseUrl}/users/getToken`, {
        imp_key: this.apiKey,
        imp_secret: this.apiSecret,
      });

      if (!response.data.response.access_token) {
        throw new Error("Invalid token response");
      }

      this.token = response.data.response.access_token as string;
      this.tokenExpiration = response.data.response.expired_at;
      return this.token;
    } catch (error) {
      throw new Error(`tokenRequestError: ${error}`);
    }
  }

  public async getPaymentInfo(impUid: string): Promise<any> {
    try {
      const token = await this.getToken();
      const response = await axios.get(`${this.baseUrl}/payments/${impUid}`, {
        headers: { Authorization: `${token}` },
      });

      return response.data;
    } catch (error) {
      throw new Error(`paymentInfoRequestError: ${error}`);
    }
  }

  /**
   * 이미 취소됐을 경우
   {
    "code": -1,
    "message": "결제취소에 실패하였습니다. 해당거래 취소실패(기취소성공) : 전화 문의(1661-0808)",
    "response": null
    }
   */
  public async cancelPayment(
    impUid: string,
    merchantUid: string
  ): Promise<any> {
    try {
      const token = await this.getToken();
      const response = await axios.post(
        `${this.baseUrl}/payments/cancel`,
        { imp_uid: impUid, merchant_uid: merchantUid },
        { headers: { Authorization: `${token}` } }
      );

      return response.data;
    } catch (error) {
      throw new Error(`cancelPaymentRequestError: ${error}`);
    }
  }
}
