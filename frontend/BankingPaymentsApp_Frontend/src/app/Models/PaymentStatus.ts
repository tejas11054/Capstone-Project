export enum PayStatus {
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  PENDING = "PENDING",
}

export interface PaymentStatus {
  StatusId: number;
  Status: PayStatus;
}