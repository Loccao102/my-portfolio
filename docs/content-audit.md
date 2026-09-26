# Public project content audit

Reviewed September 26, 2026. Ten public repositories and 30 source files are recorded in `src/data/github-sources.json`; links point to the exact reviewed commit. Descriptions summarize repository evidence, not independently reproduced benchmarks or production deployments. Dynamic metadata has its own retrieval timestamp in `repository-snapshot.json`.

| Project / repository | Evidence and resulting presentation |
| --- | --- |
| QueueGuard / Queueguard | Go waiting-room proxy, SSE, signed tickets, optional Redis. Source available; no published release returned. README benchmark explicitly identified as a local, unreproduced result. |
| AgentGuard / Agent-Guard | README documents V1 MCP policy enforcement, approvals, redaction and audit records. V1 label describes documented scope, not a GitHub release. |
| City of Lies / city-of-lies | Go simulation and Next.js/Three.js client. Manifest specifies Next.js 15 despite README claiming 16; no R3F dependency in that frontend manifest. Implementation status documents completed gameplay and remaining acceptance/demo work. |
| Habi / SaasQuanLyPhongTro | NestJS 12 and Next.js 16 manifests; modular monolith with isolated workers. Staff PWA is planned, not claimed complete. Production auth, payment and operational gaps remain documented. |
| Sen / VeyraBot | React Three Fiber web character and Tauri desktop shell. Agent responses are simulated and real tools are not connected. Character V1 is frozen; next work concerns the agent layer. Public demo link comes from README. |
| VideoGet | Go/Python media pipeline with SQLite jobs, Whisper, Ollama and FFmpeg. Building status and next steps derive from README. |
| E-Classroom | Java 21/Spring Boot 4.1, Go gateway and React client from manifests. Core V1 completeness matrix distinguishes implemented domain flows from deferred providers and deployment. |
| Sentinel / a-mini-SIEM-platform | Go/Next.js, Redis Streams, Elasticsearch and PostgreSQL. Source available; build/deploy workflow names remain exact. No production-use assertion. |
| 3D Showcase / 3D-showcase | README reports engine V1 complete with Next.js/R3F and Go/Gin. Production hardening remains. No Actions result is shown when the API returns none. |
| Void Weaver / Void-Weaver | Documentation-only concept. React/Three.js/MediaPipe/GLSL are suggested technologies, clearly labeled as proposed. |

National Exam System is an employment project, confirmed by the owner. Its case study awaits the CV. Technology, responsibilities, architecture, employer and impact numbers remain unspecified.

## Refresh rules

- Live server fetches and `npm run sync:github` update repository metadata, commits, releases and Actions. They never invent or automatically promote project stages.
- Workflow results must match the displayed commit SHA. Missing results are not failures or successes.
- Snapshot fallback retains the actual retrieval date and is visibly labeled. Failed refreshes preserve previous data.
- New source revisions require another content review before changing descriptions, decisions or milestones.
- A public repository, green workflow, README V1 heading and published release represent different evidence; none automatically proves production deployment.
