import { Account } from "./Account";
import { Payment } from "./Payment";
import { SalaryDisbursement } from "./SalaryDisbursement";
import { TransactionType } from "./TransactionType";

export interface Transaction {
  TransactionId: number;
  AccountId: number;
  Account?: Account;
  PaymentId?: number;
  Payment?: Payment;
  SalaryDisbursementId?: number;
  SalaryDisbursement?: SalaryDisbursement;
  TransactionTypeId: number;
  TransactionType?: TransactionType;
  Amount: number;
  CreatedAt: string; 
}