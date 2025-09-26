export interface RegisterBankUserDTO {
  userFullName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userRoleId: number;
  bankId:number;
  password: string;
  confirmPassword: string;
  refferalCode: string;
  branch: string;
}