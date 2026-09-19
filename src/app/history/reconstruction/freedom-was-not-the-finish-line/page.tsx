import { BigStatement, Parchment, ReconstructionShell, Section, WordGrid } from "../../../../components/history/ReconstructionShell";

export default function Page() {
  return (
    <ReconstructionShell
      eyebrow="Reconstruction · Page 01"
      year="1865"
      title="Freedom Was Not the Finish Line"
      dek="In 1865, slavery was being abolished as a legal institution in the United States. But ending slavery did not answer a much larger question: what would freedom actually mean?"
      sources={[
        { label: "National Archives — 13th Amendment", href: "https://www.archives.gov/milestone-documents/13th-amendment" },
        { label: "National Archives — Amendments 11–27", href: "https://www.archives.gov/founding-docs/amendments-11-27" },
      ]}
      next={{ href: "/history/reconstruction/who-was-a-citizen", label: "Who Was a Citizen?" }}
    >
      <Section kicker="January 31 → December 6, 1865" title="Slavery Ends in Law">
        <Parchment>
          <h3>The Thirteenth Amendment</h3>
          <p>Congress passed the proposed Thirteenth Amendment on January 31, 1865. The required number of states ratified it on December 6, 1865.</p>
          <blockquote>“Neither slavery nor involuntary servitude, except as a punishment for crime…”</blockquote>
        </Parchment>
        <p>The Emancipation Proclamation had not abolished slavery everywhere in the United States. The constitutional amendment established abolition nationally.</p>
      </Section>

      <Section title="Freedom Changed the Question">
        <p>Legal abolition answered whether slavery could continue. It did not, by itself, settle the rights, protections, and institutions that freedom would require.</p>
        <BigStatement>Abolition ended legal slavery. It did not define every right that freedom would require.</BigStatement>
        <WordGrid words={["LABOR", "FAMILY", "PROPERTY", "EDUCATION", "CITIZENSHIP", "VOTING"]} />
      </Section>

      <Section title="1865 Had Not Settled Everything">
        <p>Citizenship, equal protection, voting rights, labor protections, education, and land would become separate constitutional, legislative, political, and legal struggles.</p>
        <BigStatement>Ending slavery answered one question. What freedom would mean was still being decided.</BigStatement>
      </Section>
    </ReconstructionShell>
  );
}
