// Professional information supplied by the owner in the two-page résumé.
// Contact details and the original PDF are not included in this public module.
export const resumeSource = {
  title: 'Middle .NET / Fullstack Developer',
  reviewedAt: '2026-09-26',
  note: 'Professional experience and outcomes summarized from my résumé. Public repository activity is sourced separately from GitHub.',
};

export const experience = [
  {
    company: 'myG', role: 'Backend Developer', period: 'Jun 2026 — Present',
    focus: 'Payment platforms & realtime game services',
    stack: ['C#', 'ASP.NET Web Forms', 'SQL Server', 'Java Spring', 'Socket.io', 'MySQL', 'Redis'],
    highlights: [
      'Extended a payment platform handling 50,000–100,000 transactions per month, integrating VTC Pay, MoMo and SePay.',
      'Used Factory / Strategy patterns to reduce new gateway integration to a few hours while preserving existing payment flows.',
      'Implemented idempotent APIs and webhook retries, with an approximately 95% retry success rate; built retry tooling for about 500,000 transaction logs.',
      'Delivered 10+ partner REST APIs and maintained realtime game logic, match state and client event synchronization for Wewin / MonkeyCard.',
    ],
  },
  {
    company: 'NIQ Vietnam', role: 'Fullstack Developer', period: 'Jan 2026 — Jun 2026',
    focus: 'Level 4 online public services',
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'REST API'],
    highlights: [
      'Developed administrative application workflows across departments for Hanoi, Thai Nguyen and the Ministry of Culture.',
      'Integrated the National Public Service Portal, VNeID and government payment gateways.',
      'Worked in a core team of 5–7 engineers within a wider project of approximately 30 people.',
    ],
  },
  {
    company: 'G-Connect', role: 'Fullstack Developer / Module Team Lead', period: 'Feb 2024 — Dec 2025',
    focus: 'Examination systems & meteorological data',
    stack: ['ASP.NET Core', 'React', 'TypeScript', 'MySQL', 'SQL Server', 'SignalR', 'Redis', 'RabbitMQ', 'Docker'],
    highlights: [
      'Led 4 developers and 1–2 testers under the Tech Lead / PM, dividing tasks, reviewing code and resolving application and database issues.',
      'Helped deliver two examination rounds across nearly 10 localities and about 20 sites, serving more than 20,000 candidates.',
      'Reduced processing of a 200,000-candidate dataset from 15 minutes to 30 seconds and an OMR/OCR grading pipeline from 2 hours to 15 minutes.',
      'Built meteorological ingestion every 10 minutes, tracking about 12 factors or thresholds, with reporting and GIS views over roughly 5 million time-series records in six months (Mar 2024–Jan 2025).',
    ],
    project: '/work/national-exam-system',
  },
];

export const skillGroups = [
  { name: 'Backend & integration', items: 'C# · ASP.NET Core · EF Core · LINQ · REST APIs · JWT · IdentityServer · SignalR · RabbitMQ · Redis' },
  { name: 'Frontend', items: 'Angular · React · TypeScript · Next.js · Redux Toolkit / Zustand · HTML / CSS · MUI / Ant Design' },
  { name: 'Data & performance', items: 'SQL Server · MySQL · PostgreSQL · MongoDB · Schema design · Query optimization · Index tuning' },
  { name: 'Engineering & delivery', items: 'SOLID · Design patterns · xUnit · JMeter · Git · Docker · CI/CD · Windows / Linux · Kubernetes fundamentals' },
];

export const examExperience = {
  employer: 'G-Connect', period: 'Feb 2024 — Dec 2025',
  role: 'Fullstack Developer / Module Team Lead',
  team: '4 developers + 1–2 testers, under the Tech Lead / PM',
  scope: 'Examination organization and management for the Ministry of Education and Training.',
  outcomes: [
    { value: '20,000+', label: 'Candidates served', detail: 'Across two examination rounds, nearly 10 localities and approximately 20 sites.' },
    { value: '15 min → 30 sec', label: 'Candidate data processing', detail: 'For a 200,000-candidate dataset, using schema refactoring, index tuning and parallel batch processing.' },
    { value: '2 hr → 15 min', label: 'Automated grading pipeline', detail: 'Through optimization of the OMR / OCR workflow.' },
  ],
};
