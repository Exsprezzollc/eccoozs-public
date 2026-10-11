export type QaSeverity = "error" | "warning" | "info";

export interface QaIssue {
  code: string;
  severity: QaSeverity;
  message: string;
  entityId?: string;
}

export interface QaCheckSummary {
  id: string;
  label: string;
  passed: boolean;
  errorCount: number;
  warningCount: number;
  infoCount: number;
}

export interface ProductionQaReport {
  generatedAt: string;
  passed: boolean;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  checks: QaCheckSummary[];
  issues: QaIssue[];
}
