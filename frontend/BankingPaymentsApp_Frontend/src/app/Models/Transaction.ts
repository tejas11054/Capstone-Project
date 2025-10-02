import { Account } from "./Account";
import { Payment } from "./Payment";
import { SalaryDisbursement } from "./SalaryDisbursement";
import { TransactionType } from "./TransactionType";

export interface Transaction {
  transactionId: number;
  accountId: number;
  account?: Account;
  paymentId?: number;
  payment?: Payment;
  salaryDisbursementId?: number;
  salaryDisbursement?: SalaryDisbursement;
  toFrom:string;
  transactionTypeId: number;
  transactionType?: TransactionType;
  amount: number;
  createdAt: string; 
}