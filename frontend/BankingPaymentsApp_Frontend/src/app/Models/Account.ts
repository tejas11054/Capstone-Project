import { AccountStatus } from "./AccountStatus";
import { AccountType } from "./AccountType";
import { ClientUser } from "./ClientUser";

export interface Account {
  AccountId: number;
  AccountNumber: string;
  ClientId?: number;
  ClientUser?: ClientUser;
  Balance: number;
  AccountTypeId: number;
  AccountType?: AccountType;
  AccountStatusId: number;
  AccountStatus?: AccountStatus;
  CreatedAt: string; 
  TransactionIds?: Array<number>;
}
