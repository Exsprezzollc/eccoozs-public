import Image from "next/image";
import { BigStatement, ReconstructionShell, Section } from "../../../../components/history/ReconstructionShell";
import styles from "../reconstruction.module.css";

export default function Page() {
  return (
    <ReconstructionShell
      eyebrow="Reconstruction · Page 04"
      year="1870–1872"
      title="Black Americans Enter Government"
      dek="The ballot did not only create voters. During Reconstruction, Black Americans entered public office at local, state, and federal levels."
      sources={[
        { label: "U.S. House — Black Americans in Congress", href: "https://history.house.gov/baic/" },
        { label: "U.S. House — 41st Congress profile", href: "https://history.house.gov/Congressional-Overview/Profiles/41st/" },
        { label: "U.S. House — Civil War and Reconstruction collection", href: "https://history.house.gov/Education/NHD/NHD-2026/NHD-ReconstructionLanding/" },
        { label: "History.com — Black Leaders During Reconstruction", href: "https://www.history.com/articles/black-leaders-during-reconstruction" },
      ]}
      previous={{ href: "/history/reconstruction/who-could-vote", label: "Who Could Vote?" }}
      next={{ href: "/history/reconstruction/a-right-on-paper-needed-enforcement", label: "A Right on Paper Needed Enforcement" }}
    >
      <Section title="Black Americans Did Both">
        <p>Hiram Revels of Mississippi became the first Black U.S. senator in 1870. Joseph Rainey of South Carolina became the first Black member of the U.S. House later that year. Their service was part of a much larger expansion of Black political participation.</p>
        <figure className={styles.figure}>
          <Image src="/history/reconstruction/black-congressmen-1872.png" alt="1872 lithograph of the first Black senator and Black representatives serving in the 41st and 42nd Congresses" width={1016} height={768} priority />
          <figcaption>1872 Currier & Ives lithograph depicting Hiram Revels and Black representatives of the 41st and 42nd Congresses. The uploaded archival image is reproduced here as the page’s primary visual.</figcaption>
        </figure>
      </Section>

      <Section title="It Was Not Just Washington">
        <div className={styles.statGrid}>
          <div className={styles.stat}><strong>LOCAL</strong><span>Municipal and county offices</span></div>
          <div className={styles.stat}><strong>STATE</strong><span>Constitutional conventions and legislatures</span></div>
          <div className={styles.stat}><strong>HOUSE</strong><span>Joseph Rainey entered in 1870</span></div>
          <div className={styles.stat}><strong>SENATE</strong><span>Hiram Revels entered in 1870</span></div>
        </div>
        <p>Secondary historical summaries estimate that roughly 2,000 Black Americans held public office during Reconstruction, including hundreds of state legislators and local officials. ECCOOZS treats that estimate as contextual scale, while the House and Senate records establish the federal officeholders directly.</p>
        <BigStatement>Representation changed who could speak inside the government—and immediately became contested.</BigStatement>
      </Section>
    </ReconstructionShell>
  );
}
