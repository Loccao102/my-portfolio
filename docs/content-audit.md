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

National Exam System is an employment project at G-Connect, based on the owner's two-page résumé received September 26, 2026. Page 2 supplies the role (Fullstack Developer / Module Team Lead under Tech Lead / PM), stack, two exam deployments and outcomes. More than 20,000 candidates were served; 200,000 is the size of a processing dataset, not a concurrent-user count. Processing dropped from 15 minutes to 30 seconds; OMR/OCR grading dropped from 2 hours to 15 minutes. These are résumé-reported outcomes, not independently reproduced measurements. No architecture topology or public source repository is invented. The employment period is Feb 2024–Dec 2025; exact examination project dates are not separately supplied.

The About page adds résumé-backed roles at myG (Jun 2026–present), NIQ Vietnam (Jan–Jun 2026) and G-Connect, along with skills, education and language levels. The original PDF and personal contact details are not included in the public repository by default. LinkedIn is the professional profile supplied in the CV.

## Refresh rules

- Live server fetches and `npm run sync:github` update repository metadata, commits, releases and Actions. They never invent or automatically promote project stages.
- Workflow results must match the displayed commit SHA. Missing results are not failures or successes.
- Snapshot fallback retains the actual retrieval date and is visibly labeled. Failed refreshes preserve previous data.
- New source revisions require another content review before changing descriptions, decisions or milestones.
- A public repository, green workflow, README V1 heading and published release represent different evidence; none automatically proves production deployment.
