import { User } from "../Models/User";

export interface LoginResponseDTO {
  isSuccess: boolean;
  user: User; 
  token: string; 
}
