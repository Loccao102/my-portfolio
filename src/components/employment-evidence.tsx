import { examExperience, resumeSource } from '@/data/experience';

export function EmploymentEvidence() {
  return <section className="employment-evidence" aria-label="Kinh nghiệm làm việc">
    <span className="eyebrow">KINH NGHIỆM THỰC TẾ / G-CONNECT</span>
    <h2>Kỳ thi ổn định.<br /><em>Cải thiện đo được.</em></h2>
    <p>{examExperience.scope}</p>
    <dl className="employment-facts">
      <div><dt>Vai trò</dt><dd>{examExperience.role}</dd></div>
      <div><dt>Thời gian</dt><dd>{examExperience.period}</dd></div>
      <div><dt>Phạm vi team</dt><dd>{examExperience.team}</dd></div>
    </dl>
    <div className="outcome-grid">{examExperience.outcomes.map(outcome => <article key={outcome.label}><strong>{outcome.value}</strong><h3>{outcome.label}</h3><p>{outcome.detail}</p></article>)}</div>
    <p className="source-note">Nguồn: CV do chủ portfolio cung cấp, review ngày {resumeSource.reviewedAt}. Các kết quả là số liệu được nêu trong CV. Con số 200.000 là kích thước dataset xử lý, không phải concurrent users hay số thí sinh thực tế tham dự. Mã nguồn công việc không public.</p>
  </section>;
}
