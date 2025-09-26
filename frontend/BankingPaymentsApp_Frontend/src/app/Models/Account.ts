import { AccountStatus } from "./AccountStatus";
import { AccountType } from "./AccountType";
import { Bank } from "./Bank";
import { ClientUser } from "./ClientUser";

export interface Account {
  accountId: number;
  accountNumber: string;
  clientId?: number;
  clientUser?: ClientUser;
  balance: number;
  bankId:number;
  bank:Bank;
  accountTypeId: number;
  accountType?: AccountType;
  accountStatusId: number;
  accountStatus?: AccountStatus;
  createdAt: string; 
  transactionIds?: Array<number>;
}
