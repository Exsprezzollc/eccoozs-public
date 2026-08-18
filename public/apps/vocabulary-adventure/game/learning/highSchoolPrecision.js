import { getVocabularyWord } from "../content/vocabulary.js";

const repairCatalog = {
  overclaim: {
    title: "Match the strength of the evidence",
    principle: "Professional language should not promise more than the evidence can support.",
    cue: "Reduce is not erase. Improvement is not a guarantee."
  },
  equity: {
    title: "Fair is not always identical",
    principle: "Equitable decisions respond to documented differences in need, barriers, or risk; identical treatment can preserve an unequal condition.",
    cue: "Same treatment and fair treatment are not automatically the same."
  },
  scope: {
    title: "Keep the whole system in view",
    principle: "The selected term is too narrow for evidence that spans several connected modes, components, places, or causes.",
    cue: "Ask: what parts of the system does the evidence actually include?"
  },
  priority: {
    title: "Priority must come from evidence",
    principle: "Triage ranks documented urgency or risk. Random order, duplication, or convenience does not perform that professional job.",
    cue: "Urgency first—not randomness first."
  },
  rate: {
    title: "Existing cases are not new cases",
    principle: "Prevalence describes how much of a condition exists in a population at a time; incidence concerns new cases arising over a period.",
    cue: "Prevalence = present cases. Incidence = incoming new cases."
  },
  access: {
    title: "Distance is not the same as access",
    principle: "Proximity describes nearness. Jurisdiction and compliance describe different professional ideas and do not answer a distance/access question.",
    cue: "Near on a map can still be hard to reach."
  },
  cash: {
    title: "Profit and available cash are different",
    principle: "Liquidity concerns cash that is available when near-term obligations come due. Branding, authority, or long-run profit do not answer the cash-timing problem.",
    cue: "A business can be profitable and still run short of cash today."
  },
  growth: {
    title: "Growth must be supportable",
    principle: "Scalable describes a system that can handle much greater demand without collapsing or requiring a complete redesign at every step.",
    cue: "More demand is not proof the system can support more demand."
  },
  contingency: {
    title: "Prepare for a possible condition",
    principle: "A contingency plan specifies what to do if a plausible future disruption occurs. It is not a prevalence measure or a past guiding precedent.",
    cue: "If this happens, then we do that."
  },
  backup: {
    title: "A backup must be meaningfully independent",
    principle: "Redundancy adds another functioning path or component so one failure does not stop the entire system.",
    cue: "Two parts sharing one failure point may still be one fragile system."
  },
  measurement: {
    title: "Use the measurement term",
    principle: "Tolerance is the permitted amount of variation around a specified target. Governance or finance terms do not describe dimensional variation.",
    cue: "Target ± allowed variation = tolerance."
  },
  standards: {
    title: "Check against the requirement",
    principle: "Compliance means meeting the applicable rule, standard, or requirement. Location and frequency terms do not answer whether a requirement is satisfied.",
    cue: "Requirement met? That is the compliance question."
  },
  drainage: {
    title: "Follow where the water connects",
    principle: "A watershed is the land area draining toward a common outlet. Property authority or business measures do not define that connected drainage area.",
    cue: "Trace the water uphill and downstream—not the property lines."
  },
  diversity: {
    title: "Variety matters, not just quantity",
    principle: "Biodiversity concerns the variety of living organisms and ecological roles, not backup capacity or cash availability.",
    cue: "Many organisms of one kind are not the same as many kinds of organisms."
  },
  corrective: {
    title: "Corrective action must address the condition",
    principle: "Remediation is action taken to correct contamination, damage, or another harmful condition. Nearness or population frequency do not perform that job.",
    cue: "Document the problem, correct it, then verify the correction."
  },
  law: {
    title: "Separate enacted law from guidance or possibility",
    principle: "An ordinance is an enacted local law or regulation. A precedent is an earlier guiding example; a contingency is a possible future condition or response.",
    cue: "Adopted local rule = ordinance."
  },
  evidence: {
    title: "Support the claim with evidence",
    principle: "To substantiate is to provide evidence that supports a claim. Eliminating a problem or randomizing a choice is a different action.",
    cue: "What evidence can you point to for this exact claim?"
  },
  impartiality: {
    title: "Fair review is not the same as neutrality about facts",
    principle: "Impartial means applying the same criteria without favoring one side in advance. It does not mean ignoring adverse evidence or describing system growth.",
    cue: "Same criteria, open mind, evidence-based finding."
  },
  tradeoff: {
    title: "Name the competing benefit",
    principle: "A tradeoff exists when improving one goal consumes limited space, time, money, capacity, or another resource that another goal also needs.",
    cue: "If one gain limits another gain, name the tradeoff."
  },
  incidence: {
    title: "New cases are not all existing cases",
    principle: "Incidence concerns newly occurring cases in a defined population over a defined period; prevalence concerns the existing burden.",
    cue: "Incidence = incoming new cases."
  },
  variance: {
    title: "Compare plan with actual",
    principle: "A variance is a difference between a planned or expected value and the actual result; it is not automatically profit, margin, or available cash.",
    cue: "Plan versus actual = variance."
  },
  fatigue: {
    title: "Repeated stress can accumulate damage",
    principle: "Material fatigue is progressive damage associated with repeated or fluctuating stress cycles, often before one ordinary load would cause failure.",
    cue: "Many cycles can matter even when one cycle is not enough to break the part."
  },
  bioaccumulation: {
    title: "Buildup inside an organism",
    principle: "Bioaccumulation describes a substance building up in an organism over time faster than the organism eliminates it.",
    cue: "Bio = organism. Accumulation = buildup."
  },
  disclosure: {
    title: "Make the required information visible",
    principle: "Disclosure means revealing relevant information that a rule or fair process requires others to know; disclosure is not the same as a final finding of misconduct.",
    cue: "Reveal first, review second, conclude only after the rule is applied."
  },
  generic: {
    title: "Choose the term that does the professional job",
    principle: "Several words can sound technical, but only one precisely matches the relationship described by the evidence.",
    cue: "Name the job the sentence needs the word to do."
  }
};

const repairTypeByChoice = {
  "rain-ready-plaza": { eliminate: "overclaim", postpone: "generic" },
  "shade-equity-corridor": { identical: "equity", arbitrary: "equity" },
  "multimodal-connection": { "single-mode": "scope", stationary: "scope" },
  "heat-response-triage": { randomize: "priority", duplicate: "priority" },
  "asthma-prevalence-map": { incidence: "rate", certainty: "overclaim" },
  "clinic-proximity-access": { jurisdiction: "access", compliance: "access" },
  "grocer-liquidity-plan": { branding: "cash", jurisdiction: "cash" },
  "pilot-scalability-review": { stationary: "growth", impervious: "growth" },
  "supplier-contingency": { prevalence: "contingency", precedent: "contingency" },
  "pump-redundancy": { proximity: "backup", prevalence: "backup" },
  "bridge-tolerance": { jurisdiction: "measurement", liquidity: "measurement" },
  "utility-compliance-review": { proximity: "standards", prevalence: "standards" },
  "watershed-restoration": { jurisdiction: "drainage", margin: "drainage" },
  "habitat-biodiversity": { redundancy: "diversity", liquidity: "diversity" },
  "brownfield-remediation": { proximity: "corrective", prevalence: "corrective" },
  "ordinance-reading": { precedent: "law", contingency: "law" },
  "claim-substantiation": { eliminate: "evidence", randomize: "evidence" },
  "hearing-impartiality": { adverse: "impartiality", scalable: "impartiality" },
  "cooling-access-equity": { identical: "equity", arbitrary: "equity" },
  "flood-risk-mitigation": { guarantee: "overclaim", ignore: "overclaim" },
  "vendor-compliance-audit": { prevalence: "standards", proximity: "standards" },
  "curb-space-tradeoff": { certainty: "tradeoff", redundancy: "tradeoff" },
  "new-case-incidence-watch": { prevalence: "incidence", proximity: "incidence" },
  "budget-variance-review": { margin: "variance", liquidity: "variance" },
  "bridge-fatigue-check": { tolerance: "fatigue", proximity: "fatigue" },
  "fish-bioaccumulation-review": { biodiversity: "bioaccumulation", remediation: "bioaccumulation" },
  "conflict-disclosure-review": { ordinance: "disclosure", precedent: "disclosure" }
};

const plainMeaning = {
  eliminate: "remove completely",
  postpone: "delay until later",
  identical: "exactly the same",
  arbitrary: "chosen without a relevant reason",
  "single-mode": "limited to one form or mode",
  stationary: "not moving",
  randomize: "put into random order",
  duplicate: "make a copy",
  incidence: "the occurrence of new cases over a period",
  certainty: "complete confidence that something is true",
  jurisdiction: "legal or official authority over an area or matter",
  compliance: "meeting a rule, requirement, or standard",
  branding: "how a business presents and identifies itself",
  impervious: "not allowing fluid to pass through",
  prevalence: "the amount of an existing condition in a population",
  precedent: "an earlier example or decision that may guide a later one",
  proximity: "nearness in space or distance",
  liquidity: "available cash or assets readily converted to cash",
  margin: "a difference, edge, or business measure such as profit margin",
  redundancy: "independent backup capacity",
  remediation: "corrective action for a harmful condition",
  adverse: "harmful or unfavorable",
  scalable: "able to grow while continuing to function",
  guarantee: "promise with certainty",
  ignore: "pay no attention to",
  certainty: "complete confidence that something is true",
  tradeoff: "a balancing choice where gaining one benefit limits another",
  variance: "a difference between planned or expected and actual results",
  fatigue: "progressive material damage from repeated stress",
  bioaccumulation: "buildup of a substance inside an organism over time",
  disclosure: "making relevant required information known"
};

function wordMeaning(word) {
  const normalized = String(word || "").toLowerCase();
  try {
    const entry = [
      "hs-mitigate", "hs-equitable", "hs-multimodal", "hs-triage", "hs-prevalence", "hs-proximity",
      "hs-liquidity", "hs-scalable", "hs-contingency", "hs-redundancy", "hs-tolerance", "hs-compliance",
      "hs-watershed", "hs-biodiversity", "hs-remediation", "hs-ordinance", "hs-substantiate", "hs-impartial",
      "hs-tradeoff", "hs-incidence", "hs-variance", "hs-fatigue", "hs-bioaccumulation", "hs-disclosure"
    ].map((id) => getVocabularyWord(id)).find((item) => item.word.toLowerCase() === normalized);
    if (entry) return entry.definition;
  } catch {
    // Fall through to concise built-in meanings.
  }
  return plainMeaning[normalized] || "a different professional idea than the one this evidence calls for";
}

function retryContext(entry, originalStem, attempt = 1) {
  const contexts = Array.isArray(entry.contexts) ? entry.contexts : [];
  const start = Math.max(0, Number(attempt || 1) - 1) % Math.max(1, contexts.length);
  for (let offset = 0; offset < contexts.length; offset += 1) {
    const sentence = contexts[(start + offset) % contexts.length];
    const pattern = new RegExp(`\\b${entry.word.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\b`, "i");
    if (pattern.test(sentence)) return sentence.replace(pattern, "______");
  }
  return originalStem;
}

export function diagnoseProfessionalPrecision(project, response, attempt = 1) {
  const choice = String(response || "").trim();
  const normalized = choice.toLowerCase();
  const type = repairTypeByChoice[project.id]?.[normalized] || "generic";
  const catalog = repairCatalog[type] || repairCatalog.generic;
  const entry = getVocabularyWord(project.targetWordId);
  return {
    type,
    title: catalog.title,
    principle: catalog.principle,
    cue: catalog.cue,
    chosen: choice,
    chosenMeaning: wordMeaning(choice),
    target: entry.word,
    targetMeaning: entry.definition,
    retryStem: retryContext(entry, project.vocabulary.stem, attempt),
    message: `You chose “${choice}.” That means ${wordMeaning(choice)}. “${entry.word}” means ${entry.definition.toLowerCase()}`
  };
}

export function clearProfessionalPrecisionRepair(active) {
  if (!active?.precisionRepair) return active;
  const { precisionRepair, ...rest } = active;
  return rest;
}
