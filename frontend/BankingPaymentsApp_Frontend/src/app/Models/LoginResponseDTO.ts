import { User } from "./User";

export interface LoginResponse {
  isSuccess: boolean; // ✅ fixed typo (was isSucess)
  user: User | null;  // ✅ safer if login can fail
  token: string;
}