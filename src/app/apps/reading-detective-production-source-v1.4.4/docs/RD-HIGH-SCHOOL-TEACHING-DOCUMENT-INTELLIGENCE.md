# RD v0.9.0 — High School Teaching Coverage + Document Intelligence

This milestone completes explicit Teach-First coverage for every skill currently assigned to the **Lead Investigator** curriculum and adds a first-class Document Intelligence model for real-world agreements, defined terms, obligations, permissions, conditions, deadlines, waivers, liability language, termination, arbitration, governing-law language, and purposeful document search.

## 1. Complete Lead Investigator Teach-First coverage

The Lead Investigator curriculum currently exposes 26 prerequisite-aware skills. v0.9.0 closes the remaining six teaching gaps:

- `LEGAL.002` — permission and rights
- `LEGAL.003` — waiver language
- `LEGAL.004` — liability/responsibility language
- `LEGAL.005` — termination and cancellation
- `LEGAL.006` — arbitration language
- `LEGAL.007` — governing law and jurisdiction language

All 26 Lead Investigator skills now have a Teaching Module with a `lead-investigator` presentation.

Each legal module explicitly separates **reading the wording** from deciding whether a real clause is legally enforceable. Consequential waiver, liability, arbitration, governing-law, and legal-exception rules can carry a professional-review recommendation without turning Reading Detective into a legal-advice or legal-verdict engine.

## 2. Document Intelligence domain

A `ReadingCase` may now declare `documentIntelligence` with three layers:

### Sections

Sections define the packet structure and search vocabulary:

- source id
- heading
- reading order
- search terms

### Rules

A rule records the known instructional function of a clause:

- definition
- obligation
- permission
- prohibition
- condition
- exception
- deadline
- renewal
- termination
- waiver
- liability
- dispute path
- governing law

Rules can also identify:

- party
- action
- condition
- deadline
- consequence
- defined term / definition
- plain-language reading
- whether professional review should be recommended for a consequential real-world decision

The content author declares these contracts. The engine does not hallucinate a legal interpretation from arbitrary text.

### Question lenses

A `DocumentQuestionLens` maps one investigation question to the rule or rules required to answer it. A lens records whether the answer is:

- directly stated
- conditional
- insufficient

This preserves the Reading Detective principle that some answers must remain conditional or unresolved rather than being forced into false certainty.

## 3. Document search and navigation

`searchDocumentSections()` gives the High School workspace purposeful scanning behavior.

A learner can search terms such as:

- cancellation
- effective date
- waiver
- arbitration
- governing law

The engine ranks declared document sections by heading, authored search terms, source title, and source text. Search locates relevant text; it does not decide the legal conclusion.

The React case workspace now includes a **Document Navigator** for cases that provide Document Intelligence.

## 4. Defined terms and party/rule mapping

The engine now supports:

- `definedTermForCase()` — use the document's own declared definition rather than everyday meaning;
- `documentRulesForParty()` — retrieve the rules assigned to a particular party without turning permission into obligation;
- `documentQuestionForCase()` — derive the exact rule set behind one question while preserving conditions, exceptions, and professional-review guardrails.

## 5. Expanded Lead Investigator cases

### CASE.LEAD.002 — The Auto-Renewing Subscription

Expanded with:

- renewal rule
- cancellation condition
- customer cancellation obligation
- effective date
- already-incurred charge language
- document section search

### CASE.LEAD.003 — The Apartment Clause

Expanded with:

- defined `written notice`
- tenant obligation
- management permission
- conditional entry language
- document search

### CASE.LEAD.004 — The Warranty Exception

The previous skill mismatch that treated a warranty exclusion as termination/cancellation evidence was removed. The case now measures the exclusion as evidence/condition reading and preserves the explicit consumer-law exception as a conditional issue rather than pretending Reading Detective can decide the legal result.

### CASE.LEAD.005 — The Waiver Clause

New case teaching:

- exact waiver scope
- express exception
- responsibility/liability scope
- evidence zoom to the operative phrase

### CASE.LEAD.006 — The Dispute Clause

New case teaching:

- defined `Covered Dispute`
- arbitration after internal review
- timely opt-out exception
- governing-law language
- court-location language

## 6. Guardrails

Document Intelligence deliberately does **not** include:

- an enforceability score
- a legal verdict
- a universal good/bad contract score
- a claim that Reading Detective can tell a learner whether to sign a real agreement

The product teaches reading precision and identifies when a learner should recognize that professional review may be appropriate.

## 7. Review routing

Natural review variations were added for:

- waiver
- liability/responsibility language
- arbitration
- governing law

Therefore the new High School cases can schedule retention checks without violating the existing variation-routing invariant.

## 8. Verification

Run:

```bash
npm run verify:high-school-document
```

The milestone verification proves:

- 26/26 Lead Investigator skills have Teach-First coverage;
- all Document Intelligence cases validate;
- document search returns the relevant section;
- defined terms use authored document definitions;
- party-rule extraction preserves permission vs obligation;
- waiver and arbitration question lenses preserve exceptions;
- consequential legal-language lenses can recommend professional review;
- the warranty case no longer mislabels an exclusion as termination;
- no legal-verdict or enforceability-score contract exists;
- retired character names remain absent.

`npm run verify:all` includes this milestone plus every previous Reading Detective engine suite and the offline React/JSX static check.
