// Scenario-family variants keep a professional concept stable while changing the
// evidence context. A learner can therefore revisit the same vocabulary idea
// without memorizing one fixed story, number set, or sentence.

const V = (id, label, problem, evidenceValues, stem) => ({ id, label, problem, evidenceValues, stem });

export const highSchoolScenarioVariants = {
  "rain-ready-plaza": [
    V("festival-cloudburst", "Festival cloudburst", "A summer festival leaves temporary queues near the plaza entrances when a short cloudburst sends runoff across the walking route.", ["76% of the event plaza remains hard, sealed surface.", "A 22-minute cloudburst produced ponding at one entrance and along the river walk.", "Emergency and accessible travel must remain continuous through the center corridor."], "The redesign should ______ the runoff problem by reducing how quickly rain moves across the plaza."),
    V("winter-thaw", "Winter thaw", "Rapid snowmelt followed by rain creates shallow ponding where the plaza slopes toward two storefronts.", ["Snow storage and hardscape leave only 14% of the central area able to absorb water.", "Meltwater reaches both storefront thresholds during the documented thaw event.", "The accessible route cannot be narrowed or replaced with loose material."], "The design can ______ the effect of runoff near the storefronts without claiming that all water will disappear.")
  ],
  "shade-equity-corridor": [
    V("school-dismissal", "School dismissal", "Two transit stops used heavily after school have almost no shade, while nearby lower-use stops already sit beneath mature canopy.", ["The two school-adjacent stops are 10°F hotter than the shaded comparison stop at 3:30 p.m.", "They account for 46% of student boardings in the corridor.", "New shade elements must preserve crossing visibility for drivers and students."], "An ______ shade strategy can give more protection to the stops with greater heat exposure and rider need."),
    V("senior-route", "Senior route", "A senior housing route has the longest outdoor waits and the least tree cover, even though other parts of the corridor already have substantial shade.", ["Average wait time is 17 minutes at the least-shaded senior-route stops.", "Canopy cover there is less than half the corridor average.", "Boarding pads and mobility-device clearances must remain unobstructed."], "A fair, ______ investment does not require identical spending where documented needs differ.")
  ],
  "multimodal-connection": [
    V("event-transfer", "Event transfer", "Concert crowds move between rail, buses, bicycles, and the river walk, but the current layout funnels several travel modes into conflicting paths.", ["Post-event rail-to-bus transfers require one backtrack and two curb crossings.", "Bike counts triple during events and currently intersect the passenger queue.", "The direct route from the accessible rail exit to buses is blocked by stairs."], "The district needs a ______ transfer plan that coordinates several transportation modes rather than treating each one alone."),
    V("commuter-morning", "Morning commute", "Morning commuters can see their connecting bus from the rail platform but must take a long indirect path while bicycles cross the boarding zone.", ["The accessible rail-to-bus path is 420 feet longer than the stair route.", "Peak bicycle flow crosses the busiest boarding point every 90 seconds.", "Wayfinding signs use different route names for the same connection."], "A ______ connection should coordinate rail, bus, bicycle, and pedestrian movement as one connected system.")
  ],
  "heat-response-triage": [
    V("power-outage", "Heat + outage", "A neighborhood power outage occurs during a heat advisory, generating more requests than the mobile health team can answer at once.", ["Requests include residents using electrically powered medical equipment and households with infants.", "Only three mobile units are available before sunset.", "Callers reporting severe confusion or loss of consciousness must be routed to emergency response immediately."], "The team must ______ incoming requests so the most urgent documented risks are addressed first."),
    V("air-quality-heat", "Heat + air quality", "A heat advisory overlaps with unhealthy air quality, and the outreach team must decide which households receive limited indoor-support visits first.", ["The request list includes asthma, cardiovascular disease, outdoor work exposure, and lack of cooling.", "The team can complete 16 home visits before conditions peak.", "Life-threatening symptoms require emergency care rather than routine outreach."], "Staff should ______ the requests instead of serving them randomly or simply in arrival order.")
  ],
  "asthma-prevalence-map": [
    V("clinic-registry", "Clinic registry", "Clinics compare how many children are currently managing asthma across four service areas at the start of the school year.", ["The registry counts current active asthma care plans.", "Date of first diagnosis is missing for many records.", "The map cannot establish whether traffic exposure caused any individual case."], "The map describes asthma ______ because it measures existing cases in the population at a point in time."),
    V("annual-survey", "Annual survey", "An annual school health survey reports the share of students who currently have an asthma diagnosis, but it does not track when each case began.", ["The survey asks whether asthma is currently diagnosed.", "New-case dates are not collected.", "Neighborhood differences may justify more study but do not prove causation."], "Because the survey counts existing cases, the more precise measure is asthma ______.")
  ],
  "clinic-proximity-access": [
    V("river-barrier", "River barrier", "A clinic is less than a mile away as the crow flies, but a river and limited bridge crossings make the actual trip much longer.", ["Straight-line distance averages 0.9 mile for the affected neighborhood.", "The nearest usable bridge adds 2.4 miles to many trips.", "The pedestrian bridge route is not fully accessible during construction."], "Map ______ is only one part of access when physical barriers lengthen the real trip."),
    V("hill-route", "Hill route", "A clinic sits nearby on a map, but a steep grade and infrequent shuttle service make it difficult to reach for many residents.", ["Most homes are within 1.1 miles of the clinic.", "The steepest walking segment exceeds the local accessible-route guideline.", "Shuttle service runs only once every 50 minutes."], "Geographic ______ does not automatically mean the clinic is practically reachable.")
  ],
  "grocer-liquidity-plan": [
    V("seasonal-orders", "Seasonal orders", "A grocer posts a profit during holiday catering season but must pay staff and suppliers weeks before several large clients pay their invoices.", ["Monthly profit remains positive.", "Forty percent of receivables are due more than 30 days after delivery.", "Payroll and produce invoices are due every 7–14 days."], "The near-term concern is ______: enough accessible cash must be available when obligations come due."),
    V("growth-cash-gap", "Growth cash gap", "Rapid sales growth increases inventory purchases faster than customer payments arrive, leaving the store short of cash despite healthy margins.", ["Gross margin improved by three percentage points.", "Inventory purchases rose 35% this month.", "Several business customers pay on 45-day terms."], "The business may be profitable yet still face a ______ problem if cash is unavailable when bills are due.")
  ],
  "pilot-scalability-review": [
    V("weekend-surge", "Weekend surge", "A meal-delivery pilot works well on weekdays but demand projections show weekend volume could rise tenfold after expansion.", ["Weekday service quality is strong at current volume.", "Cold-storage capacity reaches its limit at about twice current volume.", "Routing software begins missing delivery windows during simulated surges."], "Before expansion, the team must determine whether the operating model is truly ______ under much greater demand."),
    V("second-neighborhood", "Second neighborhood", "Leadership wants to copy a successful neighborhood delivery pilot across five additional service areas with different route lengths and order peaks.", ["The original pilot uses one kitchen and a compact delivery radius.", "Two proposed areas require longer routes and later delivery windows.", "Current staffing cannot support simultaneous peaks in all six areas."], "A ______ system must be able to grow without rebuilding every process from scratch at each expansion step.")
  ],
  "supplier-contingency": [
    V("port-delay", "Port delay", "A packaging shipment may be delayed by a port labor disruption during the busiest production cycle of the year.", ["Current compliant inventory covers 15 production days.", "The supplier estimates a possible delay of 8–21 days.", "An approved domestic supplier can deliver within 6 days at higher cost."], "Management needs a ______ plan that states what action to take if the expected shipment does not arrive on time."),
    V("plant-outage", "Supplier plant outage", "A supplier reports that equipment damage could temporarily reduce production of a required food-safe container.", ["Current stock covers 10 days of forecast use.", "Repair time is uncertain and may exceed two weeks.", "A second qualified source has limited capacity but can reserve an emergency allocation."], "A ______ plan prepares the business for a possible disruption before inventory is exhausted.")
  ],
  "pump-redundancy": [
    V("storm-season", "Storm season", "A drainage station enters storm season with one aging primary pump and no fully independent backup path.", ["Peak storm flow uses about 88% of the primary pump's rated capacity.", "The pump required emergency repair last season.", "A second smaller pump can be placed on a separate breaker and controller."], "An independent backup adds ______ so one failure does not remove the entire pumping function."),
    V("control-failure", "Control failure", "Two pumps exist, but both currently depend on one shared control cabinet that has failed before.", ["Either pump can handle normal flow by itself.", "Both pumps stop if the shared control cabinet loses power.", "A separate controller and feeder can be installed for one pump."], "True ______ requires an independent path, not two devices that share the same single point of failure.")
  ],
  "bridge-tolerance": [
    V("bolt-hole-fit", "Bolt-hole fit", "Fabricated connection plates arrive with small differences in hole spacing compared with the approved drawing.", ["Hole spacing is specified as 120 mm ± 1.5 mm.", "Most sampled plates measure 119.2–120.8 mm; one measures 122.1 mm.", "Out-of-range parts require engineering disposition before use."], "The ±1.5 mm value defines the allowable ______ around the target dimension."),
    V("bearing-seat", "Bearing seat", "A quality team checks machined bearing seats whose dimensions are allowed to vary slightly from the design target.", ["The target width is 85 mm with an allowed range of ±0.5 mm.", "Nine pieces fall within the range; one is 85.8 mm.", "The inspection plan requires segregating nonconforming pieces."], "The permitted dimensional variation is called the manufacturing ______.")
  ],
  "utility-compliance-review": [
    V("panel-clearance", "Panel clearance", "A renovated electrical room gains storage space by narrowing the working area in front of an energized panel.", ["The adopted standard requires 36 inches of clear working depth.", "The revised layout leaves 30 inches at the narrowest point.", "Moving one cabinet restores clearance without exceeding the approved budget."], "The room cannot be documented in ______ until the required working clearance is restored."),
    V("valve-access", "Valve access", "A utility vault layout places a permanent pipe rack inside the minimum access zone required around an emergency shutoff valve.", ["The standard requires a 30-inch unobstructed service zone.", "The rack reduces clear access to 22 inches.", "The rack can be shifted within the existing footprint."], "Approval requires ______ with the published access requirement, not simply a layout that is convenient to build.")
  ],
  "watershed-restoration": [
    V("construction-upstream", "Upstream construction", "Sediment continues appearing at a restored stream reach while several construction sites are active farther uphill.", ["The drainage map shows four active sites draining to the same tributary.", "Turbidity spikes begin upstream before reaching the restored reach.", "Bank vegetation at the restoration site remains intact after storms."], "The investigation must consider the connected ______ rather than examining only the restored bank."),
    V("road-ditch", "Road-ditch network", "A stream receives pulses of muddy runoff even though the immediate project site shows little erosion.", ["Road ditches and two farm lanes drain toward the same creek branch.", "Sampling shows the first turbidity spike at an upstream culvert.", "The restored reach remains stable during the sampled storms."], "Because runoff converges from a common drainage area, the team should evaluate the full ______.")
  ],
  "habitat-biodiversity": [
    V("prairie-plots", "Prairie plots", "Two restored prairie plots have similar plant cover, but one contains many more plant types and supports a wider range of pollinators and birds.", ["Plot A is dominated by two grass species.", "Plot B includes grasses, flowering forbs, shrubs, bees, butterflies, and several bird species.", "The pattern remains similar across spring, summer, and early fall surveys."], "Plot B has greater ______ because many different living species and ecological roles are present."),
    V("pond-comparison", "Pond comparison", "Two stormwater ponds contain similar total vegetation, but one supports a much broader mix of aquatic plants, insects, amphibians, and birds.", ["Pond 1 is almost entirely covered by one invasive plant.", "Pond 2 supports multiple native plant zones and several animal groups.", "Repeated surveys confirm the difference."], "The wider variety of life in Pond 2 indicates greater ______.")
  ],
  "brownfield-remediation": [
    V("playground-conversion", "Playground conversion", "A former repair yard is proposed for a public playground, but shallow soil testing identifies two localized contamination hotspots.", ["Two shallow samples exceed the approved lead criterion.", "Deeper samples are generally below the criterion.", "Children would have direct contact with surface soil under the proposed use."], "Environmental ______ is required before the affected areas are ready for the proposed playground use."),
    V("market-courtyard", "Market courtyard", "A former warehouse parcel will become housing and a public market courtyard, but one corner contains petroleum-affected shallow soil.", ["The affected area is concentrated near a former storage tank.", "Most of the remaining site meets the cleanup criterion.", "The public courtyard overlaps part of the affected zone."], "Targeted ______ should correct the documented contamination before public use begins.")
  ],
  "ordinance-reading": [
    V("food-truck-hours", "Food-truck hours", "Residents debate proposed food-truck hours, and several speakers describe the draft change as if it were already law.", ["The current city code permits food trucks until 9 p.m. in designated zones.", "The draft amendment proposes extending Friday hours to 11 p.m.", "The council has not yet voted on the draft."], "The currently adopted municipal rule is an ______; the draft amendment is not yet one."),
    V("park-use-rule", "Park-use rule", "A public meeting discusses changing park-vendor locations, while comments mix together the current legal rule and a staff recommendation.", ["The adopted code permits vending in two park zones.", "Staff recommends adding a third zone.", "No final legislative action has occurred."], "An adopted local law is an ______, while a recommendation or draft is not yet enacted law.")
  ],
  "claim-substantiation": [
    V("lighting-pilot", "Lighting pilot", "A draft update claims that new intersection lighting 'prevents crashes,' but the pilot has only short-term visibility and yielding observations.", ["Nighttime yielding increased during the eight-week pilot.", "The observation period is too short for a stable crash-rate comparison.", "Some driver-pedestrian conflicts were still observed."], "The team can ______ the measured improvement in yielding, but not a claim that crashes are now impossible."),
    V("crosswalk-paint", "Crosswalk pilot", "A communications draft says a high-visibility crosswalk 'solves pedestrian danger' after a brief pilot period.", ["Observed stop compliance improved from 58% to 79%.", "Only five weeks of observations are available.", "Several near-conflicts still occurred when drivers failed to stop."], "Evidence can ______ a narrower claim about observed compliance without proving that all risk has disappeared.")
  ],
  "hearing-impartiality": [
    V("zoning-hearing", "Zoning hearing", "A zoning appeal attracts organized campaigns on both sides, and one panel member publicly promises an outcome before testimony begins.", ["The decision must follow published zoning criteria.", "The panel member posted a promised vote before the record opened.", "The procedure requires disclosure of conflicts and findings based on evidence."], "An ______ review applies the same published criteria without committing to one side in advance."),
    V("license-review", "License review", "A licensing board must review competing evidence, but a member has privately advised one applicant on how to win approval.", ["All applications must be judged under the same adopted criteria.", "The board member gave one applicant private strategic advice.", "The ethics rule requires disclosure and an unbiased evidentiary review."], "An ______ process requires fair evaluation rather than favoritism toward a party before the record is considered.")
  ],
  "cooling-access-equity": [
    V("library-centers", "Library cooling centers", "Three neighborhoods have different heat risk and transit access to library cooling centers, and temporary capacity is limited.", ["Neighborhood B has the highest proportion of households without working air conditioning.", "Its nearest cooling center requires two bus transfers.", "Neighborhood A already has two nearby centers with unused afternoon capacity."], "An ______ allocation can direct more temporary capacity toward the neighborhood with the larger documented access gap."),
    V("mobile-cooling", "Mobile cooling units", "Only two mobile cooling units are available, while neighborhoods differ in heat exposure, home cooling, and distance to permanent centers.", ["Neighborhood C records the highest heat index.", "C also has the lowest home-cooling access and longest transit trip to a center.", "Other neighborhoods retain basic permanent-center coverage."], "A fair, ______ plan can prioritize the area with greater need without abandoning basic access elsewhere.")
  ],
  "flood-risk-mitigation": [
    V("levee-gap", "Levee-gap neighborhood", "A low-lying neighborhood faces shallow flooding through a known levee gap; proposed measures reduce expected depth but cannot prevent every extreme event.", ["Modeling shows lower flood depth on most streets after the proposed measures.", "An elevated route remains passable in the design event.", "Events larger than the design scenario still produce inundation."], "The plan is intended to ______ flood risk, not guarantee complete protection in every possible event."),
    V("river-backwater", "River backwater", "High river stages periodically push water into neighborhood streets, and a package of drainage changes lowers but does not remove modeled exposure.", ["Modeled shallow flooding decreases across 70% of affected street segments.", "Emergency access improves under the design scenario.", "The model explicitly retains residual risk during more extreme events."], "The measures can ______ the severity of flooding while residual risk remains.")
  ],
  "vendor-compliance-audit": [
    V("insurance-expiry", "Insurance expiry", "A low-price vendor has the required safety certificate but its liability insurance expires before the proposed contract start date.", ["Approved vendors must maintain current insurance and safety documentation.", "The bidder's insurance expires in nine days.", "The procurement process allows a short cure period before final award."], "The vendor cannot be marked in ______ until all required documentation is current for the contract period."),
    V("training-record", "Training record", "A preferred supplier has strong pricing and insurance but is missing one required worker-safety training record.", ["The approved-vendor standard requires current training documentation.", "The supplier file lacks the required annual training certificate.", "A documented cure is permitted before the award decision."], "Price alone does not establish ______ with the approved-vendor standard when required records are missing.")
  ],
  "curb-space-tradeoff": [
  {
    "id": "market-morning",
    "label": "Market morning",
    "problem": "A Saturday market creates a short, intense loading peak on a block that also carries buses, accessible pickups, and a protected bicycle route.",
    "evidenceValues": [
      "Vendor loading demand peaks during a 45-minute setup window before the market opens.",
      "The bus stop must remain accessible throughout setup and market hours.",
      "Bicycle conflicts increase when vendor vans double-park near the intersection."
    ],
    "stem": "The market plan needs a ______ because temporary loading demand competes with transit access and protected bicycle movement for limited curb space."
  },
  {
    "id": "evening-pickup",
    "label": "Evening pickup surge",
    "problem": "Restaurant pickup traffic crowds a short commercial block during the same hour that bus boardings and bicycle traffic reach their daily peak.",
    "evidenceValues": [
      "Passenger pickup dwell time doubles between 6:00 and 7:00 p.m.",
      "The bus stop serves the highest evening boarding count in the corridor.",
      "Conflict observations show vehicles crossing the bicycle lane to reach open curb gaps."
    ],
    "stem": "Managing the evening curb requires a ______ among pickup convenience, transit boarding, loading, and protected bicycle movement."
  }
],
  "new-case-incidence-watch": [
  {
    "id": "camp-cluster",
    "label": "Summer camp cluster",
    "problem": "A summer program needs to compare newly reported stomach-illness cases across two weekly periods, but several reports were entered days after symptoms began.",
    "evidenceValues": [
      "Twenty-six new reports were entered during week two.",
      "The active program population was 1,240 participants and staff.",
      "Seven week-two entries document symptom onset during week one."
    ],
    "stem": "After correcting the onset dates, the team can compare weekly ______: the occurrence of new cases in the defined population over each period."
  },
  {
    "id": "school-return",
    "label": "School return period",
    "problem": "Health staff want to know whether newly reported cases increased after students returned from break or whether the dashboard mostly reflects older unresolved cases.",
    "evidenceValues": [
      "Thirty-one cases have documented onset during the first two weeks after return.",
      "Participating-school enrollment was stable at 5,940 students.",
      "Five records entered during the period lack reliable onset dates and must be flagged separately."
    ],
    "stem": "The analyst should use ______ to describe the new cases occurring in the defined population during the return period."
  }
],
  "budget-variance-review": [
  {
    "id": "utility-spike",
    "label": "Utility spike",
    "problem": "A small manufacturer's electricity cost is much higher than budget during a quarter with unusual heat and extended production hours.",
    "evidenceValues": [
      "Quarterly electricity budget: $42,000.",
      "Actual electricity expense: $55,600.",
      "Meter and production records show both higher cooling demand and 14% more operating hours."
    ],
    "stem": "The difference between budgeted and actual electricity cost is a ______ that should be traced to supported operating causes."
  },
  {
    "id": "favorable-labor",
    "label": "Favorable labor result",
    "problem": "A service team spends less on overtime than planned after a scheduling change reduces weekend call-ins.",
    "evidenceValues": [
      "Overtime budget: $31,500 for the quarter.",
      "Actual overtime cost: $24,900.",
      "Staffing logs show fewer unscheduled weekend call-ins after the new schedule began."
    ],
    "stem": "The lower-than-budget overtime cost is a favorable ______ that management should explain before changing the next forecast."
  }
],
  "bridge-fatigue-check": [
  {
    "id": "sign-support",
    "label": "Sign-support connection",
    "problem": "A cantilever sign support experiences constant wind-driven stress cycles, and an inspection finds a small crack at a weld toe.",
    "evidenceValues": [
      "A 5 mm crack is documented at a high-stress welded detail.",
      "Wind records indicate frequent cyclic loading throughout the year.",
      "The previous documented inspection did not record a crack at the location."
    ],
    "stem": "The repeated stress cycles and new crack raise concern about material ______ rather than a one-time overload alone."
  },
  {
    "id": "platform-beam",
    "label": "Transit platform beam",
    "problem": "A steel platform beam has carried repeated service loads for decades, and ultrasonic inspection identifies a small crack near a connection detail.",
    "evidenceValues": [
      "Ultrasonic testing identifies a crack-like indication at a connection weld.",
      "The beam has experienced repeated train-induced vibration for many years.",
      "Earlier inspection records show no comparable indication at that location."
    ],
    "stem": "The inspection pattern warrants evaluation for ______: progressive damage associated with repeated stress cycles."
  }
],
  "fish-bioaccumulation-review": [
  {
    "id": "river-predator",
    "label": "River predator fish",
    "problem": "Water concentrations remain low in a river reach, but older predatory fish show a clear age-related increase in a persistent contaminant.",
    "evidenceValues": [
      "Older predatory fish contain substantially higher tissue concentrations than younger fish.",
      "Repeated water samples detect the contaminant at low concentrations.",
      "Tissue concentration generally increases with fish age in the sampled species."
    ],
    "stem": "The age-related tissue pattern is consistent with ______ because the substance is building up in organisms over time."
  },
  {
    "id": "wetland-turtle",
    "label": "Wetland turtle study",
    "problem": "A wetland study finds a persistent chemical in water and sediment, while older turtles show higher tissue concentrations than juveniles.",
    "evidenceValues": [
      "Adult turtles contain higher tissue concentrations than juvenile turtles in the sample.",
      "The chemical is repeatedly detected at low levels in water and sediment.",
      "Age remains associated with tissue concentration after sampling location is considered."
    ],
    "stem": "The tissue results support concern about ______: biological buildup of the substance over time."
  }
],
  "conflict-disclosure-review": [
  {
    "id": "consulting-relationship",
    "label": "Prior consulting relationship",
    "problem": "A licensing reviewer previously performed paid consulting work for an applicant but did not list the relationship on the initial conflict form.",
    "evidenceValues": [
      "The filed form states that no covered professional relationships exist.",
      "Invoices verify paid consulting work for the applicant within the policy lookback period.",
      "The ethics rule requires covered relationships to be disclosed and reviewed for possible recusal."
    ],
    "stem": "The prior paid relationship requires ______ so the ethics rule can be applied before the reviewer participates further."
  },
  {
    "id": "family-interest",
    "label": "Family financial interest",
    "problem": "A committee member's immediate family owns a financial interest in a contractor seeking an award, and the relationship is not shown on the committee record.",
    "evidenceValues": [
      "The committee record contains no listed family financial interest.",
      "A verified ownership filing documents the immediate-family interest.",
      "The policy requires covered family interests to be disclosed and evaluated under the conflict procedure."
    ],
    "stem": "The policy requires ______ of the covered family interest before the committee continues the affected decision."
  }
]
};

function cloneEvidence(baseEvidence, values) {
  return baseEvidence.map((item, index) => ({ ...item, value: values?.[index] || item.value }));
}

export function getScenarioVariants(project) {
  return [
    { id: "base", label: "Core field condition", problem: project.problem, evidenceValues: project.evidence.map((item) => item.value), stem: project.vocabulary.stem },
    ...(highSchoolScenarioVariants[project.id] || [])
  ];
}

export function resolveProjectScenario(project, scenarioVariantId = "base") {
  const variant = getScenarioVariants(project).find((item) => item.id === scenarioVariantId) || getScenarioVariants(project)[0];
  return {
    ...project,
    scenarioVariantId: variant.id,
    scenarioLabel: variant.label,
    problem: variant.problem,
    evidence: cloneEvidence(project.evidence, variant.evidenceValues),
    vocabulary: { ...project.vocabulary, stem: variant.stem || project.vocabulary.stem }
  };
}

function hashSeed(seed, text) {
  let value = (Number(seed) || 1) >>> 0;
  for (const char of String(text || "")) value = Math.imul(value ^ char.charCodeAt(0), 16777619) >>> 0;
  return value >>> 0;
}

export function selectScenarioVariant(project, profile, seed = Date.now()) {
  const variants = getScenarioVariants(project);
  if (variants.length <= 1) return variants[0].id;
  const history = profile.appliedProjects?.history || [];
  const recentSameBrief = [...history].reverse().find((item) => item.briefId === project.id);
  const avoid = recentSameBrief?.scenarioVariantId;
  const candidates = variants.filter((variant) => variant.id !== avoid);
  const pool = candidates.length ? candidates : variants;
  return pool[hashSeed(seed, project.id) % pool.length].id;
}
