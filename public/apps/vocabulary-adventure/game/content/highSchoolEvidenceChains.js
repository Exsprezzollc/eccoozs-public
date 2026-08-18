const chain = (supportingEvidenceIds, controllingConstraintIndex, assumptionOptions, teaching = {}) => ({
  supportingEvidenceIds,
  controllingConstraintIndex,
  assumptionOptions,
  teaching: {
    evidence: teaching.evidence || "Choose the evidence that directly supports the professional decision, not every fact that happens to appear in the brief.",
    constraint: teaching.constraint || "A controlling constraint is the guardrail that most directly limits what the recommendation may claim or do.",
    assumption: teaching.assumption || "Evidence is observed, measured, documented, or required. An assumption adds something the record has not established."
  }
});

export const professionalEvidenceChains = {
  "rain-ready-plaza": chain(
    ["surface", "rain"],
    2,
    [
      { text: "The surface and storm observations show a runoff problem the design can reduce.", assumption: false },
      { text: "The accessible route must remain usable while drainage improvements are added.", assumption: false },
      { text: "Permeable paving will eliminate every drop of runoff in every future storm.", assumption: true }
    ]
  ),
  "shade-equity-corridor": chain(
    ["heat", "riders"],
    2,
    [
      { text: "Heat exposure and rider use can justify prioritizing some stops before others.", assumption: false },
      { text: "Sight-line and boarding requirements still limit where shade features may go.", assumption: false },
      { text: "The fairest plan must spend exactly the same amount on every block regardless of need.", assumption: true }
    ]
  ),
  "multimodal-connection": chain(
    ["transfer", "bike"],
    2,
    [
      { text: "Transfer patterns and bicycle conflicts show that several travel modes affect one another.", assumption: false },
      { text: "Accessible movement still has to work through the redesigned connection.", assumption: false },
      { text: "Improving vehicle traffic alone will automatically solve rail, bus, walking, and bicycle conflicts.", assumption: true }
    ]
  ),
  "heat-response-triage": chain(
    ["risk", "capacity"],
    1,
    [
      { text: "Documented risk and limited team capacity support prioritizing outreach.", assumption: false },
      { text: "Emergency symptoms must be routed to the proper emergency service rather than treated as routine outreach.", assumption: false },
      { text: "Every person on the outreach list has the same urgency because everyone is affected by hot weather.", assumption: true }
    ]
  ),
  "asthma-prevalence-map": chain(
    ["current", "new"],
    0,
    [
      { text: "The registry describes a current burden while the new-diagnosis count describes a different measure.", assumption: false },
      { text: "The map can guide where more study may be useful without proving causation.", assumption: false },
      { text: "The descriptive map proves that one environmental source caused every mapped asthma case.", assumption: true }
    ]
  ),
  "clinic-proximity-access": chain(
    ["distance", "travel"],
    0,
    [
      { text: "Map distance and actual travel time can describe different parts of access.", assumption: false },
      { text: "Walking, transit, and mobility barriers belong in the access decision.", assumption: false },
      { text: "A clinic that is less than a mile away must be easy for every resident to reach.", assumption: true }
    ]
  ),
  "grocer-liquidity-plan": chain(
    ["cash", "suppliers"],
    1,
    [
      { text: "The cash schedule shows when money is actually available for near-term obligations.", assumption: false },
      { text: "Supplier and payroll timing matters even when the business reports a profit.", assumption: false },
      { text: "A profitable month guarantees that enough cash is available on every day of that month.", assumption: true }
    ]
  ),
  "pilot-scalability-review": chain(
    ["kitchen", "routing"],
    1,
    [
      { text: "Kitchen and routing capacity reveal limits that matter when demand grows.", assumption: false },
      { text: "A strong pilot can still require new systems before larger expansion.", assumption: false },
      { text: "Because the small pilot performed well, the identical setup can absorb any larger demand without change.", assumption: true }
    ]
  ),
  "supplier-contingency": chain(
    ["stock", "delay"],
    2,
    [
      { text: "Current stock and the supplier notice establish a possible coverage gap.", assumption: false },
      { text: "A backup plan should have a defined trigger rather than activate from panic alone.", assumption: false },
      { text: "The supplier delay is certain to last exactly as long as the worst-case rumor suggests.", assumption: true }
    ]
  ),
  "pump-redundancy": chain(
    ["failure", "power"],
    1,
    [
      { text: "Failure history and the power/control review show why an independent backup path matters.", assumption: false },
      { text: "A backup that shares the same single failure point may not provide true redundancy.", assumption: false },
      { text: "Any system with two pumps is automatically redundant even if both depend on the same failed control circuit.", assumption: true }
    ]
  ),
  "bridge-tolerance": chain(
    ["drawing", "sample"],
    0,
    [
      { text: "The drawing defines an acceptable range and the measurements can be compared with that range.", assumption: false },
      { text: "A measured part outside the allowed range needs engineering disposition before acceptance.", assumption: false },
      { text: "Any measurement that is not exactly the nominal dimension is automatically a failed part.", assumption: true }
    ]
  ),
  "utility-compliance-review": chain(
    ["standard", "proposal"],
    0,
    [
      { text: "The published clearance requirement can be compared directly with the proposed enclosure.", assumption: false },
      { text: "Maintenance access is part of the approval requirement, not an optional preference.", assumption: false },
      { text: "A cheaper enclosure can be approved below the published minimum because cost is more important than compliance.", assumption: true }
    ]
  ),
  "watershed-restoration": chain(
    ["map", "storm"],
    0,
    [
      { text: "The drainage map and storm timing can connect upstream areas to downstream muddy flow.", assumption: false },
      { text: "A stable restored streambank does not rule out sediment entering from connected upstream drainage.", assumption: false },
      { text: "Because the local restored bank looks stable, no upstream source can be contributing sediment.", assumption: true }
    ]
  ),
  "habitat-biodiversity": chain(
    ["plot-b", "repeat"],
    0,
    [
      { text: "A broader mix of organisms observed repeatedly supports a biodiversity comparison.", assumption: false },
      { text: "Repeated surveys are stronger evidence than judging ecological quality from one observation.", assumption: false },
      { text: "Finding one unusual species once proves that the entire site has high biodiversity.", assumption: true }
    ]
  ),
  "brownfield-remediation": chain(
    ["sample", "use"],
    2,
    [
      { text: "Laboratory results and the proposed future use determine where corrective work is needed.", assumption: false },
      { text: "Cleanup has to be verified before affected public-use areas are treated as ready.", assumption: false },
      { text: "Because most samples are acceptable, the documented contaminated area can be described as already resolved.", assumption: true }
    ]
  ),
  "ordinance-reading": chain(
    ["current", "proposal"],
    1,
    [
      { text: "The adopted text establishes the current rule while the draft describes a possible future change.", assumption: false },
      { text: "Public comments may support or oppose a change without becoming the law themselves.", assumption: false },
      { text: "A proposed amendment becomes current law as soon as someone describes it at a public meeting.", assumption: true }
    ]
  ),
  "claim-substantiation": chain(
    ["pilot", "crash"],
    0,
    [
      { text: "Pilot observations can support a narrow measured claim about what was actually observed.", assumption: false },
      { text: "Longer-term safety outcomes require evidence beyond a short pilot observation period.", assumption: false },
      { text: "A short pilot proving better yielding establishes that the treatment prevents every future crash.", assumption: true }
    ]
  ),
  "hearing-impartiality": chain(
    ["statement", "process"],
    1,
    [
      { text: "A promised outcome before the record is reviewed raises a direct impartiality concern.", assumption: false },
      { text: "The published process requires conflicts or prior commitments to be addressed.", assumption: false },
      { text: "A reviewer who publicly promised a result can be assumed to evaluate both sides impartially without any process response.", assumption: true }
    ]
  ),
  "cooling-access-equity": chain(
    ["risk", "travel"],
    0,
    [
      { text: "Higher heat risk and worse travel access can justify directing more temporary capacity to one area.", assumption: false },
      { text: "Baseline accessible service still has to remain available in every service area.", assumption: false },
      { text: "Equity requires identical spending in every neighborhood even when risk and access barriers differ.", assumption: true }
    ]
  ),
  "flood-risk-mitigation": chain(
    ["depth", "limit"],
    0,
    [
      { text: "The model can show reduced flood depth while still retaining residual risk.", assumption: false },
      { text: "The emergency route must remain usable under the design conditions considered.", assumption: false },
      { text: "A modeled reduction in flood depth means no future flood can affect the neighborhood.", assumption: true }
    ]
  ),
  "vendor-compliance-audit": chain(
    ["standard", "file"],
    1,
    [
      { text: "The published vendor requirement can be checked against the supplier file.", assumption: false },
      { text: "The allowed cure process can correct missing documentation before a final award decision.", assumption: false },
      { text: "A lower price automatically cancels any missing safety or documentation requirement.", assumption: true }
    ]
  ),
  "curb-space-tradeoff": chain(
    [
  "use",
  "bike"
],
    0,
    [
  {
    "text": "Peak curb-use counts and observed bicycle conflicts show that several demands compete within one limited curb lane.",
    "assumption": false
  },
  {
    "text": "Accessible bus boarding remains a required design condition even if another use has high demand.",
    "assumption": false
  },
  {
    "text": "The block can provide unlimited space for every curb use at the same time without changing operations or geometry.",
    "assumption": true
  }
]
  ),
  "new-case-incidence-watch": chain(
    [
  "new",
  "lag"
],
    1,
    [
  {
    "text": "New-case records and timing corrections determine which cases belong in the current incidence window.",
    "assumption": false
  },
  {
    "text": "The population denominator must match the period and participating group being described.",
    "assumption": false
  },
  {
    "text": "Every existing case in the schools began during the current four-week reporting period.",
    "assumption": true
  }
]
  ),
  "budget-variance-review": chain(
    [
  "budget",
  "actual"
],
    1,
    [
  {
    "text": "The approved budget and actual ledger establish the amount of the variance.",
    "assumption": false
  },
  {
    "text": "Invoice evidence is needed to distinguish temporary causes from ongoing cost changes.",
    "assumption": false
  },
  {
    "text": "Any unfavorable cost variance proves that the entire business is unprofitable.",
    "assumption": true
  }
]
  ),
  "bridge-fatigue-check": chain(
    [
  "crack",
  "cycles"
],
    2,
    [
  {
    "text": "The new crack and repeated-load history support a fatigue-focused engineering evaluation.",
    "assumption": false
  },
  {
    "text": "The approved escalation process still controls how the bridge is evaluated and managed.",
    "assumption": false
  },
  {
    "text": "A 7 mm surface crack proves the bridge will fail at a specific time even without engineering analysis.",
    "assumption": true
  }
]
  ),
  "fish-bioaccumulation-review": chain(
    [
  "tissue",
  "age"
],
    1,
    [
  {
    "text": "Tissue concentration and age pattern support concern about buildup within organisms over time.",
    "assumption": false
  },
  {
    "text": "Source attribution remains a separate question that requires source-tracing evidence.",
    "assumption": false
  },
  {
    "text": "The tissue pattern alone proves which specific facility released the contaminant.",
    "assumption": true
  }
]
  ),
  "conflict-disclosure-review": chain(
    [
  "record",
  "policy"
],
    1,
    [
  {
    "text": "The ownership record establishes a covered interest that was absent from the filed disclosure.",
    "assumption": false
  },
  {
    "text": "The ethics rule defines the process for disclosure and determining the required safeguard.",
    "assumption": false
  },
  {
    "text": "The existence of a covered interest automatically proves intentional misconduct before any review occurs.",
    "assumption": true
  }
]
  )
};

export function getProfessionalEvidenceChain(projectOrId) {
  const id = typeof projectOrId === "string" ? projectOrId : projectOrId?.id;
  const definition = professionalEvidenceChains[id];
  if (!definition) throw new Error(`No professional evidence-chain definition for ${id}.`);
  return definition;
}
