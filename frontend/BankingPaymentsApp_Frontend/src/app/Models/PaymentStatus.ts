export enum PayStatus {
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
  PENDING = "PENDING",
}

export interface PaymentStatus {
  statusId: number;
  status: PayStatus;
}