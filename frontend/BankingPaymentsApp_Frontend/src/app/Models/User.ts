import { UserRole } from "./UserRole";

export interface User {
  userId: number;
  userFullName: string;
  userName: string;
  password: string;
  userRoleId: number;
  role?: UserRole;
  userEmail: string;
  userPhone: string;
  userJoiningDate: string; 
}