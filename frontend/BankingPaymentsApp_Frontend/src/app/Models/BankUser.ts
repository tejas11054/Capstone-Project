import { User } from "./User";

export interface BankUser extends User {
  refferalCode: string;
  branch: string;
  kycVierified: boolean;
  clientIds: number[];
}
