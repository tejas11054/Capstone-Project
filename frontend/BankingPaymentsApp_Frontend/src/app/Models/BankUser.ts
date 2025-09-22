import { User } from "./User";

export interface BankUser extends User {
  RefferalCode: string;
  Branch: string;
  ClientIds: Array<number>;
}
