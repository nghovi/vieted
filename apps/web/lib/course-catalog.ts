export type CourseSubject = "history" | "math" | "english" | "literature";

export type CourseChapter = {
  id: string;
  title: string;
  summary: string;
  keyIdeas: string[];
};

export type CourseCatalogEntry = {
  grade: number;
  subject: CourseSubject;
  title: string;
  summary: string;
  chapters: CourseChapter[];
};

type CourseSeed = {
  grade: number;
  subject: CourseSubject;
  title: string;
  summary: string;
  chapters: Array<{
    id: string;
    title: string;
    summary: string;
  }>;
};

const subjectKeyIdeas: Record<CourseSubject, string[]> = {
  history: [
    "Nắm được bối cảnh, nhân vật và mốc thời gian chính của bài.",
    "Biết liên hệ nguyên nhân, diễn biến và kết quả của sự kiện.",
    "Ghi nhớ ý nghĩa lịch sử và điểm cần phân biệt với các bài gần kề.",
  ],
  math: [
    "Nhận diện đúng dạng toán và dữ kiện quan trọng của bài.",
    "Nắm quy tắc, công thức hoặc chiến lược giải phù hợp.",
    "Biết những lỗi sai thường gặp để tránh khi làm bài.",
  ],
  english: [
    "Nắm từ vựng, mẫu câu và cấu trúc ngữ pháp trọng tâm.",
    "Hiểu ngữ cảnh sử dụng trong giao tiếp và bài đọc.",
    "Biết cách luyện nhanh trước khi làm bài hoặc ôn tập.",
  ],
  literature: [
    "Nắm nội dung chính, hình ảnh và thông điệp của bài học.",
    "Biết điểm cần chú ý về tiếng Việt, đọc hiểu hoặc tạo lập văn bản.",
    "Ghi nhớ ý quan trọng để chuẩn bị cho phần luyện tập sau.",
  ],
};

const courseSeeds: CourseSeed[] = [
  {
    grade: 6,
    subject: "history",
    title: "Lịch sử lớp 6",
    summary: "Bắt đầu với xã hội nguyên thủy, các quốc gia cổ đại và nền tảng lịch sử Việt Nam thời kì đầu.",
    chapters: [
      { id: "xa-hoi-nguyen-thuy", title: "Bài 1. Xã hội nguyên thủy", summary: "Khám phá đời sống con người thời nguyên thủy và bước chuyển sang xã hội có giai cấp." },
      { id: "ai-cap-va-luong-ha", title: "Bài 2. Ai Cập và Lưỡng Hà cổ đại", summary: "Tìm hiểu sự hình thành nhà nước cổ đại phương Đông và những thành tựu đầu tiên." },
      { id: "van-lang-au-lac", title: "Bài 3. Nhà nước Văn Lang - Âu Lạc", summary: "Nhìn lại nền tảng đầu tiên của lịch sử dân tộc Việt Nam." },
    ],
  },
  {
    grade: 6,
    subject: "math",
    title: "Toán lớp 6",
    summary: "Ôn nền tảng số học, phân số và hình học cơ bản để xây chắc tư duy Toán từ đầu cấp THCS.",
    chapters: [
      { id: "so-tu-nhien", title: "Chương 1. Số tự nhiên", summary: "Làm quen phép tính, thứ tự thực hiện và các bài toán cơ bản với số tự nhiên." },
      { id: "phan-so", title: "Chương 2. Phân số", summary: "Học khái niệm phân số, rút gọn và các phép toán với phân số." },
      { id: "hinh-hoc-co-ban", title: "Chương 3. Hình học cơ bản", summary: "Nhận biết điểm, đoạn thẳng, góc và các yếu tố hình học quen thuộc." },
    ],
  },
  {
    grade: 6,
    subject: "english",
    title: "Tiếng Anh lớp 6",
    summary: "Học từ vựng, ngữ pháp và tình huống giao tiếp nền tảng cho học sinh mới vào THCS.",
    chapters: [
      { id: "my-new-school", title: "Unit 1. My New School", summary: "Làm quen môi trường học mới, bạn bè mới và những mẫu câu đầu năm học." },
      { id: "my-house", title: "Unit 2. My House", summary: "Mở rộng vốn từ về ngôi nhà, đồ vật và vị trí trong không gian sống." },
      { id: "my-friends", title: "Unit 3. My Friends", summary: "Rèn cách miêu tả bạn bè, ngoại hình và tính cách bằng câu đơn giản." },
    ],
  },
  {
    grade: 6,
    subject: "literature",
    title: "Ngữ văn lớp 6",
    summary: "Bắt đầu với đọc hiểu văn bản, tiếng Việt và tạo lập văn bản ở cấp THCS.",
    chapters: [
      { id: "truyen-va-tho", title: "Bài 1. Truyện và thơ mở đầu", summary: "Làm quen cách đọc hiểu văn bản truyện và thơ ở lớp 6." },
      { id: "tieng-viet-nen-tang", title: "Bài 2. Tiếng Việt nền tảng", summary: "Nhận biết từ, câu và các yếu tố ngôn ngữ thường gặp trong bài học." },
      { id: "viet-doan-van", title: "Bài 3. Viết đoạn văn", summary: "Tập xây dựng đoạn văn rõ ý, đúng trình tự và đúng yêu cầu đề." },
    ],
  },
  {
    grade: 7,
    subject: "history",
    title: "Lịch sử lớp 7",
    summary: "Theo dõi tiến trình lịch sử Việt Nam và thế giới thời trung đại với nhiều biến chuyển lớn.",
    chapters: [
      { id: "chau-au-trung-dai", title: "Bài 1. Tây Âu thời trung đại", summary: "Nhìn lại xã hội phong kiến châu Âu và sự biến đổi qua từng thời kì." },
      { id: "dai-viet-thoi-ly-tran", title: "Bài 2. Đại Việt thời Lý - Trần", summary: "Tìm hiểu sự phát triển của nhà nước và đời sống Đại Việt thời phong kiến." },
      { id: "ba-lan-khang-chien", title: "Bài 3. Ba lần kháng chiến chống Mông - Nguyên", summary: "Nắm diễn biến và ý nghĩa của những chiến thắng lớn thời Trần." },
    ],
  },
  {
    grade: 7,
    subject: "math",
    title: "Toán lớp 7",
    summary: "Củng cố số hữu tỉ, đại lượng tỉ lệ, tam giác và dữ liệu thống kê ở mức trung cấp.",
    chapters: [
      { id: "so-huu-ti", title: "Chương 1. Số hữu tỉ", summary: "Ôn phép tính, so sánh và vận dụng số hữu tỉ trong bài toán thực tế." },
      { id: "dai-luong-ti-le", title: "Chương 2. Đại lượng tỉ lệ", summary: "Nhận biết tỉ lệ thuận, tỉ lệ nghịch và cách giải bài toán liên quan." },
      { id: "tam-giac", title: "Chương 3. Tam giác", summary: "Học tính chất tam giác, quan hệ góc cạnh và các trường hợp bằng nhau." },
    ],
  },
  {
    grade: 7,
    subject: "english",
    title: "Tiếng Anh lớp 7",
    summary: "Mở rộng giao tiếp hằng ngày, hoạt động học tập và các chủ điểm quen thuộc của tuổi học sinh.",
    chapters: [
      { id: "hobbies", title: "Unit 1. Hobbies", summary: "Nói về sở thích, thói quen và các hoạt động yêu thích trong cuộc sống hằng ngày." },
      { id: "health", title: "Unit 2. Health", summary: "Học từ vựng và mẫu câu về sức khỏe, thói quen tốt và lời khuyên." },
      { id: "community-service", title: "Unit 3. Community Service", summary: "Rèn cách nói về hoạt động cộng đồng và trách nhiệm với tập thể." },
    ],
  },
  {
    grade: 7,
    subject: "literature",
    title: "Ngữ văn lớp 7",
    summary: "Tăng cường đọc hiểu, cảm thụ văn học và viết đoạn, bài theo yêu cầu rõ hơn.",
    chapters: [
      { id: "truyen-ngu-ngon", title: "Bài 1. Truyện ngụ ngôn và bài học", summary: "Đọc hiểu truyện ngụ ngôn và rút ra ý nghĩa từ chi tiết tiêu biểu." },
      { id: "van-ban-thong-tin", title: "Bài 2. Văn bản thông tin", summary: "Nhận biết cách tổ chức thông tin và ý chính trong văn bản." },
      { id: "viet-bai-van-ngan", title: "Bài 3. Viết bài văn ngắn", summary: "Rèn cách lập ý, triển khai và diễn đạt rõ ràng trong bài viết." },
    ],
  },
  {
    grade: 8,
    subject: "history",
    title: "Lịch sử lớp 8",
    summary: "Tập trung vào lịch sử cận đại thế giới và Việt Nam với nhiều chuyển biến sâu sắc.",
    chapters: [
      { id: "cach-mang-tu-san", title: "Bài 1. Những cuộc cách mạng tư sản", summary: "Theo dõi sự thay đổi của thế giới cận đại qua các cuộc cách mạng lớn." },
      { id: "viet-nam-the-ki-xix", title: "Bài 2. Việt Nam thế kỉ XIX", summary: "Tìm hiểu bối cảnh đất nước trước khi thực dân Pháp xâm lược." },
      { id: "phap-xam-luoc-viet-nam", title: "Bài 3. Pháp xâm lược Việt Nam", summary: "Nắm nguyên nhân, diễn biến và phản ứng của triều đình và nhân dân." },
    ],
  },
  {
    grade: 8,
    subject: "math",
    title: "Toán lớp 8",
    summary: "Mở rộng đại số và hình học với biểu thức, phương trình và tứ giác quen thuộc.",
    chapters: [
      { id: "da-thuc", title: "Chương 1. Đa thức", summary: "Luyện cộng, trừ, nhân đa thức và nhận biết hằng đẳng thức đáng nhớ." },
      { id: "phan-thuc-dai-so", title: "Chương 2. Phân thức đại số", summary: "Làm quen rút gọn, quy đồng và phép toán với phân thức đại số." },
      { id: "tu-giac", title: "Chương 3. Tứ giác", summary: "Học tính chất hình thang, hình bình hành, hình chữ nhật và hình thoi." },
    ],
  },
  {
    grade: 8,
    subject: "english",
    title: "Tiếng Anh lớp 8",
    summary: "Tăng mức độ giao tiếp, bài đọc và chủ điểm xã hội gần gũi với học sinh trung học.",
    chapters: [
      { id: "leisure-activities", title: "Unit 1. Leisure Activities", summary: "Nói về hoạt động giải trí và cách quản lí thời gian phù hợp." },
      { id: "life-in-the-countryside", title: "Unit 2. Life in the Countryside", summary: "So sánh cuộc sống nông thôn, thành phố và điều kiện sinh hoạt." },
      { id: "peoples-of-viet-nam", title: "Unit 3. Peoples of Viet Nam", summary: "Mở rộng vốn từ về văn hóa, cộng đồng và sự đa dạng ở Việt Nam." },
    ],
  },
  {
    grade: 8,
    subject: "literature",
    title: "Ngữ văn lớp 8",
    summary: "Phát triển mạnh hơn về đọc hiểu, tiếng Việt và kĩ năng viết đoạn, viết bài hoàn chỉnh.",
    chapters: [
      { id: "truyen-ki-va-ki-su", title: "Bài 1. Truyện kí và kí sự", summary: "Nhận diện đặc điểm tự sự và giọng kể trong các văn bản quen thuộc." },
      { id: "van-nghi-luan", title: "Bài 2. Văn nghị luận", summary: "Bước đầu hiểu luận điểm, lí lẽ và dẫn chứng trong văn bản nghị luận." },
      { id: "viet-bai-nghi-luan", title: "Bài 3. Viết bài nghị luận ngắn", summary: "Tập xây dựng lập luận và trình bày ý kiến bằng bài viết rõ ràng." },
    ],
  },
  {
    grade: 9,
    subject: "literature",
    title: "Ngữ văn lớp 9",
    summary: "Khởi động với đọc hiểu, tiếng Việt và viết bài theo định hướng chuẩn bị cho cuối cấp.",
    chapters: [
      { id: "thanh-ngu-va-ngon-ngu", title: "Bài 1. Đọc hiểu mở đầu", summary: "Làm quen cách đọc văn bản trọng tâm và xác định yêu cầu của bài học lớp 9." },
      { id: "nghi-luan-va-thuyet-minh", title: "Bài 2. Nghị luận và thuyết minh", summary: "Ôn cấu trúc bài viết và các thao tác lập luận, thuyết minh căn bản." },
      { id: "on-tap-ky-nang", title: "Bài 3. Ôn tập kĩ năng", summary: "Tập hợp các điểm cần nhớ để chuẩn bị cho những chặng học tiếp theo." },
    ],
  },
];

export const courseCatalog: CourseCatalogEntry[] = courseSeeds.map((seed) => ({
  ...seed,
  chapters: seed.chapters.map((chapter) => ({
    ...chapter,
    keyIdeas: subjectKeyIdeas[seed.subject],
  })),
}));

export function getCourseCatalogEntry(grade: number, subject: string) {
  return (
    courseCatalog.find(
      (entry) => entry.grade === grade && entry.subject === subject,
    ) ?? null
  );
}

export function getCourseChapter(
  grade: number,
  subject: string,
  chapterId: string,
) {
  return (
    getCourseCatalogEntry(grade, subject)?.chapters.find(
      (chapter) => chapter.id === chapterId,
    ) ?? null
  );
}

export function hasCourseCatalogEntry(grade: number, subject: string) {
  return getCourseCatalogEntry(grade, subject) !== null;
}

export function getCoursePath(grade: number, subject: string) {
  return `/courses/${subject}/${grade}`;
}
