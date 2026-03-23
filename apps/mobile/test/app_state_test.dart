import 'package:flutter_test/flutter_test.dart';
import 'package:vieted_mobile/main.dart';

void main() {
  test('login creates a session with all current subject defaults', () {
    final appState = VietEdAppState();

    appState.login(phoneNumber: '0987654321', password: 'vieted123');

    final session = appState.session;
    expect(session, isNotNull);
    expect(session!.currentSubject, 'Lịch sử');
    expect(session.currentHistoryChapter, historyChapterOptions.first);
    expect(session.currentGeographyChapter, geographyChapterOptions.first);
    expect(session.currentEnglishChapter, englishChapterOptions.first);
  });

  test('saving study preference preserves chapter selection for all subjects', () {
    final appState = VietEdAppState();
    appState.login(phoneNumber: '0987654321', password: 'vieted123');

    appState.saveStudyPreference(
      currentGrade: 9,
      currentSubject: 'Địa lí',
      currentHistoryChapter: historyChapterOptions[2],
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: englishChapterOptions[2],
    );

    var session = appState.session!;
    expect(session.currentSubject, 'Địa lí');
    expect(session.currentHistoryChapter, historyChapterOptions[2]);
    expect(session.currentGeographyChapter, geographyChapterOptions[1]);
    expect(session.currentEnglishChapter, englishChapterOptions[2]);

    appState.saveStudyPreference(
      currentGrade: 9,
      currentSubject: 'Tiếng Anh',
      currentHistoryChapter: historyChapterOptions[4],
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: englishChapterOptions[3],
    );

    session = appState.session!;
    expect(session.currentSubject, 'Tiếng Anh');
    expect(session.currentHistoryChapter, historyChapterOptions[4]);
    expect(session.currentGeographyChapter, geographyChapterOptions[1]);
    expect(session.currentEnglishChapter, englishChapterOptions[3]);

    appState.saveStudyPreference(
      currentGrade: 9,
      currentSubject: 'Lịch sử',
      currentHistoryChapter: historyChapterOptions[4],
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: englishChapterOptions[3],
    );

    session = appState.session!;
    expect(session.currentSubject, 'Lịch sử');
    expect(session.currentHistoryChapter, historyChapterOptions[4]);
    expect(session.currentGeographyChapter, geographyChapterOptions[1]);
    expect(session.currentEnglishChapter, englishChapterOptions[3]);
  });

  test('nickname, password, and logout flow remain stable', () {
    final appState = VietEdAppState();
    appState.login(phoneNumber: '0987654321', password: 'vieted123');

    appState.updateNickname('Nam');
    expect(appState.session!.nickname, 'Nam');

    final passwordUpdated = appState.updatePassword(
      currentPassword: 'vieted123',
      nextPassword: 'vieted456',
    );
    expect(passwordUpdated, isTrue);
    expect(appState.session!.password, 'vieted456');

    appState.logout();
    expect(appState.session, isNull);
  });
}
