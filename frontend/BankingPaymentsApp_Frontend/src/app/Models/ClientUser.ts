import { Account } from "./Account";
import { Beneficiary } from "./Beneficiary";
import { Employee } from "./Employee";
import { User } from "./User";

export interface ClientUser extends User {
  accountId?: number;
  account?: Account;
  beneficiaries?: Array<Beneficiary>;
  employees?: Array<Employee>;
  dateOfBirth: string; 
  address: string;
  kycVierified: boolean;
  documents?: Document [];
}