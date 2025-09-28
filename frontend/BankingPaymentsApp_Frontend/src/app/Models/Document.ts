import { ClientUser } from "./ClientUser";
import { ProofType } from "./ProofType";

export interface Document {
  documentId?: number;
  documentURL?: string;
  documentName?: string;
  proofTypeId?: number;
  publicId?: string;
  clientId?: number;
  client?: ClientUser;
  proofType?: ProofType;
}