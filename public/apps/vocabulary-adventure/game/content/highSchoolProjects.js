const professionalDomains = [
  { id: "civic-design", name: "Civic Design District", shortName: "Civic Design", roleFamily: "Planning & Mobility" },
  { id: "community-health", name: "Community Health District", shortName: "Community Health", roleFamily: "Public Health" },
  { id: "business-operations", name: "Business Operations District", shortName: "Business Operations", roleFamily: "Business & Finance" },
  { id: "infrastructure-engineering", name: "Infrastructure Engineering District", shortName: "Engineering", roleFamily: "Engineering & Systems" },
  { id: "environmental-science", name: "Environmental Science District", shortName: "Environmental Science", roleFamily: "Environment & Field Science" },
  { id: "civic-communication", name: "Civic & Legal Communication District", shortName: "Civic Communication", roleFamily: "Policy & Communication" }
];

export const highSchoolDomains = professionalDomains;
export const highSchoolDomainById = new Map(professionalDomains.map((domain) => [domain.id, domain]));

const P = (domainId, data) => ({
  domainId,
  district: highSchoolDomainById.get(domainId)?.name || "Professional District Network",
  domainName: highSchoolDomainById.get(domainId)?.shortName || "Professional Practice",
  ...data
});

export const civicProjects = [
  P("civic-design", {
    id: "rain-ready-plaza", briefNumber: "Impact Brief 02", title: "Rain-Ready Plaza", role: "Junior Urban Planner", targetWordId: "hs-mitigate",
    objective: "Reduce stormwater stress without overstating what the design can accomplish.",
    problem: "During intense rain, water sheets across the plaza toward the riverfront walk and two building entrances.",
    constraints: ["Keep a clear accessible pedestrian route", "Stay within the current construction footprint", "Avoid claiming that runoff can be eliminated completely"],
    labels: ["Permeable paving", "Native planting", "Pedestrian corridor"],
    evidence: [
      { id: "surface", label: "Surface test", value: "82% of the existing plaza area is impervious." },
      { id: "rain", label: "Rain event", value: "Water reaches the east entrance during the district's heaviest storms." },
      { id: "access", label: "Access audit", value: "The central corridor must remain firm, stable, slip resistant, and unobstructed." }
    ],
    vocabulary: { stem: "The proposal seeks to ______ stormwater runoff by allowing more rain to filter through the plaza surface.", options: ["mitigate", "eliminate", "postpone"], answer: "mitigate", teaching: "Mitigate means reduce the severity or harmful effect. The design can reduce runoff; it cannot guarantee that all runoff disappears." },
    reasoning: { prompt: "Which explanation best supports the vocabulary choice?", options: ["Permeable paving can reduce runoff while some water may still leave the site during intense storms.", "Any improvement that reduces runoff must eliminate runoff completely.", "The word only describes when construction should begin."], answerIndex: 0, teaching: "Professional language should match the strength of the evidence. Reduction is supported; total elimination is not." },
    recommendation: { prompt: "Choose the recommendation that best fits the evidence and constraints.", options: [
      { label: "Permeable paving + native rain gardens", detail: "Keep the accessible center corridor while converting selected drainage zones to permeable paving and planted infiltration beds." },
      { label: "Seal the entire plaza", detail: "Add another impervious surface layer and direct all water to the same drains." },
      { label: "Remove the pedestrian corridor", detail: "Turn the full plaza into planting beds, including the required accessible route." }
    ], answerIndex: 0, teaching: "The preferred concept responds to runoff while preserving the required pedestrian route." },
    consequence: { headline: "Runoff pathway improved", summary: "The recommendation adds infiltration areas while preserving the central pedestrian corridor. The district model now shows slower surface flow toward the riverfront.", worldChange: "BLUE FLOW PATHS ACTIVATED", nextObjective: "A different professional district may call next." }
  }),
  P("civic-design", {
    id: "shade-equity-corridor", briefNumber: "Impact Brief 03", title: "Shade Equity Corridor", role: "Junior Urban Planner", targetWordId: "hs-equitable",
    objective: "Prioritize heat protection where exposure and access needs are greatest.",
    problem: "Afternoon surface temperatures vary sharply across the district, and the least shaded stops serve the highest number of riders who wait outdoors.",
    constraints: ["Do not block required sight lines", "Protect accessible boarding zones", "Use need and exposure rather than identical block-by-block spending"],
    labels: ["Heat exposure", "Transit stop", "Tree canopy"],
    evidence: [
      { id: "heat", label: "Heat scan", value: "Three transit stops average 12°F hotter than the shaded riverfront walk in late afternoon." },
      { id: "riders", label: "Ridership", value: "Those same stops serve 41% of afternoon boardings in the study area." },
      { id: "sight", label: "Safety note", value: "Tree placement must preserve intersection sight lines and lighting coverage." }
    ],
    vocabulary: { stem: "A more ______ investment strategy directs shade resources toward locations with greater heat exposure and rider need.", options: ["equitable", "identical", "arbitrary"], answer: "equitable", teaching: "Equitable means fair in a way that accounts for different needs and barriers. It is not the same as giving every location the identical treatment." },
    reasoning: { prompt: "Which explanation best supports the vocabulary choice?", options: ["Different locations can receive different resources when evidence shows different levels of need.", "Fairness always requires identical spending at every location regardless of conditions.", "Heat exposure is irrelevant because only appearance matters."], answerIndex: 0, teaching: "Equity uses relevant differences in need to guide a fair response." },
    recommendation: { prompt: "Choose the recommendation that best fits the evidence and constraints.", options: [
      { label: "Prioritize hottest high-use stops", detail: "Add canopy, shade structures, and seating first at the three hottest high-use stops while protecting sight lines and boarding zones." },
      { label: "One tree per block", detail: "Install exactly one tree on every block even where shade already exists or sight lines would be obstructed." },
      { label: "Shade the lowest-use plaza only", detail: "Direct the full budget to the coolest and least-used location because it is easiest to construct." }
    ], answerIndex: 0, teaching: "The preferred concept directs resources where exposure and use data show the greatest need." },
    consequence: { headline: "Heat exposure reduced", summary: "Priority stops receive new canopy and shade structures while boarding zones and sight lines remain clear.", worldChange: "SHADE NETWORK ACTIVATED", nextObjective: "Continue through the professional district network." }
  }),
  P("civic-design", {
    id: "multimodal-connection", briefNumber: "Impact Brief 04", title: "Riverfront Connection", role: "Junior Urban Planner", targetWordId: "hs-multimodal",
    objective: "Improve transfers between walking, cycling, bus, and rail without sacrificing accessibility.",
    problem: "The rail stop, bus bays, bicycle route, and riverfront walk are close together but poorly connected, forcing indirect transfers.",
    constraints: ["Maintain accessible routes", "Separate high-speed bicycle movement from boarding zones", "Do not evaluate vehicle traffic alone"],
    labels: ["Rail platform", "Bus transfer", "Bicycle route"],
    evidence: [
      { id: "transfer", label: "Transfer audit", value: "The rail-to-bus transfer requires two unnecessary street crossings." },
      { id: "bike", label: "Conflict map", value: "The bicycle route currently cuts through the busiest boarding area." },
      { id: "access", label: "Access review", value: "The shortest route includes a stair-only connection that is not accessible to all riders." }
    ],
    vocabulary: { stem: "The district needs a ______ connection that coordinates rail, bus, bicycle, and pedestrian movement as one system.", options: ["multimodal", "single-mode", "stationary"], answer: "multimodal", teaching: "Multimodal means involving or connecting multiple modes. The problem spans several forms of transportation, so a car-only or rail-only solution is too narrow." },
    reasoning: { prompt: "Which explanation best supports the vocabulary choice?", options: ["The evidence describes several transportation modes whose connections affect one another.", "The correct term should describe only rail because rail appears first in the brief.", "A route becomes multimodal only when every traveler uses every mode."], answerIndex: 0, teaching: "The term describes a system that coordinates multiple modes; individual travelers do not need to use all of them." },
    recommendation: { prompt: "Choose the recommendation that best fits the evidence and constraints.", options: [
      { label: "Integrated transfer spine", detail: "Create a direct accessible pedestrian spine, move the bicycle route behind the boarding zone, and align wayfinding across rail and bus areas." },
      { label: "Rail-only shortcut", detail: "Improve the stair connection but leave bus, bicycle, and accessible transfer conflicts unchanged." },
      { label: "Move all riders through one lane", detail: "Combine bicycles, waiting passengers, pedestrians, and boarding activity in the same narrow path." }
    ], answerIndex: 0, teaching: "The preferred concept coordinates modes while reducing conflict and preserving access." },
    consequence: { headline: "Transfer network connected", summary: "The district model now links rail, bus, bicycle, and pedestrian routes with a clearer accessible transfer spine.", worldChange: "TRANSFER SPINE ACTIVATED", nextObjective: "A new role may be waiting in another district." }
  }),

  P("community-health", {
    id: "heat-response-triage", briefNumber: "Health Brief 07", title: "Heat Response Triage", role: "Community Health Analyst", targetWordId: "hs-triage",
    objective: "Prioritize limited outreach capacity using risk evidence rather than arrival order alone.",
    problem: "A prolonged heat advisory has generated more requests for wellness checks and cooling support than the mobile team can reach at once.",
    constraints: ["Use documented risk factors", "Keep emergency cases separate from routine requests", "Do not infer medical diagnoses from incomplete data"],
    labels: ["Heat advisory", "Risk factors", "Mobile outreach"],
    evidence: [
      { id: "risk", label: "Risk register", value: "Requests include older adults living alone, outdoor workers, and households without reliable cooling." },
      { id: "capacity", label: "Team capacity", value: "Two outreach teams can complete 18 visits before the hottest part of the afternoon." },
      { id: "emergency", label: "Emergency protocol", value: "Severe symptoms must be routed to emergency services rather than placed in the routine visit queue." }
    ],
    vocabulary: { stem: "The team must ______ requests so the most urgent documented risks receive attention first.", options: ["triage", "randomize", "duplicate"], answer: "triage", teaching: "Triage means sorting needs by urgency or priority when resources are limited. It does not mean diagnosing people from a list." },
    reasoning: { prompt: "Which explanation best supports triage here?", options: ["Limited capacity makes it necessary to prioritize documented urgency while sending emergencies to the proper service.", "The fairest method is to ignore risk and visit addresses in alphabetical order.", "Triage means every request receives the same response at the same time."], answerIndex: 0, teaching: "Triage is a prioritization process. The evidence supplies urgency and capacity information for that decision." },
    recommendation: { prompt: "Choose the safest evidence-based outreach plan.", options: [
      { label: "Risk-ranked outreach queue", detail: "Route emergency symptoms out immediately, then prioritize high-risk wellness checks before lower-risk routine requests." },
      { label: "Alphabetical route", detail: "Ignore risk factors and visit homes strictly by street name." },
      { label: "Diagnose by request form", detail: "Assign medical diagnoses from the intake form before any qualified assessment." }
    ], answerIndex: 0, teaching: "The preferred plan prioritizes documented risk without pretending the intake data can replace clinical assessment." },
    consequence: { headline: "Outreach priorities clarified", summary: "The response board separates emergencies from routine outreach and sends limited visits toward the highest documented heat risk first.", worldChange: "RISK QUEUE ACTIVATED", nextObjective: "Another district will require a different kind of precision." }
  }),
  P("community-health", {
    id: "asthma-prevalence-map", briefNumber: "Health Brief 11", title: "Asthma Pattern Review", role: "Community Health Analyst", targetWordId: "hs-prevalence",
    objective: "Describe a community health pattern accurately without confusing existing cases with new cases.",
    problem: "School nurses report a high number of students currently managing asthma in three neighborhoods near major freight routes.",
    constraints: ["Distinguish current burden from newly diagnosed cases", "Protect individual privacy", "Do not claim causation from a descriptive map alone"],
    labels: ["Current cases", "Neighborhood pattern", "Privacy"],
    evidence: [
      { id: "current", label: "Current registry", value: "The de-identified count measures students currently known to be managing asthma this semester." },
      { id: "new", label: "New diagnoses", value: "The dataset does not reliably identify when each student was first diagnosed." },
      { id: "limits", label: "Study limit", value: "The map can show a pattern but cannot by itself prove why the pattern exists." }
    ],
    vocabulary: { stem: "The map is best described as showing asthma ______ because it summarizes existing cases in the population at this time.", options: ["prevalence", "incidence", "certainty"], answer: "prevalence", teaching: "Prevalence describes how common a condition is in a population at a point or period. Incidence focuses on new cases occurring over time." },
    reasoning: { prompt: "Why is prevalence the more precise term?", options: ["The data count existing known cases and do not reliably identify when each case began.", "Prevalence means the map proves the freight routes caused every case.", "Prevalence is another word for a single new diagnosis."], answerIndex: 0, teaching: "The available measure describes current burden, not a rate of newly occurring cases and not a causal explanation." },
    recommendation: { prompt: "Choose the most defensible next step.", options: [
      { label: "Use the pattern to guide further study", detail: "Protect privacy, identify areas with higher current burden, and design a follow-up study before making causal claims." },
      { label: "Publish student-level addresses", detail: "Release identifiable records so the pattern can be inspected publicly." },
      { label: "Declare one proven cause", detail: "State that the map alone proves a single source caused every asthma case." }
    ], answerIndex: 0, teaching: "A descriptive pattern can guide further investigation without exposing individuals or overstating causation." },
    consequence: { headline: "Health pattern documented responsibly", summary: "The analysis distinguishes current burden from new-case rates and flags the neighborhoods for privacy-protective follow-up work.", worldChange: "HEALTH PATTERN LAYER ACTIVATED", nextObjective: "Prepare for another professional role." }
  }),
  P("community-health", {
    id: "clinic-proximity-access", briefNumber: "Health Brief 14", title: "Clinic Access Radius", role: "Community Health Planner", targetWordId: "hs-proximity",
    objective: "Use distance and travel barriers together when evaluating access to neighborhood clinics.",
    problem: "One clinic appears close on a map, yet residents on the east side report long and unreliable trips to reach it.",
    constraints: ["Do not treat straight-line distance as the only access measure", "Account for walking and transit barriers", "Keep the existing clinic open during changes"],
    labels: ["Travel time", "Transit barrier", "Clinic access"],
    evidence: [
      { id: "distance", label: "Map distance", value: "Most east-side homes are within 1.3 miles of the clinic." },
      { id: "travel", label: "Travel-time survey", value: "A highway crossing and infrequent bus service push typical trips above 35 minutes." },
      { id: "mobility", label: "Mobility review", value: "The direct walking route lacks a safe accessible crossing." }
    ],
    vocabulary: { stem: "Geographic ______ alone does not guarantee practical access when barriers make the trip difficult.", options: ["proximity", "jurisdiction", "compliance"], answer: "proximity", teaching: "Proximity means nearness. A place can be physically near while still being hard to reach because access depends on the route and conditions." },
    reasoning: { prompt: "Which statement uses the evidence correctly?", options: ["The clinic is geographically near, but travel barriers reduce practical access for many residents.", "Because the clinic is near on a map, no access problem can exist.", "Proximity means the clinic must move outside the neighborhood."], answerIndex: 0, teaching: "Nearness is one part of access; route quality, travel time, and barriers also matter." },
    recommendation: { prompt: "Choose the best access improvement package.", options: [
      { label: "Safe crossing + transit coordination", detail: "Improve the accessible crossing and coordinate bus frequency while the clinic remains open." },
      { label: "Close the existing clinic", detail: "Remove the nearby service before any replacement access is available." },
      { label: "Ignore travel-time evidence", detail: "Use straight-line distance as the only access measure." }
    ], answerIndex: 0, teaching: "The preferred plan addresses the barriers that make a nearby clinic functionally difficult to reach." },
    consequence: { headline: "Access pathway strengthened", summary: "The district record now separates simple nearness from practical access and identifies the crossing and transit fixes needed.", worldChange: "ACCESS RADIUS ACTIVATED", nextObjective: "Continue to a different professional district." }
  }),

  P("business-operations", {
    id: "grocer-liquidity-plan", briefNumber: "Operations Brief 06", title: "Neighborhood Grocer Cash Plan", role: "Business Operations Analyst", targetWordId: "hs-liquidity",
    objective: "Protect day-to-day operations while the business waits for slow customer payments.",
    problem: "A neighborhood grocer is profitable on paper but struggles to pay suppliers on time because a growing catering account pays 45 days after delivery.",
    constraints: ["Keep payroll and critical suppliers current", "Do not confuse profit with cash on hand", "Avoid unnecessary long-term debt"],
    labels: ["Cash timing", "Supplier terms", "Payroll"],
    evidence: [
      { id: "profit", label: "Income statement", value: "The business earned a positive monthly profit for the last four months." },
      { id: "cash", label: "Cash schedule", value: "Large catering invoices are paid 30–45 days after food and labor costs are incurred." },
      { id: "suppliers", label: "Supplier terms", value: "Two core suppliers require payment within 14 days." }
    ],
    vocabulary: { stem: "The immediate problem is ______: the business needs enough accessible cash to meet near-term obligations.", options: ["liquidity", "branding", "jurisdiction"], answer: "liquidity", teaching: "Liquidity is the availability of cash or assets that can quickly become cash. A business can be profitable and still face a liquidity problem when cash arrives too late." },
    reasoning: { prompt: "Which explanation best fits the evidence?", options: ["Positive profit does not solve the timing gap between early expenses and later customer payments.", "A profitable business can never have a cash shortage.", "Liquidity measures only the color and appearance of the store."], answerIndex: 0, teaching: "Profit measures earnings; liquidity focuses on whether cash is available when bills are due." },
    recommendation: { prompt: "Choose the most targeted operating response.", options: [
      { label: "Shorten receivable timing + preserve cash buffer", detail: "Negotiate deposits or faster catering terms and maintain a defined operating cash reserve for payroll and critical suppliers." },
      { label: "Buy unnecessary equipment", detail: "Use available cash for nonessential equipment while supplier invoices remain due." },
      { label: "Ignore payment timing", detail: "Assume positive profit guarantees that cash will always be available on the exact day needed." }
    ], answerIndex: 0, teaching: "The preferred response targets the timing mismatch rather than treating profit and cash as the same thing." },
    consequence: { headline: "Cash timing stabilized", summary: "The operating plan now protects payroll and supplier commitments while customer payment terms are improved.", worldChange: "CASH BUFFER ACTIVATED", nextObjective: "A different operating brief may appear next." }
  }),
  P("business-operations", {
    id: "pilot-scalability-review", briefNumber: "Operations Brief 09", title: "Pilot-to-City Expansion", role: "Business Strategy Analyst", targetWordId: "hs-scalable",
    objective: "Decide whether a successful pilot can expand without collapsing under added demand.",
    problem: "A local meal-delivery pilot serves 120 weekly orders well, but leadership wants to expand to 2,000 orders within six months.",
    constraints: ["Maintain food-safety controls", "Do not assume a small pilot automatically works at large scale", "Account for staffing, routing, and supplier capacity"],
    labels: ["Pilot results", "Capacity", "Expansion"],
    evidence: [
      { id: "pilot", label: "Pilot quality", value: "On-time delivery is 96% at 120 weekly orders." },
      { id: "kitchen", label: "Kitchen capacity", value: "The current kitchen reaches its safe production limit near 180 weekly orders." },
      { id: "routing", label: "Routing test", value: "Delivery time rises sharply once more than eight routes operate at the same time." }
    ],
    vocabulary: { stem: "The pilot is promising, but the current operating model is not yet ______ enough for a sixteen-fold increase in demand.", options: ["scalable", "stationary", "impervious"], answer: "scalable", teaching: "Scalable describes a system that can grow substantially without failing, losing quality, or requiring an entirely different structure at every step." },
    reasoning: { prompt: "Which statement best supports the term?", options: ["The pilot performs well at its current size, but capacity limits show the same setup cannot simply absorb much larger demand.", "Any successful pilot is automatically scalable to any size.", "Scalable means the business should never change its processes as demand grows."], answerIndex: 0, teaching: "Success at a small scale is evidence of promise, not proof that the operating model can support major growth." },
    recommendation: { prompt: "Choose the strongest expansion strategy.", options: [
      { label: "Stage capacity before growth", detail: "Add kitchen capacity, test route automation, secure supplier volume, and expand in measured steps with service-quality checkpoints." },
      { label: "Accept 2,000 orders tomorrow", detail: "Increase demand immediately while keeping the same kitchen, routing, and staffing limits." },
      { label: "End the pilot despite strong results", detail: "Stop the service solely because scaling requires additional planning." }
    ], answerIndex: 0, teaching: "A scalable growth plan expands capacity and controls alongside demand rather than assuming the pilot setup can stretch indefinitely." },
    consequence: { headline: "Expansion pathway staged", summary: "The strategy now links growth to tested capacity checkpoints instead of treating pilot success as unlimited scale.", worldChange: "GROWTH STAGES ACTIVATED", nextObjective: "Watch for another role in the network." }
  }),
  P("business-operations", {
    id: "supplier-contingency", briefNumber: "Operations Brief 13", title: "Supplier Disruption Plan", role: "Operations Risk Analyst", targetWordId: "hs-contingency",
    objective: "Prepare a backup plan before a possible supplier disruption becomes an emergency.",
    problem: "A key packaging supplier warns that a regional rail closure may delay deliveries during the business's busiest month.",
    constraints: ["Protect product safety and quality", "Avoid panic-buying excessive inventory", "Define when the backup plan should activate"],
    labels: ["Supply risk", "Trigger point", "Backup source"],
    evidence: [
      { id: "stock", label: "Current stock", value: "The business has 12 days of compliant packaging on hand." },
      { id: "delay", label: "Supplier notice", value: "The potential rail closure could create delays ranging from 5 to 18 days." },
      { id: "backup", label: "Alternate vendor", value: "A qualified second supplier can ship within 7 days at a modest premium." }
    ],
    vocabulary: { stem: "Management needs a ______ plan that specifies what to do if the rail disruption delays the primary supplier.", options: ["contingency", "prevalence", "precedent"], answer: "contingency", teaching: "A contingency is a possible future condition that deserves a prepared backup response. The event is not certain, but it is plausible enough to plan for." },
    reasoning: { prompt: "Why does the evidence justify a contingency plan?", options: ["The disruption is uncertain but could outlast current inventory, and a qualified backup source is available.", "A contingency is needed only after the business has already run out of packaging.", "The only responsible response is to buy unlimited inventory immediately."], answerIndex: 0, teaching: "Contingency planning prepares a proportionate response to a plausible uncertain event before it becomes a crisis." },
    recommendation: { prompt: "Choose the most disciplined contingency plan.", options: [
      { label: "Define activation threshold", detail: "Pre-approve the alternate supplier and activate it if confirmed delay plus remaining inventory falls below the safe coverage threshold." },
      { label: "Do nothing until stock is gone", detail: "Wait for complete depletion before contacting any backup supplier." },
      { label: "Buy a year of packaging", detail: "Purchase far beyond foreseeable need without considering storage, cash, or shelf-life constraints." }
    ], answerIndex: 0, teaching: "The preferred plan defines a trigger and preserves a qualified backup without overreacting to uncertainty." },
    consequence: { headline: "Supply risk buffered", summary: "The operating plan now contains a clear trigger, approved alternate source, and measured response to possible delay.", worldChange: "CONTINGENCY PATH ACTIVATED", nextObjective: "A later brief may ask you to recall this term in another setting." }
  }),

  P("infrastructure-engineering", {
    id: "pump-redundancy", briefNumber: "Engineering Brief 05", title: "Pump Station Reliability", role: "Engineering Systems Technician", targetWordId: "hs-redundancy",
    objective: "Keep a critical drainage system functioning when one component fails.",
    problem: "A pump station protects a low-lying neighborhood, but the current design depends on one primary pump during major storms.",
    constraints: ["Maintain service during maintenance", "Do not count two components as redundant if both fail from the same single point", "Stay within electrical capacity"],
    labels: ["Pump capacity", "Failure mode", "Backup system"],
    evidence: [
      { id: "demand", label: "Peak demand", value: "One pump can meet normal flow, but major storms require nearly its full rated capacity." },
      { id: "failure", label: "Failure history", value: "The primary pump has required two unplanned shutdowns in five years." },
      { id: "power", label: "Power review", value: "The station can support a smaller independent backup pump on a separate control circuit." }
    ],
    vocabulary: { stem: "Adding an independent backup pump creates ______ so one equipment failure does not automatically stop all drainage service.", options: ["redundancy", "proximity", "prevalence"], answer: "redundancy", teaching: "Redundancy means providing an additional component or pathway so the system can continue when one part fails." },
    reasoning: { prompt: "Which explanation shows true redundancy?", options: ["The backup can operate independently if the primary pump or its control circuit fails.", "Two pumps are redundant even if both depend on the exact same failed control circuit.", "Redundancy means removing every backup to simplify maintenance."], answerIndex: 0, teaching: "A backup must reduce a real failure vulnerability, not merely duplicate equipment that shares the same single point of failure." },
    recommendation: { prompt: "Choose the strongest reliability improvement.", options: [
      { label: "Independent backup pump + control", detail: "Install the smaller backup on a separate control circuit and test automatic transfer under load." },
      { label: "Second pump on failed circuit", detail: "Add a second pump but connect it only to the same single control component that causes the current vulnerability." },
      { label: "Remove maintenance access", detail: "Eliminate the ability to service equipment while keeping any drainage capacity online." }
    ], answerIndex: 0, teaching: "The preferred design adds a genuinely independent fallback pathway while respecting electrical limits." },
    consequence: { headline: "System reliability improved", summary: "The station model now retains partial drainage service through an independent backup when the primary system is unavailable.", worldChange: "BACKUP CIRCUIT ACTIVATED", nextObjective: "Engineering decisions continue elsewhere in the network." }
  }),
  P("infrastructure-engineering", {
    id: "bridge-tolerance", briefNumber: "Engineering Brief 10", title: "Bridge Fit-Up Review", role: "Engineering Quality Technician", targetWordId: "hs-tolerance",
    objective: "Decide whether fabricated parts fall within the allowed dimensional range.",
    problem: "A batch of connection plates arrives with small dimensional differences from the design drawing.",
    constraints: ["Use the approved drawing limits", "Do not equate any difference with failure", "Do not accept a part outside the allowed range without engineering review"],
    labels: ["Drawing limit", "Measurement", "Quality control"],
    evidence: [
      { id: "drawing", label: "Drawing requirement", value: "Plate width is specified as 200 mm ± 2 mm." },
      { id: "sample", label: "Measured sample", value: "Most plates measure 199–201 mm; one measures 203.4 mm." },
      { id: "process", label: "Quality procedure", value: "Out-of-range parts require documented disposition before installation." }
    ],
    vocabulary: { stem: "The ±2 mm value is the dimensional ______: the permitted variation around the target measurement.", options: ["tolerance", "jurisdiction", "liquidity"], answer: "tolerance", teaching: "In engineering, tolerance is an allowed amount of variation from a specified target. It defines an acceptable range rather than demanding impossible perfect sameness." },
    reasoning: { prompt: "Which conclusion follows from the tolerance?", options: ["Measurements from 198 mm through 202 mm are within the stated dimensional range; 203.4 mm is outside it.", "Any plate that is not exactly 200.000 mm must be rejected automatically.", "A tolerance permits unlimited variation as long as the part looks similar."], answerIndex: 0, teaching: "The drawing gives a target plus an allowed range. Parts outside that range need review rather than casual acceptance." },
    recommendation: { prompt: "Choose the correct quality-control action.", options: [
      { label: "Accept in-range; hold out-of-range", detail: "Document the in-range measurements and quarantine the 203.4 mm plate for engineering disposition." },
      { label: "Install every plate", detail: "Ignore the specified limits because all parts are approximately the same size." },
      { label: "Reject the entire shipment", detail: "Discard every plate, including those that clearly meet the approved tolerance." }
    ], answerIndex: 0, teaching: "Quality control distinguishes compliant variation from out-of-range conditions using the actual specification." },
    consequence: { headline: "Fit-up quality protected", summary: "The inspection record accepts compliant variation and isolates the out-of-tolerance part for documented review.", worldChange: "QUALITY RANGE ACTIVATED", nextObjective: "Another systems brief may require a familiar professional term." }
  }),
  P("infrastructure-engineering", {
    id: "utility-compliance-review", briefNumber: "Engineering Brief 15", title: "Utility Access Inspection", role: "Infrastructure Compliance Technician", targetWordId: "hs-compliance",
    objective: "Verify that a proposed utility enclosure meets published access and clearance requirements.",
    problem: "A contractor proposes a compact enclosure that saves space but narrows required maintenance clearance around energized equipment.",
    constraints: ["Use the published clearance standard", "Keep maintenance access unobstructed", "Do not approve a noncompliant condition because it is cheaper"],
    labels: ["Clearance", "Maintenance access", "Inspection"],
    evidence: [
      { id: "standard", label: "Published requirement", value: "The equipment standard requires a minimum 36-inch clear maintenance zone." },
      { id: "proposal", label: "Proposed enclosure", value: "The current layout leaves only 27 inches at the narrowest service point." },
      { id: "cost", label: "Cost note", value: "Expanding the enclosure adds cost but fits within the project's approved contingency allowance." }
    ],
    vocabulary: { stem: "The inspector cannot document ______ until the maintenance clearance meets the applicable requirement.", options: ["compliance", "proximity", "prevalence"], answer: "compliance", teaching: "Compliance means meeting the applicable rules, standards, laws, or formal requirements. Cost savings do not change the requirement." },
    reasoning: { prompt: "Why is the current design not compliant?", options: ["The measured clearance is below the published minimum even though a larger enclosure costs more.", "A design is compliant whenever it is the least expensive option.", "Compliance is determined by whether the enclosure matches nearby paint colors."], answerIndex: 0, teaching: "Compliance is evaluated against the applicable requirement, not preference or convenience." },
    recommendation: { prompt: "Choose the correct inspection disposition.", options: [
      { label: "Revise enclosure before approval", detail: "Increase the service clearance to at least the required minimum and document the corrected measurement." },
      { label: "Approve the 27-inch clearance", detail: "Ignore the published requirement because the compact layout saves money." },
      { label: "Remove maintenance access", detail: "Eliminate the service zone entirely so no clearance measurement is needed." }
    ], answerIndex: 0, teaching: "The corrected layout can be approved once the required access condition is actually met." },
    consequence: { headline: "Maintenance access protected", summary: "The revised enclosure restores the required service zone and the inspection record documents compliance.", worldChange: "CLEARANCE STANDARD ACTIVATED", nextObjective: "This term may return later in a different profession." }
  }),

  P("environmental-science", {
    id: "watershed-restoration", briefNumber: "Field Brief 08", title: "Watershed Runoff Review", role: "Environmental Field Analyst", targetWordId: "hs-watershed",
    objective: "Evaluate upstream land changes as part of one connected drainage system.",
    problem: "A stream restoration site continues to receive sudden muddy flows even after erosion controls were installed beside the project reach.",
    constraints: ["Investigate upstream contributors", "Do not treat the stream reach as isolated", "Protect downstream habitat during field work"],
    labels: ["Drainage area", "Upstream land", "Stream habitat"],
    evidence: [
      { id: "map", label: "Drainage map", value: "Three developing hillsides and two road ditches drain toward the same stream reach." },
      { id: "storm", label: "Storm sampling", value: "Turbidity rises rapidly after rainfall begins upstream, before water reaches the restored bank." },
      { id: "site", label: "Local controls", value: "The restored bank itself remains stable during the same events." }
    ],
    vocabulary: { stem: "The team needs to evaluate the whole ______ because water from multiple upstream areas drains toward the same stream.", options: ["watershed", "jurisdiction", "margin"], answer: "watershed", teaching: "A watershed is the land area that drains water to a common outlet such as a stream, river, lake, or bay." },
    reasoning: { prompt: "Which statement best uses the watershed evidence?", options: ["The muddy flow can originate from connected upstream drainage areas even when the restored bank itself remains stable.", "Only soil touching the project reach can affect stream water quality.", "A watershed is the same thing as a property boundary."], answerIndex: 0, teaching: "Water connects upstream land to downstream conditions across the drainage area." },
    recommendation: { prompt: "Choose the strongest next field action.", options: [
      { label: "Trace upstream sediment sources", detail: "Inspect the connected hillsides and road ditches, compare storm timing, and target erosion controls where sediment enters the drainage network." },
      { label: "Rebuild the stable bank", detail: "Disturb the restored bank even though field evidence shows it remains stable." },
      { label: "Ignore upstream drainage", detail: "Limit investigation to the exact property line of the restoration site." }
    ], answerIndex: 0, teaching: "The watershed approach follows connected drainage evidence instead of assuming the visible project reach is the only source." },
    consequence: { headline: "Upstream sources connected", summary: "The field map now links the restoration site to the larger drainage area and identifies upstream investigation zones.", worldChange: "WATERSHED LAYER ACTIVATED", nextObjective: "Continue through the environmental field network." }
  }),
  P("environmental-science", {
    id: "habitat-biodiversity", briefNumber: "Field Brief 12", title: "Habitat Diversity Survey", role: "Environmental Science Technician", targetWordId: "hs-biodiversity",
    objective: "Compare habitat quality using the variety of living organisms rather than one visually dominant species.",
    problem: "Two wetland plots have similar vegetation cover, but one supports many more plant, insect, bird, and amphibian species.",
    constraints: ["Use repeated field observations", "Do not judge ecological quality by one species alone", "Avoid disturbing nesting areas"],
    labels: ["Species count", "Habitat structure", "Field survey"],
    evidence: [
      { id: "plot-a", label: "Plot A survey", value: "Most cover comes from one aggressive grass species; few insect and bird species are observed." },
      { id: "plot-b", label: "Plot B survey", value: "Native grasses, flowering plants, aquatic insects, frogs, and several bird species are repeatedly observed." },
      { id: "repeat", label: "Survey design", value: "The pattern is consistent across four visits in different weather conditions." }
    ],
    vocabulary: { stem: "Plot B shows greater ______ because it supports a wider variety of living species and ecological roles.", options: ["biodiversity", "redundancy", "liquidity"], answer: "biodiversity", teaching: "Biodiversity refers to the variety of living organisms, including diversity among species, genes, and ecosystems." },
    reasoning: { prompt: "Why is Plot B the stronger biodiversity example?", options: ["Repeated surveys show a broader variety of plants and animals rather than dominance by one species.", "Any plot with the most total plant stems automatically has the most biodiversity.", "Biodiversity measures only whether a site looks green from a distance."], answerIndex: 0, teaching: "Variety matters. A site dominated by one species can have abundant vegetation but relatively low biodiversity." },
    recommendation: { prompt: "Choose the best habitat-management direction.", options: [
      { label: "Protect diverse habitat structure", detail: "Preserve the native plant mix, monitor sensitive areas, and control invasive dominance without disturbing nesting zones." },
      { label: "Replace all species with one grass", detail: "Standardize both plots to a single species for visual uniformity." },
      { label: "Survey only once", detail: "Discard repeated observations and judge the habitat from one brief visit." }
    ], answerIndex: 0, teaching: "The preferred plan protects the habitat features associated with the observed variety of living organisms." },
    consequence: { headline: "Habitat diversity protected", summary: "The field portfolio now records the more diverse plot and the management actions intended to preserve its ecological variety.", worldChange: "BIODIVERSITY INDEX ACTIVATED", nextObjective: "Another field problem may require a different term." }
  }),
  P("environmental-science", {
    id: "brownfield-remediation", briefNumber: "Field Brief 16", title: "Brownfield Soil Plan", role: "Environmental Remediation Analyst", targetWordId: "hs-remediation",
    objective: "Choose a response that addresses documented contamination before redevelopment.",
    problem: "A former industrial parcel is planned for mixed-use redevelopment, but sampling identifies contaminated soil in two concentrated zones.",
    constraints: ["Protect workers and future occupants", "Use the laboratory results", "Do not describe contamination as resolved before corrective work occurs"],
    labels: ["Soil sampling", "Exposure pathway", "Corrective action"],
    evidence: [
      { id: "sample", label: "Laboratory result", value: "Two zones exceed the project's approved cleanup criteria for lead in shallow soil." },
      { id: "depth", label: "Depth profile", value: "Most deeper samples fall below the cleanup criterion." },
      { id: "use", label: "Future use", value: "The concept includes a public courtyard and residential access near one affected zone." }
    ],
    vocabulary: { stem: "The site requires environmental ______ before the affected areas can be considered ready for the proposed public use.", options: ["remediation", "proximity", "prevalence"], answer: "remediation", teaching: "Remediation is corrective action taken to address contamination, damage, or another harmful condition." },
    reasoning: { prompt: "Which statement best reflects the evidence?", options: ["Targeted corrective work is needed in the documented contaminated zones before the future use proceeds there.", "The entire property is proven safe because some deeper samples were below the criterion.", "Remediation means hiding the laboratory results from future users."], answerIndex: 0, teaching: "The response should match the location and nature of the documented condition without exaggerating or concealing it." },
    recommendation: { prompt: "Choose the most defensible corrective-action path.", options: [
      { label: "Targeted cleanup + verification", detail: "Remove, treat, or safely contain affected shallow soil, then verify cleanup before opening the planned public-use areas." },
      { label: "Build directly over all zones", detail: "Proceed without corrective work or verification because redevelopment is already scheduled." },
      { label: "Excavate the entire property blindly", detail: "Remove all soil regardless of sampling results, exposure pathways, cost, or disposal impacts." }
    ], answerIndex: 0, teaching: "The preferred plan addresses the identified condition and verifies the result before the sensitive future use begins." },
    consequence: { headline: "Corrective action defined", summary: "The redevelopment record now identifies targeted cleanup zones and requires verification before public access.", worldChange: "REMEDIATION ZONES ACTIVATED", nextObjective: "A familiar risk term may return in another district." }
  }),

  P("civic-communication", {
    id: "ordinance-reading", briefNumber: "Civic Brief 05", title: "Street-Vending Ordinance", role: "Civic Policy Analyst", targetWordId: "hs-ordinance",
    objective: "Separate the actual local rule from opinions about what the rule should say.",
    problem: "Residents and vendors disagree about a proposed street-vending change, and several public comments misstate what the current city rule requires.",
    constraints: ["Read the adopted text before summarizing it", "Distinguish current law from proposed changes", "Do not treat one speaker's preference as the rule"],
    labels: ["Local rule", "Public comment", "Proposed amendment"],
    evidence: [
      { id: "current", label: "Adopted text", value: "The current city code permits vending in designated zones with specified operating hours." },
      { id: "proposal", label: "Draft amendment", value: "The proposal would add two zones and extend Friday operating hours." },
      { id: "comment", label: "Public comment", value: "Some speakers claim vending is currently prohibited everywhere, which conflicts with the adopted text." }
    ],
    vocabulary: { stem: "The adopted local rule is an ______: a law or regulation enacted by a municipal government.", options: ["ordinance", "precedent", "contingency"], answer: "ordinance", teaching: "An ordinance is a law or regulation enacted by a local government such as a city or county." },
    reasoning: { prompt: "Which summary is most accurate?", options: ["The current ordinance already permits vending in designated zones; the proposal would change where and when it is allowed.", "Public comments automatically replace the adopted ordinance.", "A draft amendment is already law simply because it has been proposed."], answerIndex: 0, teaching: "Professional civic communication distinguishes the adopted rule from proposals and opinions." },
    recommendation: { prompt: "Choose the clearest public-facing summary approach.", options: [
      { label: "Show current rule beside proposed changes", detail: "Quote or accurately paraphrase the adopted requirements, then identify each proposed amendment separately." },
      { label: "Repeat the loudest claim", detail: "Describe vending as prohibited everywhere because several speakers said so." },
      { label: "Call the draft already enacted", detail: "Tell residents the proposed amendment is currently binding law." }
    ], answerIndex: 0, teaching: "The preferred communication helps people see what is law now and what is only proposed." },
    consequence: { headline: "Rule and proposal separated", summary: "The public brief now distinguishes the adopted ordinance from proposed changes and unsupported claims.", worldChange: "CIVIC TEXT LAYER ACTIVATED", nextObjective: "Another communication brief may test evidence quality." }
  }),
  P("civic-communication", {
    id: "claim-substantiation", briefNumber: "Civic Brief 10", title: "Safety Claim Review", role: "Public Information Analyst", targetWordId: "hs-substantiate",
    objective: "Decide whether a public safety claim is supported strongly enough to publish as fact.",
    problem: "A draft community update states that a new crossing design 'eliminates pedestrian risk,' but the pilot has only six weeks of observation data.",
    constraints: ["Match the claim to available evidence", "Do not promise zero risk", "Use measured observations and relevant comparison data"],
    labels: ["Public claim", "Pilot data", "Evidence strength"],
    evidence: [
      { id: "pilot", label: "Pilot observation", value: "Observed yielding improved from 62% to 84% during the six-week pilot." },
      { id: "crash", label: "Crash history", value: "The period is too short to establish a reliable long-term crash trend." },
      { id: "design", label: "Field note", value: "Crossing distance is shorter, but conflicts are still possible when drivers fail to yield." }
    ],
    vocabulary: { stem: "The team can ______ a claim that yielding improved during the pilot, but it cannot substantiate a claim that all pedestrian risk is gone.", options: ["substantiate", "eliminate", "randomize"], answer: "substantiate", teaching: "To substantiate a claim is to support it with sufficient evidence. The evidence can support an observed improvement, not a guarantee of zero future risk." },
    reasoning: { prompt: "Which claim is best supported?", options: ["Observed driver yielding improved during the six-week pilot, while longer-term safety effects still require evaluation.", "The design permanently eliminates every possible pedestrian crash.", "The pilot proves nothing because six weeks of observation can never support any statement at all."], answerIndex: 0, teaching: "Evidence can support a limited precise claim even when it is not strong enough for a broader guarantee." },
    recommendation: { prompt: "Choose the strongest public update.", options: [
      { label: "Publish measured improvement + limitation", detail: "Report the observed yielding change, describe the shorter crossing, and state that longer-term safety outcomes remain under evaluation." },
      { label: "Promise zero risk", detail: "Announce that the crossing can no longer experience any pedestrian conflict or crash." },
      { label: "Hide the pilot results", detail: "Omit the measured improvement because the data cannot support an unlimited guarantee." }
    ], answerIndex: 0, teaching: "The preferred statement communicates what the evidence substantiates and where uncertainty remains." },
    consequence: { headline: "Public claim strengthened", summary: "The communication now reports a measurable pilot improvement without turning limited evidence into a false guarantee.", worldChange: "EVIDENCE CLAIM ACTIVATED", nextObjective: "A later brief may use this same term in another profession." }
  }),
  P("civic-communication", {
    id: "hearing-impartiality", briefNumber: "Civic Brief 17", title: "Hearing Record Review", role: "Civic Process Analyst", targetWordId: "hs-impartial",
    objective: "Protect a fair review process when competing groups are asking for different outcomes.",
    problem: "A permit hearing has drawn organized support and opposition, and one reviewer has publicly endorsed one side before the evidence session begins.",
    constraints: ["Apply the same review criteria to all parties", "Disclose conflicts or prior commitments", "Separate evidence evaluation from personal preference"],
    labels: ["Review criteria", "Conflict disclosure", "Hearing record"],
    evidence: [
      { id: "criteria", label: "Adopted criteria", value: "The permit decision must be based on six published findings in the local code." },
      { id: "statement", label: "Reviewer statement", value: "One reviewer publicly promised to vote for the proposal before the evidence record opened." },
      { id: "process", label: "Process rule", value: "Reviewers must disclose conflicts and base findings on the hearing record." }
    ],
    vocabulary: { stem: "An ______ review evaluates both sides under the same criteria without favoring a party in advance.", options: ["impartial", "adverse", "scalable"], answer: "impartial", teaching: "Impartial means fair and not biased toward one side. It does not mean ignoring evidence or pretending all arguments are equally strong." },
    reasoning: { prompt: "Which condition threatens impartiality most directly?", options: ["A reviewer has committed publicly to an outcome before evaluating the hearing evidence.", "Different parties submit evidence that supports different conclusions.", "The code contains published criteria for the decision."], answerIndex: 0, teaching: "An impartial process can reach different conclusions based on evidence, but the decision-maker should not predetermine the result." },
    recommendation: { prompt: "Choose the strongest process safeguard.", options: [
      { label: "Disclose and address predetermined commitment", detail: "Apply the conflict procedure before substantive review and ensure the final findings are made by reviewers who can evaluate the record under the published criteria." },
      { label: "Ignore the commitment", detail: "Proceed as though a public promise about the outcome cannot affect perceived or actual fairness." },
      { label: "Use different criteria by speaker", detail: "Apply more demanding standards to whichever group has fewer supporters." }
    ], answerIndex: 0, teaching: "The preferred safeguard protects the integrity of the review by addressing a commitment made before the evidence was evaluated." },
    consequence: { headline: "Review process protected", summary: "The hearing workflow now requires conflict disclosure and applies the same published criteria to the complete record.", worldChange: "IMPARTIAL REVIEW ACTIVATED", nextObjective: "The professional network remains open for another randomized brief." }
  }),
  P("community-health", {
    id: "cooling-access-equity", briefNumber: "Health Recall Brief 19", title: "Cooling Access Allocation", role: "Community Health Planner", targetWordId: "hs-equitable",
    objective: "Reuse equity language in a health-resource decision rather than a streetscape decision.",
    problem: "Three neighborhoods have different heat exposure, household cooling access, and transit access to existing cooling centers.",
    constraints: ["Use need rather than identical spending", "Keep at least one accessible option in every service area", "Do not confuse equal inputs with equitable outcomes"],
    labels: ["Heat risk", "Cooling access", "Resource allocation"],
    evidence: [
      { id: "risk", label: "Heat risk", value: "Neighborhood C has the highest heat index and the lowest rate of reliable home cooling." },
      { id: "travel", label: "Travel access", value: "Residents in C also face the longest transit trip to an existing cooling center." },
      { id: "coverage", label: "Existing coverage", value: "Neighborhood A already has two accessible cooling sites within a short walk of most residents." }
    ],
    vocabulary: { stem: "An ______ allocation can direct more temporary cooling capacity toward the neighborhood with greater documented need while maintaining basic access elsewhere.", options: ["equitable", "identical", "arbitrary"], answer: "equitable", teaching: "Equitable still means fair in a way that accounts for different needs. The professional context changed from transit shade to public health, but the precision of the term did not." },
    reasoning: { prompt: "Which explanation transfers the term correctly into health planning?", options: ["Different service levels can be fair when evidence shows materially different risk and access barriers.", "Equity requires every neighborhood to receive the exact same number of resources regardless of need.", "Health planning cannot use the term equitable because it was previously encountered in transportation."], answerIndex: 0, teaching: "A strong vocabulary learner carries the meaning across domains instead of memorizing one example sentence." },
    recommendation: { prompt: "Choose the most equitable cooling-access response.", options: [
      { label: "Add capacity where risk and access gaps are greatest", detail: "Place mobile or temporary cooling capacity in Neighborhood C while preserving accessible baseline service in the other areas." },
      { label: "Duplicate existing coverage", detail: "Add the same number of new sites in every neighborhood despite large differences in current access and heat risk." },
      { label: "Serve the easiest location only", detail: "Place all new resources in the neighborhood that already has the strongest cooling access." }
    ], answerIndex: 0, teaching: "The preferred plan uses documented differences in risk and access to guide a fair distribution." },
    consequence: { headline: "Cooling access rebalanced", summary: "The health plan adds capacity where heat risk and access barriers are greatest while maintaining baseline service elsewhere.", worldChange: "HEALTH EQUITY LAYER ACTIVATED", nextObjective: "Cross-domain vocabulary recall is now part of the field record." }
  }),
  P("environmental-science", {
    id: "flood-risk-mitigation", briefNumber: "Field Recall Brief 20", title: "Floodplain Risk Reduction", role: "Environmental Risk Analyst", targetWordId: "hs-mitigate",
    objective: "Reuse mitigation language in environmental risk management without promising complete prevention.",
    problem: "A riverside neighborhood experiences periodic shallow flooding during major river events, and proposed measures can reduce but not abolish flood exposure.",
    constraints: ["Do not promise zero flood risk", "Protect evacuation access", "Use measures that can function during high water"],
    labels: ["Flood depth", "Evacuation route", "Risk reduction"],
    evidence: [
      { id: "depth", label: "Flood model", value: "The preferred measures reduce modeled shallow-flood depth across most streets but do not remove all inundation." },
      { id: "route", label: "Access model", value: "An elevated emergency route remains passable in the modeled event." },
      { id: "limit", label: "Model limitation", value: "More extreme events can exceed the design scenario." }
    ],
    vocabulary: { stem: "The strategy is designed to ______ flood risk, not eliminate every possible future flood.", options: ["mitigate", "guarantee", "ignore"], answer: "mitigate", teaching: "Mitigate transfers cleanly from stormwater design to environmental risk: reduce severity or harmful effect without claiming complete elimination." },
    reasoning: { prompt: "Which statement preserves the correct degree of certainty?", options: ["The measures reduce modeled risk while some flooding remains possible, especially in events beyond the design scenario.", "The measures guarantee that flooding can never occur again.", "If risk cannot be eliminated, no reduction measure has value."], answerIndex: 0, teaching: "Professional precision includes acknowledging residual risk." },
    recommendation: { prompt: "Choose the strongest mitigation package.", options: [
      { label: "Layer risk reduction + evacuation access", detail: "Use flood-resilient site measures, protect the elevated emergency route, and communicate residual risk to residents." },
      { label: "Promise complete protection", detail: "Market the project as permanent proof that flooding is impossible." },
      { label: "Remove the evacuation route", detail: "Use the route area for another purpose because the risk-reduction measures exist." }
    ], answerIndex: 0, teaching: "The preferred plan reduces harm while preserving a safe response path for events that still exceed the design." },
    consequence: { headline: "Residual risk made visible", summary: "The environmental plan records both modeled risk reduction and the remaining need for emergency access.", worldChange: "FLOOD MITIGATION LAYER ACTIVATED", nextObjective: "A familiar word has now been used in a second professional domain." }
  }),
  P("business-operations", {
    id: "vendor-compliance-audit", briefNumber: "Operations Recall Brief 21", title: "Vendor Compliance Audit", role: "Procurement Operations Analyst", targetWordId: "hs-compliance",
    objective: "Reuse compliance language in procurement rather than infrastructure inspection.",
    problem: "A preferred supplier offers the lowest price but has not submitted two safety documents required by the company's approved-vendor standard.",
    constraints: ["Apply the published vendor standard", "Do not waive requirements solely for price", "Allow the supplier to cure missing documentation before final rejection"],
    labels: ["Vendor standard", "Documentation", "Procurement"],
    evidence: [
      { id: "standard", label: "Vendor requirement", value: "Approved suppliers must maintain current insurance and product-safety documentation." },
      { id: "file", label: "Supplier file", value: "The low-price bidder has current insurance but its product-safety certificate expired last month." },
      { id: "cure", label: "Procurement procedure", value: "The process permits a short documentation cure period before the award decision." }
    ],
    vocabulary: { stem: "The supplier cannot be marked in ______ with the approved-vendor standard until the required safety documentation is current.", options: ["compliance", "prevalence", "proximity"], answer: "compliance", teaching: "Compliance still means meeting applicable requirements. The setting changed from an engineering clearance inspection to business procurement." },
    reasoning: { prompt: "Which statement applies the term correctly across domains?", options: ["Price does not replace a published requirement, but the supplier can use the allowed cure process to restore compliance.", "The lowest price automatically proves compliance with every documentation requirement.", "Compliance is a word used only by engineers and cannot apply to vendor standards."], answerIndex: 0, teaching: "The core meaning transfers: identify the applicable requirement and determine whether it is actually met." },
    recommendation: { prompt: "Choose the strongest procurement action.", options: [
      { label: "Issue cure notice before award", detail: "Give the supplier the permitted cure period for current safety documentation, then evaluate eligibility under the same vendor standard." },
      { label: "Waive the rule for price", detail: "Approve the expired documentation because the supplier is cheaper." },
      { label: "Permanently bar the supplier", detail: "Reject forever without using the cure process that the published procedure expressly allows." }
    ], answerIndex: 0, teaching: "The preferred action applies the requirement consistently while also following the documented opportunity to cure." },
    consequence: { headline: "Vendor standard applied consistently", summary: "The procurement file now separates competitive price from documented compliance and uses the approved cure procedure.", worldChange: "VENDOR COMPLIANCE LAYER ACTIVATED", nextObjective: "Cross-domain recall strengthens the professional vocabulary archive." }
  }),
  P("civic-design", {
    "id": "curb-space-tradeoff",
    "briefNumber": "Impact Brief 11",
    "title": "Curb Space Tradeoff",
    "role": "Junior Mobility Planner",
    "targetWordId": "hs-tradeoff",
    "objective": "Balance competing curb uses without pretending one block can maximize every use at the same time.",
    "problem": "A busy commercial block has one curb lane serving deliveries, bus boarding, short visits, accessible pickup, and a proposed protected bicycle connection.",
    "constraints": [
      "Keep the bus stop accessible",
      "Provide a legal loading area for deliveries",
      "Do not remove the protected bicycle connection at the intersection"
    ],
    "labels": [
      "Curb demand",
      "Accessible boarding",
      "Protected movement"
    ],
    "evidence": [
      {
        "id": "use",
        "label": "Curb-use count",
        "value": "During the evening peak, delivery and passenger pickup demand overlap for about 38 minutes each hour."
      },
      {
        "id": "bus",
        "label": "Transit requirement",
        "value": "The existing stop must retain an accessible boarding area and clear approach."
      },
      {
        "id": "bike",
        "label": "Conflict map",
        "value": "Bicycle conflicts cluster where vehicles enter and leave the current curb lane near the intersection."
      }
    ],
    "vocabulary": {
      "stem": "The design requires a ______: expanding one curb use may reduce the space or time available for another competing use.",
      "options": [
        "tradeoff",
        "certainty",
        "redundancy"
      ],
      "answer": "tradeoff",
      "teaching": "A tradeoff is a choice in which gaining more of one benefit requires accepting less of another. Naming the tradeoff makes the competing goals visible."
    },
    "reasoning": {
      "prompt": "Which explanation best describes the professional tradeoff?",
      "options": [
        "The curb must balance several legitimate uses within one limited physical space.",
        "A tradeoff means every user can receive unlimited curb space at the same time.",
        "The issue disappears if the team refuses to measure when and where conflicts occur."
      ],
      "answerIndex": 0,
      "teaching": "A tradeoff exists because the physical curb is limited while several uses compete for it."
    },
    "recommendation": {
      "prompt": "Choose the strongest curb-management concept.",
      "options": [
        {
          "label": "Time-managed loading + protected access zones",
          "detail": "Keep accessible bus boarding and the protected bicycle connection, while assigning deliveries a marked loading zone with peak-hour time rules."
        },
        {
          "label": "Give the entire curb to one use",
          "detail": "Remove all bus boarding and bicycle protections so deliveries can use the whole block at any time."
        },
        {
          "label": "Leave every use unmarked",
          "detail": "Allow buses, deliveries, pickups, and bicycle movement to compete in the same space without operating rules."
        }
      ],
      "answerIndex": 0,
      "teaching": "The preferred concept acknowledges the tradeoff and manages the limited curb rather than pretending the conflict does not exist."
    },
    "consequence": {
      "headline": "Competing curb uses balanced",
      "summary": "The block model now separates accessible boarding, protected bicycle movement, and managed loading periods instead of forcing all uses into the same conflict zone.",
      "worldChange": "CURB MANAGEMENT LAYER ACTIVATED",
      "nextObjective": "Another district will require a different professional judgment."
    }
  }),
  P("community-health", {
    "id": "new-case-incidence-watch",
    "briefNumber": "Health Brief 12",
    "title": "New-Case Incidence Watch",
    "role": "Community Health Data Analyst",
    "targetWordId": "hs-incidence",
    "objective": "Describe newly occurring cases over time without confusing them with the total number of people currently living with the condition.",
    "problem": "A school health network needs to know whether newly reported stomach-illness cases are increasing this month or whether a large current total mostly reflects earlier cases still being followed.",
    "constraints": [
      "Use a defined population and time period",
      "Separate newly reported cases from existing cases",
      "Keep reporting-delay limitations visible"
    ],
    "labels": [
      "New cases",
      "Population",
      "Reporting lag"
    ],
    "evidence": [
      {
        "id": "new",
        "label": "New-case register",
        "value": "Forty-two newly reported cases were entered during the current four-week window."
      },
      {
        "id": "population",
        "label": "Enrollment denominator",
        "value": "The participating schools enrolled 6,180 students during the same period."
      },
      {
        "id": "lag",
        "label": "Reporting review",
        "value": "Nine entries were submitted late and actually began in the previous reporting window."
      }
    ],
    "vocabulary": {
      "stem": "To describe how many new cases occurred during the defined period, the analyst should calculate or report ______ rather than the total existing burden.",
      "options": [
        "incidence",
        "prevalence",
        "proximity"
      ],
      "answer": "incidence",
      "teaching": "Incidence concerns new cases occurring in a defined population over a specified period. Prevalence concerns the existing burden."
    },
    "reasoning": {
      "prompt": "Which reasoning best fits the evidence?",
      "options": [
        "The new-case register and population denominator can support an incidence measure after the reporting-period errors are corrected.",
        "Every student who ever had the condition should be counted as a new case this month.",
        "The number of schools alone determines incidence without any case count or population."
      ],
      "answerIndex": 0,
      "teaching": "Incidence depends on new events in a defined population and period, so reporting dates must match the period being measured."
    },
    "recommendation": {
      "prompt": "Choose the strongest reporting approach.",
      "options": [
        {
          "label": "Correct the reporting window, then report new-case incidence",
          "detail": "Move the nine late entries to the period in which they began, document the denominator, and compare the corrected new-case measure across periods."
        },
        {
          "label": "Call every current case new",
          "detail": "Treat all existing cases as if they began during the current month."
        },
        {
          "label": "Ignore the reporting dates",
          "detail": "Use entry date even when the record shows the case began in a different reporting period."
        }
      ],
      "answerIndex": 0,
      "teaching": "The preferred approach keeps the time window and new-case definition consistent."
    },
    "consequence": {
      "headline": "New-case trend clarified",
      "summary": "The health dashboard now separates current burden from newly occurring cases and flags reporting lag before month-to-month comparison.",
      "worldChange": "INCIDENCE TREND LAYER ACTIVATED",
      "nextObjective": "Continue through the professional network."
    }
  }),
  P("business-operations", {
    "id": "budget-variance-review",
    "briefNumber": "Operations Brief 13",
    "title": "Budget Variance Review",
    "role": "Operations Finance Analyst",
    "targetWordId": "hs-variance",
    "objective": "Explain why actual operating results differ from the approved plan without confusing a variance with profit or cash availability.",
    "problem": "A community food business spent more than planned on refrigerated delivery even though total monthly revenue came in near forecast.",
    "constraints": [
      "Compare actual results with the approved budget",
      "Trace material differences to documented causes",
      "Do not treat every variance as evidence of poor performance"
    ],
    "labels": [
      "Budget",
      "Actual results",
      "Cause review"
    ],
    "evidence": [
      {
        "id": "budget",
        "label": "Budget report",
        "value": "Refrigerated delivery was budgeted at $18,000 for the quarter."
      },
      {
        "id": "actual",
        "label": "Actual ledger",
        "value": "Recorded refrigerated delivery cost was $23,400 for the quarter."
      },
      {
        "id": "cause",
        "label": "Invoice review",
        "value": "A temporary fuel surcharge and two emergency reroutes account for most of the additional cost."
      }
    ],
    "vocabulary": {
      "stem": "The $5,400 difference between planned and actual refrigerated delivery cost is a budget ______ that should be explained.",
      "options": [
        "variance",
        "margin",
        "liquidity"
      ],
      "answer": "variance",
      "teaching": "A variance is a difference between an expected or planned value and the actual result. It can be favorable or unfavorable depending on what is being measured."
    },
    "reasoning": {
      "prompt": "Which explanation best uses the variance evidence?",
      "options": [
        "The actual ledger differs from the budget, and invoice records explain most of the difference.",
        "Any cost variance proves the business is unprofitable.",
        "A variance measures whether cash is available today to pay a bill."
      ],
      "answerIndex": 0,
      "teaching": "Variance analysis compares plan with actual and then investigates the causes; it is not the same as margin or liquidity."
    },
    "recommendation": {
      "prompt": "Choose the strongest management response.",
      "options": [
        {
          "label": "Document cause + revise the operating forecast",
          "detail": "Record the temporary surcharge and reroute costs, test whether they will continue, and update the forecast only for supported ongoing effects."
        },
        {
          "label": "Assume all future costs will match the spike",
          "detail": "Permanently raise every future budget line by the full one-time variance without checking cause."
        },
        {
          "label": "Ignore the difference",
          "detail": "Leave the quarter unexplained even though the ledger materially differs from the approved plan."
        }
      ],
      "answerIndex": 0,
      "teaching": "A useful variance review explains the difference and separates temporary causes from ongoing changes."
    },
    "consequence": {
      "headline": "Budget difference explained",
      "summary": "The operating review now distinguishes the planned amount, actual cost, and documented causes before revising future forecasts.",
      "worldChange": "VARIANCE REVIEW BOARD ACTIVATED",
      "nextObjective": "Another professional brief is ready."
    }
  }),
  P("infrastructure-engineering", {
    "id": "bridge-fatigue-check",
    "briefNumber": "Engineering Brief 14",
    "title": "Bridge Fatigue Check",
    "role": "Structural Inspection Technician",
    "targetWordId": "hs-fatigue",
    "objective": "Recognize repeated-load damage risk before a small crack becomes a larger structural problem.",
    "problem": "A pedestrian bridge uses steel hanger connections that experience repeated daily loading, and one inspection finds a short crack near a welded detail.",
    "constraints": [
      "Keep the bridge safe while the finding is evaluated",
      "Do not assume one crack proves imminent failure",
      "Use the approved inspection and engineering escalation procedure"
    ],
    "labels": [
      "Load cycles",
      "Crack detail",
      "Inspection interval"
    ],
    "evidence": [
      {
        "id": "crack",
        "label": "Inspection finding",
        "value": "A 7 mm surface crack is visible at a welded connection where repeated stress is expected."
      },
      {
        "id": "cycles",
        "label": "Use history",
        "value": "The connection experiences thousands of load cycles each year from pedestrian and maintenance traffic."
      },
      {
        "id": "history",
        "label": "Prior record",
        "value": "The same location had no recorded crack at the previous close inspection 18 months ago."
      }
    ],
    "vocabulary": {
      "stem": "The repeated loading and crack location raise concern about material ______: progressive damage that can develop through many stress cycles.",
      "options": [
        "fatigue",
        "tolerance",
        "proximity"
      ],
      "answer": "fatigue",
      "teaching": "Material fatigue is progressive damage from repeated or fluctuating stress. It does not mean the structure is tired in the human sense."
    },
    "reasoning": {
      "prompt": "Which explanation best fits the fatigue concern?",
      "options": [
        "A new crack at a repeatedly stressed detail can justify fatigue-focused evaluation even if no single ordinary load would cause failure.",
        "Fatigue can occur only when one load instantly breaks the entire bridge.",
        "The crack location is irrelevant because repeated loading never affects metal."
      ],
      "answerIndex": 0,
      "teaching": "Fatigue damage accumulates through stress cycles, so crack location and load history both matter."
    },
    "recommendation": {
      "prompt": "Choose the strongest immediate inspection response.",
      "options": [
        {
          "label": "Escalate the crack for fatigue evaluation and temporary controls",
          "detail": "Document the crack, obtain the required engineering evaluation, increase monitoring, and apply any temporary load or access control the engineer determines necessary."
        },
        {
          "label": "Grind away the visible crack without documentation",
          "detail": "Remove the surface sign before an engineer can evaluate the location or cause."
        },
        {
          "label": "Ignore it until failure",
          "detail": "Continue normal operation indefinitely because the crack is currently short."
        }
      ],
      "answerIndex": 0,
      "teaching": "The professional response preserves the evidence, follows the escalation process, and manages risk without claiming more than the inspection proves."
    },
    "consequence": {
      "headline": "Repeated-load risk escalated",
      "summary": "The bridge record now flags the connection for fatigue-focused engineering review and documented monitoring rather than ignoring a new crack.",
      "worldChange": "FATIGUE INSPECTION LAYER ACTIVATED",
      "nextObjective": "Continue through the engineering district."
    }
  }),
  P("environmental-science", {
    "id": "fish-bioaccumulation-review",
    "briefNumber": "Field Brief 15",
    "title": "Fish-Tissue Bioaccumulation Review",
    "role": "Environmental Monitoring Analyst",
    "targetWordId": "hs-bioaccumulation",
    "objective": "Interpret contaminant buildup in organisms without treating one water sample as a complete picture of long-term exposure.",
    "problem": "Routine water sampling shows low but detectable contaminant concentrations, while fish-tissue testing from the same lake shows much higher concentrations in older fish.",
    "constraints": [
      "Separate organism-tissue evidence from one-time water concentrations",
      "Do not claim the source of contamination without source evidence",
      "Follow the approved public-health and environmental reporting process"
    ],
    "labels": [
      "Water sample",
      "Fish tissue",
      "Exposure over time"
    ],
    "evidence": [
      {
        "id": "tissue",
        "label": "Fish-tissue analysis",
        "value": "Older fish contain contaminant concentrations many times higher than concentrations measured in recent water samples."
      },
      {
        "id": "water",
        "label": "Water sampling",
        "value": "The contaminant is detectable at low concentrations in repeated lake-water samples."
      },
      {
        "id": "age",
        "label": "Age pattern",
        "value": "Tissue concentrations generally rise with fish age in the sampled species."
      }
    ],
    "vocabulary": {
      "stem": "The tissue pattern is consistent with ______: a substance building up in an organism over time faster than it is eliminated.",
      "options": [
        "bioaccumulation",
        "biodiversity",
        "remediation"
      ],
      "answer": "bioaccumulation",
      "teaching": "Bioaccumulation is buildup of a substance within an organism over time. It is different from biodiversity and from cleanup or remediation."
    },
    "reasoning": {
      "prompt": "Which explanation best matches the evidence?",
      "options": [
        "Higher tissue concentrations in older fish, together with repeated environmental detection, are consistent with buildup over time.",
        "One low water sample proves that no organism can contain a higher concentration.",
        "Bioaccumulation identifies the exact contamination source without any source investigation."
      ],
      "answerIndex": 0,
      "teaching": "Tissue and age patterns can support a buildup interpretation without proving the contaminant source."
    },
    "recommendation": {
      "prompt": "Choose the strongest next monitoring response.",
      "options": [
        {
          "label": "Expand tissue trend review + source investigation",
          "detail": "Continue age-stratified tissue sampling, follow the required reporting process, and separately investigate likely contaminant sources."
        },
        {
          "label": "Use one water sample to dismiss the tissue results",
          "detail": "Ignore repeated tissue findings because a single water concentration is lower."
        },
        {
          "label": "Declare the source without evidence",
          "detail": "Name a specific facility as the cause even though no source-tracing evidence has been collected."
        }
      ],
      "answerIndex": 0,
      "teaching": "The preferred response follows the strongest evidence while keeping source attribution separate until it is actually investigated."
    },
    "consequence": {
      "headline": "Organism buildup pattern recognized",
      "summary": "The lake-monitoring record now separates long-term tissue buildup from short-term water concentration and opens a source-investigation track.",
      "worldChange": "TISSUE TREND LAYER ACTIVATED",
      "nextObjective": "Another field-science brief may call next."
    }
  }),
  P("civic-communication", {
    "id": "conflict-disclosure-review",
    "briefNumber": "Civic Brief 16",
    "title": "Conflict Disclosure Review",
    "role": "Public Ethics Analyst",
    "targetWordId": "hs-disclosure",
    "objective": "Make relevant interests visible so the correct recusal or review procedure can be applied without assuming that disclosure itself proves misconduct.",
    "problem": "A procurement panel member owns a small financial interest in a company that supplies a bidder, but the interest was not listed on the panel member's initial conflict form.",
    "constraints": [
      "Apply the published ethics and disclosure rule",
      "Separate required disclosure from a finding of misconduct",
      "Protect the integrity of the procurement record"
    ],
    "labels": [
      "Conflict form",
      "Financial interest",
      "Review procedure"
    ],
    "evidence": [
      {
        "id": "form",
        "label": "Filed disclosure form",
        "value": "The panel member marked no relevant financial interests on the original form."
      },
      {
        "id": "record",
        "label": "Verified ownership record",
        "value": "A current public filing shows the panel member owns a small interest in a supplier used by one bidder."
      },
      {
        "id": "policy",
        "label": "Ethics rule",
        "value": "The policy requires disclosure of covered financial interests and an independent determination of whether recusal is required."
      }
    ],
    "vocabulary": {
      "stem": "The ethics rule requires ______ of the covered financial interest so it can be reviewed under the established conflict procedure.",
      "options": [
        "disclosure",
        "ordinance",
        "precedent"
      ],
      "answer": "disclosure",
      "teaching": "Disclosure means making relevant required information known. A disclosure can trigger review without itself proving wrongdoing."
    },
    "reasoning": {
      "prompt": "Which explanation best fits the evidence?",
      "options": [
        "The verified interest should be disclosed and reviewed under the rule before deciding whether recusal or another safeguard is required.",
        "Any disclosure automatically proves intentional corruption.",
        "The panel should hide the interest because the amount is small."
      ],
      "answerIndex": 0,
      "teaching": "Ethics systems often separate disclosure, review, and final findings. Making the information visible is the first required step."
    },
    "recommendation": {
      "prompt": "Choose the strongest process response.",
      "options": [
        {
          "label": "Correct disclosure + independent conflict review",
          "detail": "Amend the record, pause the member's participation on the affected matter, and apply the published rule to determine the required safeguard."
        },
        {
          "label": "Erase the ownership record",
          "detail": "Remove the verified interest from the file so the panel can continue without review."
        },
        {
          "label": "Declare misconduct immediately",
          "detail": "Announce a final ethics violation before applying the required review procedure."
        }
      ],
      "answerIndex": 0,
      "teaching": "The preferred response protects the record and applies the established process without concealing the interest or prejudging the final finding."
    },
    "consequence": {
      "headline": "Conflict information made reviewable",
      "summary": "The procurement record now includes the corrected disclosure and routes the matter through the published ethics review before the panel proceeds.",
      "worldChange": "ETHICS DISCLOSURE LAYER ACTIVATED",
      "nextObjective": "Continue through civic and legal communication."
    }
  })
];

// "civicProjects" is retained as a compatibility export, but the array now represents
// the full High School professional district network rather than only civic planning.
export const professionalProjects = civicProjects;
export const civicProjectById = new Map(civicProjects.map((project) => [project.id, project]));

export function getCivicProject(id) {
  const project = civicProjectById.get(id);
  if (!project) throw new Error(`Unknown professional project: ${id}`);
  return project;
}

function hashString(value) {
  let hash = 2166136261;
  for (const char of String(value || "")) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededUnit(seed) {
  let t = (Number(seed) || 0) + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function stableProjectSeed(profile) {
  const state = profile.appliedProjects || {};
  const recent = (state.history || []).slice(-4).map((item) => item.briefId).join("|");
  return hashString(`${profile.playerId || "local"}:${profile.completedSessions || 0}:${state.completedBriefIds?.length || 0}:${recent}`);
}

export function selectAppliedProject(profile, seed = stableProjectSeed(profile)) {
  const state = profile.appliedProjects || {};
  const completed = new Set(state.completedBriefIds || []);
  const history = state.history || [];
  const lastProject = history.length ? civicProjectById.get(history[history.length - 1].briefId) : null;
  const recentIds = new Set(history.slice(-4).map((item) => item.briefId));
  const recentTargets = new Set(history.slice(-2).map((item) => civicProjectById.get(item.briefId)?.targetWordId).filter(Boolean));

  let pool = civicProjects.filter((project) => !completed.has(project.id));
  if (!pool.length) pool = civicProjects.filter((project) => !recentIds.has(project.id));
  if (!pool.length) pool = [...civicProjects];

  if (lastProject) {
    const differentDomain = pool.filter((project) => project.domainId !== lastProject.domainId);
    if (differentDomain.length) pool = differentDomain;
  }
  const freshTarget = pool.filter((project) => !recentTargets.has(project.targetWordId));
  if (freshTarget.length) pool = freshTarget;

  const mixedSeed = (Number(seed) || 0) ^ hashString(profile.playerId || "local") ^ Math.imul((profile.completedSessions || 0) + 1, 2654435761);
  const index = Math.floor(seededUnit(mixedSeed) * pool.length) % pool.length;
  return pool[index] || civicProjects[0];
}

export function nextCivicProject(profile) {
  return selectAppliedProject(profile, stableProjectSeed(profile));
}

export function domainCompletion(profile) {
  const completed = new Set(profile.appliedProjects?.completedBriefIds || []);
  return highSchoolDomains.map((domain) => {
    const projects = civicProjects.filter((project) => project.domainId === domain.id);
    const done = projects.filter((project) => completed.has(project.id)).length;
    return { ...domain, completed: done, total: projects.length };
  });
}
