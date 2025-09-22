import { SalaryDisbursementDetails } from "../Models/SalaryDisbursementDetails";

export interface SalaryResponseDTO {
  SalaryDisbursementId: number;
  ClientId: number;
  TotalAmount: number; 
  DisbursementDate: string; 
  DisbursementStatusId: number;
  AllEmployees: boolean;
  DisbursementDetails?: Array<SalaryDisbursementDetails>; 
}
