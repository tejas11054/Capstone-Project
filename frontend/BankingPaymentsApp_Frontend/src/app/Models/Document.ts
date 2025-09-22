import { ClientUser } from "./ClientUser";
import { ProofType } from "./ProofType";

export interface Document {
  DocumentId?: number;
  DocumentURL?: string;
  DocumentName?: string;
  ProofTypeId?: number;
  PublicId?: string;
  ClientId?: number;
  Client?: ClientUser;
  ProofType?: any;
}