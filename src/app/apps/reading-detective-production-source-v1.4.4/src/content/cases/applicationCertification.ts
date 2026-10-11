import type { ReadingCase } from "../../domain";

export const applicationCertification: ReadingCase = {
  id: "CASE.LEAD.017",
  title: "The Application Certification",
  genre: "agreement",
  presentationStages: ["lead-investigator"],
  targetSkills: ["FORM.001", "FORM.002", "SENT.005"],
  prerequisiteSkills: ["COMP.001", "LEGAL.002", "EVID.004"],
  briefing: "An application mixes required fields, an optional field, a conditional section, and a certification statement. Determine what is actually required and what the signature affirms.",
  sources: [
    {
      id: "form",
      kind: "document",
      title: "Training Program Application",
      body: "Required fields are marked *. Full Name*; Email*; Middle Name (optional); Employer Name — complete only if you selected Currently Employed. Certification: By signing below, I certify that the information I provided in this application is accurate to the best of my knowledge.",
      authority: "official",
    },
    {
      id: "submission",
      kind: "document",
      title: "Draft Submission",
      body: "Full Name: Taylor Brooks. Email: tbrooks@example.test. Middle Name: [blank]. Currently Employed: No. Employer Name: [blank]. Signature: Taylor Brooks.",
      authority: "personal",
    },
  ],
  appliedReading: {
    formFields: [
      { id: "name", sourceId: "form", label: "Full Name", required: true },
      { id: "email", sourceId: "form", label: "Email", required: true },
      { id: "middle", sourceId: "form", label: "Middle Name", required: false },
      { id: "employer", sourceId: "form", label: "Employer Name", required: false, condition: "Required only if Currently Employed is selected." },
    ],
    certifications: [
      {
        id: "accuracy",
        sourceId: "form",
        certificationText: "I certify that the information I provided in this application is accurate to the best of my knowledge.",
        signatureMeaning: "The signer affirms the accuracy certification stated in the application.",
        requiresSignature: true,
      },
    ],
  },
  steps: [
    {
      id: "fields",
      prompt: "Based on the form instructions and the draft answers, is leaving Middle Name and Employer Name blank automatically a problem?",
      skillId: "FORM.001",
      responseType: "single-choice",
      sourceIds: ["form", "submission"],
      choices: [
        { id: "no", label: "No. Middle Name is optional, and Employer Name is conditional on being currently employed; the draft says No." },
        { id: "yes", label: "Yes. Every visible form field must always be filled." },
        { id: "middle", label: "Only Middle Name is required because it appears before Employer Name." },
      ],
      correctAnswerIds: ["no"],
    },
    {
      id: "signature",
      prompt: "What does the signature certification specifically affirm?",
      skillId: "FORM.002",
      responseType: "single-choice",
      sourceIds: ["form", "submission"],
      choices: [
        { id: "accuracy", label: "That the information provided is accurate to the best of the signer's knowledge" },
        { id: "everything", label: "Agreement with every possible future policy" },
        { id: "job", label: "That the signer is currently employed" },
      ],
      correctAnswerIds: ["accuracy"],
    },
    {
      id: "condition",
      prompt: "When does Employer Name become required under this form?",
      skillId: "SENT.005",
      responseType: "single-choice",
      sourceIds: ["form"],
      choices: [
        { id: "employed", label: "If Currently Employed is selected" },
        { id: "always", label: "For every applicant" },
        { id: "signed", label: "Only after the certification is signed" },
      ],
      correctAnswerIds: ["employed"],
      evidenceContext: "transfer",
    },
  ],
  misconceptionTargets: [],
  transferCaseIds: ["CASE.LEAD.018"],
  delayedReview: { afterDays: 7, skillIds: ["FORM.001", "FORM.002"] },
};
