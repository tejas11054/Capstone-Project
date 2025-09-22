export interface RegisterClientUserDTO {
  UserFullName: string;
  UserName: string;
  UserEmail: string;
  UserPhone: string;
  UserRoleId: number;
  Password: string;
  ConfirmPassword: string;
  DateOfBirth: string; 
  Address: string;
  AccountId?: number;  
}
