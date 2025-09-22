import { EmployeeDTO } from "./EmployeeDTO";

export interface CreateSalaryDisbursmentDTO {
  ClientId: number;
  AllEmployees: boolean;
  Employees?: Array<EmployeeDTO>;
}