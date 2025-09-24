import { Employee } from "./Employee";
import { SalaryDisbursement } from "./SalaryDisbursement";
import { Transaction } from "./Transaction";

export interface SalaryDisbursementDetails {
  detailId: number;
  salaryDisbursementId: number;
  salaryDisbursement: SalaryDisbursement;
  employeeId: number;
  employee: Employee;
  amount: number; 
  transactionId?: number;
  transaction?: Transaction;
}
