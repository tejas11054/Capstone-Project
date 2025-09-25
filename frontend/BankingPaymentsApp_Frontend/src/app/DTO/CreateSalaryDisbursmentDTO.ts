import { EmployeeDTO } from "./EmployeeDTO";

export interface CreateSalaryDisbursmentDTO {
  clientId: number;
  allEmployees: boolean;
  employeeIds?: Array<number>;
}