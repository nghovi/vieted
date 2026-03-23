import 'package:flutter_test/flutter_test.dart';

import 'package:vieted_mobile/main.dart';

void main() {
  testWidgets('renders the student login screen', (WidgetTester tester) async {
    await tester.pumpWidget(const VietEdApp());

    expect(find.text('Đăng nhập học sinh'), findsOneWidget);
    expect(
      find.text('Dùng số điện thoại thật để đăng nhập hoặc tạo tài khoản mới.'),
      findsOneWidget,
    );
    expect(find.text('Tiếp tục'), findsOneWidget);
  });
}
