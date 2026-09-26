import sources from './github-sources.json';

export type ProjectStatus = 'shipped' | 'v1' | 'building' | 'prototype' | 'concept' | 'archived' | 'source' | 'case-study';
export type Category = 'systems' | 'lab' | 'tools';
export type Evidence = { repo: string; ref: string; reviewedAt: string; files: { path: string; blobSha: string; url: string }[] };
export type Project = {
  id: string; name: string; repo?: string; status: ProjectStatus; category: Category; featured?: boolean; order: number;
  summary: string; subtitle: string; currentState: string; stack: string[]; highlights: string[]; nextMilestone?: string;
  why: string; problem: string; architecture: string[]; decisions: string[]; accent: string; evidence?: Evidence;
  statusNote: string; contentNote?: string; demo?: string; plannedStack?: boolean; pendingDetails?: boolean;
};
export const statusLabels: Record<ProjectStatus, string> = {
  shipped: 'Shipped', v1: 'V1', building: 'Building', prototype: 'Prototype', concept: 'Concept', archived: 'Archived',
  source: 'Source available', 'case-study': 'Case study pending',
};
// Reviewed summaries of pinned public files. Labels describe documented scope,
// never production readiness inferred from commits, workflow success or stars.
export const projects: Project[] = [
  {
    id: 'national-exam-system', name: 'National Exam System', status: 'case-study', category: 'systems', featured: true, order: 1,
    subtitle: 'Professional experience', summary: 'An employment project. The public case study is awaiting details from my résumé.',
    currentState: 'Confirmed by the owner as employment work. Role, technologies, scope and outcomes will be added from the résumé.',
    statusNote: 'Employment project confirmed by the owner; public case-study details are pending.',
    stack: [], highlights: [], why: '', problem: '', architecture: [], decisions: [], accent: 'pink', pendingDetails: true,
  },
  {
    id: 'queueguard', name: 'QueueGuard', repo: 'Loccao102/Queueguard', status: 'source', category: 'systems', featured: true, order: 2,
    subtitle: 'Virtual waiting room & traffic shaper', summary: 'A Go reverse proxy with a virtual waiting room, live queue updates and signed admission tickets.',
    currentState: 'Public implementation with in-memory and Redis engines, admin controls, SDKs, an edge worker and Helm files. The README reports a local 1,000-request test at approximately 2,850 req/s with 0% errors; this portfolio has not reproduced that benchmark.',
    statusNote: 'Public source verified; a tagged release or production deployment is not claimed.',
    stack: ['Go', 'Redis', 'SSE', 'Docker', 'Helm'], highlights: ['Atomic queue ordering', 'SSE position updates', 'HMAC-SHA256 tickets', 'Prometheus metrics', 'Edge worker and client SDKs'],
    why: 'A self-hosted waiting room for bursts such as flash sales, ticket sales and registration.', problem: 'Uncontrolled incoming traffic can overwhelm an origin service.',
    architecture: ['HTTP traffic', 'Queue + SSE', 'Signed admission ticket', 'Protected origin'],
    decisions: ['Control admission independently of origin requests.', 'Switch between in-memory and Redis storage through an engine interface.', 'Verify expiring HMAC tickets at the proxy, edge or backend.'], accent: 'green', evidence: sources.Queueguard,
  },
  {
    id: 'agentguard', name: 'AgentGuard', repo: 'Loccao102/Agent-Guard', status: 'v1', category: 'systems', featured: true, order: 3,
    subtitle: 'Local-first MCP firewall', summary: 'A local policy and approval layer for AI-agent tool calls before they reach files, services or data.',
    currentState: 'The README documents AgentGuard v1: an MCP stdio proxy, YAML policies, local approval UI and SQLite audit trail. It runs locally without a hosted control plane.',
    statusNote: 'V1 is explicitly documented in README.md; it does not imply a published release or production certification.',
    stack: ['Go', 'MCP', 'SQLite', 'YAML'], highlights: ['Allow / ask / deny', 'Per-call and session approvals', 'Secret redaction', 'SHA-256 hash-chained audit', 'Signed policy packs'],
    why: 'Evaluate whether sensitive tool calls should execute before forwarding them.', problem: 'Agent tools need a reviewable boundary around access to files, repositories, APIs and databases.',
    architecture: ['MCP client', 'Policy + approval', 'MCP server / tool', 'Redacted audit chain'],
    decisions: ['Fail closed when approval or the guard is unavailable.', 'Persist audit records locally in SQLite.', 'Use portable, human-readable YAML policies.'], accent: 'sage', evidence: sources['Agent-Guard'],
  },
  {
    id: 'city-of-lies', name: 'City of Lies', repo: 'Loccao102/city-of-lies', status: 'v1', category: 'lab', featured: true, order: 4,
    subtitle: 'Multi-agent investigation simulation', summary: 'Investigate evidence while autonomous characters spread competing beliefs through a realtime simulated district.',
    currentState: 'Implementation status records the 3D world and full gameplay as complete, ready for acceptance testing and release polish. Five scenario datasets are documented; a public deployment is not confirmed.',
    statusNote: 'Playable V1 scope comes from the implementation-status document, not a published GitHub release.',
    stack: ['Go', 'Next.js 15', 'Three.js', 'WebSocket', 'PostgreSQL', 'Zustand'], highlights: ['Seeded deterministic simulation', 'Knowledge Guard', 'Five scenarios', 'Interviews and evidence notebook', 'Ground Truth submission'],
    nextMilestone: 'Master acceptance testing, optional LLM-provider testing, release documentation and demo deployment — the tasks listed in IMPLEMENTATION_STATUS.md.',
    why: 'Explore how partial observations, social trust and memory shape beliefs.', problem: 'False narratives can reach social dominance before evidence is verified and published.',
    architecture: ['Scenario + seeded state', 'Go simulation', 'WebSocket snapshots', 'Next.js / Three.js view'],
    decisions: ['Keep simulation state authoritative and deterministic.', 'Restrict LLMs to dialogue expression checked by Knowledge Guard.', 'Fall back to template dialogue when model output is unavailable or rejected.'],
    contentNote: 'README.md lists Next.js 16 and React Three Fiber. The manifest and implementation-status document instead specify Next.js 15 and direct Three.js. The stack here follows the manifest; R3F is not declared there.',
    accent: 'amber', evidence: sources['city-of-lies'],
  },
  {
    id: 'habi', name: 'Habi', repo: 'Loccao102/SaasQuanLyPhongTro', status: 'building', category: 'tools', order: 5,
    subtitle: 'Multi-tenant rental operations SaaS', summary: 'Rental operations covering leases, metering, invoices, payment reconciliation and tenant administration.',
    currentState: 'The repository contains a NestJS API, Next.js applications and isolated workers. develop.md separates implemented leasing, billing and control-plane foundations from production blockers and remaining product work.',
    statusNote: 'Building reflects the explicit unfinished-work and production-blocker backlog in develop.md.',
    stack: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis'], highlights: ['Tenant-scoped authorization', 'Lease and tenant replacement workflows', 'Billing and payment allocation', 'Durable notification jobs', 'Isolated worker roles'],
    nextMilestone: 'Production authentication, payment-provider integration, backup/restore and observability gaps tracked in develop.md.',
    why: 'Support faster meter recording and more reliable invoicing and collection.', problem: 'Retryable jobs and financial changes need tenant isolation, idempotency and audit history.',
    architecture: ['Admin / Staff / Invoice / CMS', 'NestJS modular API', 'PostgreSQL source of truth', 'Redis + isolated workers'],
    decisions: ['Start with a modular monolith; extract services only with evidence.', 'Keep provider integrations outside the billing core.', 'Make retryable operations idempotent and failures observable.'],
    contentNote: 'Offline-first staff workflows are a product direction. The backlog still tracks PWA work; this is not presented as a completed production capability.', accent: 'pink', evidence: sources.SaasQuanLyPhongTro,
  },
  {
    id: 'sen', name: 'Sen', repo: 'Loccao102/VeyraBot', status: 'prototype', category: 'lab', order: 6,
    subtitle: 'Lotus companion · web & desktop', summary: 'An expressive Vietnamese lotus companion with a React Three Fiber playground and a Tauri desktop shell.',
    currentState: 'The web playground is v0.5; DESKTOP.md describes desktop v0.2 with tray, shortcut, pin and startup controls. The README explicitly says agent responses are simulated and real execution tools are not connected.',
    statusNote: 'Prototype describes simulated agent capability, despite an existing visual preview and desktop shell.',
    stack: ['React', 'Three.js', 'React Three Fiber', 'Vite', 'Tauri 2'], highlights: ['Six expressive states', 'Energy-driven lotus-bud morphs', 'Pointer-aware gaze', 'Tray and global shortcut', 'GitHub Pages playground'],
    nextMilestone: 'Connect the planned agent layer to project context, memory and authorized tools. DESKTOP.md treats Character v1 as frozen.',
    why: 'Create a gentle companion inspired by the Vietnamese lotus.', problem: 'The visual companion and desktop host exist; actual agent capability is a separate next step.',
    architecture: ['Command / voice input', 'Simulated lifecycle', 'Presence + mood', 'Procedural lotus model'],
    decisions: ['Build the model with local procedural geometry.', 'Reuse the web mascot in a Tauri host.', 'Disable desktop-only controls in browser preview.'],
    accent: 'pink', evidence: sources.VeyraBot, demo: 'https://loccao102.github.io/VeyraBot/',
  },
  {
    id: 'videoget', name: 'VideoGet', repo: 'Loccao102/VideoGet', status: 'building', category: 'tools', order: 7,
    subtitle: 'Trend discovery & video localization', summary: 'Discover Douyin and Bilibili videos, rank candidates and run a Vietnamese transcription, translation, voice and subtitle pipeline.',
    currentState: 'The README documents discovery, persistent jobs, download history and a Python localization worker. Re-render controls, a media library and an affiliate analyzer remain listed priorities.',
    statusNote: 'Building describes the documented current capabilities and next priorities; no production rollout is asserted.',
    stack: ['Go', 'Python', 'SQLite', 'faster-whisper', 'Ollama', 'FFmpeg'], highlights: ['Keyword and creator discovery', 'Heuristic ranking and deduplication', 'SQLite WAL job persistence', 'Persistent Whisper worker', 'Translation, TTS and subtitles'],
    nextMilestone: 'Re-render API/UI, media-library workflows, affiliate analysis and hardware-dependent render acceleration.',
    why: 'Combine discovery and Vietnamese localization in a traceable job workflow.', problem: 'Media processing spans several tools and expensive repeat stages.',
    architecture: ['Discovery + ranking', 'Go API / SQLite jobs', 'Persistent Python worker', 'Localized media output'],
    decisions: ['Keep the Whisper model loaded in a persistent worker.', 'Cache transcript, translation and TTS stages.', 'Use source-specific adapters and persistent retryable jobs.'], accent: 'blue', evidence: sources.VideoGet,
  },
  {
    id: 'e-classroom', name: 'E-Classroom', repo: 'Loccao102/E-Classroom', status: 'v1', category: 'systems', order: 8,
    subtitle: 'School–family communication platform', summary: 'Role-aware school workflows with durable academic data and realtime delivery for administrators, teachers, students and guardians.',
    currentState: 'The V1 completeness matrix documents implemented attendance, grading, meetings, security and staged import/export workflows. Performance, accessibility and operational hardening remain.',
    statusNote: 'Core-domain V1 is documented in docs/09-v1-completeness.md. Public cloud deployment is explicitly deferred.',
    stack: ['Java 21', 'Spring Boot', 'Go / Gin', 'React / Vite', 'PostgreSQL', 'NATS', 'Redis'], highlights: ['Multi-school authorization', 'Attendance and grading', 'Parent meetings', 'Staged CSV/XLSX import/export', 'Transactional outbox'],
    nextMilestone: 'Performance, load and accessibility hardening, then operational readiness and observability.',
    why: 'Connect schools and families around explainable academic and communication workflows.', problem: 'Academic state must stay durable and tenant-safe when realtime delivery is unavailable.',
    architecture: ['React / Nginx', 'Spring Boot + PostgreSQL outbox', 'NATS events', 'Go / Redis / WebSocket'],
    decisions: ['Keep the transactional domain in Java and realtime delivery in Go.', 'Commit business state and outbox events together.', 'Stage file imports before an explicit idempotent commit.'], accent: 'sage', evidence: sources['E-Classroom'],
  },
  {
    id: 'mini-siem', name: 'Sentinel · Mini SIEM', repo: 'Loccao102/a-mini-SIEM-platform', status: 'source', category: 'systems', order: 9,
    subtitle: 'Security monitoring & response', summary: 'A SIEM/SOAR platform for log ingestion, correlation, incident investigation and approval-gated response.',
    currentState: 'Public source documents Go ingestion, Redis Streams buffering, Elasticsearch search, PostgreSQL operational state and a Next.js SOC dashboard. Production readiness is not established by this portfolio.',
    statusNote: 'Source available. Successful workflows do not establish production readiness or security certification.',
    stack: ['Go', 'Next.js', 'Redis Streams', 'Elasticsearch', 'PostgreSQL'], highlights: ['Log normalization', 'Multi-stage correlation', 'Alert deduplication', 'SOAR approval and TTL rollback', 'Incident PDF reports'],
    why: 'Combine security monitoring and incident response in one inspectable workflow.', problem: 'Raw endpoint logs need buffering, normalization and correlation to become useful evidence.',
    architecture: ['Agents / log sources', 'Go API + Redis Streams', 'Detection + storage', 'SOC dashboard / SOAR'],
    decisions: ['Buffer ingestion with Redis Streams and backpressure.', 'Separate searchable logs from operational records.', 'Gate response actions with approval and time-limited rollback.'], accent: 'sage', evidence: sources['a-mini-SIEM-platform'],
  },
  {
    id: '3d-showcase', name: '3D Showcase', repo: 'Loccao102/3D-showcase', status: 'v1', category: 'lab', order: 10,
    subtitle: 'Reusable 3D product showcase engine', summary: 'A manifest-driven 3D engine with semantic assets, configurable materials, guided cameras and DOM hotspots.',
    currentState: 'README.md marks Showcase Engine V1 core complete. Automotive is the reference vertical; production assets, real LODs, device profiling and measured compression remain hardening work.',
    statusNote: 'Engine V1 completion is explicitly documented; production hardening and vertical completion are separate.',
    stack: ['Next.js', 'TypeScript', 'React Three Fiber', 'Three.js', 'Go / Gin'], highlights: ['Domain-neutral manifests', 'Asset / LOD resolution', 'Interruptible cameras', 'Semantic DOM hotspots', 'Commerce-independent snapshots'],
    nextMilestone: 'Production asset/device hardening, Automotive Vertical V1 and a content/admin pipeline.',
    why: 'Reuse one rendering engine across product domains.', problem: 'A renderer should not depend on one vertical’s business objects or commerce flow.',
    architecture: ['Vertical manifest', 'Core contracts', 'R3F renderer + bindings', 'Selection snapshot / host'],
    decisions: ['Keep commerce outside the rendering engine.', 'Resolve nodes, materials and anchors by stable identities.', 'Render on demand while idle and frame mobile separately.'], accent: 'amber', evidence: sources['3D-showcase'],
  },
  {
    id: 'void-weaver', name: 'Void Weaver', repo: 'Loccao102/Void-Weaver', status: 'concept', category: 'lab', order: 11,
    subtitle: 'Webcam-driven cosmic sandbox concept', summary: 'A documented concept for shaping a procedural universe with two-hand gestures and webcam tracking.',
    currentState: 'Intentionally documentation-first: concept, gestures, visual direction, asset strategy, architecture proposal and roadmap. An implemented application is not present in the reviewed tree.',
    statusNote: 'Concept is explicit in README.md and supported by the documentation-only tree.',
    stack: ['React', 'TypeScript', 'Three.js', 'MediaPipe', 'GLSL'], plannedStack: true,
    highlights: ['Gesture vocabulary', 'Cosmic anomaly design', 'Procedural asset strategy', 'Architecture proposal'],
    nextMilestone: 'Lock the interaction fantasy and visual language before implementation, as stated in the README.',
    why: 'Explore an interactive cosmic toy controlled with hand gestures.', problem: 'Define a convincing interaction and visual language before building the realtime experience.',
    architecture: ['Webcam input', 'Hand landmarks', 'Gesture mapping', 'Procedural universe'],
    decisions: ['Prefer procedural geometry, particles and shaders over heavy model dependencies.', 'Design an art sandbox rather than a quest-based game.'], accent: 'amber', evidence: sources['Void-Weaver'],
  },
];
export const featuredProjects = projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
export const nowProjects = ['habi', 'city-of-lies', 'sen', 'videoget'].map(id => projects.find(p => p.id === id)!);
export const getProject = (id: string) => projects.find(p => p.id === id);
export const profile = { name: 'Cao Tiến Lộc', location: 'Hanoi, Vietnam', github: 'https://github.com/Loccao102', email: '', resumeUrl: '' };
