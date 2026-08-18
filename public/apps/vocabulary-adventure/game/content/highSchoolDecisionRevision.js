export const lateEvidenceImpactOptions = [
  { id: "corroborates", label: "Corroborates", detail: "The new evidence independently supports the main direction of the preliminary decision." },
  { id: "weakens", label: "Weakens", detail: "The new evidence does not overturn the decision, but it reduces confidence, scope, or certainty." },
  { id: "conflicts", label: "Conflicts", detail: "The new evidence directly clashes with an important fact, assumption, or condition used in the preliminary decision." },
  { id: "more-information", label: "Requires more information", detail: "The update raises a material question that cannot be resolved responsibly from the current record." },
  { id: "revision-required", label: "Requires revision", detail: "A verified change in conditions means the preliminary recommendation no longer fits the situation as filed." }
];

export const decisionResponseOptions = [
  { id: "keep", label: "Keep the preliminary recommendation", detail: "The new evidence strengthens or confirms the same professional direction." },
  { id: "narrow", label: "Keep it, but narrow the claim or scope", detail: "Proceed cautiously while reducing certainty, reach, or implementation scope." },
  { id: "investigate", label: "Pause and gather or compare more evidence", detail: "Do not force a final call while a material uncertainty remains unresolved." },
  { id: "revise", label: "Revise the recommendation before proceeding", detail: "Change the professional decision because the updated record no longer supports the original filing." }
];

const U = (source, method, timing, finding, limitation) => ({ source, method, timing, finding, limitation });
const D = (update, impactPrompt, impactAnswer, responsePrompt, responseAnswer, filedResult, teaching) => ({
  update,
  impactPrompt,
  impactAnswer,
  responsePrompt,
  responseAnswer,
  filedResult,
  teaching
});

export const professionalDecisionRevisions = {
  "rain-ready-plaza": D(
    U("Geotechnical infiltration memo", "Field infiltration tests at proposed permeable zones", "Received after preliminary concept review", "Two test locations infiltrate much more slowly than the planning assumption; underdrains would be needed beneath part of the permeable system.", "The tests cover the proposed conversion zones, not every soil condition across the district."),
    "How does the infiltration memo affect the preliminary permeable-paving and rain-garden recommendation?",
    "weakens",
    "What is the most responsible response to the update?",
    "narrow",
    "Keep the rain-ready strategy, but narrow the design claim and require underdrain/detail verification where infiltration is poor.",
    { impact: "The memo does not erase the runoff problem or the value of permeable treatment, but it weakens the assumption that infiltration alone will work everywhere.", response: "A professional can keep the direction while narrowing the implementation claim and adding the newly documented condition." }
  ),
  "shade-equity-corridor": D(
    U("Utility coordination survey", "Subsurface utility locate and constructability review", "After preliminary stop priorities were filed", "The three hottest high-use stops remain the highest-need locations; one stop cannot support a large tree pit, but a shade canopy fits without blocking sight lines.", "Constructability differs by stop, so one shade treatment should not be copied everywhere."),
    "What does the utility survey do to the preliminary priority decision?",
    "corroborates",
    "What should the team do next?",
    "keep",
    "Keep the highest-need stop priority while adapting the shade treatment to each site's constraints.",
    { impact: "The new survey independently confirms that the priority locations are still correct even though the exact design method varies.", response: "Corroborating evidence supports keeping the decision; the team can adapt implementation without abandoning the evidence-based priority." }
  ),
  "multimodal-connection": D(
    U("Accessible-route user walk", "Observed trip with riders using mobility devices, bicycle users, and bus transfers", "One week after preliminary filing", "Participants encounter the same stair barrier, boarding-zone bicycle conflict, and extra crossings documented in the original audits.", "The walk is a small observed group and does not measure every rider's experience."),
    "How does the user walk affect the integrated transfer-spine recommendation?",
    "corroborates",
    "What is the most responsible response?",
    "keep",
    "Keep the integrated multimodal transfer recommendation and continue detailed design with the documented accessibility constraints.",
    { impact: "The late observation independently reproduces the same cross-mode barriers already in the record.", response: "When new credible evidence corroborates the same problem pattern, the preliminary direction can remain in place." }
  ),
  "heat-response-triage": D(
    U("National Weather Service update", "Official heat advisory and hourly forecast", "Issued during the field review", "Dangerous heat is now expected two hours earlier than forecast, increasing the urgency of completing high-risk visits before midday.", "Weather forecasts can still change, so operational teams should continue monitoring official updates."),
    "How does the forecast update affect the risk-ranked outreach queue?",
    "corroborates",
    "What should the team do?",
    "keep",
    "Keep the risk-ranked triage plan and execute it earlier while continuing to route emergency symptoms out of the routine queue.",
    { impact: "The new timing increases urgency but supports the same risk-based triage logic rather than replacing it.", response: "A corroborating update can strengthen the need to act without changing the underlying professional rule." }
  ),
  "asthma-prevalence-map": D(
    U("Registry quality-control report", "Duplicate-record and enrollment reconciliation", "After the first prevalence map was reviewed", "Several duplicate records were removed, reducing the apparent difference between two mapped areas, although a smaller pattern remains.", "The corrected registry still counts known cases only and does not establish cause."),
    "What does the corrected registry do to the preliminary pattern interpretation?",
    "weakens",
    "What should the team do next?",
    "narrow",
    "Keep the recommendation for follow-up study, but describe the geographic pattern more cautiously and use the corrected counts.",
    { impact: "The pattern did not disappear, but its size is smaller than first reported, so confidence in the strength of the difference should decrease.", response: "Weakening evidence calls for narrower language, not pretending the earlier magnitude is still supported." }
  ),
  "clinic-proximity-access": D(
    U("Transit operations notice", "Verified route-change review", "Received after preliminary access recommendation", "A temporary construction detour that added about 12 minutes has ended, but the infrequent schedule and unsafe inaccessible crossing remain.", "Trip times may improve somewhat, but the continuing barriers still affect practical access."),
    "How does the restored bus route affect the preliminary access diagnosis?",
    "weakens",
    "What is the most responsible response?",
    "narrow",
    "Keep the safe-crossing and transit-coordination direction, but update the travel-time claim and avoid attributing the full delay to current service.",
    { impact: "One contributor to long trips has been removed, weakening the original travel-time magnitude while leaving the core access barriers intact.", response: "The responsible response is to narrow the claim to the barriers that remain supported." }
  ),
  "grocer-liquidity-plan": D(
    U("Revised catering terms", "Signed customer payment addendum", "Received before final cash-plan filing", "The two largest catering clients agree to 50% deposits at booking, reducing the period in which the grocer pays major costs before receiving cash.", "Deposits reduce the timing gap but do not eliminate payroll, supplier, or unexpected cash needs."),
    "How do the signed deposit terms affect the preliminary liquidity strategy?",
    "corroborates",
    "What should the business do?",
    "keep",
    "Keep the faster-receivable and cash-buffer strategy; the signed deposits are evidence that the recommended timing change is working.",
    { impact: "The update directly implements one of the cash-timing remedies and supports the logic of the preliminary plan.", response: "Corroboration supports keeping the strategy while retaining a reasonable operating buffer." }
  ),
  "pilot-scalability-review": D(
    U("Vendor scale simulation", "Third-party model using proposed kitchen and routing changes", "Submitted after preliminary expansion review", "The simulation predicts acceptable service at 600 weekly orders if new equipment and routing software perform as specified.", "The result is modeled and has not yet been demonstrated in live operations at that volume."),
    "How should the team classify this modeled scale result?",
    "more-information",
    "What is the most responsible response?",
    "investigate",
    "Do not leap directly to full expansion; run a controlled higher-volume field test before changing the staged-growth recommendation.",
    { impact: "A promising model raises a meaningful possibility but does not resolve whether the system actually performs at scale.", response: "When the key uncertainty is performance under real conditions, gather evidence instead of treating a simulation as proof." }
  ),
  "supplier-contingency": D(
    U("Rail carrier service bulletin", "Official network operations notice", "Issued after the contingency trigger was drafted", "The threatened closure has been canceled and the primary supplier confirms an eight-day shipment, inside the current 12-day stock window.", "Future disruptions remain possible, so the contingency plan itself should still be retained for later activation."),
    "How does the verified cancellation affect the preliminary decision to activate the backup supplier now?",
    "revision-required",
    "What should the business do?",
    "revise",
    "Revise the immediate decision: keep the contingency plan ready, but do not activate the backup purchase while the documented trigger is no longer present.",
    { impact: "The factual condition that would have triggered the contingency has changed, so the preliminary activation no longer fits the current record.", response: "Good decision-making updates the action when verified conditions change instead of defending an obsolete trigger." }
  ),
  "pump-redundancy": D(
    U("Electrical single-point-failure review", "Independent controls and power-path tracing", "Completed after the backup-pump concept was selected", "The proposed backup pump uses a separate control circuit but both pumps still depend on the same flood-prone upstream switchgear.", "The review identifies a common failure path; it does not determine the final replacement design."),
    "How does the single-point-failure review affect the proposed redundancy concept?",
    "conflicts",
    "What should the engineering team do?",
    "revise",
    "Revise the backup design so the supposed redundant system does not share the same critical failure point.",
    { impact: "The new review directly conflicts with the assumption that the backup is independent.", response: "When a critical new fact defeats the condition that made the design redundant, the recommendation must change before approval." }
  ),
  "bridge-tolerance": D(
    U("Calibrated remeasurement record", "Second measurement with recently calibrated instrument and witnessed quality check", "Completed before installation", "The plate first reported at 203.4 mm measures 201.7 mm on the calibrated check, within the approved 200 ± 2 mm tolerance.", "The original instrument discrepancy must still be documented and investigated for other affected measurements."),
    "How does the witnessed remeasurement affect the hold on this plate?",
    "revision-required",
    "What should quality control do?",
    "revise",
    "Revise the part disposition to in-range after documenting the verified remeasurement, while separately investigating the faulty instrument.",
    { impact: "The verified dimension changes the status of the part itself, so the prior out-of-range hold no longer matches the best evidence.", response: "Revising a decision after better measurement is correct quality practice, not inconsistency." }
  ),
  "utility-compliance-review": D(
    U("Revised enclosure drawing", "Stamped design revision and clearance dimension check", "Submitted after the noncompliance finding", "The service clearance is increased from 27 inches to 38 inches while all other required access zones remain clear.", "Approval still depends on confirming the revised drawing is the version actually constructed."),
    "How does the stamped revision affect the preliminary 'revise before approval' recommendation?",
    "revision-required",
    "What should the reviewer do?",
    "revise",
    "Revise the status to eligible for approval of the corrected design, subject to normal construction verification.",
    { impact: "The condition that made the earlier design noncompliant has been corrected in the reviewed revision.", response: "Once a verified correction satisfies the published standard, the professional decision should update rather than preserve an outdated rejection." }
  ),
  "watershed-restoration": D(
    U("Upstream sediment tracing survey", "Rain-event turbidity sampling and ditch-source comparison", "Completed after preliminary source-tracing recommendation", "One road ditch consistently contributes the largest early turbidity pulse before water reaches the restored stream bank.", "The survey identifies a major contributor but does not prove it is the only sediment source."),
    "How does the tracing survey affect the preliminary watershed recommendation?",
    "corroborates",
    "What is the responsible response?",
    "keep",
    "Keep the upstream-source strategy and move into targeted control design for the documented ditch while continuing to monitor other contributors.",
    { impact: "The late evidence directly supports the earlier conclusion that the restored bank was not the isolated source of the storm signal.", response: "Corroboration can justify moving from broad investigation toward a more targeted next step without claiming exclusivity." }
  ),
  "habitat-biodiversity": D(
    U("Fifth-season field survey", "Repeat transects after a recent maintenance disturbance", "One month after the original four-visit series", "Plot B still contains more native taxa than Plot A, but observed frogs and flowering plants are temporarily lower than in the earlier visits.", "One post-disturbance visit may reflect a temporary condition rather than a permanent shift."),
    "How does the fifth survey affect confidence in the original biodiversity comparison?",
    "weakens",
    "What should the field team do?",
    "narrow",
    "Keep Plot B as the stronger current biodiversity example, but narrow certainty about the size and stability of the difference and continue repeat surveys.",
    { impact: "The newer result reduces the apparent strength of the pattern without reversing which plot remains more diverse.", response: "Weakening evidence calls for calibrated confidence and continued observation." }
  ),
  "brownfield-remediation": D(
    U("Field screening sweep", "Portable XRF screening around the planned courtyard", "Received after targeted cleanup boundaries were drafted", "Several additional shallow locations show elevated screening values outside the two laboratory-confirmed zones.", "Screening is useful for locating possible hotspots, but the new locations require confirmatory laboratory samples before final cleanup boundaries are expanded."),
    "How should the team treat the new screening results?",
    "more-information",
    "What is the most responsible response?",
    "investigate",
    "Pause final cleanup-boundary filing and collect confirmatory laboratory samples at the new screening locations.",
    { impact: "The screening raises a material possibility of a broader affected area but is not the same as validated confirmatory laboratory evidence.", response: "The professional response is to resolve the new uncertainty before either ignoring it or declaring the whole area contaminated." }
  ),
  "ordinance-reading": D(
    U("City clerk enactment notice", "Certified ordinance record", "Posted after the preliminary summary was drafted", "The proposed vending amendment has now been adopted and its effective date has begun, adding the two zones and extended Friday hours.", "The exact current rule still comes from the certified enacted text, not from earlier public comments."),
    "How does the enactment notice affect the preliminary summary of current law versus proposed changes?",
    "conflicts",
    "What should the civic communication team do?",
    "revise",
    "Revise the public summary so the formerly proposed changes are now described as current enacted law.",
    { impact: "The earlier distinction between current rule and draft proposal is now factually outdated because the legal status changed.", response: "A public summary must track the current authoritative record, even when that requires changing a previously accurate statement." }
  ),
  "claim-substantiation": D(
    U("Eighteen-month crash follow-up", "Official crash-record review", "Received after the six-week pilot claim was drafted", "No pedestrian crashes are recorded during the follow-up, but the intersection has too few total events to establish a reliable change in crash risk.", "A zero count in a low-frequency outcome does not prove that future crashes are impossible or that the treatment caused the result."),
    "Does the longer follow-up now justify a strong claim that the design prevents crashes?",
    "more-information",
    "What should the agency do?",
    "investigate",
    "Keep reporting the measured yielding improvement and continue longer-term outcome evaluation rather than upgrading the claim to crash prevention.",
    { impact: "The longer follow-up is useful, but the low event count still cannot support the causal or zero-risk claim being considered.", response: "When an outcome is rare, more observation and appropriate comparison are needed before strengthening the claim." }
  ),
  "hearing-impartiality": D(
    U("Clerk recusal record", "Official hearing docket and substitute-member notice", "Filed before substantive deliberation", "The reviewer who made the prior public commitment recuses, and a qualified substitute with no disclosed conflict is seated before the evidence is evaluated.", "The replacement process resolves the documented reviewer issue but does not determine the merits of the permit itself."),
    "How does the completed recusal process affect the preliminary process recommendation?",
    "revision-required",
    "What should the hearing body do?",
    "revise",
    "Revise the procedural status: the documented impartiality concern has been addressed, so the properly constituted body can proceed to evaluate the record under the published criteria.",
    { impact: "The earlier recommendation was to address the predetermined commitment; the official recusal record shows that corrective step has now occurred.", response: "A professional process decision should update when the required safeguard is actually completed." }
  ),
  "cooling-access-equity": D(
    U("Emergency site opening report", "Verified facility and transit-access check", "Received after the allocation proposal", "A new temporary accessible cooling site opens in Neighborhood C with direct shuttle service, materially reducing the documented access gap during the current heat event.", "Capacity and operating hours still need monitoring if demand rises."),
    "How does the newly opened site affect the preliminary case for adding more capacity in Neighborhood C immediately?",
    "weakens",
    "What is the responsible response?",
    "narrow",
    "Keep need-based monitoring, but narrow the immediate expansion claim and reassess capacity using the new site before adding another location.",
    { impact: "The neighborhood remains high-risk, but the access condition used to justify immediate additional capacity has materially improved.", response: "Weakening evidence means recalibrating the size and timing of the intervention rather than ignoring the new resource." }
  ),
  "flood-risk-mitigation": D(
    U("Updated extreme-event model", "Revised hydrologic simulation using a higher-intensity storm scenario", "Completed after the preliminary mitigation plan", "The elevated emergency route remains usable in the design event but is overtopped in the newly modeled extreme scenario.", "The extreme model is a scenario, not a prediction of when such an event will occur."),
    "How does the extreme-event model affect the assumption that the emergency route remains available during high water?",
    "conflicts",
    "What should the design team do?",
    "revise",
    "Revise the resilience plan to provide an additional emergency-access strategy or route protection for conditions beyond the original design event.",
    { impact: "The late model directly conflicts with treating the route as universally available during all high-water conditions.", response: "When new credible analysis reveals failure outside the original scenario, the design should change rather than preserve an overbroad assumption." }
  ),
  "vendor-compliance-audit": D(
    U("Supplier cure submission", "Document verification against issuing body", "Received within the published cure period", "The bidder submits a current valid product-safety certificate; insurance remains current and the issuing body confirms the certificate.", "The supplier must still satisfy the rest of the solicitation requirements before award."),
    "How does the verified cure submission affect the preliminary hold on award?",
    "revision-required",
    "What should procurement do?",
    "revise",
    "Revise the deficiency status to cured and continue the bidder through the normal remaining eligibility review rather than treating the expired certificate as unresolved.",
    { impact: "The specific documentation deficiency that justified the hold has been corrected within the allowed process.", response: "A fair compliance process updates status when valid cure evidence arrives; it does not preserve a resolved deficiency as if nothing changed." }
  ),
  "curb-space-tradeoff": D(
    U("Emergency access operations memo", "Fire-department curb-access review during evening peak", "Received after the managed-curb concept was filed", "The proposed loading zone leaves the required emergency-clear area intact if delivery hours end 30 minutes earlier than first proposed.", "The memo addresses emergency access but does not measure whether delivery demand can shift without operational cost."),
    "How does the emergency-access review affect the preliminary managed-curb concept?",
    "corroborates",
    "What should the mobility team do?",
    "keep",
    "Keep the managed-curb concept and incorporate the verified earlier loading cutoff into the operating rules.",
    { impact: "The new review independently confirms that the concept can preserve a critical safety constraint with a specific operating adjustment.", response: "Corroborating evidence supports the same design direction while allowing the operating detail to be refined." }
  ),
  "new-case-incidence-watch": D(
    U("Laboratory reconciliation file", "Match of report dates, symptom-onset dates, and laboratory confirmation", "Completed after the provisional trend was drafted", "Four additional records were entered this week but began in the previous reporting period, reducing the apparent current-window increase.", "Several records still lack complete onset dates and remain excluded from the exact period comparison."),
    "How does the reconciled timing file affect the preliminary claim that new-case incidence sharply increased this period?",
    "weakens",
    "What is the responsible reporting response?",
    "narrow",
    "Keep the corrected incidence monitoring, but narrow the claim about the size of the increase and clearly identify the unresolved timing records.",
    { impact: "The corrected dates reduce the apparent size of the current increase without eliminating the usefulness of incidence monitoring.", response: "Weakening evidence calls for a narrower claim and transparent uncertainty rather than preserving the original magnitude." }
  ),
  "budget-variance-review": D(
    U("Fuel-surcharge termination notice", "Signed carrier notice and revised rate sheet", "Received before the next quarterly forecast is finalized", "The temporary fuel surcharge ends next month, while emergency rerouting frequency has returned to normal.", "Future fuel prices can still change, but the two documented causes of the quarter's spike are no longer active."),
    "How does the carrier update affect a preliminary plan to permanently raise the full delivery-cost budget by the amount of this quarter's variance?",
    "revision-required",
    "What should management do?",
    "revise",
    "Revise the next forecast so the one-time surcharge is not carried forward as a permanent cost, while keeping a documented contingency for future disruptions.",
    { impact: "The verified cause of much of the variance has ended, so permanently extending the full spike no longer fits the current facts.", response: "Variance analysis should update forecasts based on which causes are actually expected to continue." }
  ),
  "bridge-fatigue-check": D(
    U("Nondestructive evaluation report", "Ultrasonic and dye-penetrant inspection by qualified structural team", "Received after the initial crack escalation", "The surface crack extends deeper than visual inspection showed but remains confined to the connection detail; the engineer recommends immediate temporary load restriction and repair design.", "The evaluation identifies the crack extent but does not predict an exact failure date."),
    "How does the nondestructive evaluation affect the preliminary monitoring-only posture?",
    "revision-required",
    "What should the engineering team do?",
    "revise",
    "Revise the response to include the engineer-directed temporary load restriction and repair design while continuing documented monitoring.",
    { impact: "The better inspection establishes a more serious condition than the preliminary visual record, so monitoring alone no longer matches the best evidence.", response: "When qualified evaluation changes the documented severity, the professional response must change with it." }
  ),
  "fish-bioaccumulation-review": D(
    U("Upstream source-tracing study", "Targeted sediment, discharge, and tributary sampling", "Completed after the tissue-buildup finding", "The highest sediment and water concentrations consistently occur downstream of one historical industrial area, but multiple smaller tributary inputs are also detected.", "The pattern identifies a major likely contributor without proving it is the only source."),
    "How does the source-tracing study affect the preliminary decision to keep source attribution separate from the bioaccumulation finding?",
    "corroborates",
    "What should the environmental team do?",
    "keep",
    "Keep the bioaccumulation finding, add the documented major-source evidence, and continue investigating additional contributors rather than declaring a single exclusive source.",
    { impact: "The new study adds credible source evidence while preserving the original tissue-buildup interpretation.", response: "Corroborating evidence can deepen the case without erasing the limitation that multiple contributors remain possible." }
  ),
  "conflict-disclosure-review": D(
    U("Independent ethics determination", "Written review by the designated ethics officer", "Issued after corrected disclosure and temporary pause", "The financial interest is covered by the policy and requires recusal from the affected procurement; no finding of intentional concealment is made on the current record.", "The determination applies to this procurement matter and does not make a broader finding about unrelated conduct."),
    "How does the ethics determination affect the preliminary recommendation to disclose the interest and pause participation pending review?",
    "corroborates",
    "What should the agency do?",
    "keep",
    "Keep the corrected disclosure in the record and implement the required recusal for this procurement, while avoiding unsupported claims of intentional misconduct.",
    { impact: "The independent determination confirms that the disclosure-and-review process was necessary and identifies the required safeguard.", response: "The final response should implement the actual finding while preserving the boundary of what the review did and did not conclude." }
  )
};

export function getProfessionalDecisionRevision(projectOrId) {
  const id = typeof projectOrId === "string" ? projectOrId : projectOrId?.id;
  const definition = professionalDecisionRevisions[id];
  if (!definition) throw new Error(`No professional decision-revision definition for ${id}.`);
  return definition;
}
