export enum AccType {
  SAVINGS = "SAVINGS",
  CURRENT = "CURRENT",
  SALARY = "SALARY",
}

export interface AccountType {
  TypeId: number;
  Type: AccType;
}