import 'package:flutter_test/flutter_test.dart';

import 'package:vieted_mobile/main.dart';

void main() {
  testWidgets('renders the learning home screen', (WidgetTester tester) async {
    await tester.pumpWidget(const VietEdApp());

    expect(find.text('Đăng nhập học sinh'), findsOneWidget);
    expect(find.text('Số điện thoại và mật khẩu cho mobile app.'), findsOneWidget);
    expect(find.text('Đăng nhập'), findsOneWidget);
  });
}
