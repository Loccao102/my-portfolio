import { examExperience, resumeSource } from '@/data/experience';

export function EmploymentEvidence() {
  return <section className="employment-evidence" aria-label="Professional experience">
    <span className="eyebrow">PROFESSIONAL EXPERIENCE / G-CONNECT</span>
    <h2>Reliable exams.<br /><em>Measurable improvements.</em></h2>
    <p>{examExperience.scope}</p>
    <dl className="employment-facts">
      <div><dt>Role</dt><dd>{examExperience.role}</dd></div>
      <div><dt>Employment period</dt><dd>{examExperience.period}</dd></div>
      <div><dt>Team responsibility</dt><dd>{examExperience.team}</dd></div>
    </dl>
    <div className="outcome-grid">{examExperience.outcomes.map(outcome => <article key={outcome.label}>
      <strong>{outcome.value}</strong><h3>{outcome.label}</h3><p>{outcome.detail}</p>
    </article>)}</div>
    <p className="source-note">Source: owner-provided résumé, reviewed {resumeSource.reviewedAt}. Outcomes are résumé-reported. The 200,000 figure describes a processing dataset, not concurrent users or the number of candidates served. Employment source code is not public.</p>
  </section>;
}
