import { AccountStatus } from "./AccountStatus";
import { AccountType } from "./AccountType";
import { ClientUser } from "./ClientUser";

export interface Account {
  accountId: number;
  accountNumber: string;
  clientId?: number;
  clientUser?: ClientUser;
  balance: number;
  accountTypeId: number;
  accountType?: AccountType;
  accountStatusId: number;
  accountStatus?: AccountStatus;
  createdAt: string; 
  transactionIds?: Array<number>;
}
