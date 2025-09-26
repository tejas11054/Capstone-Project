export interface ClientUserResponseDTO {
  userId: number;
  userFullName: string;
  userName: string;
  userRoleId: number;
  bankId:number;
  userEmail: string;
  userPhone: string;
  userJoiningDate: string;
  dateOfBirth: string;     
  address: string;
  kycVierified: boolean;
  accountId?: number;
}
