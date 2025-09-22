enum Role {
  ADMIN = "ADMIN",
  BANK_USER = "BANK_USER",
  CLIENT_USER = "CLIENT_USER"
}

export interface UserRole {
  roleId: number;
  role: Role;
}
