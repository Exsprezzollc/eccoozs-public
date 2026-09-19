import { BigStatement, Parchment, ReconstructionShell, Section, Timeline } from "../../../../components/history/ReconstructionShell";

export default function Page() {
  return (
    <ReconstructionShell
      eyebrow="Reconstruction · Page 05"
      year="1870–1871"
      title="A Right on Paper Needed Enforcement"
      dek="The Constitution could prohibit racial denial of voting rights. The next question was whether the federal government would protect those rights against intimidation and organized violence."
      sources={[
        { label: "U.S. Senate — Enforcement Acts of 1870 and 1871", href: "https://www.senate.gov/artandhistory/history/common/generic/EnforcementActs.htm" },
        { label: "U.S. Senate — Civil Rights chronology", href: "https://www.senate.gov/artandhistory/history/civil_rights/civil_rights.htm" },
      ]}
      previous={{ href: "/history/reconstruction/black-americans-enter-government", label: "Black Americans Enter Government" }}
    >
      <Section title="What Happens When a Constitutional Right Is Ignored?">
        <p>Congress responded to intimidation and interference with Black voting and political participation by creating federal enforcement mechanisms.</p>
        <BigStatement>The Constitution declared the right. Congress built mechanisms to enforce it.</BigStatement>
      </Section>

      <Section title="The Enforcement Acts">
        <Timeline items={[
          { year: "May 31, 1870", text: "The first Enforcement Act made certain forms of interference with voting rights federal offenses." },
          { year: "February 1871", text: "A second Force Act strengthened federal supervision of national elections." },
          { year: "April 1871", text: "The third Force Act—commonly called the Ku Klux Klan Act—expanded federal power against conspiracies denying equal protection." },
        ]} />
        <Parchment>
          <h3>Why This Matters</h3>
          <p>A right written into the Constitution and a right actually protected in daily life are not automatically the same thing.</p>
        </Parchment>
      </Section>

      <Section title="Stopping Point">
        <p>This first Reconstruction build stops in 1871. Later pages can examine federal enforcement in practice, violence and backlash, the changing role of the courts, Reconstruction’s later years, and what survived—without crowding those subjects into this foundation.</p>
        <BigStatement>A right on paper was not enough. The question became whether the government would protect it.</BigStatement>
      </Section>
    </ReconstructionShell>
  );
}
