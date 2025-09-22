import { UserRole } from "./UserRole";

export interface User {
  UserId: number;
  UserFullName: string;
  UserName: string;
  Password: string;
  UserRoleId: number;
  Role?: UserRole;
  UserEmail: string;
  UserPhone: string;
  UserJoiningDate: string; 
}