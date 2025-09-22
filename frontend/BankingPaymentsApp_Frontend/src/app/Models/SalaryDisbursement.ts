import { ClientUser } from "./ClientUser";
import { Employee } from "./Employee";
import { PaymentStatus } from "./PaymentStatus";
import { SalaryDisbursementDetails } from "./SalaryDisbursementDetails";

export interface SalaryDisbursement {
  SalaryDisbursementId: number;
  ClientId: number;
  ClientUser?: ClientUser;
  TotalAmount: number; 
  DisbursementDate: string; 
  DisbursementStatusId: number;
  DisbursementStatus?: PaymentStatus;
  AllEmployees: boolean;
  Employees?: Array<Employee>;
  DisbursementDetails?: Array<SalaryDisbursementDetails>;
}