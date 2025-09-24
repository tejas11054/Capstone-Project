import { Account } from "./Account";
import { PaymentStatus } from "./PaymentStatus";
import { Transaction } from "./Transaction";

export interface Payment {
  paymentId: number;
  payerAccountId: number;
  payerAccount?: Account;
  payeeAccountNumber: string;
  amount: number;
  createdAt: string; 
  paymentStatusId: number;
  paymentStatus?: PaymentStatus;
  actionAt: string; 
  transactions?: Array<Transaction>;
}