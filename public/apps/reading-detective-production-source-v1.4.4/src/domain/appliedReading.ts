import type { CaseId } from "./types";

export type InstructionStrength =
  | "required"
  | "prohibited"
  | "recommended"
  | "optional";

export interface ProcedureRule {
  id: string;
  sourceId: string;
  action: string;
  strength: InstructionStrength;
  prerequisiteRuleIds?: string[];
  consequenceIfSkipped?: string;
}

export interface FormFieldRule {
  id: string;
  sourceId: string;
  label: string;
  required: boolean;
  condition?: string;
}

export interface CertificationRule {
  id: string;
  sourceId: string;
  certificationText: string;
  signatureMeaning: string;
  requiresSignature: boolean;
}

export interface CivicNoticeRule {
  id: string;
  sourceId: string;
  issuer: string;
  action: string;
  deadline?: string;
  condition?: string;
  consequence?: string;
}

export interface AppliedReadingConfig {
  procedures?: ProcedureRule[];
  formFields?: FormFieldRule[];
  certifications?: CertificationRule[];
  civicNotices?: CivicNoticeRule[];
}

export interface ProcedureAssessment {
  caseId: CaseId;
  ruleId: string;
  strength: InstructionStrength;
  action: string;
  prerequisitesMet: boolean;
  missingPrerequisiteRuleIds: string[];
  consequenceIfSkipped?: string;
}

export interface FormEvaluationInput {
  providedFieldIds: string[];
  signedCertificationIds?: string[];
}

export interface FormEvaluation {
  caseId: CaseId;
  complete: boolean;
  missingRequiredFieldIds: string[];
  missingCertificationIds: string[];
  explanation: string;
}

export interface CivicNoticeAssessment {
  caseId: CaseId;
  noticeId: string;
  issuer: string;
  action: string;
  deadline?: string;
  condition?: string;
  consequence?: string;
}
