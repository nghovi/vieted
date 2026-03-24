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
    expect(session.currentMathChapter, mathChapterOptions.first);
    expect(session.currentLiteratureChapter, literatureChapterOptions[9]!.first);
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
      currentMathChapter: mathChapterOptions[2],
      currentLiteratureChapter: literatureChapterOptions[9]![1],
    );

    var session = appState.session!;
    expect(session.currentSubject, 'Địa lí');
    expect(session.currentHistoryChapter, historyChapterOptions[2]);
    expect(session.currentGeographyChapter, geographyChapterOptions[1]);
    expect(session.currentEnglishChapter, englishChapterOptions[2]);
    expect(session.currentMathChapter, mathChapterOptions[2]);
    expect(session.currentLiteratureChapter, literatureChapterOptions[9]![1]);

    appState.saveStudyPreference(
      currentGrade: 9,
      currentSubject: 'Toán',
      currentHistoryChapter: historyChapterOptions[4],
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: englishChapterOptions[3],
      currentMathChapter: mathChapterOptions[3],
      currentLiteratureChapter: literatureChapterOptions[9]![0],
    );

    session = appState.session!;
    expect(session.currentSubject, 'Toán');
    expect(session.currentMathChapter, mathChapterOptions[3]);

    appState.saveStudyPreference(
      currentGrade: 9,
      currentSubject: 'Tiếng Anh',
      currentHistoryChapter: historyChapterOptions[4],
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: englishChapterOptions[3],
      currentMathChapter: mathChapterOptions[4],
      currentLiteratureChapter: literatureChapterOptions[9]![2],
    );

    session = appState.session!;
    expect(session.currentSubject, 'Tiếng Anh');
    expect(session.currentHistoryChapter, historyChapterOptions[4]);
    expect(session.currentGeographyChapter, geographyChapterOptions[1]);
    expect(session.currentEnglishChapter, englishChapterOptions[3]);
    expect(session.currentMathChapter, mathChapterOptions[4]);
    expect(session.currentLiteratureChapter, literatureChapterOptions[9]![2]);

    appState.saveStudyPreference(
      currentGrade: 7,
      currentSubject: 'Ngữ văn',
      currentHistoryChapter: starterCourseChapters['7|Lịch sử']!.first,
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: starterCourseChapters['7|Tiếng Anh']!.first,
      currentMathChapter: starterCourseChapters['7|Toán']!.first,
      currentLiteratureChapter: starterCourseChapters['7|Ngữ văn']![1],
    );

    session = appState.session!;
    expect(session.currentGrade, 7);
    expect(session.currentSubject, 'Ngữ văn');
    expect(session.currentLiteratureChapter, starterCourseChapters['7|Ngữ văn']![1]);

    appState.saveStudyPreference(
      currentGrade: 9,
      currentSubject: 'Lịch sử',
      currentHistoryChapter: historyChapterOptions[4],
      currentGeographyChapter: geographyChapterOptions[1],
      currentEnglishChapter: englishChapterOptions[3],
      currentMathChapter: mathChapterOptions[1],
      currentLiteratureChapter: literatureChapterOptions[9]!.first,
    );

    session = appState.session!;
    expect(session.currentSubject, 'Lịch sử');
    expect(session.currentHistoryChapter, historyChapterOptions[4]);
    expect(session.currentGeographyChapter, geographyChapterOptions[1]);
    expect(session.currentEnglishChapter, englishChapterOptions[3]);
    expect(session.currentMathChapter, mathChapterOptions[1]);
    expect(session.currentLiteratureChapter, literatureChapterOptions[9]!.first);
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
