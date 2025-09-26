import { Bank } from "./Bank";
import { UserRole } from "./UserRole";

export interface User {
  userId: number;
  userFullName: string;
  userName: string;
  password: string;
  userRoleId: number;
  bankId:number;
  bank:Bank;
  role?: UserRole;
  userEmail: string;
  userPhone: string;
  userJoiningDate: string; 
}