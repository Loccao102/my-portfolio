import sources from './github-sources.json';

export type ProjectStatus = 'shipped' | 'v1' | 'building' | 'prototype' | 'concept' | 'archived' | 'source' | 'case-study';
export type Category = 'systems' | 'lab' | 'tools';
export type Evidence = { repo: string; ref: string; reviewedAt: string; files: { path: string; blobSha: string; url: string }[] };
export type Project = {
  id: string; name: string; repo?: string; status: ProjectStatus; category: Category; featured?: boolean; order: number;
  summary: string; subtitle: string; currentState: string; stack: string[]; highlights: string[]; nextMilestone?: string;
  why: string; problem: string; architecture: string[]; decisions: string[]; accent: string; evidence?: Evidence;
  statusNote: string; contentNote?: string; demo?: string; plannedStack?: boolean; pendingDetails?: boolean; devNote?: string;
};

export const statusLabels: Record<ProjectStatus, string> = {
  shipped: 'Đã triển khai', v1: 'V1', building: 'Đang phát triển', prototype: 'Prototype', concept: 'Ý tưởng', archived: 'Lưu trữ',
  source: 'Có mã nguồn', 'case-study': 'Case study',
};

export const categoryLabels: Record<Category, string> = { systems: 'Hệ thống', lab: 'Thử nghiệm', tools: 'Công cụ' };

// Các mô tả dưới đây được đối chiếu với tài liệu public đã ghim trong repo.
// Trạng thái dự án phản ánh phạm vi được tài liệu xác nhận, không suy diễn production-readiness từ commit, workflow hay star.
export const projects: Project[] = [
  {
    id: 'national-exam-system', name: 'National Exam System', status: 'shipped', category: 'systems', featured: true, order: 1,
    subtitle: 'Hệ thống thi · 20.000+ thí sinh', summary: 'Hệ thống tổ chức thi realtime đã được sử dụng qua hai đợt thi, gần 10 địa phương và khoảng 20 điểm thi.',
    currentState: 'Đã triển khai trong thời gian tôi làm tại G-Connect (02/2024–12/2025). Tôi tham gia với vai trò Fullstack Developer kiêm phụ trách một module dưới Tech Lead / PM. CV ghi nhận hơn 20.000 thí sinh qua hai đợt thi; con số này không phải peak concurrent users.',
    statusNote: 'Case study từ kinh nghiệm làm việc và CV của tôi. “Đã triển khai” áp dụng cho hai đợt thi được ghi nhận; mã nguồn công ty không public.',
    stack: ['ASP.NET Core', 'React / TypeScript', 'MySQL', 'SignalR / WebSocket', 'Redis', 'RabbitMQ', 'Duende IdentityServer', 'Docker'],
    highlights: ['Kết nối realtime và xử lý reconnect', 'Autosave và nộp bài đồng thời', 'Cấu hình, phân quyền và bảo mật', 'Tối ưu schema, index và batch processing', 'Tối ưu OMR / OCR chấm bài', 'Docker và CI/CD on-premise cơ bản'],
    why: 'Hỗ trợ tổ chức, vận hành và quản lý các kỳ thi cho Bộ Giáo dục và Đào tạo.',
    problem: 'Giữ dữ liệu bài làm ổn định khi mạng chập chờn, kết nối tăng đột biến và nhiều thí sinh nộp bài cùng lúc.',
    architecture: [],
    decisions: ['Thiết kế luồng reconnect, overload và autosave trên SignalR / WebSocket.', 'Tái cấu trúc schema, chỉnh index và xử lý dữ liệu theo các batch song song.', 'Áp dụng OWASP Top 10, AES / ECC và kiểm soát truy cập; hệ thống đạt cấp độ an toàn thông tin 3 theo tài liệu dự án.', 'Đóng gói bằng Docker và tự động hóa build / deploy cơ bản lên server nội bộ.'],
    devNote: 'retry != duplicate submit; timeout cũng không đồng nghĩa với failed.', accent: 'pink',
  },
  {
    id: 'queueguard', name: 'QueueGuard', repo: 'Loccao102/Queueguard', status: 'source', category: 'systems', featured: true, order: 2,
    subtitle: 'Phòng chờ ảo khi traffic tăng đột biến', summary: 'Reverse proxy viết bằng Go giúp xếp hàng người dùng, cập nhật vị trí realtime và chỉ cho request hợp lệ đi vào hệ thống chính.',
    currentState: 'Repo public có engine in-memory và Redis, admin controls, SDK, edge worker và Helm. README ghi nhận bài test local 1.000 request khoảng 2.850 req/s với 0% lỗi; portfolio này chưa tự chạy lại benchmark đó.',
    statusNote: 'Đã xác minh mã nguồn public; không tuyên bố đây là bản release production.',
    stack: ['Go', 'Redis', 'SSE', 'Docker', 'Helm'], highlights: ['Thứ tự hàng đợi atomic', 'Cập nhật vị trí bằng SSE', 'Admission ticket HMAC-SHA256', 'Prometheus metrics', 'Edge worker và client SDKs'],
    why: 'Tạo một waiting room có thể self-host cho flash sale, bán vé, đăng ký hoặc bất kỳ đợt traffic burst nào.',
    problem: 'Nếu request tràn thẳng vào origin, một đợt truy cập lớn có thể kéo sập chính dịch vụ cần bảo vệ.',
    architecture: ['HTTP traffic', 'Queue + SSE', 'Signed admission ticket', 'Protected origin'],
    decisions: ['Tách admission control khỏi request xử lý business ở origin.', 'Cho phép thay engine in-memory / Redis qua cùng một interface.', 'Xác thực ticket có thời hạn bằng HMAC ở proxy, edge hoặc backend.'],
    devNote: 'Backpressure trước, autoscaling sau. Không phải cứ thêm pod là queue biến mất.', accent: 'green', evidence: sources.Queueguard,
  },
  {
    id: 'agentguard', name: 'AgentGuard', repo: 'Loccao102/Agent-Guard', status: 'v1', category: 'systems', featured: true, order: 3,
    subtitle: 'Lớp kiểm soát quyền cho AI Agent', summary: 'Một lớp policy và phê duyệt chạy local, chặn hoặc hỏi lại trước khi AI Agent chạm vào file, service hay dữ liệu nhạy cảm.',
    currentState: 'README mô tả AgentGuard v1 gồm MCP stdio proxy, policy YAML, giao diện phê duyệt local và audit trail SQLite. Hệ thống chạy local, không phụ thuộc hosted control plane.',
    statusNote: 'V1 được ghi rõ trong README.md; điều đó không đồng nghĩa với security certification hay production release.',
    stack: ['Go', 'MCP', 'SQLite', 'YAML'], highlights: ['Allow / ask / deny', 'Phê duyệt theo từng call hoặc session', 'Che secret', 'Audit SHA-256 hash chain', 'Signed policy packs'],
    why: 'Cho người dùng một điểm kiểm soát trước khi tool call nhạy cảm được thực thi.',
    problem: 'AI Agent cần ranh giới rõ ràng khi truy cập file, repo, API và database.',
    architecture: ['MCP client', 'Policy + approval', 'MCP server / tool', 'Redacted audit chain'],
    decisions: ['Fail closed khi lớp guard hoặc bước phê duyệt không khả dụng.', 'Lưu audit record local bằng SQLite.', 'Dùng YAML để policy dễ đọc, dễ review và dễ mang sang môi trường khác.'],
    devNote: 'fail closed > “chắc tool này không làm gì nguy hiểm đâu”.', accent: 'sage', evidence: sources['Agent-Guard'],
  },
  {
    id: 'city-of-lies', name: 'City of Lies', repo: 'Loccao102/city-of-lies', status: 'v1', category: 'lab', featured: true, order: 4,
    subtitle: 'Mô phỏng điều tra với nhiều AI agent', summary: 'Một thành phố mô phỏng nơi người chơi điều tra bằng chứng trong khi các nhân vật tự chủ lan truyền những niềm tin và lời kể khác nhau theo thời gian thực.',
    currentState: 'Tài liệu implementation status ghi nhận thế giới 3D và gameplay chính đã hoàn thành, sẵn sàng cho acceptance test và polish trước release. Có 5 scenario; chưa xác nhận public deployment.',
    statusNote: 'Phạm vi V1 playable dựa trên implementation-status document, không phải một GitHub release đã publish.',
    stack: ['Go', 'Next.js 15', 'Three.js', 'WebSocket', 'PostgreSQL', 'Zustand'], highlights: ['Simulation deterministic theo seed', 'Knowledge Guard', '5 scenario', 'Phỏng vấn và sổ tay bằng chứng', 'Ground Truth submission'],
    nextMilestone: 'Acceptance test toàn bộ, test thêm LLM provider nếu cần, hoàn thiện release docs và demo deployment theo IMPLEMENTATION_STATUS.md.',
    why: 'Thử nghiệm cách quan sát thiếu hụt, niềm tin xã hội và ký ức ảnh hưởng đến điều một cộng đồng tin là “sự thật”.',
    problem: 'Một câu chuyện sai có thể trở thành niềm tin phổ biến trước khi bằng chứng được kiểm chứng và công bố.',
    architecture: ['Scenario + seeded state', 'Go simulation', 'WebSocket snapshots', 'Next.js / Three.js view'],
    decisions: ['Giữ simulation state authoritative và deterministic.', 'Chỉ dùng LLM để diễn đạt hội thoại; nội dung phải đi qua Knowledge Guard.', 'Fallback về template dialogue nếu model lỗi hoặc output bị từ chối.'],
    contentNote: 'README.md có nhắc Next.js 16 và React Three Fiber; manifest và implementation-status lại ghi Next.js 15 và Three.js trực tiếp. Portfolio ưu tiên manifest vì đây là dependency thực tế được khai báo.',
    devNote: 'same seed, same chaos. Debug simulation mà không deterministic thì tự làm khó mình.', accent: 'amber', evidence: sources['city-of-lies'],
  },
  {
    id: 'habi', name: 'Habi', repo: 'Loccao102/SaasQuanLyPhongTro', status: 'building', category: 'tools', order: 5,
    subtitle: 'SaaS quản lý vận hành nhà trọ đa tenant', summary: 'Quản lý hợp đồng, khách thuê, điện nước, hóa đơn, đối soát thanh toán và quyền truy cập cho nhiều cơ sở trong cùng một nền tảng.',
    currentState: 'Repo hiện có NestJS API, các ứng dụng Next.js và worker tách biệt. develop.md phân tách rõ phần leasing / billing / control-plane đã có với các production blocker và backlog còn lại.',
    statusNote: '“Đang phát triển” phản ánh đúng backlog và production blocker được ghi trong develop.md.',
    stack: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis'], highlights: ['Authorization theo tenant', 'Luồng hợp đồng và thay người thuê', 'Billing và phân bổ thanh toán', 'Notification job bền vững', 'Worker role tách biệt'],
    nextMilestone: 'Authentication production, payment provider, backup/restore và observability còn được theo dõi trong develop.md.',
    why: 'Giúp chủ nhà và nhân viên ghi chỉ số nhanh hơn, lập hóa đơn nhất quán và theo dõi công nợ rõ ràng hơn.',
    problem: 'Các job có retry và thay đổi liên quan tiền phải vừa tenant-safe, vừa idempotent, vừa có lịch sử audit.',
    architecture: ['Admin / Staff / Invoice / CMS', 'NestJS modular API', 'PostgreSQL source of truth', 'Redis + isolated workers'],
    decisions: ['Bắt đầu bằng modular monolith; chỉ tách service khi có lý do vận hành rõ ràng.', 'Giữ payment/provider integration ngoài billing core.', 'Các thao tác có retry phải idempotent và failure phải quan sát được.'],
    contentNote: 'Offline-first cho nhân viên là hướng sản phẩm; backlog vẫn còn PWA work nên chưa trình bày như capability production hoàn chỉnh.',
    devNote: 'Nếu retry có thể tạo hai hóa đơn hoặc charge hai lần thì retry chưa phải tính năng.', accent: 'pink', evidence: sources.SaasQuanLyPhongTro,
  },
  {
    id: 'sen', name: 'Sen', repo: 'Loccao102/VeyraBot', status: 'prototype', category: 'lab', order: 6,
    subtitle: 'Trợ lý hình hoa sen · web & desktop', summary: 'Một mascot hoa sen mang cảm hứng Việt Nam, có biểu cảm, trạng thái và bản desktop shell để tiến tới trợ lý AI cá nhân.',
    currentState: 'Web playground đang ở v0.5; DESKTOP.md mô tả desktop v0.2 với tray, shortcut, pin và startup controls. README nói rõ agent response hiện vẫn là mô phỏng, chưa nối tool thực thi thật.',
    statusNote: 'Prototype mô tả đúng phần agent còn mô phỏng, dù visual preview và desktop shell đã tồn tại.',
    stack: ['React', 'Three.js', 'React Three Fiber', 'Vite', 'Tauri 2'], highlights: ['6 trạng thái biểu cảm', 'Lotus-bud morph theo energy', 'Ánh mắt phản ứng theo pointer', 'Tray và global shortcut', 'GitHub Pages playground'],
    nextMilestone: 'Nối agent layer với project context, memory và tool được cấp quyền. DESKTOP.md coi Character v1 hiện tại là đã freeze.',
    why: 'Tạo một trợ lý nhẹ nhàng, gần gũi và có bản sắc Việt thay vì một avatar AI chung chung.',
    problem: 'Phần “có hồn” và desktop host đã có; năng lực agent thực thi công việc thật là lớp tiếp theo.',
    architecture: ['Command / voice input', 'Simulated lifecycle', 'Presence + mood', 'Procedural lotus model'],
    decisions: ['Dựng model bằng procedural geometry local.', 'Tái sử dụng mascot web trong Tauri host.', 'Tắt desktop-only controls khi chạy browser preview.'],
    devNote: 'Bug khó nhất không phải shader — là làm một bông sen chớp mắt mà không trông như bị haunted.', accent: 'pink', evidence: sources.VeyraBot, demo: 'https://loccao102.github.io/VeyraBot/',
  },
  {
    id: 'videoget', name: 'VideoGet', repo: 'Loccao102/VideoGet', status: 'building', category: 'tools', order: 7,
    subtitle: 'Tìm trend và Việt hóa video', summary: 'Pipeline tìm video từ Douyin / Bilibili, chấm điểm ứng viên rồi chạy transcription, dịch, giọng đọc và subtitle tiếng Việt.',
    currentState: 'README ghi nhận discovery, job persistence, download history và Python localization worker. Re-render controls, media library và affiliate analyzer vẫn là ưu tiên tiếp theo.',
    statusNote: '“Đang phát triển” mô tả capability và backlog hiện tại; chưa tuyên bố production rollout.',
    stack: ['Go', 'Python', 'SQLite', 'faster-whisper', 'Ollama', 'FFmpeg'], highlights: ['Discovery theo keyword / creator', 'Ranking heuristic và dedup', 'SQLite WAL job persistence', 'Whisper worker sống lâu', 'Dịch, TTS và subtitle'],
    nextMilestone: 'Re-render API/UI, media library, affiliate analysis và tăng tốc render tùy phần cứng.',
    why: 'Gom discovery và Việt hóa media vào một workflow có trạng thái rõ ràng thay vì nhiều script rời rạc.',
    problem: 'Xử lý media đi qua nhiều công cụ và có những stage rất đắt nếu phải chạy lại từ đầu.',
    architecture: ['Discovery + ranking', 'Go API / SQLite jobs', 'Persistent Python worker', 'Localized media output'],
    decisions: ['Giữ Whisper model trong worker chạy lâu thay vì load lại mỗi job.', 'Cache transcript, translation và TTS stage.', 'Tách adapter theo source và dùng job có retry + persistence.'],
    devNote: 'Load Whisper một lần, trả cold-start một lần. CPU/GPU cũng có cảm xúc.', accent: 'blue', evidence: sources.VideoGet,
  },
  {
    id: 'e-classroom', name: 'E-Classroom', repo: 'Loccao102/E-Classroom', status: 'v1', category: 'systems', order: 8,
    subtitle: 'Nền tảng kết nối nhà trường và gia đình', summary: 'Luồng nghiệp vụ theo vai trò cho quản trị viên, giáo viên, học sinh và phụ huynh, với dữ liệu học tập bền vững và realtime delivery.',
    currentState: 'V1 completeness matrix ghi nhận attendance, grading, meetings, security và staged import/export đã triển khai. Performance, accessibility và operational hardening còn lại.',
    statusNote: 'Core-domain V1 được ghi trong docs/09-v1-completeness.md. Public cloud deployment được chủ động để sau.',
    stack: ['Java 21', 'Spring Boot', 'Go / Gin', 'React / Vite', 'PostgreSQL', 'NATS', 'Redis'], highlights: ['Authorization đa trường', 'Điểm danh và điểm số', 'Họp phụ huynh', 'Import/export CSV/XLSX theo stage', 'Transactional outbox'],
    nextMilestone: 'Hardening performance, load và accessibility, sau đó hoàn thiện operational readiness và observability.',
    why: 'Kết nối nhà trường và gia đình qua các luồng học tập, điểm danh và trao đổi có thể giải thích và truy vết.',
    problem: 'Dữ liệu học tập phải đúng và tenant-safe ngay cả khi realtime delivery tạm thời không hoạt động.',
    architecture: ['React / Nginx', 'Spring Boot + PostgreSQL outbox', 'NATS events', 'Go / Redis / WebSocket'],
    decisions: ['Giữ transactional domain ở Java và realtime delivery ở Go.', 'Commit business state và outbox event trong cùng transaction.', 'Stage file import trước khi commit idempotent một cách tường minh.'],
    devNote: 'DB commit != message delivered. Transactional outbox tồn tại vì dấu “=” kia là lời nói dối.', accent: 'sage', evidence: sources['E-Classroom'],
  },
  {
    id: 'mini-siem', name: 'Sentinel · Mini SIEM', repo: 'Loccao102/a-mini-SIEM-platform', status: 'source', category: 'systems', order: 9,
    subtitle: 'Giám sát và phản ứng sự cố bảo mật', summary: 'Một SIEM/SOAR thu log, chuẩn hóa, correlation, điều tra incident và chỉ cho phép response action sau bước phê duyệt.',
    currentState: 'Mã nguồn public mô tả Go ingestion, Redis Streams buffering, Elasticsearch search, PostgreSQL operational state và SOC dashboard bằng Next.js. Portfolio không suy diễn production readiness.',
    statusNote: 'Có mã nguồn public. Workflow chạy thành công không đồng nghĩa production-ready hay security-certified.',
    stack: ['Go', 'Next.js', 'Redis Streams', 'Elasticsearch', 'PostgreSQL'], highlights: ['Chuẩn hóa log', 'Correlation nhiều stage', 'Alert deduplication', 'SOAR approval và TTL rollback', 'Incident PDF report'],
    why: 'Biến log thô thành luồng điều tra và phản ứng có thể theo dõi, thay vì chỉ là một màn hình đầy sự kiện.',
    problem: 'Log từ endpoint cần buffering, normalization và correlation trước khi trở thành bằng chứng hữu ích.',
    architecture: ['Agents / log sources', 'Go API + Redis Streams', 'Detection + storage', 'SOC dashboard / SOAR'],
    decisions: ['Buffer ingestion bằng Redis Streams và backpressure.', 'Tách searchable logs khỏi operational records.', 'Response action phải qua approval và có rollback theo thời hạn.'],
    devNote: 'Log không phải evidence cho đến khi timestamp, normalization và correlation ngừng cãi nhau.', accent: 'sage', evidence: sources['a-mini-SIEM-platform'],
  },
  {
    id: '3d-showcase', name: '3D Showcase', repo: 'Loccao102/3D-showcase', status: 'v1', category: 'lab', order: 10,
    subtitle: 'Engine trình diễn sản phẩm 3D tái sử dụng', summary: 'Engine 3D điều khiển bằng manifest, hỗ trợ asset semantic, material cấu hình được, camera guide và hotspot DOM.',
    currentState: 'README.md đánh dấu core của Showcase Engine V1 đã hoàn thành. Automotive là vertical tham chiếu; production asset, LOD thật, device profiling và compression đo đạc vẫn là phần hardening.',
    statusNote: 'Engine V1 core được tài liệu xác nhận; production hardening và hoàn thiện từng vertical là phạm vi riêng.',
    stack: ['Next.js', 'TypeScript', 'React Three Fiber', 'Three.js', 'Go / Gin'], highlights: ['Manifest không phụ thuộc domain', 'Asset / LOD resolution', 'Camera có thể interrupt', 'Semantic DOM hotspots', 'Snapshot tách khỏi commerce'],
    nextMilestone: 'Hardening asset/device, Automotive Vertical V1 và content/admin pipeline.',
    why: 'Dùng một rendering engine cho nhiều loại sản phẩm thay vì viết lại renderer cho từng domain.',
    problem: 'Renderer sẽ khó tái sử dụng nếu nó biết quá nhiều về SKU, giỏ hàng hoặc business object của một vertical.',
    architecture: ['Vertical manifest', 'Core contracts', 'R3F renderer + bindings', 'Selection snapshot / host'],
    decisions: ['Giữ commerce ở ngoài rendering engine.', 'Resolve node, material và anchor bằng identity ổn định.', 'Render on-demand khi idle và xử lý mobile như một target riêng.'],
    devNote: 'Renderer mà biết SKU là domain leak đang mặc áo 3D.', accent: 'amber', evidence: sources['3D-showcase'],
  },
  {
    id: 'void-weaver', name: 'Void Weaver', repo: 'Loccao102/Void-Weaver', status: 'concept', category: 'lab', order: 11,
    subtitle: 'Cosmic sandbox điều khiển bằng webcam', summary: 'Concept cho một vũ trụ procedural có thể “nắn” bằng cử chỉ hai tay và hand tracking qua webcam.',
    currentState: 'Chủ động đi theo hướng documentation-first: concept, gesture, visual direction, asset strategy, architecture proposal và roadmap. Chưa có application hoàn chỉnh trong tree đã review.',
    statusNote: 'Trạng thái Concept được ghi rõ trong README.md và phù hợp với tree thiên về tài liệu.',
    stack: ['React', 'TypeScript', 'Three.js', 'MediaPipe', 'GLSL'], plannedStack: true,
    highlights: ['Gesture vocabulary', 'Cosmic anomaly design', 'Procedural asset strategy', 'Architecture proposal'],
    nextMilestone: 'Khóa interaction fantasy và visual language trước khi triển khai, đúng theo README.',
    why: 'Khám phá cảm giác “chạm” và biến đổi một vũ trụ số bằng cử chỉ tay.',
    problem: 'Trước khi code realtime experience, cần xác định interaction có đủ thuyết phục và visual language có đủ riêng.',
    architecture: ['Webcam input', 'Hand landmarks', 'Gesture mapping', 'Procedural universe'],
    decisions: ['Ưu tiên procedural geometry, particle và shader thay vì phụ thuộc model nặng.', 'Thiết kế như art sandbox, không ép thành quest-based game.'],
    devNote: 'Một shader tốt đôi khi rẻ hơn 200 MB asset và đẹp hơn một progress bar.', accent: 'amber', evidence: sources['Void-Weaver'],
  },
];

export const featuredProjects = projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
export const nowProjects = ['habi', 'city-of-lies', 'sen', 'videoget'].map(id => projects.find(p => p.id === id)!);
export const getProject = (id: string) => projects.find(p => p.id === id);
export const profile = { name: 'Cao Tiến Lộc', location: 'Hà Nội, Việt Nam', github: 'https://github.com/Loccao102', linkedin: 'https://www.linkedin.com/in/cao-loc-46742b247', email: '', resumeUrl: '' };
