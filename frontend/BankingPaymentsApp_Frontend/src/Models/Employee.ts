import { ClientUser } from "./ClientUser";
import { SalaryDisbursementDetails } from "./SalaryDisbursementDetails";

export interface Employee {
  EmployeeId: number;
  ClientId: number;
  ClientUser?: ClientUser;
  EmployeeName: string;
  AccountNumber: string;
  BankName: string;
  IFSC: string;
  Salary: number;
  SalaryDisbursementDetails?: Array<SalaryDisbursementDetails>;
}