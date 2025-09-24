export enum TxnType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export interface TransactionType {
  typeId: number;
  type: TxnType;
}