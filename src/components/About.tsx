import { profile } from "@/data/site";
import { SkillCard } from "./SkillCard";

const statement = `I'm ${profile.firstName}. I care about two things: how a website looks, and whether anyone can find it. I've built ${profile.websitesBuilt} websites with WordPress, PHP, React and Next.js, I ship mobile apps with Flutter, and I build SEO into every page from day one.`;

/** Words light up one by one as the paragraph scrolls past (driven by ScrollFX `--p`). */
export function About() {
  const words = statement.split(" ");
  const highlight = new Set(["looks,", "find", "WordPress,", "PHP,", "React", "Next.js,", "Flutter,", "SEO", `${profile.websitesBuilt}`]);
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" /> About me
          </p>
          <h2 id="about-title" className="sr-only">
            About {profile.name}
          </h2>
          <p className="about__text" data-scroll="read" style={{ "--n": words.length } as React.CSSProperties}>
            <span className="sr-only">{statement}</span>
            <span aria-hidden="true">
              {words.map((w, i) => (
                <span
                  key={i}
                  className={`about__word${highlight.has(w) ? " is-key" : ""}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {w}{" "}
                </span>
              ))}
            </span>
          </p>
        </div>
        <div className="about__card fx-drift" data-scroll="through">
          <SkillCard />
        </div>
      </div>
    </section>
  );
}
