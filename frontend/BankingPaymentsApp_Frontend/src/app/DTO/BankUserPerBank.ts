import { BankUser } from "../Models/BankUser";
import { ClientUser } from "../Models/ClientUser";

export interface BankUsersPerBank {
  bankId: number;
  bankName: string;
  bankUsers: BankUser[];
  clientUsers: ClientUser[];
}