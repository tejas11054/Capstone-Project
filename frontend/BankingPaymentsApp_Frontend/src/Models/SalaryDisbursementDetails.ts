import { Employee } from "./Employee";
import { SalaryDisbursement } from "./SalaryDisbursement";
import { Transaction } from "./Transaction";

export interface SalaryDisbursementDetails {
  DetailId: number;
  SalaryDisbursementId: number;
  SalaryDisbursement: SalaryDisbursement;
  EmployeeId: number;
  Employee: Employee;
  Amount: number; 
  TransactionId?: number;
  Transaction?: Transaction;
}
