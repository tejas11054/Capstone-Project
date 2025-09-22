import { User } from "../Models/User";

export interface LoginResponseDTO {
  IsSuccess: boolean;
  User?: User; 
  Token?: string; 
}
