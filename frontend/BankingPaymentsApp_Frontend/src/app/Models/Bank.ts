import { Account } from "./Account";
import { User } from "./User";

export interface Bank {
    bankId: number;
    bankName: string;
    ifsc: string;
    isActive: boolean;
    createdAt: Date;
    users: Array<User>;
    accounts: Array<Account>;
}