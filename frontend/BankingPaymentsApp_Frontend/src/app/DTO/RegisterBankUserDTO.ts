export interface RegisterBankUserDTO {
  UserFullName: string;
  UserName: string;
  UserEmail: string;
  UserPhone: string;
  UserRoleId: number;
  Password: string;
  ConfirmPassword: string;
  RefferalCode: string;
  Branch: string;
}