export const sourceConfidenceOptions = [
  { id: "ready", label: "Decision-ready", detail: "The available evidence is strong enough for the narrow claim being considered." },
  { id: "provisional", label: "Provisional", detail: "The evidence supports a cautious working conclusion, but an important limitation should remain visible." },
  { id: "insufficient", label: "Not enough evidence yet", detail: "The claim goes beyond what the available sources can establish responsibly." }
];

const S = (evidenceId, source, method, scope, timing, caveat) => ({ evidenceId, source, method, scope, timing, caveat });
const O = (text, correct = false) => ({ text, correct });
const J = (sources, strongestEvidenceId, strengthPrompt, limitationOptions, confidencePrompt, confidenceAnswer, teaching) => ({
  sources,
  strongestEvidenceId,
  strengthPrompt,
  limitationOptions,
  confidence: { prompt: confidencePrompt, answer: confidenceAnswer },
  teaching
});

export const professionalSourceJudgments = {
  "rain-ready-plaza": J(
    [
      S("surface", "Municipal surface inventory", "Field-measured surface classification", "Entire plaza footprint", "Current design season", "Describes surface condition, not the size of every future storm."),
      S("rain", "Facilities storm log", "Recorded entrance flooding during severe events", "East entrance and plaza edge", "Three recent heavy-storm events", "Useful for observed impacts but based on a small number of extreme events."),
      S("access", "Accessibility compliance audit", "On-site route inspection against adopted accessibility criteria", "Central pedestrian corridor", "Current quarter", "Strong for access requirements, but it does not measure stormwater volume.")
    ],
    "surface",
    "Which source gives the strongest direct evidence that the plaza surface itself contributes to runoff?",
    [
      O("The storm log covers only a few extreme events, so it should not be treated as a complete record of every rainfall condition.", true),
      O("The accessibility audit is useless because it is not a stormwater study."),
      O("The surface inventory proves that permeable paving will eliminate all runoff.")
    ],
    "Can the team claim that the proposed changes will eliminate stormwater runoff in every future storm?",
    "insufficient",
    { strength: "A field-measured inventory directly describes how much of the plaza is impervious.", limitation: "A strong source can still have a limited scope. The storm log is relevant but does not represent every possible rainfall condition.", confidence: "The evidence supports mitigation, not a universal promise of elimination." }
  ),
  "shade-equity-corridor": J(
    [
      S("heat", "Mobile heat-sensor survey", "Repeated surface-temperature readings", "Transit stops and comparison walk", "Five hot afternoons this summer", "Strong for heat exposure during sampled conditions, not every season or hour."),
      S("riders", "Transit fare-count report", "Boarding counts from validated system data", "Study-area stops", "Most recent 30-day period", "Measures use, not heat exposure by itself."),
      S("sight", "Traffic-safety review", "Intersection sight-line and lighting assessment", "Priority stop corners", "Current design review", "Authoritative for safety constraints, not resource need.")
    ],
    "heat",
    "Which source most directly establishes where heat exposure is highest?",
    [
      O("The heat survey was collected on hot afternoons, so it supports heat-priority decisions but should not be generalized to every season.", true),
      O("Ridership data alone proves which stop is hottest."),
      O("A safety review makes heat measurements unnecessary.")
    ],
    "Is the evidence strong enough to prioritize the hottest, highest-use stops while preserving safety constraints?",
    "ready",
    { strength: "The heat survey directly measures the condition being prioritized.", limitation: "Good evidence remains tied to the conditions under which it was collected.", confidence: "Heat, ridership, and safety sources address different parts of the same decision and jointly support a narrow priority recommendation." }
  ),
  "multimodal-connection": J(
    [
      S("transfer", "Station transfer audit", "Timed route observation and crossing count", "Rail-to-bus transfer paths", "Current service pattern", "Represents typical observed transfers, not every rider's mobility needs."),
      S("bike", "Conflict observation map", "Peak-period field observation", "Boarding area and bicycle route", "Three weekday peaks", "Peak observations may miss off-peak conflicts."),
      S("access", "Accessibility route review", "Physical route and barrier inspection", "Shortest transfer routes", "Current conditions", "Strong for physical accessibility, not travel demand.")
    ],
    "transfer",
    "Which source most directly shows that the rail-to-bus connection itself is inefficient?",
    [
      O("The bicycle conflict map was collected during peak periods, so it may not describe the frequency of conflicts at all times.", true),
      O("The transfer audit proves every rider uses both rail and bus."),
      O("The accessibility review means travel-time evidence should be ignored.")
    ],
    "Can the team conclude that the connection needs coordinated changes across more than one travel mode?",
    "ready",
    { strength: "A transfer audit directly measures the movement the project is trying to improve.", limitation: "Peak-period conflict observations are useful but should not be treated as a complete all-day count.", confidence: "Multiple independent sources identify transfer, bicycle, and accessibility problems, supporting a multimodal response." }
  ),
  "heat-response-triage": J(
    [
      S("risk", "Public-health risk register", "Documented vulnerability factors from intake records", "Open outreach requests", "Updated this morning", "Risk factors support prioritization but do not diagnose medical conditions."),
      S("capacity", "Operations staffing board", "Verified team schedule and visit capacity", "Today's two outreach teams", "Current shift", "Capacity can change if emergencies or staff absences occur."),
      S("emergency", "Emergency-response protocol", "Adopted clinical escalation rule", "Severe heat-illness symptoms", "Current protocol", "Defines escalation; it does not rank routine outreach cases.")
    ],
    "risk",
    "Which source should carry the most weight when deciding which routine outreach requests have the greatest documented vulnerability?",
    [
      O("The risk register supports prioritization but cannot be used to infer a medical diagnosis that was never documented.", true),
      O("The staffing board can determine which residents are medically highest risk."),
      O("The emergency protocol proves every routine request is an emergency.")
    ],
    "Is the evidence enough to prioritize routine outreach by documented risk while routing severe symptoms to emergency services?",
    "ready",
    { strength: "The risk register directly contains the documented factors the prioritization rule is allowed to use.", limitation: "Operational records are not diagnostic records.", confidence: "The team has enough evidence for triage priority, but not for diagnosing individual medical conditions." }
  ),
  "asthma-prevalence-map": J(
    [
      S("current", "De-identified school health registry", "Current-case count", "Participating schools", "This semester", "Represents known current cases and may miss undiagnosed or unreported cases."),
      S("new", "Diagnosis-timing extract", "Administrative record review", "Same participating schools", "Mixed historical records", "Diagnosis dates are incomplete, so incidence cannot be calculated reliably."),
      S("limits", "Study-method note", "Analyst review of design limitations", "Entire descriptive map", "Current analysis", "Explains what the study cannot establish; it does not add new cases.")
    ],
    "current",
    "Which source is strongest for describing the current known asthma burden in the participating schools?",
    [
      O("The registry includes known cases, so the map may undercount students whose asthma is undiagnosed or not reported.", true),
      O("Incomplete diagnosis dates can still produce an exact incidence rate."),
      O("A descriptive map can identify the single cause of every case.")
    ],
    "Can the team conclude from this descriptive map that one environmental source caused the asthma pattern?",
    "insufficient",
    { strength: "The registry is designed to count currently known cases, so it fits a prevalence-style description.", limitation: "Known-case registries can miss unreported cases, and incomplete timing prevents a reliable incidence measure.", confidence: "A geographic pattern may justify further study, but it does not establish causation." }
  ),
  "clinic-proximity-access": J(
    [
      S("distance", "GIS distance analysis", "Mapped network and straight-line distance", "East-side homes to clinic", "Current street network", "Distance alone does not capture schedule, crossing, or mobility barriers."),
      S("travel", "Resident travel-time survey", "Reported trip times across walking and transit trips", "East-side sample", "Last 60 days", "Self-reported times are useful but come from a sample rather than every resident."),
      S("mobility", "Accessibility field review", "Crossing and route inspection", "Direct walking route", "Current conditions", "Strong for physical barriers, not average trip duration.")
    ],
    "travel",
    "Which source most directly shows how long access actually takes under current travel conditions?",
    [
      O("The travel-time survey is a sample, so its results should describe typical reported access rather than every resident's exact trip.", true),
      O("Map distance alone captures every transit and mobility barrier."),
      O("The mobility review proves the clinic is farther away in miles.")
    ],
    "Is the evidence enough to say that short map distance does not guarantee easy clinic access?",
    "ready",
    { strength: "Travel-time observations measure experienced access more directly than distance alone.", limitation: "Survey samples describe patterns and should not be presented as exact for every resident.", confidence: "Distance, travel time, and a documented crossing barrier consistently support the access conclusion." }
  ),
  "grocer-liquidity-plan": J(
    [
      S("profit", "Monthly income statement", "Accrual accounting report", "Whole business", "Last four months", "Profit timing does not show when cash is actually received or paid."),
      S("cash", "13-week cash schedule", "Dated inflow and outflow forecast tied to invoices", "Near-term operations", "Updated this week", "Forecasts can change if customer payment timing changes."),
      S("suppliers", "Signed supplier terms", "Contract review", "Two core suppliers", "Current contracts", "Covers supplier due dates, not payroll or every expense.")
    ],
    "cash",
    "Which source is strongest for judging whether the grocer can meet near-term obligations on the dates they come due?",
    [
      O("The cash schedule is a forecast, so delayed customer payments can change the result and should be monitored.", true),
      O("A profitable income statement guarantees cash is available every day."),
      O("Supplier terms show the exact amount of cash in the bank.")
    ],
    "Can the team make a near-term cash plan using the current schedule while continuing to monitor actual payment timing?",
    "provisional",
    { strength: "Liquidity is about cash availability when obligations come due, so the dated cash schedule is the best fit.", limitation: "Forecasts are decision tools, not promises; actual payment timing can move.", confidence: "The plan is supportable, but it should remain provisional and be updated as receipts arrive." }
  ),
  "pilot-scalability-review": J(
    [
      S("pilot", "Pilot performance dashboard", "Operational metrics at current demand", "120 weekly orders", "Last eight weeks", "Strong for current scale but does not test higher demand."),
      S("kitchen", "Capacity time study", "Measured production throughput under safe procedures", "Current kitchen", "Recent stress test", "Assumes current staffing and equipment configuration."),
      S("routing", "Route simulation and live test", "Travel-time test above eight simultaneous routes", "Delivery network", "Two test weeks", "Limited to the tested routing pattern and traffic conditions.")
    ],
    "kitchen",
    "Which source most directly identifies a hard production constraint on expansion?",
    [
      O("The routing test covers limited traffic conditions, so expansion planning should continue to monitor route performance.", true),
      O("A successful 120-order pilot proves unlimited scalability."),
      O("Kitchen capacity is irrelevant because customer demand is strong.")
    ],
    "Is the evidence enough to approve an unlimited citywide expansion using the exact current setup?",
    "insufficient",
    { strength: "A measured capacity study directly shows where the current kitchen reaches its safe limit.", limitation: "Routing and capacity tests are bounded by the conditions tested.", confidence: "The evidence supports staged expansion planning, not an unlimited scale claim." }
  ),
  "supplier-contingency": J(
    [
      S("stock", "Inventory management system", "Verified days-on-hand calculation", "Compliant packaging stock", "Today's count", "Usage can accelerate if demand changes."),
      S("delay", "Primary supplier service notice", "Official range estimate", "Rail-dependent shipments", "Issued today", "The delay window is uncertain and may change."),
      S("backup", "Qualified vendor file", "Approved-vendor and lead-time verification", "Alternate supplier", "Verified this quarter", "Lead time is expected, not guaranteed under a widespread disruption.")
    ],
    "delay",
    "Which source best establishes that there is genuine uncertainty about how long the disruption may last?",
    [
      O("The supplier gives a range rather than a fixed delay, so the contingency trigger should respond to updated information.", true),
      O("The upper end of a delay range is certain to occur."),
      O("A qualified backup vendor guarantees zero disruption under every condition.")
    ],
    "Is the evidence enough to create a trigger-based backup plan without claiming the delay duration is certain?",
    "ready",
    { strength: "The official supplier notice directly describes the disruption range the contingency must address.", limitation: "A range communicates uncertainty, not a guaranteed worst case.", confidence: "Current stock, a documented delay range, and a qualified backup are enough for a conditional plan." }
  ),
  "pump-redundancy": J(
    [
      S("demand", "Hydraulic load model", "Modeled flow demand against pump rating", "Pump station service area", "Current design storm", "Model results depend on the selected design event."),
      S("failure", "Maintenance failure log", "Recorded unplanned shutdown history", "Primary pump", "Five-year history", "A small number of failures does not predict the exact date of the next failure."),
      S("power", "Electrical engineering review", "Circuit and backup-load assessment", "Station controls and power", "Current design review", "Confirms capacity for the proposed backup, not all possible future upgrades.")
    ],
    "power",
    "Which source most directly establishes whether an independent backup pump can avoid the same control failure point?",
    [
      O("Failure history shows that outages have occurred, but it cannot predict exactly when another failure will happen.", true),
      O("Two pumps are automatically redundant even if they share one failed control circuit."),
      O("A load model can prove a control circuit is independent without an electrical review.")
    ],
    "Is the evidence enough to recommend a smaller backup on a separate control circuit for the current design conditions?",
    "ready",
    { strength: "The electrical review directly evaluates the independence needed for redundancy.", limitation: "Historical failures establish risk, not a precise failure forecast.", confidence: "Demand, failure history, and independent power capacity align around the proposed backup concept." }
  ),
  "bridge-tolerance": J(
    [
      S("drawing", "Approved fabrication drawing", "Contract-controlled dimensional requirement", "Plate width", "Current revision", "Authoritative limit, but measurements still need to be taken correctly."),
      S("sample", "Calibrated inspection record", "Direct dimensional measurement", "Fabricated plate sample", "Current lot", "Represents measured pieces, not unmeasured parts."),
      S("process", "Quality-control procedure", "Approved disposition workflow", "Out-of-range parts", "Current procedure", "Defines what to do after a nonconformance; it does not change the drawing limit.")
    ],
    "drawing",
    "Which source is authoritative for the allowable dimensional range?",
    [
      O("The sample measurements apply to the pieces actually measured; unmeasured pieces should not be assumed identical.", true),
      O("The quality procedure can redefine the drawing tolerance whenever a part is expensive."),
      O("Any value different from the nominal dimension is automatically out of tolerance.")
    ],
    "Is the evidence enough to determine that the 203.4 mm measured plate is outside the approved 200 ± 2 mm range?",
    "ready",
    { strength: "The approved drawing establishes the acceptance range.", limitation: "Inspection results should not be generalized to pieces that were not measured.", confidence: "The requirement and the measured value are both explicit, so the narrow tolerance conclusion is decision-ready." }
  ),
  "utility-compliance-review": J(
    [
      S("standard", "Published equipment standard", "Adopted clearance requirement", "Maintenance access", "Current edition", "Authoritative unless a formally approved exception applies."),
      S("proposal", "Dimensioned enclosure drawing", "Design measurement", "Narrowest service point", "Current design revision", "Represents the proposed layout, not the as-built condition."),
      S("cost", "Project cost estimate", "Estimator allowance review", "Enclosure expansion", "Current estimate", "Cost is relevant to feasibility but cannot waive a mandatory clearance requirement.")
    ],
    "standard",
    "Which source should control the minimum maintenance-clearance requirement?",
    [
      O("The proposal is a design drawing, so field verification will still be needed after construction.", true),
      O("A cost estimate can override an adopted safety clearance."),
      O("A published requirement is only a suggestion when the project is under budget.")
    ],
    "Can the current 27-inch proposal be described as compliant with a published 36-inch minimum?",
    "insufficient",
    { strength: "The published standard is the governing source for the minimum requirement.", limitation: "Design drawings describe intent; final compliance also requires the constructed condition to match.", confidence: "The available evidence is actually enough to reject a compliance claim for the current proposal; it is not enough to call the deficient layout compliant." }
  ),
  "watershed-restoration": J(
    [
      S("map", "Watershed drainage map", "Topographic and infrastructure drainage tracing", "Upstream contributing area", "Current mapping", "Shows connectivity, not the amount of sediment from each individual source."),
      S("storm", "Storm-event turbidity samples", "Time-sequenced field sampling", "Upstream-to-restored reach", "Four recent rain events", "Limited number of storms; source apportionment remains uncertain."),
      S("site", "Restored-bank inspection", "Visual and stability inspection", "Local restored reach", "Same four events", "A stable local bank does not identify which upstream source is responsible.")
    ],
    "storm",
    "Which source most directly supports the timing link between upstream rainfall and increased turbidity?",
    [
      O("Four storm events show a repeatable pattern, but they do not quantify exactly how much sediment comes from each upstream contributor.", true),
      O("A stable local bank proves no upstream source contributes sediment."),
      O("A drainage map alone measures turbidity concentration.")
    ],
    "Can the team identify the exact percentage of sediment contributed by each upstream source from these data?",
    "insufficient",
    { strength: "Time-sequenced storm sampling directly tests when turbidity rises relative to upstream flow.", limitation: "A repeated pattern can support a connected-system conclusion without providing source-by-source percentages.", confidence: "The evidence justifies upstream investigation, not exact source apportionment." }
  ),
  "habitat-biodiversity": J(
    [
      S("plot-a", "Plot A field survey", "Standardized species observations", "Plot A", "Four visits", "Detection depends on season, weather, and observer visibility."),
      S("plot-b", "Plot B field survey", "Standardized species observations", "Plot B", "Four visits", "Detection depends on season, weather, and observer visibility."),
      S("repeat", "Survey design record", "Repeated visits under varied weather", "Both plots", "Current field season", "Four visits improve confidence but do not capture every seasonal species.")
    ],
    "repeat",
    "Which source most directly strengthens confidence that the observed difference is not just a one-visit accident?",
    [
      O("Four visits improve reliability, but the survey still may not capture species present in other seasons.", true),
      O("One unusual species observed once proves the whole habitat has high biodiversity."),
      O("Repeated observations make seasonal variation impossible.")
    ],
    "Is the evidence enough to make a cautious within-season comparison that Plot B shows greater observed biodiversity?",
    "provisional",
    { strength: "Repeated sampling is what turns a one-time observation into a more reliable comparison.", limitation: "A field season is still a limited window into annual biodiversity.", confidence: "The comparison is supportable as a provisional observed pattern, not a complete inventory of every season." }
  ),
  "brownfield-remediation": J(
    [
      S("sample", "Accredited laboratory report", "Validated lead analysis", "Shallow-soil sampling zones", "Current investigation", "Samples describe tested locations; unsampled areas remain uncertain."),
      S("depth", "Subsurface depth profile", "Layered soil sampling", "Affected and comparison zones", "Current investigation", "Sampling density limits how precisely boundaries can be drawn."),
      S("use", "Adopted redevelopment concept", "Land-use and exposure-pathway review", "Public courtyard and residential access", "Current design", "Future use can change, which would change exposure assumptions.")
    ],
    "sample",
    "Which source most directly establishes that cleanup criteria are exceeded in documented shallow-soil zones?",
    [
      O("Laboratory samples establish conditions at tested locations; they do not prove every unsampled location has the same concentration.", true),
      O("Most deeper samples being acceptable means the documented shallow exceedances are already resolved."),
      O("A future-use plan can replace laboratory testing.")
    ],
    "Is the evidence enough to require corrective action in the documented exceedance zones before public use?",
    "ready",
    { strength: "Validated laboratory results directly measure the contaminant against the cleanup criterion.", limitation: "Sampling supports conclusions about tested areas and should not be overextended to unsampled ground.", confidence: "The documented exceedances and planned public exposure make the narrow corrective-action decision ready." }
  ),
  "ordinance-reading": J(
    [
      S("current", "Adopted municipal code", "Official enacted text", "Current vending rules", "Current code edition", "Authoritative until formally amended or invalidated."),
      S("proposal", "Draft amendment", "Proposed legislative text", "Possible future rules", "Pending", "Not law unless adopted through the required process."),
      S("comment", "Public meeting comment", "Individual speaker statement", "Speaker's interpretation", "Recent hearing", "May express experience or opinion but is not authoritative legal text.")
    ],
    "current",
    "Which source is authoritative for what the vending rule says today?",
    [
      O("A public comment may be sincere and still conflict with the enacted code; it should not be treated as the governing rule.", true),
      O("A draft amendment becomes law as soon as it is published for discussion."),
      O("The adopted code is less reliable than a single speaker's memory of the rule.")
    ],
    "Is the evidence enough to state the current rule by quoting and accurately summarizing the adopted code?",
    "ready",
    { strength: "For the current legal rule, the enacted text is the primary authoritative source.", limitation: "Comments and proposals can matter politically without changing the current law.", confidence: "The current rule is decision-ready when the adopted text is clear; proposed changes must be labeled as proposals." }
  ),
  "claim-substantiation": J(
    [
      S("pilot", "Six-week field observation", "Before-and-during yielding observation", "Pilot crossing", "Six weeks", "Short duration supports an observed behavior change, not long-term crash outcomes."),
      S("crash", "Police crash history", "Recorded collision review", "Pilot intersection", "Multi-year history, but too little post-pilot time", "Cannot yet establish a reliable post-treatment crash trend."),
      S("design", "Engineering field note", "On-site geometry observation", "Crossing layout", "Current pilot", "Describes design conditions but does not measure future driver behavior.")
    ],
    "pilot",
    "Which source best supports a narrow public statement that observed yielding improved during the pilot?",
    [
      O("The pilot lasted only six weeks, so it cannot establish a reliable long-term crash reduction.", true),
      O("Improved yielding proves the treatment prevents every future crash."),
      O("A field note about shorter crossing distance is enough to calculate a long-term crash trend.")
    ],
    "Can the agency publish the claim that the treatment prevents future crashes based on the current evidence?",
    "insufficient",
    { strength: "Direct before-and-during observations are the right source for a narrow yielding claim.", limitation: "Short pilots are especially vulnerable to overclaiming long-term outcomes.", confidence: "The evidence can substantiate an observed yielding improvement, not a promise of crash prevention." }
  ),
  "hearing-impartiality": J(
    [
      S("criteria", "Adopted permit criteria", "Official code findings", "Permit decision", "Current code", "Governing criteria, but they must still be applied to the hearing record."),
      S("statement", "Recorded reviewer statement", "Public meeting recording and transcript", "One reviewer's prior commitment", "Before record opened", "Strong evidence of the statement, not proof of the reviewer's internal motive."),
      S("process", "Hearing procedure rule", "Adopted conflict and record rule", "Review process", "Current procedure", "Defines required process response rather than the final permit merits.")
    ],
    "statement",
    "Which source most directly establishes that a reviewer publicly committed to an outcome before the evidence record opened?",
    [
      O("The recorded statement documents a prior commitment, but it does not by itself prove every later thought or motive of the reviewer.", true),
      O("A prior public promise is irrelevant because the reviewer can never have a conflict."),
      O("The permit criteria themselves prove what the reviewer said publicly.")
    ],
    "Is the evidence enough to trigger the published conflict/impartiality process without claiming to know the reviewer's private motive?",
    "ready",
    { strength: "A recording and transcript directly establish the public statement at issue.", limitation: "Evidence of conduct should not be inflated into unsupported claims about private intent.", confidence: "The process concern is decision-ready even though motive remains unknown." }
  ),
  "cooling-access-equity": J(
    [
      S("risk", "Heat-vulnerability index", "Combined temperature, age, housing, and cooling indicators", "Service neighborhoods", "Current heat season", "Composite indices simplify complex individual conditions."),
      S("travel", "Transit access analysis", "Scheduled and observed trip-time comparison", "Routes to cooling centers", "Current service schedule", "Service disruptions can change actual travel time."),
      S("coverage", "Facility access inventory", "Verified accessible-site count", "Existing cooling centers", "Current week", "Site count does not show whether capacity is sufficient during a surge.")
    ],
    "risk",
    "Which source most directly identifies where documented heat vulnerability is greatest?",
    [
      O("A vulnerability index summarizes population-level risk and should not be treated as an individual medical diagnosis.", true),
      O("Existing site count proves each site has unlimited capacity."),
      O("Transit access data alone determine heat vulnerability.")
    ],
    "Is the evidence enough to prioritize additional temporary capacity in Neighborhood C while keeping baseline access elsewhere?",
    "ready",
    { strength: "The vulnerability index directly addresses the need dimension of an equity decision.", limitation: "Population-level indices guide allocation but do not diagnose individuals.", confidence: "Risk, travel barriers, and existing coverage together support the targeted allocation." }
  ),
  "flood-risk-mitigation": J(
    [
      S("depth", "Hydrologic flood model", "Calibrated design-event simulation", "Neighborhood streets", "Current model run", "Results apply to modeled scenarios and inputs, not every possible storm."),
      S("route", "Emergency access model", "Route-elevation and depth analysis", "Primary evacuation route", "Same design event", "Does not guarantee passability in events beyond the model scenario."),
      S("limit", "Model uncertainty memorandum", "Sensitivity and scenario review", "Project-wide", "Current analysis", "Explicitly identifies conditions outside the model's design range.")
    ],
    "depth",
    "Which source most directly estimates how the proposed measures change shallow-flood depth in the design event?",
    [
      O("The model is tied to selected design scenarios, so more extreme events can produce different outcomes.", true),
      O("A modeled reduction means flooding is impossible in every future event."),
      O("An uncertainty memorandum makes model results worthless.")
    ],
    "Can the team promise that no future flood will affect the neighborhood after the proposed mitigation?",
    "insufficient",
    { strength: "The calibrated model is the direct source for modeled flood-depth change.", limitation: "Models are conditional on assumptions, scenarios, and input ranges.", confidence: "The evidence supports risk reduction under modeled conditions, not a zero-risk promise." }
  ),
  "vendor-compliance-audit": J(
    [
      S("standard", "Published vendor requirement", "Procurement rule", "Approved suppliers", "Current solicitation", "Governing requirement unless formally amended."),
      S("file", "Supplier compliance file", "Document verification", "Low-price bidder", "Current review", "A file can be updated during an allowed cure period."),
      S("cure", "Procurement procedure", "Adopted cure-process rule", "Missing documentation", "Current procedure", "Allows correction but does not waive the underlying requirement.")
    ],
    "file",
    "Which source most directly establishes the bidder's current documentation status?",
    [
      O("The supplier file is a point-in-time status and may change if valid documents are submitted during the allowed cure period.", true),
      O("A cure period means the requirement no longer applies."),
      O("A lower price is stronger evidence of compliance than the compliance file.")
    ],
    "Is the evidence enough to pause final award, allow the published cure period, and then re-check compliance?",
    "provisional",
    { strength: "The supplier file directly shows what documentation is currently on record.", limitation: "Because the procedure permits cure, today's deficiency is not necessarily the final status.", confidence: "A provisional hold and re-check is supported; immediate permanent rejection would overstate the current evidence." }
  ),
  "curb-space-tradeoff": J(
    [
      S("use", "Curb-use observation study", "Timed curb occupancy and dwell observations", "Commercial block and evening peak", "Six recent weekdays", "Peak-period observations do not describe every hour of the day."),
      S("bus", "Transit accessibility standard review", "Stop-layout check against adopted boarding requirements", "Existing bus stop", "Current design review", "Defines required access but does not measure delivery demand."),
      S("bike", "Conflict observation map", "Field observation of vehicle-bicycle crossing movements", "Intersection approach and curb lane", "Four peak periods", "Shows observed conflict locations, not the exact probability of a crash.")
    ],
    "use",
    "Which source most directly establishes how several curb uses compete for the same limited space during the peak period?",
    [
      O("The curb-use study is concentrated in peak periods, so it should not be generalized to every hour without additional observation.", true),
      O("The transit accessibility standard can be ignored because it does not count deliveries.", false),
      O("The conflict map proves that every bicycle trip will result in a crash.", false)
    ],
    "Is the evidence strong enough to recommend a managed curb concept that preserves required access while reducing peak conflicts?",
    "ready",
    { strength: "Timed curb-use observation directly measures the competing demand the design must manage.", limitation: "A strong peak-period source still has a time boundary.", confidence: "The use, access, and conflict sources address different parts of the same limited-space decision and support a narrow operational recommendation." }
  ),
  "new-case-incidence-watch": J(
    [
      S("new", "School health new-case register", "Documented symptom-onset and report review", "Participating schools", "Current four-week window", "Late reports can place cases in the wrong period until onset dates are reconciled."),
      S("population", "Enrollment register", "Administrative population count", "Participating schools", "Same reporting window", "Enrollment is a denominator and does not identify who became ill."),
      S("lag", "Reporting quality review", "Record-by-record timing audit", "Cases entered during the current window", "Current data-cleaning cycle", "Some onset dates may remain incomplete even after review.")
    ],
    "new",
    "Which source most directly identifies the newly occurring cases needed for an incidence measure?",
    [
      O("Reporting lag can move cases into the wrong period unless onset timing is reconciled before comparing incidence across windows.", true),
      O("Enrollment alone can identify how many new cases occurred.", false),
      O("Every currently unresolved case should be counted as newly occurring this month.", false)
    ],
    "Can the team publish an exact final incidence comparison before the late reports and missing onset dates are fully reconciled?",
    "provisional",
    { strength: "The new-case register is the direct source for newly occurring cases.", limitation: "Time-window errors matter because incidence depends on when new cases occur.", confidence: "The current record supports a provisional trend, but exact period comparison should remain qualified until timing corrections are complete." }
  ),
  "budget-variance-review": J(
    [
      S("budget", "Approved operating budget", "Board-approved quarterly plan", "Refrigerated delivery cost center", "Current quarter", "The budget is a planning baseline, not evidence of what was actually spent."),
      S("actual", "General-ledger actuals", "Posted transaction totals", "Same cost center", "Closed current quarter", "Ledger totals show the difference but do not by themselves explain the cause."),
      S("cause", "Invoice and route exception review", "Document review of surcharges and emergency reroutes", "Major delivery invoices above threshold", "Current quarter", "Explains documented major causes but may not capture every small contributor.")
    ],
    "actual",
    "Which source most directly establishes what the business actually spent during the quarter?",
    [
      O("The ledger establishes actual cost, but the reason for the variance requires separate cause evidence such as invoices and route records.", true),
      O("The approved budget proves actual spending must have matched the plan.", false),
      O("A variance automatically means the business lost money overall.", false)
    ],
    "Is the record strong enough to identify and explain the material delivery-cost variance for this quarter?",
    "ready",
    { strength: "Posted actual transactions are the direct record of what was spent.", limitation: "Actuals establish the difference; cause records explain why it occurred.", confidence: "Budget, actual, and cause records are aligned enough to support a narrow quarterly variance explanation." }
  ),
  "bridge-fatigue-check": J(
    [
      S("crack", "Close visual inspection record", "Documented surface inspection with crack measurement", "Specific welded hanger connection", "Current inspection", "A visible crack identifies a condition requiring evaluation but does not by itself establish remaining life or failure timing."),
      S("cycles", "Bridge use and load-cycle estimate", "Service-count history and maintenance-vehicle log", "Connection loading history", "Recent five-year operating record", "Cycle estimates approximate repeated loading rather than measuring every stress event directly."),
      S("history", "Prior inspection archive", "Comparison with last close inspection photographs and notes", "Same connection", "18 months earlier", "Absence from a prior record does not prove a microscopic crack was impossible at that time.")
    ],
    "crack",
    "Which source most directly establishes the current physical condition that requires fatigue-focused engineering review?",
    [
      O("The visible crack supports escalation, but its size alone does not establish imminent failure or remaining service life.", true),
      O("Repeated load cycles prove the exact crack length without an inspection.", false),
      O("A prior record with no visible crack proves fatigue cannot develop later.", false)
    ],
    "Is the evidence strong enough to require engineering evaluation and documented monitoring of the crack without declaring imminent failure?",
    "ready",
    { strength: "The current inspection directly documents the physical crack.", limitation: "Condition evidence can justify escalation without supporting an unsupported prediction of failure timing.", confidence: "Crack, repeated-load, and history evidence support a fatigue-focused review while preserving uncertainty about severity and remaining life." }
  ),
  "fish-bioaccumulation-review": J(
    [
      S("tissue", "Accredited fish-tissue laboratory report", "Chemical analysis of sampled fish tissue", "Target species and age groups from the lake", "Current monitoring season", "Tissue results describe sampled organisms and do not identify the contaminant source by themselves."),
      S("water", "Lake water-monitoring program", "Repeated grab samples at established stations", "Open-water monitoring stations", "Six sampling rounds this season", "Water concentrations can vary over time and may not reflect long-term organism exposure directly."),
      S("age", "Biological age-and-tissue analysis", "Age classification paired with tissue concentration", "Sampled target species", "Current monitoring season", "Association with age supports a buildup pattern but does not by itself prove a particular source or pathway.")
    ],
    "tissue",
    "Which source most directly establishes that the contaminant is present at elevated concentrations inside the sampled organisms?",
    [
      O("Fish-tissue evidence can support a bioaccumulation concern without identifying the exact contaminant source.", true),
      O("One low water concentration proves tissue concentrations must also be low.", false),
      O("An age pattern alone names the facility responsible for contamination.", false)
    ],
    "Is the evidence strong enough to describe a bioaccumulation pattern while keeping source attribution separate?",
    "ready",
    { strength: "Tissue analysis directly measures the contaminant inside organisms.", limitation: "Buildup evidence and source-identification evidence answer different questions.", confidence: "The combined tissue, water, and age pattern supports a narrow bioaccumulation interpretation, not an unsupported source accusation." }
  ),
  "conflict-disclosure-review": J(
    [
      S("form", "Filed panel conflict form", "Required signed disclosure record", "Panel member's reported covered interests", "Filed before procurement review", "The form records what was disclosed; it does not prove undisclosed interests do not exist."),
      S("record", "Verified public ownership filing", "Official ownership record lookup", "Documented financial interest in supplier", "Current filing period", "Ownership establishes the interest, not whether the ethics rule ultimately requires recusal."),
      S("policy", "Adopted ethics and disclosure policy", "Rule-text review", "Covered procurement conflicts and review procedure", "Current policy", "The policy defines process and thresholds but does not decide facts by itself.")
    ],
    "record",
    "Which source most directly establishes that the financial interest actually exists?",
    [
      O("The ownership record establishes the interest, but the ethics policy still has to be applied before concluding what safeguard or finding is required.", true),
      O("The blank conflict form proves no financial interest can exist.", false),
      O("Any disclosed interest automatically proves intentional misconduct.", false)
    ],
    "Is the evidence strong enough to require corrected disclosure and formal conflict review before the member continues on the affected matter?",
    "ready",
    { strength: "The verified ownership filing directly establishes the interest that was omitted from the form.", limitation: "Evidence of an interest and a final ethics finding are separate steps.", confidence: "The record is sufficient to require disclosure and review, while the final safeguard or finding still follows the published procedure." }
  )
};

export function getProfessionalSourceJudgment(projectOrId) {
  const id = typeof projectOrId === "string" ? projectOrId : projectOrId?.id;
  const definition = professionalSourceJudgments[id];
  if (!definition) throw new Error(`No professional source-judgment definition for ${id}.`);
  return definition;
}
