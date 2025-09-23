import { Account } from "./Account";
import { Beneficiary } from "./Beneficiary";
import { Employee } from "./Employee";
import { User } from "./User";

export interface ClientUser extends User {
  AccountId?: number;
  Account?: Account;
  Beneficiaries?: Array<Beneficiary>;
  Employees?: Array<Employee>;
  DateOfBirth: string; 
  Address: string;
  KycVierified: boolean;
  Documents?: Document [];
}