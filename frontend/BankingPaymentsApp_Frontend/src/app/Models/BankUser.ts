import { User } from "./User";

export interface BankUser extends User {
  refferalCode: string;
  branch: string;
  isActive: boolean;
  clientIds: number[];
}
