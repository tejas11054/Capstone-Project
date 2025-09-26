export interface RegisterClientUserDTO {
  userFullName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userRoleId: number;
  bankId:number;
  password: string;
  confirmPassword: string;
  dateOfBirth: string; 
  address: string;
  accountId?: number;  
}
