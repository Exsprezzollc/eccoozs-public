const root = (form, meaning, origin = "Latin") => ({ form, meaning, origin });

export const highSchoolVocabulary = [
  {
    id: "hs-mitigate", word: "mitigate", partOfSpeech: "verb", pronunciation: "MIT-ih-gayt", syllables: ["mit", "i", "gate"],
    definition: "To reduce the severity, risk, or harmful effect of something without necessarily removing it completely.",
    contexts: [
      "Permeable paving can mitigate stormwater runoff without eliminating every puddle.",
      "Shade structures can mitigate heat exposure along the pedestrian corridor.",
      "The revised drainage plan is intended to mitigate flood risk during intense storms."
    ],
    incorrect: "The proposal will mitigate flooding by guaranteeing that no rainwater can ever remain on the site.",
    synonyms: ["reduce", "lessen", "moderate"], antonyms: ["intensify", "worsen"],
    distractors: ["eliminate", "postpone", "conceal"], family: ["mitigation", "mitigating"],
    root: root("mitis", "mild"), difficulty: 3, baseReward: 30, stage: "High School"
  },
  {
    id: "hs-permeable", word: "permeable", partOfSpeech: "adjective", pronunciation: "PUR-mee-uh-buhl", syllables: ["per", "me", "a", "ble"],
    definition: "Allowing liquid or gas to pass through small openings in a material or surface.",
    contexts: [
      "A permeable plaza surface lets rain filter into the ground instead of rushing directly to a drain.",
      "The design team compared permeable paving with conventional concrete.",
      "Permeable materials can help reduce surface runoff when the soil below can absorb water."
    ],
    incorrect: "The sealed glass panel is permeable because no water can pass through it.",
    synonyms: ["porous", "penetrable"], antonyms: ["impermeable", "sealed"], distractors: ["reflective", "temporary", "ornamental"],
    family: ["permeability", "permeate"], root: root("permeare", "to pass through"), difficulty: 3, baseReward: 29, stage: "High School"
  },
  {
    id: "hs-impervious", word: "impervious", partOfSpeech: "adjective", pronunciation: "im-PUR-vee-us", syllables: ["im", "per", "vi", "ous"],
    definition: "Not allowing water or another substance to pass through; resistant to penetration.",
    contexts: [
      "The existing impervious plaza sends most rainfall toward the street drains.",
      "Reducing impervious surface area can change how stormwater moves across a site.",
      "The roof is an impervious surface, so runoff must be directed elsewhere."
    ],
    incorrect: "The loose gravel is impervious because water moves easily through the spaces between stones.",
    synonyms: ["sealed", "impenetrable"], antonyms: ["permeable", "porous"], distractors: ["equitable", "adjacent", "seasonal"],
    family: ["imperviousness"], root: root("via", "way or passage"), difficulty: 3, baseReward: 29, stage: "High School"
  },
  {
    id: "hs-equitable", word: "equitable", partOfSpeech: "adjective", pronunciation: "EK-wih-tuh-buhl", syllables: ["eq", "ui", "ta", "ble"],
    definition: "Fair in a way that accounts for different needs, barriers, or circumstances rather than treating every situation identically.",
    contexts: [
      "An equitable transit plan considers neighborhoods that currently have fewer transportation options.",
      "The committee evaluated whether shade investments were distributed equitably across the district.",
      "An equitable process gives affected residents meaningful access to information and participation."
    ],
    incorrect: "The plan is equitable because every block receives the exact same treatment even when needs differ greatly.",
    synonyms: ["fair", "just", "balanced"], antonyms: ["unfair", "biased"], distractors: ["equal", "uniform", "adjacent"],
    family: ["equity", "equitably"], root: root("aequus", "equal or fair"), difficulty: 3, baseReward: 32, stage: "High School"
  },
  {
    id: "hs-feasible", word: "feasible", partOfSpeech: "adjective", pronunciation: "FEE-zuh-buhl", syllables: ["fea", "si", "ble"],
    definition: "Capable of being completed successfully within real constraints such as cost, time, safety, and available resources.",
    contexts: [
      "The team tested whether the rain-garden proposal was feasible within the construction budget.",
      "A technically attractive option may not be feasible if utility lines occupy the entire corridor.",
      "The phased plan became feasible after the schedule and material costs were revised."
    ],
    incorrect: "The proposal was feasible even though it required unavailable materials, unlimited money, and no construction time.",
    synonyms: ["workable", "practical", "achievable"], antonyms: ["impractical", "unworkable"], distractors: ["decorative", "temporary", "popular"],
    family: ["feasibility", "feasibly"], root: root("facere", "to do or make"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-resilient", word: "resilient", partOfSpeech: "adjective", pronunciation: "rih-ZIL-yuhnt", syllables: ["re", "sil", "ient"],
    definition: "Able to withstand disruption, adapt, and continue functioning or recover after stress.",
    contexts: [
      "A resilient streetscape can continue serving residents during heat, heavy rain, and power disruptions.",
      "The project uses resilient planting that can recover after seasonal flooding.",
      "Redundant access routes make the transportation network more resilient."
    ],
    incorrect: "The system is resilient because one small failure permanently shuts down every route.",
    synonyms: ["adaptable", "durable", "robust"], antonyms: ["fragile", "vulnerable"], distractors: ["stationary", "ornamental", "exclusive"],
    family: ["resilience", "resiliency"], root: root("salire", "to leap back"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-attenuate", word: "attenuate", partOfSpeech: "verb", pronunciation: "uh-TEN-yoo-ayt", syllables: ["at", "ten", "u", "ate"],
    definition: "To reduce the force, intensity, or magnitude of something as it moves or develops.",
    contexts: [
      "A planted buffer can attenuate noise between the transit line and nearby homes.",
      "The detention basin is designed to attenuate peak stormwater flow.",
      "Tree canopy can attenuate some radiant heat along the sidewalk."
    ],
    incorrect: "The barrier attenuated the sound by amplifying it to twice its original level.",
    synonyms: ["dampen", "weaken", "reduce"], antonyms: ["amplify", "intensify"], distractors: ["allocate", "document", "relocate"],
    family: ["attenuation", "attenuated"], root: root("tenuis", "thin"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-cumulative", word: "cumulative", partOfSpeech: "adjective", pronunciation: "KYOO-myuh-luh-tiv", syllables: ["cu", "mu", "la", "tive"],
    definition: "Increasing or developing through the combined effect of many additions or events over time.",
    contexts: [
      "The review considered the cumulative effect of several nearby development projects on traffic.",
      "Small drainage changes can have a cumulative impact across an entire watershed.",
      "The district measured cumulative heat exposure across multiple blocks."
    ],
    incorrect: "The one isolated event was described as cumulative even though nothing was added over time.",
    synonyms: ["accumulated", "combined", "aggregate"], antonyms: ["isolated", "individual"], distractors: ["temporary", "visible", "linear"],
    family: ["accumulate", "accumulation"], root: root("cumulus", "heap or mass"), difficulty: 3, baseReward: 32, stage: "High School"
  },
  {
    id: "hs-stakeholder", word: "stakeholder", partOfSpeech: "noun", pronunciation: "STAYK-hohl-der", syllables: ["stake", "hold", "er"],
    definition: "A person, group, or organization that is affected by, can influence, or has a legitimate interest in a decision or project.",
    contexts: [
      "Residents, transit riders, business owners, and the city are stakeholders in the corridor redesign.",
      "The project team documented stakeholder concerns before selecting a preferred concept.",
      "A stakeholder meeting revealed access issues that were missing from the first plan."
    ],
    incorrect: "Only the project manager can be a stakeholder because no one else is affected by the decision.",
    synonyms: ["interested party", "participant"], antonyms: ["unaffected outsider"], distractors: ["contractor", "observer", "tourist"],
    family: ["stakeholder engagement"], root: root("stake", "a share or interest", "English"), difficulty: 3, baseReward: 30, stage: "High School"
  },
  {
    id: "hs-jurisdiction", word: "jurisdiction", partOfSpeech: "noun", pronunciation: "joor-is-DIK-shun", syllables: ["ju", "ris", "dic", "tion"],
    definition: "The legal authority or geographic area within which a government, agency, or court may make and enforce decisions.",
    contexts: [
      "The bridge falls under state jurisdiction even though the adjoining streets belong to the city.",
      "The team confirmed which agency had jurisdiction over the riverfront permit.",
      "Different jurisdictions may apply different design standards to the same regional corridor."
    ],
    incorrect: "Jurisdiction means the personal design preference of whichever planner arrives first.",
    synonyms: ["authority", "legal control"], antonyms: ["lack of authority"], distractors: ["proximity", "budget", "aesthetic"],
    family: ["jurisdictional"], root: root("juris + dicere", "law + to speak"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-compliance", word: "compliance", partOfSpeech: "noun", pronunciation: "kuhm-PLY-uhns", syllables: ["com", "pli", "ance"],
    definition: "The condition of meeting applicable rules, standards, laws, or formal requirements.",
    contexts: [
      "The accessibility review checks the design for compliance with required standards.",
      "Permit approval depends on environmental compliance as well as engineering quality.",
      "The inspector documented compliance before the next construction phase began."
    ],
    incorrect: "Compliance means ignoring the published standards whenever they are inconvenient.",
    synonyms: ["conformity", "adherence"], antonyms: ["violation", "noncompliance"], distractors: ["popularity", "profit", "visibility"],
    family: ["comply", "compliant"], root: root("complere", "to fulfill"), difficulty: 3, baseReward: 32, stage: "High School"
  },
  {
    id: "hs-infrastructure", word: "infrastructure", partOfSpeech: "noun", pronunciation: "IN-fruh-struhk-cher", syllables: ["in", "fra", "struc", "ture"],
    definition: "The fundamental physical and organizational systems that allow a community or service to function, such as transportation, water, energy, and communications networks.",
    contexts: [
      "Storm drains, sidewalks, transit lines, and utilities are part of the district's infrastructure.",
      "The redevelopment plan upgrades aging water infrastructure beneath the plaza.",
      "New development must coordinate with existing infrastructure rather than treating the site as empty land."
    ],
    incorrect: "Infrastructure refers only to decorative flowers placed around a finished building.",
    synonyms: ["systems", "public works", "foundational network"], antonyms: ["ornament"], distractors: ["furniture", "branding", "schedule"],
    family: ["infrastructural"], root: root("infra + structure", "below + building"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-proximity", word: "proximity", partOfSpeech: "noun", pronunciation: "prok-SIM-ih-tee", syllables: ["prox", "im", "i", "ty"],
    definition: "Nearness in physical distance, time, or relationship.",
    contexts: [
      "The stop's proximity to the hospital increases its importance for riders with limited mobility.",
      "Tree placement must consider proximity to underground utilities.",
      "The apartments' proximity to frequent transit reduces some car trips."
    ],
    incorrect: "Proximity describes two locations that are unrelated and infinitely far apart.",
    synonyms: ["nearness", "closeness"], antonyms: ["distance", "remoteness"], distractors: ["capacity", "frequency", "ownership"],
    family: ["proximate"], root: root("proximus", "nearest"), difficulty: 3, baseReward: 29, stage: "High School"
  },
  {
    id: "hs-viability", word: "viability", partOfSpeech: "noun", pronunciation: "vy-uh-BIL-ih-tee", syllables: ["vi", "a", "bil", "i", "ty"],
    definition: "The ability of a plan, system, or organization to work successfully and continue functioning under real conditions.",
    contexts: [
      "Ridership forecasts helped the agency evaluate the long-term viability of the new route.",
      "The design's viability depends on maintenance funding as well as construction funding.",
      "A pilot project can test viability before a full district-wide rollout."
    ],
    incorrect: "The proposal's viability is proven because nobody has checked whether it can operate after opening day.",
    synonyms: ["workability", "sustainability", "practical potential"], antonyms: ["failure potential", "infeasibility"], distractors: ["visibility", "novelty", "symmetry"],
    family: ["viable"], root: root("vita", "life"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-contingency", word: "contingency", partOfSpeech: "noun", pronunciation: "kuhn-TIN-juhn-see", syllables: ["con", "tin", "gen", "cy"],
    definition: "A possible future event or condition that requires preparation, often paired with a backup plan or reserved resources.",
    contexts: [
      "The construction budget includes a contingency for unexpected utility conflicts.",
      "The team prepared a contingency route in case the bridge must close during inspection.",
      "A weather contingency protects the schedule from predictable seasonal delays."
    ],
    incorrect: "A contingency plan is useful only when the future is guaranteed and no unexpected condition can occur.",
    synonyms: ["possibility", "backup condition", "allowance"], antonyms: ["certainty"], distractors: ["deadline", "decoration", "compliment"],
    family: ["contingent"], root: root("contingere", "to happen or touch"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-synthesize", word: "synthesize", partOfSpeech: "verb", pronunciation: "SIN-thuh-size", syllables: ["syn", "the", "size"],
    definition: "To combine information, evidence, or ideas from multiple sources into a new, coherent understanding or conclusion.",
    contexts: [
      "The analyst must synthesize traffic counts, resident comments, and drainage data before recommending a design.",
      "A strong briefing memo synthesizes evidence instead of listing disconnected facts.",
      "The team synthesized field observations with the engineering model."
    ],
    incorrect: "To synthesize evidence means copying one sentence and ignoring every other source.",
    synonyms: ["integrate", "combine", "draw together"], antonyms: ["fragment", "separate"], distractors: ["memorize", "decorate", "postpone"],
    family: ["synthesis", "synthetic"], root: root("synthesis", "putting together", "Greek"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-substantiate", word: "substantiate", partOfSpeech: "verb", pronunciation: "sub-STAN-shee-ayt", syllables: ["sub", "stan", "ti", "ate"],
    definition: "To support a claim with sufficient evidence, facts, or proof.",
    contexts: [
      "The proposal must substantiate its safety claim with crash data and field observations.",
      "Photos alone may not substantiate a prediction about long-term maintenance costs.",
      "The analyst cited the survey to substantiate the recommendation."
    ],
    incorrect: "The team substantiated the claim by offering no evidence and refusing to explain it.",
    synonyms: ["support", "verify", "corroborate"], antonyms: ["disprove", "undermine"], distractors: ["announce", "simplify", "relocate"],
    family: ["substantiation", "substantial"], root: root("substantia", "substance or reality"), difficulty: 3, baseReward: 35, stage: "High School"
  },
  {
    id: "hs-multimodal", word: "multimodal", partOfSpeech: "adjective", pronunciation: "mul-tee-MOH-duhl", syllables: ["mul", "ti", "mo", "dal"],
    definition: "Involving or connecting multiple forms of transportation, communication, or activity rather than relying on only one mode.",
    contexts: [
      "The multimodal corridor connects rail, bus, bicycle, and pedestrian routes.",
      "A multimodal hub should make transfers understandable and physically accessible.",
      "The plan evaluates multimodal travel instead of measuring cars alone."
    ],
    incorrect: "The corridor is multimodal because it permits exactly one form of transportation and excludes all others.",
    synonyms: ["multi-mode", "integrated transportation"], antonyms: ["single-mode"], distractors: ["temporary", "stationary", "uniform"],
    family: ["mode", "modality"], root: root("multi + modus", "many + manner"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-adverse", word: "adverse", partOfSpeech: "adjective", pronunciation: "AD-vurs", syllables: ["ad", "verse"],
    definition: "Harmful, unfavorable, or working against a desired outcome.",
    contexts: [
      "The environmental review identified potential adverse effects on the riverbank habitat.",
      "Long detours can create adverse access impacts for people who do not drive.",
      "The team revised the staging plan to reduce adverse effects on nearby businesses."
    ],
    incorrect: "The project called the improved safety result adverse because it was beneficial and desired.",
    synonyms: ["harmful", "unfavorable", "negative"], antonyms: ["beneficial", "favorable"], distractors: ["adjacent", "cumulative", "visible"],
    family: ["adversely", "adversity"], root: root("adversus", "turned against"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-triage", word: "triage", partOfSpeech: "verb", pronunciation: "TREE-ahzh", syllables: ["tri", "age"],
    definition: "To sort people, needs, or problems by urgency or priority when time or resources are limited.",
    contexts: ["The outreach team triaged requests by documented heat risk.", "Emergency departments triage patients so the most urgent needs are recognized quickly.", "The support desk triaged service failures before routine requests."],
    incorrect: "The team triaged the list by pretending every request had exactly the same urgency.",
    synonyms: ["prioritize", "sort by urgency"], antonyms: ["ignore priority"], distractors: ["diagnose", "randomize", "duplicate"],
    family: ["triage process"], root: root("trier", "to sort", "French"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-prevalence", word: "prevalence", partOfSpeech: "noun", pronunciation: "PREV-uh-luhns", syllables: ["prev", "a", "lence"],
    definition: "The proportion or amount of a population that has a condition at a particular time or during a defined period.",
    contexts: ["The survey estimated asthma prevalence among students this semester.", "Prevalence describes existing burden rather than only newly occurring cases.", "The report compared diabetes prevalence across age groups."],
    incorrect: "Prevalence means the exact number of brand-new cases that began today.",
    synonyms: ["existing burden", "frequency in a population"], antonyms: ["absence"], distractors: ["incidence", "proximity", "certainty"],
    family: ["prevalent"], root: root("praevalere", "to be widespread or strong"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-intervention", word: "intervention", partOfSpeech: "noun", pronunciation: "in-ter-VEN-shun", syllables: ["in", "ter", "ven", "tion"],
    definition: "A deliberate action taken to change, improve, prevent, or interrupt a condition or outcome.",
    contexts: ["The cooling-center intervention was evaluated after the heat season.", "A traffic-calming intervention changed vehicle speeds near the school.", "The team selected an intervention that matched the documented barrier."],
    incorrect: "An intervention is an observation made without any action or attempt to change a condition.",
    synonyms: ["action", "measure", "response"], antonyms: ["inaction"], distractors: ["description", "coincidence", "ornament"],
    family: ["intervene"], root: root("intervenire", "to come between"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-allocate", word: "allocate", partOfSpeech: "verb", pronunciation: "AL-uh-kayt", syllables: ["al", "lo", "cate"],
    definition: "To assign or distribute money, time, space, staff, or another limited resource for a particular purpose.",
    contexts: ["The manager allocated more staff to the busiest shift.", "The budget allocates funds for maintenance before expansion.", "The plan allocates curb space among deliveries, buses, and loading needs."],
    incorrect: "To allocate a budget means refusing to decide where any resource will be used.",
    synonyms: ["assign", "distribute", "apportion"], antonyms: ["withhold", "leave unassigned"], distractors: ["attenuate", "observe", "eliminate"],
    family: ["allocation"], root: root("allocare", "to place or assign"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-margin", word: "margin", partOfSpeech: "noun", pronunciation: "MAR-jin", syllables: ["mar", "gin"],
    definition: "The amount by which revenue exceeds a defined cost, often expressed as a dollar amount or percentage.",
    contexts: ["The product margin narrowed when ingredient costs rose.", "A positive margin does not necessarily mean cash is available today.", "The analyst compared gross margin across product lines."],
    incorrect: "Margin means every dollar of sales revenue is automatically profit.",
    synonyms: ["profit spread", "difference"], antonyms: ["loss"], distractors: ["liquidity", "inventory", "jurisdiction"],
    family: ["gross margin", "margin rate"], root: root("margo", "edge or boundary"), difficulty: 3, baseReward: 31, stage: "High School"
  },
  {
    id: "hs-liquidity", word: "liquidity", partOfSpeech: "noun", pronunciation: "lih-KWID-ih-tee", syllables: ["li", "quid", "i", "ty"],
    definition: "The availability of cash, or assets that can quickly become cash, to meet near-term obligations.",
    contexts: ["The company improved liquidity by shortening customer payment terms.", "A profitable business can still have poor liquidity when cash arrives too late.", "The reserve protects liquidity during a seasonal sales slowdown."],
    incorrect: "Liquidity means the business has high sales even if it cannot pay bills when they are due.",
    synonyms: ["cash availability", "near-term cash capacity"], antonyms: ["illiquidity"], distractors: ["profit", "revenue", "branding"],
    family: ["liquid", "illiquid"], root: root("liquidus", "fluid or flowing"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-scalable", word: "scalable", partOfSpeech: "adjective", pronunciation: "SKAY-luh-buhl", syllables: ["sca", "la", "ble"],
    definition: "Able to grow substantially in size, demand, or output without failing or requiring a completely new system at every step.",
    contexts: ["The pilot needs a scalable routing system before citywide expansion.", "A scalable process can handle greater volume while preserving required quality.", "The software architecture was redesigned to be more scalable."],
    incorrect: "The operation is scalable because demand increased tenfold while capacity stayed fixed and service collapsed.",
    synonyms: ["expandable", "growth-capable"], antonyms: ["capacity-limited", "unscalable"], distractors: ["stationary", "impervious", "decorative"],
    family: ["scale", "scalability"], root: root("scala", "ladder or steps"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-redundancy", word: "redundancy", partOfSpeech: "noun", pronunciation: "rih-DUN-dun-see", syllables: ["re", "dun", "dan", "cy"],
    definition: "An additional component, pathway, or capacity that allows a system to continue functioning when another part fails.",
    contexts: ["The backup pump adds redundancy to the drainage system.", "Network redundancy keeps communication available after one route fails.", "True redundancy avoids sharing the same single point of failure."],
    incorrect: "The system has redundancy because both backup devices depend on the same failed component and stop together.",
    synonyms: ["backup capacity", "duplication for reliability"], antonyms: ["single point of failure"], distractors: ["proximity", "tolerance", "uniformity"],
    family: ["redundant"], root: root("redundare", "to overflow or be abundant"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-tolerance", word: "tolerance", partOfSpeech: "noun", pronunciation: "TOL-er-uhns", syllables: ["tol", "er", "ance"],
    definition: "In engineering and manufacturing, the permitted amount of variation from a specified target value or dimension.",
    contexts: ["The drawing allows a two-millimeter dimensional tolerance.", "A part within tolerance can differ slightly from the target and still meet the specification.", "Inspectors recorded measurements against the approved tolerance."],
    incorrect: "A tolerance permits unlimited variation from the specified dimension.",
    synonyms: ["allowable variation", "permitted range"], antonyms: ["exact fixed value"], distractors: ["capacity", "jurisdiction", "prevalence"],
    family: ["tolerable", "within tolerance"], root: root("tolerare", "to endure or allow"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-integrity", word: "integrity", partOfSpeech: "noun", pronunciation: "in-TEG-rih-tee", syllables: ["in", "teg", "ri", "ty"],
    definition: "The condition of being whole, sound, reliable, or consistent with required principles or standards.",
    contexts: ["The inspection checks structural integrity after the impact.", "Data integrity depends on preserving accurate records.", "Professional integrity requires reporting inconvenient evidence rather than hiding it."],
    incorrect: "Integrity means changing the recorded result whenever the original evidence is inconvenient.",
    synonyms: ["soundness", "reliability", "honesty"], antonyms: ["corruption", "unsoundness"], distractors: ["appearance", "speed", "proximity"],
    family: ["integral", "integrity check"], root: root("integer", "whole or untouched"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-watershed", word: "watershed", partOfSpeech: "noun", pronunciation: "WAW-ter-shed", syllables: ["wa", "ter", "shed"],
    definition: "The land area from which rainfall and runoff drain toward a common stream, river, lake, or other outlet.",
    contexts: ["Upstream construction can affect water quality throughout the watershed.", "The watershed boundary follows terrain rather than property lines.", "Field crews traced sediment sources across the connected watershed."],
    incorrect: "A watershed is only the strip of land touching the stream bank and excludes all upstream drainage.",
    synonyms: ["drainage basin", "catchment"], antonyms: ["unconnected drainage area"], distractors: ["jurisdiction", "property line", "wetland"],
    family: ["watershed-scale"], root: root("water + shed", "land dividing drainage", "English"), difficulty: 3, baseReward: 32, stage: "High School"
  },
  {
    id: "hs-biodiversity", word: "biodiversity", partOfSpeech: "noun", pronunciation: "bye-oh-dye-VUR-sih-tee", syllables: ["bi", "o", "di", "ver", "si", "ty"],
    definition: "The variety of living organisms, including diversity among species, genes, and ecosystems.",
    contexts: ["The wetland supports high biodiversity across plants, insects, birds, and amphibians.", "Invasive dominance can reduce biodiversity even when vegetation remains abundant.", "The survey measured biodiversity across repeated field visits."],
    incorrect: "A habitat has maximum biodiversity simply because one species covers nearly every square meter.",
    synonyms: ["biological variety", "ecological diversity"], antonyms: ["biological uniformity"], distractors: ["biomass", "population", "density"],
    family: ["biological diversity"], root: root("bios + diversitas", "life + variety", "Greek/Latin"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-remediation", word: "remediation", partOfSpeech: "noun", pronunciation: "rih-mee-dee-AY-shun", syllables: ["re", "me", "di", "a", "tion"],
    definition: "Corrective action taken to address contamination, damage, deficiency, or another harmful condition.",
    contexts: ["Soil remediation was required before the playground could open.", "The plan includes groundwater remediation and verification sampling.", "Remediation should match the documented condition and exposure pathway."],
    incorrect: "Remediation means declaring a contaminated condition solved without taking corrective action.",
    synonyms: ["corrective action", "cleanup", "repair"], antonyms: ["neglect"], distractors: ["monitoring only", "proximity", "prevalence"],
    family: ["remediate", "remedial"], root: root("remedium", "a remedy"), difficulty: 3, baseReward: 35, stage: "High School"
  },
  {
    id: "hs-ordinance", word: "ordinance", partOfSpeech: "noun", pronunciation: "OR-dih-nuhns", syllables: ["or", "di", "nance"],
    definition: "A law or regulation enacted by a local government such as a city or county.",
    contexts: ["The city ordinance sets permitted vending hours.", "The proposed amendment would change the existing ordinance.", "Staff summarized the ordinance separately from public comments about it."],
    incorrect: "An ordinance is any personal opinion stated during a public meeting.",
    synonyms: ["local law", "municipal regulation"], antonyms: ["informal opinion"], distractors: ["precedent", "policy memo", "petition"],
    family: ["ordain", "municipal ordinance"], root: root("ordinare", "to arrange or order"), difficulty: 3, baseReward: 33, stage: "High School"
  },
  {
    id: "hs-impartial", word: "impartial", partOfSpeech: "adjective", pronunciation: "im-PAR-shuhl", syllables: ["im", "par", "tial"],
    definition: "Fair and not biased toward one side or person in advance.",
    contexts: ["An impartial reviewer applies the same criteria to all parties.", "The hearing process requires impartial evaluation of the evidence record.", "Impartial does not mean pretending strong and weak evidence are equal."],
    incorrect: "The reviewer remained impartial by promising one side a favorable decision before the hearing began.",
    synonyms: ["unbiased", "fair-minded", "neutral"], antonyms: ["biased", "partial"], distractors: ["indifferent", "identical", "adverse"],
    family: ["impartiality", "impartially"], root: root("in + pars", "not + side or part"), difficulty: 3, baseReward: 34, stage: "High School"
  },
  {
    id: "hs-precedent", word: "precedent", partOfSpeech: "noun", pronunciation: "PRESS-ih-dent", syllables: ["prec", "e", "dent"],
    definition: "An earlier decision, example, or established practice that may guide how a similar later situation is considered.",
    contexts: ["The analyst reviewed earlier decisions as possible precedent for the new case.", "A precedent can guide reasoning without making every later fact identical.", "The memo distinguished binding authority from a merely persuasive precedent."],
    incorrect: "A precedent is a future event that has never happened and cannot guide any current decision.",
    synonyms: ["prior example", "earlier guiding decision"], antonyms: ["novel first instance"], distractors: ["ordinance", "contingency", "prediction"],
    family: ["precedential"], root: root("praecedere", "to go before"), difficulty: 3, baseReward: 35, stage: "High School"
  },
  {
    "id": "hs-tradeoff",
    "word": "tradeoff",
    "partOfSpeech": "noun",
    "pronunciation": "TRAYD-awf",
    "syllables": [
      "trade",
      "off"
    ],
    "definition": "A choice in which gaining more of one benefit requires giving up, limiting, or accepting less of another benefit.",
    "contexts": [
      "Curb design often involves a tradeoff between loading space, parking, bus access, and protected bicycle movement.",
      "The budget tradeoff increased maintenance funding while postponing a decorative upgrade.",
      "A professional should name the tradeoff rather than pretending every goal can be maximized at once."
    ],
    "incorrect": "There was no tradeoff because every option delivered every benefit with no cost, limit, or competing need.",
    "synonyms": [
      "compromise",
      "balancing choice",
      "exchange"
    ],
    "antonyms": [
      "win-win with no sacrifice",
      "no-cost gain"
    ],
    "distractors": [
      "certainty",
      "redundancy",
      "jurisdiction"
    ],
    "family": [
      "trade-offs",
      "trade off"
    ],
    "root": {
      "form": "trade + off",
      "meaning": "exchange involving a give-and-take",
      "origin": "English"
    },
    "difficulty": 3,
    "baseReward": 34,
    "stage": "High School"
  },
  {
    "id": "hs-incidence",
    "word": "incidence",
    "partOfSpeech": "noun",
    "pronunciation": "IN-sih-dens",
    "syllables": [
      "in",
      "ci",
      "dence"
    ],
    "definition": "The occurrence of new cases or events in a defined population during a specified period of time.",
    "contexts": [
      "The analyst calculated the incidence of newly reported cases during the eight-week period.",
      "Incidence focuses on new cases, while prevalence describes the existing burden.",
      "A reporting backlog can distort apparent weekly incidence if old cases are entered late."
    ],
    "incorrect": "Incidence means every existing case in the population regardless of when it began.",
    "synonyms": [
      "new-case occurrence",
      "new-event rate"
    ],
    "antonyms": [
      "existing prevalence"
    ],
    "distractors": [
      "prevalence",
      "proximity",
      "certainty"
    ],
    "family": [
      "incident",
      "incidence rate"
    ],
    "root": {
      "form": "incidere",
      "meaning": "to fall upon or occur",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 35,
    "stage": "High School"
  },
  {
    "id": "hs-variance",
    "word": "variance",
    "partOfSpeech": "noun",
    "pronunciation": "VAIR-ee-uhns",
    "syllables": [
      "var",
      "i",
      "ance"
    ],
    "definition": "A difference between a planned, expected, standard, or average value and the actual result; in statistics it also has a specific measure-of-spread meaning.",
    "contexts": [
      "The monthly report explains the budget variance between planned and actual fuel spending.",
      "A favorable revenue variance does not automatically erase an unfavorable cost variance.",
      "The analyst traced the variance to a documented supplier-price increase."
    ],
    "incorrect": "The budget variance was zero because actual spending differed from the plan by thousands of dollars.",
    "synonyms": [
      "difference",
      "deviation",
      "gap"
    ],
    "antonyms": [
      "match",
      "no difference"
    ],
    "distractors": [
      "margin",
      "liquidity",
      "jurisdiction"
    ],
    "family": [
      "vary",
      "variable"
    ],
    "root": {
      "form": "variare",
      "meaning": "to change",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 34,
    "stage": "High School"
  },
  {
    "id": "hs-fatigue",
    "word": "fatigue",
    "partOfSpeech": "noun",
    "pronunciation": "fuh-TEEG",
    "syllables": [
      "fa",
      "tigue"
    ],
    "definition": "In materials and engineering, progressive weakening or damage caused by repeated or fluctuating stress over time, often before one single load would cause failure.",
    "contexts": [
      "Repeated truck loading can contribute to metal fatigue in a bridge component.",
      "The inspection looks for fatigue cracking near locations with repeated stress cycles.",
      "Fatigue damage can accumulate even when individual loads remain below a one-time failure load."
    ],
    "incorrect": "Material fatigue means a steel part feels sleepy after one ordinary load.",
    "synonyms": [
      "cyclic damage",
      "progressive stress damage"
    ],
    "antonyms": [
      "undamaged material condition"
    ],
    "distractors": [
      "tolerance",
      "redundancy",
      "proximity"
    ],
    "family": [
      "fatigue crack",
      "fatigued material"
    ],
    "root": {
      "form": "fatigare",
      "meaning": "to tire or wear out",
      "origin": "Latin"
    },
    "difficulty": 3,
    "baseReward": 36,
    "stage": "High School"
  },
  {
    "id": "hs-bioaccumulation",
    "word": "bioaccumulation",
    "partOfSpeech": "noun",
    "pronunciation": "BY-oh-uh-kyoo-myuh-LAY-shun",
    "syllables": [
      "bi",
      "o",
      "ac",
      "cu",
      "mu",
      "la",
      "tion"
    ],
    "definition": "The buildup of a substance in an organism over time when the organism takes it in faster than it can eliminate it.",
    "contexts": [
      "Fish-tissue sampling can reveal bioaccumulation even when a contaminant is difficult to detect in one water sample.",
      "Bioaccumulation describes buildup within an organism over time.",
      "The team compared tissue, sediment, and water data before describing the bioaccumulation concern."
    ],
    "incorrect": "Bioaccumulation means a substance instantly disappears from an organism as soon as exposure occurs.",
    "synonyms": [
      "biological buildup",
      "organism accumulation"
    ],
    "antonyms": [
      "rapid elimination"
    ],
    "distractors": [
      "biodiversity",
      "remediation",
      "watershed"
    ],
    "family": [
      "bioaccumulate",
      "accumulation"
    ],
    "root": {
      "form": "bios + accumulare",
      "meaning": "life + to heap up",
      "origin": "Greek/Latin"
    },
    "difficulty": 3,
    "baseReward": 37,
    "stage": "High School"
  },
  {
    "id": "hs-disclosure",
    "word": "disclosure",
    "partOfSpeech": "noun",
    "pronunciation": "dih-SKLOH-zher",
    "syllables": [
      "dis",
      "clo",
      "sure"
    ],
    "definition": "The act or record of making relevant information known, especially information that rules, ethics, or fairness require a person or organization to reveal.",
    "contexts": [
      "The reviewer filed a conflict disclosure before participating in the procurement decision.",
      "Financial disclosure can help the public identify interests that may affect an official decision.",
      "A disclosure requirement does not automatically prove wrongdoing; it makes relevant information visible for proper review."
    ],
    "incorrect": "Disclosure means hiding a relevant conflict so no one reviewing the decision can know about it.",
    "synonyms": [
      "revelation",
      "declaration",
      "required notice"
    ],
    "antonyms": [
      "concealment",
      "nondisclosure"
    ],
    "distractors": [
      "ordinance",
      "precedent",
      "jurisdiction"
    ],
    "family": [
      "disclose",
      "disclosed"
    ],
    "root": {
      "form": "dis + claudere",
      "meaning": "to unclose or reveal",
      "origin": "Latin/French"
    },
    "difficulty": 3,
    "baseReward": 35,
    "stage": "High School"
  }
];
