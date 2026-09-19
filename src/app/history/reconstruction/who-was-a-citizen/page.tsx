import { BigStatement, Parchment, ReconstructionShell, Section, Timeline, WordGrid } from "../../../../components/history/ReconstructionShell";

export default function Page() {
  return (
    <ReconstructionShell
      eyebrow="Reconstruction · Page 02"
      year="1866–1868"
      title="Who Was a Citizen?"
      dek="Slavery had ended. But citizenship still had to be defined in federal law and then written into the Constitution."
      sources={[
        { label: "U.S. Senate — Civil Rights Act of 1866 context", href: "https://www.senate.gov/legislative/landmark-legislation/civil-rights-act-of-1964/senate-and-civil-rights-1862-1963.htm" },
        { label: "National Archives — 14th Amendment", href: "https://www.archives.gov/milestone-documents/14th-amendment" },
        { label: "U.S. Senate — Civil War & Reconstruction chronology", href: "https://www.senate.gov/history/CivilWar_chronology.htm" },
      ]}
      previous={{ href: "/history/reconstruction/freedom-was-not-the-finish-line", label: "Freedom Was Not the Finish Line" }}
      next={{ href: "/history/reconstruction/who-could-vote", label: "Who Could Vote?" }}
    >
      <Section kicker="April 9, 1866" title="Congress Defines Civil Rights in Federal Law">
        <p>Congress enacted the Civil Rights Act of 1866 over President Andrew Johnson’s veto. The law established federal civil rights protections, including rights involving contracts, courts, and property.</p>
        <Parchment>
          <h3>1866</h3>
          <p>A federal law could define and protect citizenship rights—but Congress also pursued a constitutional guarantee that could not simply be erased by ordinary later legislation.</p>
        </Parchment>
      </Section>

      <Section kicker="Ratified July 9, 1868" title="The Fourteenth Amendment">
        <Parchment>
          <h3>Section 1</h3>
          <blockquote>“All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens…”</blockquote>
        </Parchment>
        <WordGrid words={["CITIZENSHIP", "DUE PROCESS", "EQUAL PROTECTION"]} />
      </Section>

      <Section title="The Constitutional Change">
        <Timeline items={[
          { year: "1866", text: "Congress passes the Civil Rights Act over a presidential veto." },
          { year: "1866", text: "Congress proposes the Fourteenth Amendment." },
          { year: "1868", text: "The Fourteenth Amendment is ratified." },
        ]} />
        <BigStatement>Citizenship had been defined. The next question was whether citizenship guaranteed the ballot.</BigStatement>
      </Section>
    </ReconstructionShell>
  );
}
