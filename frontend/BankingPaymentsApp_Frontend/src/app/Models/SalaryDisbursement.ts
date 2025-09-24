import { ClientUser } from "./ClientUser";
import { Employee } from "./Employee";
import { PaymentStatus } from "./PaymentStatus";
import { SalaryDisbursementDetails } from "./SalaryDisbursementDetails";

export interface SalaryDisbursement {
  salaryDisbursementId: number;
  clientId: number;
  clientUser?: ClientUser;
  totalAmount: number; 
  disbursementDate: string; 
  disbursementStatusId: number;
  disbursementStatus?: PaymentStatus;
  allEmployees: boolean;
  employees?: Array<Employee>;
  disbursementDetails?: Array<SalaryDisbursementDetails>;
}