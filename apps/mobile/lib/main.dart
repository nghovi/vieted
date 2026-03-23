import 'package:flutter/material.dart';

void main() {
  runApp(const VietEdApp());
}

class GradeOption {
  const GradeOption({
    required this.grade,
    required this.isAvailable,
  });

  final int grade;
  final bool isAvailable;
}

class SubjectOption {
  const SubjectOption({
    required this.label,
    required this.isAvailable,
  });

  final String label;
  final bool isAvailable;
}

class AvatarOption {
  const AvatarOption({
    required this.key,
    required this.label,
    required this.emoji,
    required this.background,
    required this.foreground,
  });

  final String key;
  final String label;
  final String emoji;
  final Color background;
  final Color foreground;
}

class StudentSession {
  const StudentSession({
    required this.nickname,
    required this.phoneNumber,
    required this.password,
    required this.avatarKey,
    required this.currentGrade,
    required this.currentSubject,
    required this.currentHistoryChapter,
    required this.currentGeographyChapter,
    required this.currentEnglishChapter,
  });

  final String nickname;
  final String phoneNumber;
  final String password;
  final String avatarKey;
  final int currentGrade;
  final String currentSubject;
  final String currentHistoryChapter;
  final String currentGeographyChapter;
  final String currentEnglishChapter;

  String get displayName => nickname;

  StudentSession copyWith({
    String? nickname,
    String? phoneNumber,
    String? password,
    String? avatarKey,
    int? currentGrade,
    String? currentSubject,
    String? currentHistoryChapter,
    String? currentGeographyChapter,
    String? currentEnglishChapter,
  }) {
    return StudentSession(
      nickname: nickname ?? this.nickname,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      password: password ?? this.password,
      avatarKey: avatarKey ?? this.avatarKey,
      currentGrade: currentGrade ?? this.currentGrade,
      currentSubject: currentSubject ?? this.currentSubject,
      currentHistoryChapter: currentHistoryChapter ?? this.currentHistoryChapter,
      currentGeographyChapter:
          currentGeographyChapter ?? this.currentGeographyChapter,
      currentEnglishChapter: currentEnglishChapter ?? this.currentEnglishChapter,
    );
  }
}

class VietEdAppState extends ChangeNotifier {
  StudentSession? _session;

  StudentSession? get session => _session;

  bool get isLoggedIn => _session != null;

  void login({
    required String phoneNumber,
    required String password,
  }) {
    _session = StudentSession(
      nickname: 'Học sinh ${phoneNumber.substring(phoneNumber.length - 4)}',
      phoneNumber: phoneNumber,
      password: password,
      avatarKey: avatarOptions.first.key,
      currentGrade: 9,
      currentSubject: 'Lịch sử',
      currentHistoryChapter: historyChapterOptions.first,
      currentGeographyChapter: geographyChapterOptions.first,
      currentEnglishChapter: englishChapterOptions.first,
    );
    notifyListeners();
  }

  void logout() {
    _session = null;
    notifyListeners();
  }

  void saveStudyPreference({
    required int currentGrade,
    required String currentSubject,
    required String currentHistoryChapter,
    required String currentGeographyChapter,
    required String currentEnglishChapter,
  }) {
    final session = _session;
    if (session == null) {
      return;
    }

    _session = session.copyWith(
      currentGrade: currentGrade,
      currentSubject: currentSubject,
      currentHistoryChapter: currentHistoryChapter,
      currentGeographyChapter: currentGeographyChapter,
      currentEnglishChapter: currentEnglishChapter,
    );
    notifyListeners();
  }

  void updateAvatar(String avatarKey) {
    final session = _session;
    if (session == null) {
      return;
    }

    _session = session.copyWith(avatarKey: avatarKey);
    notifyListeners();
  }

  bool updatePassword({
    required String currentPassword,
    required String nextPassword,
  }) {
    final session = _session;
    if (session == null || session.password != currentPassword) {
      return false;
    }

    _session = session.copyWith(password: nextPassword);
    notifyListeners();
    return true;
  }

  void updateNickname(String nickname) {
    final session = _session;
    if (session == null) {
      return;
    }

    _session = session.copyWith(nickname: nickname);
    notifyListeners();
  }
}

const gradeOptions = <GradeOption>[
  GradeOption(grade: 1, isAvailable: false),
  GradeOption(grade: 2, isAvailable: false),
  GradeOption(grade: 3, isAvailable: false),
  GradeOption(grade: 4, isAvailable: false),
  GradeOption(grade: 5, isAvailable: false),
  GradeOption(grade: 6, isAvailable: false),
  GradeOption(grade: 7, isAvailable: false),
  GradeOption(grade: 8, isAvailable: false),
  GradeOption(grade: 9, isAvailable: true),
  GradeOption(grade: 10, isAvailable: false),
  GradeOption(grade: 11, isAvailable: false),
  GradeOption(grade: 12, isAvailable: false),
];

const subjectOptions = <SubjectOption>[
  SubjectOption(label: 'Lịch sử', isAvailable: true),
  SubjectOption(label: 'Địa lí', isAvailable: false),
  SubjectOption(label: 'Toán', isAvailable: true),
  SubjectOption(label: 'Tiếng Anh', isAvailable: true),
  SubjectOption(label: 'Ngữ văn', isAvailable: true),
  SubjectOption(label: 'Vật lý', isAvailable: false),
  SubjectOption(label: 'Hóa học', isAvailable: false),
];

const historyChapterOptions = <String>[
  'Chương 1. Thế giới từ năm 1918 đến năm 1945',
  'Chương 2. Việt Nam từ năm 1918 đến năm 1945',
  'Chương 3. Thế giới từ năm 1945 đến năm 1991',
  'Chương 4. Việt Nam từ năm 1945 đến năm 1991',
  'Chương 5. Thế giới từ năm 1991 đến nay',
  'Chương 6. Việt Nam từ năm 1991 đến nay',
  'Chương 7. Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa',
];

const geographyChapterOptions = <String>[
  'Chương 1. Địa lí dân cư Việt Nam',
  'Chương 2. Địa lí các ngành kinh tế',
  'Chương 3. Sự phân hóa lãnh thổ',
  'Chương 4. Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo',
];

const englishChapterOptions = <String>[
  'Unit 1. Local Community',
  'Unit 2. City Life',
  'Unit 3. Healthy Living for Teens',
  'Unit 4. Remembering the Past',
  'Unit 5. Our Experiences',
];

const mobileLearnContent = <String, ({String summary, List<String> keyIdeas})>{
  'Chương 1. Thế giới từ năm 1918 đến năm 1945': (
    summary:
        'Tập trung vào trật tự thế giới sau Chiến tranh thế giới thứ nhất, khủng hoảng kinh tế 1929-1933 và Chiến tranh thế giới thứ hai.',
    keyIdeas: [
      'Nắm được hệ thống Véc-xai - Oa-sinh-tơn hình thành như thế nào.',
      'Hiểu nguyên nhân và tác động của khủng hoảng kinh tế 1929-1933.',
      'Phân biệt đặc điểm của chủ nghĩa phát xít ở Đức, I-ta-li-a và Nhật Bản.',
      'Ghi nhớ diễn biến chính và bước ngoặt của Chiến tranh thế giới thứ hai.',
    ],
  ),
  'Chương 2. Việt Nam từ năm 1918 đến năm 1945': (
    summary:
        'Tìm hiểu chính sách khai thác thuộc địa lần thứ hai của Pháp, hoạt động của Nguyễn Ái Quốc, sự thành lập Đảng Cộng sản Việt Nam và Cách mạng tháng Tám.',
    keyIdeas: [
      'Nhớ chính sách khai thác thuộc địa lần thứ hai của Pháp và tác động tới xã hội Việt Nam.',
      'Theo dõi hành trình Nguyễn Ái Quốc tìm đường cứu nước và truyền bá chủ nghĩa Mác - Lê-nin.',
      'Nắm được ý nghĩa của việc thành lập Đảng Cộng sản Việt Nam năm 1930.',
      'Hiểu vì sao tháng Tám năm 1945 là thời cơ cách mạng chín muồi.',
    ],
  ),
  'Chương 3. Thế giới từ năm 1945 đến năm 1991': (
    summary:
        'Khái quát Chiến tranh lạnh, tình hình Liên Xô và Đông Âu, sự phát triển của Mĩ, Tây Âu, Mỹ La-tinh và châu Á sau năm 1945.',
    keyIdeas: [
      'Hiểu khái niệm Chiến tranh lạnh và những biểu hiện chính.',
      'Nắm được thành tựu và khó khăn của Liên Xô, Đông Âu sau chiến tranh.',
      'Biết được sự phát triển của Mĩ, Tây Âu, Mỹ La-tinh và châu Á.',
      'Nhớ nguyên nhân cơ bản dẫn tới sự tan rã của Liên Xô và Đông Âu.',
    ],
  ),
  'Chương 4. Việt Nam từ năm 1945 đến năm 1991': (
    summary:
        'Bao quát quá trình xây dựng chính quyền cách mạng, kháng chiến chống Pháp, chống Mĩ và công cuộc xây dựng đất nước đến trước Đổi mới.',
    keyIdeas: [
      'Nắm được tình thế hiểm nghèo của nước Việt Nam Dân chủ Cộng hòa sau 1945.',
      'Ghi nhớ ý nghĩa của chiến thắng Điện Biên Phủ và Hiệp định Giơ-ne-vơ.',
      'Hiểu tiến trình đấu tranh chống Mĩ đi tới đại thắng mùa Xuân 1975.',
      'Biết được ý nghĩa thống nhất đất nước và bối cảnh trước Đổi mới.',
    ],
  ),
  'Chương 5. Thế giới từ năm 1991 đến nay': (
    summary:
        'Tìm hiểu xu thế phát triển của thế giới sau Chiến tranh lạnh, trật tự đa cực, toàn cầu hóa và vai trò của các tổ chức quốc tế.',
    keyIdeas: [
      'Nắm được xu thế chung của thế giới sau năm 1991.',
      'Hiểu khái niệm toàn cầu hóa và tác động hai mặt của nó.',
      'Biết vai trò của Liên hợp quốc và các trung tâm lớn trong quan hệ quốc tế.',
    ],
  ),
  'Chương 6. Việt Nam từ năm 1991 đến nay': (
    summary:
        'Khái quát thành tựu của công cuộc Đổi mới, quá trình hội nhập quốc tế và những định hướng phát triển của Việt Nam thời kì mới.',
    keyIdeas: [
      'Nắm được những thành tựu nổi bật của công cuộc Đổi mới.',
      'Ghi nhớ các dấu mốc hội nhập như gia nhập ASEAN và WTO.',
      'Hiểu yêu cầu phát triển bền vững, khoa học - công nghệ và hội nhập hiện nay.',
    ],
  ),
  'Chương 7. Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa': (
    summary:
        'Khái quát thành tựu khoa học - kĩ thuật hiện đại, tác động của nó tới đời sống và mối liên hệ với xu thế toàn cầu hóa.',
    keyIdeas: [
      'Biết thời điểm bùng nổ và các lĩnh vực tiêu biểu của cách mạng khoa học - kĩ thuật hiện đại.',
      'Phân tích được cả mặt tích cực lẫn tiêu cực của tiến bộ khoa học - công nghệ.',
      'Hiểu mối liên hệ giữa công nghệ hiện đại và toàn cầu hóa.',
    ],
  ),
};

const mobileGeographyLearnContent = <String, ({String summary, List<String> keyIdeas})>{
  'Chương 1. Địa lí dân cư Việt Nam': (
    summary:
        'Tìm hiểu quy mô dân số, cơ cấu dân số, phân bố dân cư và quá trình đô thị hóa ở Việt Nam.',
    keyIdeas: [
      'Nắm đặc điểm dân số và cơ cấu dân số của Việt Nam.',
      'Hiểu vì sao dân cư phân bố không đều giữa các vùng.',
      'Nhận biết cơ hội của thời kì dân số vàng.',
      'Đánh giá tác động tích cực và sức ép của đô thị hóa.',
    ],
  ),
  'Chương 2. Địa lí các ngành kinh tế': (
    summary:
        'Khái quát các ngành nông nghiệp, công nghiệp, dịch vụ và sự chuyển dịch cơ cấu kinh tế của Việt Nam.',
    keyIdeas: [
      'Phân biệt vai trò của nông nghiệp, công nghiệp và dịch vụ.',
      'Nêu được một số vùng, trung tâm kinh tế tiêu biểu.',
      'Hiểu các nhân tố chi phối phân bố ngành kinh tế.',
      'Nhận biết xu hướng công nghiệp hóa, hiện đại hóa.',
    ],
  ),
  'Chương 3. Sự phân hóa lãnh thổ': (
    summary:
        'Học về sự khác biệt giữa các vùng kinh tế, vai trò của vùng kinh tế trọng điểm và yêu cầu liên kết vùng.',
    keyIdeas: [
      'Nhận biết sự phân hóa lãnh thổ về tự nhiên và kinh tế.',
      'Hiểu thế mạnh của một số vùng kinh tế lớn.',
      'Biết vai trò của liên kết vùng và quy hoạch lãnh thổ.',
      'Giải thích được vì sao phát triển vùng cần phù hợp điều kiện thực tế.',
    ],
  ),
  'Chương 4. Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo': (
    summary:
        'Khái quát vai trò của biển đảo Việt Nam, các ngành kinh tế biển và yêu cầu phát triển bền vững.',
    keyIdeas: [
      'Nêu được vai trò của biển đảo đối với kinh tế và chủ quyền.',
      'Hiểu phát triển tổng hợp kinh tế biển là gì.',
      'Biết các vấn đề môi trường biển nổi bật hiện nay.',
      'Nhận thức được yêu cầu khai thác đi đôi với bảo vệ tài nguyên.',
    ],
  ),
};

const mobileEnglishLearnContent = <String, ({String summary, List<String> keyIdeas})>{
  'Unit 1. Local Community': (
    summary:
        'Build vocabulary and grammar for describing neighbourhood places, local services, and activities that help the community.',
    keyIdeas: [
      'Use common place vocabulary such as market, library, clinic, and community centre.',
      'Talk about location with prepositions like between, on, and opposite.',
      'Describe helpful community actions such as volunteering and clean-up campaigns.',
      'Practise the present simple for habits and repeated actions.',
    ],
  ),
  'Unit 2. City Life': (
    summary:
        'Learn how to describe city life, urban transport, public spaces, and the advantages and challenges of living in a city.',
    keyIdeas: [
      'Compare life in crowded cities with quieter places.',
      'Use adjectives to describe transport, services, and living conditions.',
      'Identify common urban issues like traffic and pollution.',
      'Explain why people choose city life for study, work, and services.',
    ],
  ),
  'Unit 3. Healthy Living for Teens': (
    summary:
        'Focus on habits that support physical and mental health, including exercise, sleep, food, and daily routines.',
    keyIdeas: [
      'Use vocabulary for food, exercise, sleep, and stress management.',
      'Give advice with should and should not.',
      'Recognise healthy routines that help teenagers study better.',
      'Explain cause and effect between habits and well-being.',
    ],
  ),
  'Unit 4. Remembering the Past': (
    summary:
        'Practise language for talking about life in the past, family memories, old traditions, and how life has changed over time.',
    keyIdeas: [
      'Use past simple and used to for past events and habits.',
      'Describe old objects, memories, and traditions.',
      'Compare life in the past with life today.',
      'Explain why remembering the past matters.',
    ],
  ),
  'Unit 5. Our Experiences': (
    summary:
        'Talk about personal experiences, school activities, trips, and what students have learned from them.',
    keyIdeas: [
      'Use the present perfect to talk about experiences.',
      'Ask and answer questions with Have you ever...?.',
      'Reflect on lessons learned from projects and trips.',
      'Describe experiences that build confidence and independence.',
    ],
  ),
};

const mobileTextbookNotLoadedMessage =
    'Trình đọc PDF sẽ mở đúng vào đầu chương hiện tại khi tích hợp bộ xem PDF trên mobile.';

const mobilePrivacyPolicySections = <({String title, String body})>[
  (
    title: '1. Phạm vi áp dụng',
    body:
        'Chính sách này áp dụng cho website và ứng dụng di động của TruongHoc tại truonghoc.online, bao gồm đăng nhập, học tập, làm bài kiểm tra và theo dõi tiến độ học tập.'
  ),
  (
    title: '2. Dữ liệu được thu thập',
    body:
        'TruongHoc có thể lưu số điện thoại đăng nhập, mật khẩu đã mã hóa, biệt danh, ảnh đại diện, lớp học, môn học, chương học, kết quả kiểm tra và một số dữ liệu kỹ thuật phục vụ vận hành dịch vụ.'
  ),
  (
    title: '3. Mục đích sử dụng',
    body:
        'Dữ liệu được dùng để tạo và quản lý tài khoản, xác thực đăng nhập, lưu tiến độ học tập, hiển thị kết quả và cải thiện chất lượng dịch vụ.'
  ),
  (
    title: '4. Bảo mật và chia sẻ dữ liệu',
    body:
        'TruongHoc áp dụng các biện pháp bảo mật phù hợp để bảo vệ dữ liệu người dùng và không bán dữ liệu cá nhân của học sinh. Dữ liệu chỉ được chia sẻ khi cần thiết cho vận hành, bảo mật hoặc theo yêu cầu pháp lý hợp lệ.'
  ),
  (
    title: '5. Quyền của người dùng',
    body:
        'Người dùng có thể cập nhật biệt danh, ảnh đại diện, mật khẩu và đăng xuất trong phần Hồ sơ. Bản cập nhật chính sách mới nhất sẽ được công bố tại truonghoc.online.'
  ),
];

const mobileRoadmapItems = <String>[
  'Đăng nhập bằng số điện thoại và mật khẩu cho cả web và Flutter',
  'Lưu lớp hiện tại từ 1 đến 12 và môn học đang học',
  'Bản đồ chủ đề Lịch sử lớp 9 để bắt đầu nhanh và dễ đo lường',
  'Trợ lý AI bằng tiếng Việt, ưu tiên gợi ý trước khi đưa đáp án',
  'Bảng đánh giá tiến độ cho học sinh và tổng kết hằng tuần cho phụ huynh',
];

const mobileHistoryChapterStartPages = <String, int>{
  'Chương 1. Thế giới từ năm 1918 đến năm 1945': 7,
  'Chương 2. Việt Nam từ năm 1918 đến năm 1945': 22,
  'Chương 3. Thế giới từ năm 1945 đến năm 1991': 41,
  'Chương 4. Việt Nam từ năm 1945 đến năm 1991': 61,
  'Chương 5. Thế giới từ năm 1991 đến nay': 97,
  'Chương 6. Việt Nam từ năm 1991 đến nay': 105,
  'Chương 7. Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa': 110,
};

const mobileGeographyChapterStartPages = <String, int>{
  'Chương 1. Địa lí dân cư Việt Nam': 117,
  'Chương 2. Địa lí các ngành kinh tế': 129,
  'Chương 3. Sự phân hóa lãnh thổ': 149,
  'Chương 4. Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo': 171,
};

const mobileEnglishChapterStartPages = <String, int>{
  'Unit 1. Local Community': 10,
  'Unit 2. City Life': 20,
  'Unit 3. Healthy Living for Teens': 30,
  'Unit 4. Remembering the Past': 42,
  'Unit 5. Our Experiences': 52,
};

List<String> chapterOptionsForSubject(String subject) {
  if (subject == 'Địa lí') {
    return geographyChapterOptions;
  }
  if (subject == 'Tiếng Anh') {
    return englishChapterOptions;
  }
  if (subject == 'Toán') {
    return const ['Bài mở đầu. Lộ trình Toán lớp 9'];
  }
  if (subject == 'Ngữ văn') {
    return const ['Bài mở đầu. Lộ trình Ngữ văn lớp 9'];
  }
  return historyChapterOptions;
}

String selectedChapterForSession(StudentSession session) {
  if (session.currentSubject == 'Địa lí') {
    return session.currentGeographyChapter;
  }
  if (session.currentSubject == 'Tiếng Anh') {
    return session.currentEnglishChapter;
  }
  if (session.currentSubject == 'Toán' || session.currentSubject == 'Ngữ văn') {
    return chapterOptionsForSubject(session.currentSubject).first;
  }
  return session.currentHistoryChapter;
}

({String summary, List<String> keyIdeas}) learnContentForSubject(
  String subject,
  String chapterTitle,
) {
  if (subject == 'Toán') {
    return (
      summary:
          'Môn Toán lớp 9 đang được chuẩn bị để mở với lộ trình bài học, bài luyện và đánh giá theo từng chủ đề.',
      keyIdeas: [
        'Sẽ có lộ trình học theo chủ đề trọng tâm của chương trình lớp 9.',
        'Bài luyện sẽ được thiết kế theo mức độ từ cơ bản đến nâng cao.',
        'Đánh giá tiến độ sẽ theo từng mảng kiến thức để học sinh biết phần cần củng cố.',
      ],
    );
  }

  if (subject == 'Ngữ văn') {
    return (
      summary:
          'Môn Ngữ văn lớp 9 đang được chuẩn bị với các phần đọc hiểu, tiếng Việt và làm văn theo từng bài học.',
      keyIdeas: [
        'Sẽ có lộ trình học theo nhóm kỹ năng đọc hiểu và tạo lập văn bản.',
        'Bài luyện sẽ bám sát yêu cầu của chương trình lớp 9.',
        'Đánh giá tiến độ sẽ giúp học sinh biết phần nào cần ôn thêm.',
      ],
    );
  }

  final contentMap = subject == 'Địa lí'
      ? mobileGeographyLearnContent
      : subject == 'Tiếng Anh'
          ? mobileEnglishLearnContent
          : mobileLearnContent;

  return contentMap[chapterTitle] ?? contentMap.values.first;
}

int chapterStartPageForSubject(String subject, String chapterTitle) {
  if (subject == 'Toán' || subject == 'Ngữ văn') {
    return 0;
  }

  final pageMap = subject == 'Địa lí'
      ? mobileGeographyChapterStartPages
      : subject == 'Tiếng Anh'
          ? mobileEnglishChapterStartPages
          : mobileHistoryChapterStartPages;

  return pageMap[chapterTitle] ?? pageMap.values.first;
}

const avatarOptions = <AvatarOption>[
  AvatarOption(
    key: 'book-fox',
    label: 'Cáo đọc sách',
    emoji: '🦊',
    background: Color(0xFFFFE6C9),
    foreground: Color(0xFFB85A1D),
  ),
  AvatarOption(
    key: 'smart-owl',
    label: 'Cú mèo thông thái',
    emoji: '🦉',
    background: Color(0xFFEADFFF),
    foreground: Color(0xFF7B4F9D),
  ),
  AvatarOption(
    key: 'sea-whale',
    label: 'Cá voi chăm chỉ',
    emoji: '🐳',
    background: Color(0xFFDDF3FF),
    foreground: Color(0xFF1D6FB8),
  ),
  AvatarOption(
    key: 'brave-tiger',
    label: 'Hổ tự tin',
    emoji: '🐯',
    background: Color(0xFFFFE8D4),
    foreground: Color(0xFFB85A1D),
  ),
  AvatarOption(
    key: 'green-frog',
    label: 'Ếch vui vẻ',
    emoji: '🐸',
    background: Color(0xFFE2F9E9),
    foreground: Color(0xFF1F8F6B),
  ),
  AvatarOption(
    key: 'rocket-bear',
    label: 'Gấu bứt phá',
    emoji: '🐻',
    background: Color(0xFFF5EBDD),
    foreground: Color(0xFF6A4D3B),
  ),
];

AvatarOption avatarByKey(String key) {
  return avatarOptions.firstWhere(
    (avatar) => avatar.key == key,
    orElse: () => avatarOptions.first,
  );
}

class VietEdApp extends StatefulWidget {
  const VietEdApp({super.key});

  @override
  State<VietEdApp> createState() => _VietEdAppState();
}

class _VietEdAppState extends State<VietEdApp> {
  final VietEdAppState _appState = VietEdAppState();

  @override
  void dispose() {
    _appState.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFFDB6B2D),
      brightness: Brightness.light,
    );

    return AnimatedBuilder(
      animation: _appState,
      builder: (context, _) {
        return MaterialApp(
          title: 'VietEd',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            colorScheme: colorScheme,
            scaffoldBackgroundColor: const Color(0xFFF6F2EA),
            inputDecorationTheme: InputDecorationTheme(
              filled: true,
              fillColor: Colors.white.withValues(alpha: 0.88),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(18),
                borderSide: BorderSide.none,
              ),
            ),
            textTheme: ThemeData.light().textTheme.apply(
                  bodyColor: const Color(0xFF163127),
                  displayColor: const Color(0xFF163127),
                ),
            useMaterial3: true,
          ),
          home: _appState.isLoggedIn
              ? StudentHomePage(appState: _appState)
              : StudentLoginPage(appState: _appState),
        );
      },
    );
  }
}

class StudentLoginPage extends StatefulWidget {
  const StudentLoginPage({
    super.key,
    required this.appState,
  });

  final VietEdAppState appState;

  @override
  State<StudentLoginPage> createState() => _StudentLoginPageState();
}

class _StudentLoginPageState extends State<StudentLoginPage> {
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _isSubmitting = false;
  String? _errorMessage;

  @override
  void dispose() {
    _phoneController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    setState(() {
      _isSubmitting = true;
      _errorMessage = null;
    });

    await Future<void>.delayed(const Duration(milliseconds: 500));

    if (!mounted) {
      return;
    }

    widget.appState.login(
      phoneNumber: _phoneController.text.trim(),
      password: _passwordController.text.trim(),
    );

    setState(() {
      _isSubmitting = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF1),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Đăng nhập học sinh',
                      style: theme.textTheme.labelLarge?.copyWith(
                        color: const Color(0xFF1F8F6B),
                        letterSpacing: 1.2,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Dùng số điện thoại thật để đăng nhập hoặc tạo tài khoản mới.',
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Mobile sẽ theo cùng luồng với web: nếu số điện thoại chưa có thì tạo tài khoản mới, nếu đã có thì đăng nhập bằng mật khẩu đúng.',
                      style: theme.textTheme.bodyLarge?.copyWith(
                        color: const Color(0xFF5D6F68),
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _phoneController,
                      keyboardType: TextInputType.phone,
                      decoration: const InputDecoration(
                        labelText: 'Số điện thoại',
                        hintText: '0987654321',
                      ),
                      validator: (value) {
                        final normalized = value?.replaceAll(RegExp(r'\D'), '') ?? '';
                        if (!RegExp(r'^0\d{9,10}$').hasMatch(normalized)) {
                          return 'Nhập số điện thoại hợp lệ.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),
                    TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      decoration: const InputDecoration(
                        labelText: 'Mật khẩu',
                        hintText: 'Ít nhất 8 ký tự',
                      ),
                      validator: (value) {
                        if ((value ?? '').trim().length < 8) {
                          return 'Mật khẩu phải có ít nhất 8 ký tự.';
                        }
                        return null;
                      },
                    ),
                    if (_errorMessage != null) ...[
                      const SizedBox(height: 12),
                      Text(
                        _errorMessage!,
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: const Color(0xFFB52E1F),
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ],
                    const SizedBox(height: 18),
                    FilledButton(
                      onPressed: _isSubmitting ? null : _submit,
                      child: Text(_isSubmitting ? 'Đang xử lý...' : 'Tiếp tục'),
                    ),
                    const SizedBox(height: 12),
                    TextButton(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute<void>(
                            builder: (context) => const PrivacyPolicyPage(),
                          ),
                        );
                      },
                      child: const Text('Xem chính sách quyền riêng tư'),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class StudentHomePage extends StatefulWidget {
  const StudentHomePage({
    super.key,
    required this.appState,
  });

  final VietEdAppState appState;

  @override
  State<StudentHomePage> createState() => _StudentHomePageState();
}

class _StudentHomePageState extends State<StudentHomePage> {
  String? _saveMessage;

  void _saveStudyPreference(StudentSession session) {
    widget.appState.saveStudyPreference(
      currentGrade: session.currentGrade,
      currentSubject: session.currentSubject,
      currentHistoryChapter: session.currentHistoryChapter,
      currentGeographyChapter: session.currentGeographyChapter,
      currentEnglishChapter: session.currentEnglishChapter,
    );

    setState(() {
      _saveMessage =
          'Đã lưu lớp ${session.currentGrade}, môn ${session.currentSubject} và chương học hiện tại.';
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final session = widget.appState.session!;
    final avatar = avatarByKey(session.avatarKey);

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF1),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'VietEd',
                              style: theme.textTheme.labelLarge?.copyWith(
                                color: const Color(0xFF1F8F6B),
                                letterSpacing: 1.4,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                            const SizedBox(height: 12),
                            Text(
                              'Xin chào, ${session.displayName}.',
                              style: theme.textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                      ),
                      IconButton.filledTonal(
                        onPressed: () {
                          Navigator.of(context).push(
                            MaterialPageRoute<void>(
                              builder: (context) => StudentProfilePage(
                                appState: widget.appState,
                              ),
                            ),
                          );
                        },
                        icon: Text(
                          avatar.emoji,
                          style: const TextStyle(fontSize: 20),
                        ),
                        tooltip: 'Hồ sơ',
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Bạn đã đăng nhập bằng số ${session.phoneNumber}. Bây giờ hãy chọn lớp hiện tại, môn học muốn học và chương học phù hợp với mình.',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Các lựa chọn chưa khả dụng vẫn được hiển thị rõ ràng trong danh sách môn học và khối lớp.',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 20),
                  DropdownButtonFormField<int>(
                    initialValue: session.currentGrade,
                    decoration: const InputDecoration(
                      labelText: 'Lớp hiện tại',
                    ),
                    items: gradeOptions
                        .map(
                          (grade) => DropdownMenuItem<int>(
                            value: grade.grade,
                            enabled: grade.isAvailable,
                            child: Text(
                              grade.isAvailable
                                  ? 'Lớp ${grade.grade}'
                                  : 'Lớp ${grade.grade} - Chưa khả dụng',
                              style: TextStyle(
                                color: grade.isAvailable
                                    ? const Color(0xFF163127)
                                    : const Color(0xFF9AA7A1),
                              ),
                            ),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value == null) {
                        return;
                      }

                      widget.appState.saveStudyPreference(
                        currentGrade: value,
                        currentSubject: session.currentSubject,
                        currentHistoryChapter: session.currentHistoryChapter,
                        currentGeographyChapter: session.currentGeographyChapter,
                        currentEnglishChapter: session.currentEnglishChapter,
                      );
                    },
                  ),
                  const SizedBox(height: 14),
                  DropdownButtonFormField<String>(
                    initialValue: session.currentSubject,
                    decoration: const InputDecoration(
                      labelText: 'Môn muốn học',
                    ),
                    items: subjectOptions
                        .map(
                          (subject) => DropdownMenuItem<String>(
                            value: subject.label,
                            enabled: subject.isAvailable,
                            child: Text(
                              subject.isAvailable
                                  ? subject.label
                                  : '${subject.label} - Chưa khả dụng',
                              style: TextStyle(
                                color: subject.isAvailable
                                    ? const Color(0xFF163127)
                                    : const Color(0xFF9AA7A1),
                              ),
                            ),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value == null) {
                        return;
                      }

                      widget.appState.saveStudyPreference(
                        currentGrade: session.currentGrade,
                        currentSubject: value,
                        currentHistoryChapter: session.currentHistoryChapter,
                        currentGeographyChapter: session.currentGeographyChapter,
                        currentEnglishChapter: session.currentEnglishChapter,
                      );
                    },
                  ),
                  const SizedBox(height: 14),
                  DropdownButtonFormField<String>(
                    initialValue: selectedChapterForSession(session),
                    decoration: const InputDecoration(
                      labelText: 'Chương muốn học',
                    ),
                    items: chapterOptionsForSubject(session.currentSubject)
                        .map(
                          (chapter) => DropdownMenuItem<String>(
                            value: chapter,
                            child: Text(chapter),
                          ),
                        )
                        .toList(),
                    onChanged: (value) {
                      if (value == null) {
                        return;
                      }

                      widget.appState.saveStudyPreference(
                        currentGrade: session.currentGrade,
                        currentSubject: session.currentSubject,
                        currentHistoryChapter: session.currentSubject == 'Lịch sử'
                            ? value
                            : session.currentHistoryChapter,
                        currentGeographyChapter: session.currentSubject == 'Địa lí'
                            ? value
                            : session.currentGeographyChapter,
                        currentEnglishChapter: session.currentSubject == 'Tiếng Anh'
                            ? value
                            : session.currentEnglishChapter,
                      );
                    },
                  ),
                  if (_saveMessage != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      _saveMessage!,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF1F8F6B),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                  const SizedBox(height: 18),
                  FilledButton(
                    onPressed: () => _saveStudyPreference(widget.appState.session!),
                    child: const Text('Lưu lựa chọn học tập'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Hôm nay',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 12),
            _SessionCard(
              title: 'Học',
              subtitle:
                  '${widget.appState.session!.currentSubject} • ${selectedChapterForSession(widget.appState.session!)}',
              detail:
                  widget.appState.session!.currentSubject == 'Tiếng Anh'
                      ? 'Đọc nội dung bài học, nắm từ vựng, mẫu câu và ý chính trước khi làm bài.'
                      : widget.appState.session!.currentSubject == 'Lịch sử'
                          ? 'Đọc tóm tắt chương, nắm ý chính và các mốc sự kiện quan trọng trước khi làm bài.'
                          : 'Xem trước lộ trình môn học đang được chuẩn bị trong ứng dụng.',
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (context) => StudentLearnPage(
                      subjectLabel: widget.appState.session!.currentSubject,
                      chapterTitle: selectedChapterForSession(widget.appState.session!),
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 12),
            _SessionCard(
              title: 'Kiểm tra',
              subtitle:
                  'Nhiều bộ câu hỏi cho ${selectedChapterForSession(widget.appState.session!)}',
              detail:
                  'Mỗi chương có nhiều bộ câu hỏi trắc nghiệm để tự kiểm tra mức độ hiểu bài.',
            ),
            const SizedBox(height: 12),
            const _SessionCard(
              title: 'Đánh giá',
              subtitle: 'Xem tiến độ và kết quả đã làm',
              detail:
                  'Theo dõi điểm trung bình, bộ kiểm tra đã hoàn thành và phần kiến thức còn cần củng cố.',
            ),
          ],
        ),
      ),
    );
  }
}

class StudentProfilePage extends StatefulWidget {
  const StudentProfilePage({
    super.key,
    required this.appState,
  });

  final VietEdAppState appState;

  @override
  State<StudentProfilePage> createState() => _StudentProfilePageState();
}

class _StudentProfilePageState extends State<StudentProfilePage> {
  late final TextEditingController _nicknameController;
  final _currentPasswordController = TextEditingController();
  final _nextPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  String? _nicknameMessage;
  String? _nicknameError;
  String? _avatarMessage;
  String? _passwordMessage;
  String? _passwordError;

  @override
  void initState() {
    super.initState();
    _nicknameController = TextEditingController(
      text: widget.appState.session?.nickname ?? '',
    );
  }

  @override
  void dispose() {
    _nicknameController.dispose();
    _currentPasswordController.dispose();
    _nextPasswordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  void _submitNickname() {
    final nickname = _nicknameController.text.trim();

    setState(() {
      _nicknameMessage = null;
      _nicknameError = null;
    });

    if (nickname.length < 2) {
      setState(() {
        _nicknameError = 'Biệt danh cần có ít nhất 2 ký tự.';
      });
      return;
    }

    if (nickname.length > 40) {
      setState(() {
        _nicknameError = 'Biệt danh không được vượt quá 40 ký tự.';
      });
      return;
    }

    widget.appState.updateNickname(nickname);

    setState(() {
      _nicknameMessage = 'Đã cập nhật biệt danh mới.';
    });
  }

  void _submitPassword() {
    final currentPassword = _currentPasswordController.text.trim();
    final nextPassword = _nextPasswordController.text.trim();
    final confirmPassword = _confirmPasswordController.text.trim();

    setState(() {
      _passwordMessage = null;
      _passwordError = null;
    });

    if (currentPassword.isEmpty || nextPassword.isEmpty || confirmPassword.isEmpty) {
      setState(() {
        _passwordError = 'Hãy nhập đủ các trường mật khẩu.';
      });
      return;
    }

    if (nextPassword.length < 8) {
      setState(() {
        _passwordError = 'Mật khẩu mới phải có ít nhất 8 ký tự.';
      });
      return;
    }

    if (nextPassword != confirmPassword) {
      setState(() {
        _passwordError = 'Mật khẩu mới và xác nhận mật khẩu chưa khớp.';
      });
      return;
    }

    final updated = widget.appState.updatePassword(
      currentPassword: currentPassword,
      nextPassword: nextPassword,
    );

    if (!updated) {
      setState(() {
        _passwordError = 'Mật khẩu hiện tại chưa đúng.';
      });
      return;
    }

    _currentPasswordController.clear();
    _nextPasswordController.clear();
    _confirmPasswordController.clear();

    setState(() {
      _passwordMessage = 'Đã cập nhật mật khẩu mới.';
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final session = widget.appState.session!;
    final currentAvatar = avatarByKey(session.avatarKey);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Hồ sơ'),
        backgroundColor: const Color(0xFFF6F2EA),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF1),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  CircleAvatar(
                    radius: 32,
                    backgroundColor: currentAvatar.background,
                    child: Text(
                      currentAvatar.emoji,
                      style: const TextStyle(fontSize: 28),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    session.displayName,
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Lớp ${session.currentGrade} • ${session.phoneNumber}',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF5D6F68),
                    ),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'Biệt danh',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _nicknameController,
                    maxLength: 40,
                    decoration: const InputDecoration(
                      labelText: 'Biệt danh hiển thị',
                      hintText: 'Ví dụ: Nam, Bảo, Linh',
                      counterText: '',
                    ),
                  ),
                  if (_nicknameError != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      _nicknameError!,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFFB52E1F),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                  if (_nicknameMessage != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      _nicknameMessage!,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF1F8F6B),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                  const SizedBox(height: 12),
                  FilledButton(
                    onPressed: _submitNickname,
                    child: const Text('Lưu biệt danh'),
                  ),
                  const SizedBox(height: 20),
                  Text(
                    'Ảnh đại diện',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: avatarOptions.map((avatar) {
                      final isSelected = avatar.key == session.avatarKey;

                      return InkWell(
                        onTap: () {
                          widget.appState.updateAvatar(avatar.key);
                          setState(() {
                            _avatarMessage = 'Đã lưu ảnh đại diện mới.';
                          });
                        },
                        borderRadius: BorderRadius.circular(18),
                        child: Container(
                          width: 148,
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? avatar.background
                                : Colors.white.withValues(alpha: 0.84),
                            borderRadius: BorderRadius.circular(18),
                            border: Border.all(
                              color: isSelected
                                  ? const Color(0xFF1F8F6B)
                                  : const Color(0xFFD7D0C4),
                              width: isSelected ? 1.6 : 1,
                            ),
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              CircleAvatar(
                                radius: 22,
                                backgroundColor: avatar.background,
                                child: Text(
                                  avatar.emoji,
                                  style: const TextStyle(fontSize: 22),
                                ),
                              ),
                              const SizedBox(height: 10),
                              Text(
                                avatar.label,
                                textAlign: TextAlign.center,
                                style: theme.textTheme.bodyMedium?.copyWith(
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                  if (_avatarMessage != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      _avatarMessage!,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF1F8F6B),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.84),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Đổi mật khẩu',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _currentPasswordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Mật khẩu hiện tại',
                    ),
                  ),
                  const SizedBox(height: 14),
                  TextField(
                    controller: _nextPasswordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Mật khẩu mới',
                    ),
                  ),
                  const SizedBox(height: 14),
                  TextField(
                    controller: _confirmPasswordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      labelText: 'Xác nhận mật khẩu mới',
                    ),
                  ),
                  if (_passwordError != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      _passwordError!,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFFB52E1F),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                  if (_passwordMessage != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      _passwordMessage!,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF1F8F6B),
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                  const SizedBox(height: 18),
                  FilledButton(
                    onPressed: _submitPassword,
                    child: const Text('Cập nhật mật khẩu'),
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute<void>(
                          builder: (context) => const ProductRoadmapPage(),
                        ),
                      );
                    },
                    child: const Text('Lộ trình sản phẩm'),
                  ),
                  const SizedBox(height: 12),
                  TextButton(
                    onPressed: () {
                      Navigator.of(context).push(
                        MaterialPageRoute<void>(
                          builder: (context) => const PrivacyPolicyPage(),
                        ),
                      );
                    },
                    child: const Text('Chính sách quyền riêng tư'),
                  ),
                  const SizedBox(height: 12),
                  OutlinedButton(
                    onPressed: () {
                      widget.appState.logout();
                      Navigator.of(context).pop();
                    },
                    child: const Text('Đăng xuất'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class PrivacyPolicyPage extends StatelessWidget {
  const PrivacyPolicyPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Chính sách quyền riêng tư'),
        backgroundColor: const Color(0xFFF6F2EA),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF1),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Thông tin riêng tư và dữ liệu học tập của học sinh',
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Trang này được chuẩn bị để công khai cho website và ứng dụng di động của TruongHoc tại truonghoc.online.',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            ...mobilePrivacyPolicySections.map(
              (section) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.86),
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        section.title,
                        style: theme.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        section.body,
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: const Color(0xFF5D6F68),
                          height: 1.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ProductRoadmapPage extends StatelessWidget {
  const ProductRoadmapPage({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Lộ trình sản phẩm'),
        backgroundColor: const Color(0xFFF6F2EA),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF1),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Kế hoạch triển khai được giữ riêng khỏi màn hình chính',
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Trang này giữ phần planning để bạn vẫn xem được trên mobile, nhưng không làm rối trải nghiệm học sinh ở trang chủ.',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.86),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Kế hoạch triển khai',
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 14),
                  ...mobileRoadmapItems.asMap().entries.map(
                    (entry) => Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: Text(
                        '${entry.key + 1}. ${entry.value}',
                        style: theme.textTheme.bodyLarge?.copyWith(
                          color: const Color(0xFF5D6F68),
                          height: 1.5,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SessionCard extends StatelessWidget {
  const _SessionCard({
    required this.title,
    required this.subtitle,
    required this.detail,
    this.onTap,
  });

  final String title;
  final String subtitle;
  final String detail;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.8),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: theme.textTheme.labelLarge?.copyWith(
                color: const Color(0xFF1F8F6B),
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              subtitle,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.w700,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              detail,
              style: theme.textTheme.bodyMedium?.copyWith(
                color: const Color(0xFF5D6F68),
                height: 1.45,
              ),
            ),
            if (onTap != null) ...[
              const SizedBox(height: 12),
              Text(
                'Chạm để mở trang học',
                style: theme.textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF1F8F6B),
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class StudentLearnPage extends StatefulWidget {
  const StudentLearnPage({
    super.key,
    required this.subjectLabel,
    required this.chapterTitle,
  });

  final String subjectLabel;
  final String chapterTitle;

  @override
  State<StudentLearnPage> createState() => _StudentLearnPageState();
}

class _StudentLearnPageState extends State<StudentLearnPage> {
  bool _showTextbookContent = false;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final learnContent =
        learnContentForSubject(widget.subjectLabel, widget.chapterTitle);
    final chapterStartPage =
        chapterStartPageForSubject(widget.subjectLabel, widget.chapterTitle);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Học'),
        backgroundColor: const Color(0xFFF6F2EA),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF1),
                borderRadius: BorderRadius.circular(28),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Học ${widget.subjectLabel}',
                    style: theme.textTheme.labelLarge?.copyWith(
                      color: const Color(0xFF1F8F6B),
                      letterSpacing: 1.2,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    widget.chapterTitle,
                    style: theme.textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Bắt đầu từ phần khung học, sau đó bấm vào nút đọc sách giáo khoa để xem nội dung chương ${widget.subjectLabel.toLowerCase()}.',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 20),
                  FilledButton(
                    onPressed: () {
                      setState(() {
                        _showTextbookContent = !_showTextbookContent;
                      });
                    },
                    child: Text(
                      _showTextbookContent
                          ? 'Ẩn nội dung chương'
                          : 'Đọc sách giáo khoa',
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Chương này bắt đầu từ trang $chapterStartPage trong sách giáo khoa.',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.45,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.84),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Khung học nhanh',
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    widget.subjectLabel == 'Địa lí'
                        ? 'Nắm đặc điểm nổi bật, các ý chính và mối liên hệ lãnh thổ của chương trước khi làm bài kiểm tra.'
                        : widget.subjectLabel == 'Tiếng Anh'
                            ? 'Nắm từ vựng, mẫu câu, chủ điểm ngữ pháp và tình huống giao tiếp chính trước khi làm bài kiểm tra.'
                        : widget.subjectLabel == 'Toán'
                            ? 'Xem trước cấu trúc môn học, dạng bài trọng tâm và lộ trình nội dung sẽ được mở tiếp theo.'
                            : widget.subjectLabel == 'Ngữ văn'
                                ? 'Xem trước nhóm kỹ năng đọc hiểu, tiếng Việt và làm văn sẽ được mở trong các đợt tới.'
                        : 'Nắm bối cảnh, các mốc thời gian, nhân vật và ý chính của chương trước khi làm bài kiểm tra.',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            if (_showTextbookContent)
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.84),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Nội dung chương',
                      style: theme.textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      widget.subjectLabel == 'Tiếng Anh'
                          ? 'Nguồn cấu trúc bài học: Tiếng Anh 9 - Global Success.'
                          : widget.subjectLabel == 'Toán'
                              ? 'Lộ trình môn Toán lớp 9 đang được hoàn thiện.'
                              : widget.subjectLabel == 'Ngữ văn'
                                  ? 'Lộ trình môn Ngữ văn lớp 9 đang được hoàn thiện.'
                          : 'Nguồn cấu trúc chương: Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống.',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF5D6F68),
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      (widget.subjectLabel == 'Toán' || widget.subjectLabel == 'Ngữ văn')
                          ? 'Môn học này đang ở giai đoạn chuẩn bị nội dung. Ứng dụng sẽ mở bài học, bài luyện và đánh giá trong các bản cập nhật tới.'
                          : '$mobileTextbookNotLoadedMessage Trang neo hiện tại: $chapterStartPage.',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF5D6F68),
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Tóm tắt: ${learnContent.summary}',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF5D6F68),
                        height: 1.5,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Ý chính cần nhớ',
                      style: theme.textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 8),
                    ...learnContent.keyIdeas.map(
                      (idea) => Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: Text(
                          '• $idea',
                          style: theme.textTheme.bodyMedium?.copyWith(
                            color: const Color(0xFF5D6F68),
                            height: 1.45,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              )
            else
              Text(
                'Nội dung chương đang được thu gọn. Hãy bấm "Đọc sách giáo khoa" để mở.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF5D6F68),
                  height: 1.45,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
