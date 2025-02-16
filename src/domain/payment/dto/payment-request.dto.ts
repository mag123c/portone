import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class PaymentRequest {
  @Expose({ name: "imp_uid" })
  @IsString()
  @IsNotEmpty()
  impUid!: string;
}
