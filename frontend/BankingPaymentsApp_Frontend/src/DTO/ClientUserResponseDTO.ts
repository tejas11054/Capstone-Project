export interface ClientUserResponseDTO {
  UserId: number;
  UserFullName: string;
  UserName: string;
  UserRoleId: number;
  UserEmail: string;
  UserPhone: string;
  UserJoiningDate: string;
  DateOfBirth: string;     
  Address: string;
  KycVierified: boolean;
  AccountId?: number;
}
