export enum Role {
  ADMIN = "ADMIN",
  BANK_USER = "BANK_USER",
  CLIENT_USER = "CLIENT_USER",
}

export interface UserRole {
  RoleId: number;
  Role: Role;
}