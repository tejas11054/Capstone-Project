import { Account } from "./Account";
import { PaymentStatus } from "./PaymentStatus";
import { Transaction } from "./Transaction";

export interface Payment {
  PaymentId: number;
  PayerAccountId: number;
  PayerAccount?: Account;
  PayeeAccountNumber: string;
  Amount: number;
  CreatedAt: string; 
  PaymentStatusId: number;
  PaymentStatus?: PaymentStatus;
  ActionAt: string; 
  Transactions?: Array<Transaction>;
}