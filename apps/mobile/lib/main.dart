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
  SubjectOption(label: 'Toán', isAvailable: false),
  SubjectOption(label: 'Tiếng Anh', isAvailable: false),
  SubjectOption(label: 'Ngữ văn', isAvailable: false),
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

class VietEdApp extends StatelessWidget {
  const VietEdApp({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFFDB6B2D),
      brightness: Brightness.light,
    );

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
      home: const StudentLoginPage(),
    );
  }
}

class StudentLoginPage extends StatefulWidget {
  const StudentLoginPage({super.key});

  @override
  State<StudentLoginPage> createState() => _StudentLoginPageState();
}

class _StudentLoginPageState extends State<StudentLoginPage> {
  final _phoneController = TextEditingController(text: '0987654321');
  final _passwordController = TextEditingController(text: 'vieted123');
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

    if (_phoneController.text.trim() != '0987654321' ||
        _passwordController.text != 'vieted123') {
      setState(() {
        _isSubmitting = false;
        _errorMessage = 'Sai số điện thoại hoặc mật khẩu.';
      });
      return;
    }

    if (!mounted) {
      return;
    }

    Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (context) => const StudentHomePage(),
      ),
    );
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
                      'Số điện thoại và mật khẩu cho mobile app.',
                      style: theme.textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Bước tiếp theo sẽ thay xác thực demo này bằng gọi API đến server chung.',
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
                      child: Text(
                        _isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập',
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Tài khoản demo: 0987654321 / vieted123',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF5D6F68),
                      ),
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
  const StudentHomePage({super.key});

  @override
  State<StudentHomePage> createState() => _StudentHomePageState();
}

class _StudentHomePageState extends State<StudentHomePage> {
  int _currentGrade = 9;
  String _currentSubject = 'Lịch sử';
  String _currentHistoryChapter = historyChapterOptions.first;
  String? _saveMessage;

  void _saveStudyPreference() {
    setState(() {
      _saveMessage =
          'Đã lưu lớp $_currentGrade, môn $_currentSubject và chương học hiện tại.';
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
                    'Xin chào, Minh Anh.',
                    style: theme.textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Bạn đã đăng nhập bằng số điện thoại. Bây giờ hãy chọn lớp hiện tại và môn học muốn học. Chúng ta bắt đầu với Lịch sử lớp 9, các phần khác sẽ mở dần sau.',
                    style: theme.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Các lớp và môn chưa hỗ trợ vẫn được hiển thị để bạn thấy lộ trình phát triển, nhưng hiện chưa thể chọn.',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF5D6F68),
                      height: 1.5,
                    ),
                  ),
                  const SizedBox(height: 20),
                  DropdownButtonFormField<int>(
                    initialValue: _currentGrade,
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
                      setState(() {
                        _currentGrade = value;
                      });
                    },
                  ),
                  const SizedBox(height: 14),
                  DropdownButtonFormField<String>(
                    initialValue: _currentSubject,
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
                      setState(() {
                        _currentSubject = value;
                      });
                    },
                  ),
                  const SizedBox(height: 14),
                  DropdownButtonFormField<String>(
                    initialValue: _currentHistoryChapter,
                    decoration: const InputDecoration(
                      labelText: 'Chương muốn học',
                    ),
                    items: historyChapterOptions
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
                      setState(() {
                        _currentHistoryChapter = value;
                      });
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
                    onPressed: _saveStudyPreference,
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
              subtitle: _currentHistoryChapter,
              detail:
                  'Đọc tóm tắt chương, nắm ý chính và các mốc sự kiện quan trọng trước khi làm bài.',
            ),
            const SizedBox(height: 12),
            _SessionCard(
              title: 'Kiểm tra',
              subtitle: 'Nhiều bộ câu hỏi cho $_currentHistoryChapter',
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

class _SessionCard extends StatelessWidget {
  const _SessionCard({
    required this.title,
    required this.subtitle,
    required this.detail,
  });

  final String title;
  final String subtitle;
  final String detail;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
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
        ],
      ),
    );
  }
}
