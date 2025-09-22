export enum TxnType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}

export interface TransactionType {
  TypeId: number;
  Type: TxnType;
}