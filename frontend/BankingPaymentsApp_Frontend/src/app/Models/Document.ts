import { ClientUser } from "./ClientUser";
import { ProofType } from "./ProofType";

export interface Document {
  DocumentId: number;
  DocumentURL: string;
  DocumentName: string;
  ProofTypeId: number;
  ProofType?: ProofType;
  PublicId: string;
  ClientId: number;
  Account?: ClientUser;
}