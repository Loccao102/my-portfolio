// Thông tin nghề nghiệp được tóm tắt từ CV hai trang của chủ portfolio.
// Thông tin liên hệ và file PDF gốc không được public trong module này.
export const resumeSource = {
  title: 'Middle .NET / Fullstack Developer',
  reviewedAt: '2026-09-26',
  note: 'Kinh nghiệm và kết quả công việc được tóm tắt từ CV của tôi. Hoạt động repository public được lấy riêng từ GitHub.',
};

export const experience = [
  {
    company: 'myG', role: 'Backend Developer', period: '06/2026 — Hiện tại',
    focus: 'Nền tảng thanh toán & dịch vụ game realtime',
    stack: ['C#', 'ASP.NET Web Forms', 'SQL Server', 'Java Spring', 'Socket.io', 'MySQL', 'Redis'],
    highlights: [
      'Mở rộng nền tảng thanh toán xử lý khoảng 50.000–100.000 giao dịch mỗi tháng, tích hợp VTC Pay, MoMo và SePay.',
      'Áp dụng Factory / Strategy để thêm payment gateway mới trong vài giờ mà không phá vỡ flow thanh toán đang chạy.',
      'Triển khai API idempotent và webhook retry với tỷ lệ retry thành công khoảng 95%; xây tool retry cho khoảng 500.000 transaction log.',
      'Bàn giao hơn 10 REST API cho đối tác và duy trì logic game realtime, match state cùng đồng bộ event client cho Wewin / MonkeyCard.',
    ],
  },
  {
    company: 'NIQ Vietnam', role: 'Fullstack Developer', period: '01/2026 — 06/2026',
    focus: 'Dịch vụ công trực tuyến mức độ 4',
    stack: ['ASP.NET Core', 'Angular', 'SQL Server', 'REST API'],
    highlights: [
      'Phát triển các luồng thủ tục hành chính liên phòng ban cho Hà Nội, Thái Nguyên và Bộ Văn hóa.',
      'Tích hợp Cổng Dịch vụ công Quốc gia, VNeID và các cổng thanh toán nhà nước.',
      'Làm việc trong core team 5–7 kỹ sư thuộc dự án khoảng 30 người.',
    ],
  },
  {
    company: 'G-Connect', role: 'Fullstack Developer / Module Team Lead', period: '02/2024 — 12/2025',
    focus: 'Hệ thống thi & dữ liệu khí tượng',
    stack: ['ASP.NET Core', 'React', 'TypeScript', 'MySQL', 'SQL Server', 'SignalR', 'Redis', 'RabbitMQ', 'Docker'],
    highlights: [
      'Phụ trách 4 developer và 1–2 tester dưới Tech Lead / PM: chia việc, review code và xử lý vấn đề ở application lẫn database.',
      'Tham gia bàn giao hai đợt thi tại gần 10 địa phương, khoảng 20 điểm thi và hơn 20.000 thí sinh.',
      'Giảm xử lý dataset 200.000 thí sinh từ 15 phút xuống 30 giây và pipeline chấm OMR/OCR từ 2 giờ xuống 15 phút.',
      'Xây pipeline ingest khí tượng mỗi 10 phút, theo dõi khoảng 12 yếu tố / ngưỡng, có báo cáo và GIS trên khoảng 5 triệu bản ghi time-series trong 6 tháng (03/2024–01/2025).',
    ],
    project: '/work/national-exam-system',
  },
];

export const skillGroups = [
  { name: 'Backend & tích hợp', items: 'C# · ASP.NET Core · EF Core · LINQ · REST APIs · JWT · IdentityServer · SignalR · RabbitMQ · Redis' },
  { name: 'Frontend', items: 'Angular · React · TypeScript · Next.js · Redux Toolkit / Zustand · HTML / CSS · MUI / Ant Design' },
  { name: 'Dữ liệu & hiệu năng', items: 'SQL Server · MySQL · PostgreSQL · MongoDB · Schema design · Query optimization · Index tuning' },
  { name: 'Engineering & delivery', items: 'SOLID · Design patterns · xUnit · JMeter · Git · Docker · CI/CD · Windows / Linux · Kubernetes fundamentals' },
];

export const examExperience = {
  employer: 'G-Connect', period: '02/2024 — 12/2025', role: 'Fullstack Developer / Module Team Lead',
  team: '4 developer + 1–2 tester, dưới Tech Lead / PM',
  scope: 'Hệ thống hỗ trợ tổ chức và quản lý kỳ thi cho Bộ Giáo dục và Đào tạo.',
  outcomes: [
    { value: '20.000+', label: 'Thí sinh', detail: 'Qua hai đợt thi, gần 10 địa phương và khoảng 20 điểm thi.' },
    { value: '15 phút → 30 giây', label: 'Xử lý dữ liệu thí sinh', detail: 'Với dataset 200.000 thí sinh nhờ chỉnh schema, index và parallel batch processing.' },
    { value: '2 giờ → 15 phút', label: 'Pipeline chấm tự động', detail: 'Sau khi tối ưu luồng OMR / OCR.' },
  ],
};
