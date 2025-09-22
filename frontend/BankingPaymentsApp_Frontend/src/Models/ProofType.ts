export enum DocProofType {
  IDENTITY_PROOF = "IDENTITY_PROOF",
  ADDRESS_PROOF = "ADDRESS_PROOF",
  DATE_OF_BIRTH_PROOF = "DATE_OF_BIRTH_PROOF",
  PHOTOGRAPH = "PHOTOGRAPH",
  PAN_CARD = "PAN_CARD",
  OTHER = "OTHER",
}

export interface ProofType {
  TypeId: number;
  Type: DocProofType;
}