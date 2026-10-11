import type {
  AppliedReadingConfig,
  CivicNoticeAssessment,
  FormEvaluation,
  FormEvaluationInput,
  ProcedureAssessment,
  ReadingCase,
} from "../domain";

function config(readingCase: ReadingCase): AppliedReadingConfig | undefined {
  return readingCase.appliedReading;
}

export function assessProcedureRule(
  readingCase: ReadingCase,
  ruleId: string,
  completedRuleIds: string[] = [],
): ProcedureAssessment | undefined {
  const rule = config(readingCase)?.procedures?.find((item) => item.id === ruleId);
  if (!rule) return undefined;
  const complete = new Set(completedRuleIds);
  const missingPrerequisiteRuleIds = (rule.prerequisiteRuleIds ?? []).filter((id) => !complete.has(id));
  return {
    caseId: readingCase.id,
    ruleId,
    strength: rule.strength,
    action: rule.action,
    prerequisitesMet: missingPrerequisiteRuleIds.length === 0,
    missingPrerequisiteRuleIds,
    consequenceIfSkipped: rule.consequenceIfSkipped,
  };
}

export function evaluateForm(
  readingCase: ReadingCase,
  input: FormEvaluationInput,
): FormEvaluation | undefined {
  const cfg = config(readingCase);
  if (!cfg?.formFields && !cfg?.certifications) return undefined;
  const provided = new Set(input.providedFieldIds);
  const signed = new Set(input.signedCertificationIds ?? []);
  const missingRequiredFieldIds = (cfg.formFields ?? [])
    .filter((field) => field.required && !provided.has(field.id))
    .map((field) => field.id);
  const missingCertificationIds = (cfg.certifications ?? [])
    .filter((certification) => certification.requiresSignature && !signed.has(certification.id))
    .map((certification) => certification.id);
  const complete = !missingRequiredFieldIds.length && !missingCertificationIds.length;
  return {
    caseId: readingCase.id,
    complete,
    missingRequiredFieldIds,
    missingCertificationIds,
    explanation: complete
      ? "All required fields and required certifications represented in this case are complete."
      : "The submission still lacks at least one required field or required certification. Optional fields do not block completeness.",
  };
}

export function assessCivicNotice(
  readingCase: ReadingCase,
  noticeId: string,
): CivicNoticeAssessment | undefined {
  const notice = config(readingCase)?.civicNotices?.find((item) => item.id === noticeId);
  if (!notice) return undefined;
  return {
    caseId: readingCase.id,
    noticeId,
    issuer: notice.issuer,
    action: notice.action,
    deadline: notice.deadline,
    condition: notice.condition,
    consequence: notice.consequence,
  };
}

export function validateAppliedReading(readingCase: ReadingCase): string[] {
  const cfg = config(readingCase);
  if (!cfg) return [];
  const errors: string[] = [];
  const sourceIds = new Set(readingCase.sources.map((source) => source.id));
  const procedureIds = new Set((cfg.procedures ?? []).map((item) => item.id));
  const allIds = new Set<string>();
  const addId = (id: string, type: string) => {
    if (!id.trim()) errors.push(`${type} must have an id`);
    if (allIds.has(id)) errors.push(`Duplicate applied-reading id ${id}`);
    allIds.add(id);
  };
  for (const rule of cfg.procedures ?? []) {
    addId(rule.id, "Procedure rule");
    if (!sourceIds.has(rule.sourceId)) errors.push(`Procedure rule ${rule.id} references missing source ${rule.sourceId}`);
    for (const prerequisiteId of rule.prerequisiteRuleIds ?? []) if (!procedureIds.has(prerequisiteId)) errors.push(`Procedure rule ${rule.id} references missing prerequisite ${prerequisiteId}`);
  }
  for (const field of cfg.formFields ?? []) {
    addId(field.id, "Form field");
    if (!sourceIds.has(field.sourceId)) errors.push(`Form field ${field.id} references missing source ${field.sourceId}`);
  }
  for (const certification of cfg.certifications ?? []) {
    addId(certification.id, "Certification");
    if (!sourceIds.has(certification.sourceId)) errors.push(`Certification ${certification.id} references missing source ${certification.sourceId}`);
  }
  for (const notice of cfg.civicNotices ?? []) {
    addId(notice.id, "Civic notice");
    if (!sourceIds.has(notice.sourceId)) errors.push(`Civic notice ${notice.id} references missing source ${notice.sourceId}`);
  }
  return errors;
}
