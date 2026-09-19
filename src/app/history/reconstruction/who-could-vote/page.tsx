import { BigStatement, Parchment, ReconstructionShell, Section, Timeline, WordGrid } from "../../../../components/history/ReconstructionShell";

export default function Page() {
  return (
    <ReconstructionShell
      eyebrow="Reconstruction · Page 03"
      year="1869–1870"
      title="Who Could Vote?"
      dek="Citizenship and voting were different questions. The Fifteenth Amendment prohibited governments from denying or abridging voting rights for specified racial reasons."
      sources={[
        { label: "National Archives — 15th Amendment", href: "https://www.archives.gov/milestone-documents/15th-amendment" },
        { label: "National Archives — Amendments 11–27", href: "https://www.archives.gov/founding-docs/amendments-11-27" },
      ]}
      previous={{ href: "/history/reconstruction/who-was-a-citizen", label: "Who Was a Citizen?" }}
      next={{ href: "/history/reconstruction/black-americans-enter-government", label: "Black Americans Enter Government" }}
    >
      <Section kicker="Congress: February 26, 1869 · Ratified: February 3, 1870" title="The Fifteenth Amendment">
        <Parchment>
          <h3>Notice What It Says</h3>
          <blockquote>“The right of citizens of the United States to vote shall not be denied or abridged … on account of race, color, or previous condition of servitude.”</blockquote>
        </Parchment>
        <WordGrid words={["RACE", "COLOR", "PREVIOUS CONDITION OF SERVITUDE"]} />
      </Section>

      <Section title="And Notice What It Does Not Say">
        <p>The amendment did not state that every citizen could vote under every circumstance. It prohibited denial or abridgment on the specified grounds and gave Congress power to enforce that prohibition.</p>
        <BigStatement>A constitutional protection and the practical ability to exercise it are not automatically the same thing.</BigStatement>
      </Section>

      <Section title="Three Different Questions">
        <Timeline items={[
          { year: "1865", text: "Slavery abolished by the Thirteenth Amendment." },
          { year: "1868", text: "Citizenship constitutionalized by the Fourteenth Amendment." },
          { year: "1870", text: "Race-based denial or abridgment of voting rights prohibited by the Fifteenth Amendment." },
        ]} />
      </Section>
    </ReconstructionShell>
  );
}
