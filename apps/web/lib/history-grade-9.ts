export type HistoryQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export type HistoryQuestionSet = {
  id: string;
  title: string;
  questions: HistoryQuestion[];
};

export type HistoryChapter = {
  id: string;
  title: string;
  summary: string;
  textbookScope: string;
  questionSets: HistoryQuestionSet[];
};

export type HistoryChapterModeContent = {
  learn: {
    overview: string;
    keyIdeas: string[];
  };
  review: {
    checklist: string[];
    quickPrompts: string[];
  };
};

function q(
  id: string,
  prompt: string,
  options: string[],
  correctOption: number,
  explanation: string,
): HistoryQuestion {
  return { id, prompt, options, correctOption, explanation };
}

function set(
  id: string,
  title: string,
  questions: HistoryQuestion[],
): HistoryQuestionSet {
  return { id, title, questions };
}

export const grade9HistoryChapters: HistoryChapter[] = [
  {
    id: "chuong-1-the-gioi-1918-1945",
    title: "Chương 1. Thế giới từ năm 1918 đến năm 1945",
    summary:
      "Tập trung vào trật tự thế giới sau Chiến tranh thế giới thứ nhất, khủng hoảng kinh tế 1929-1933 và Chiến tranh thế giới thứ hai.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c1-set-1", "Bộ câu hỏi 1", [
        q(
          "c1s1q1",
          "Sau Chiến tranh thế giới thứ nhất, trật tự thế giới mới được thiết lập qua hệ thống nào?",
          ["Hệ thống Véc-xai - Oa-sinh-tơn", "Hệ thống Ianta", "Hệ thống Viên", "Hệ thống Bretton Woods"],
          0,
          "Các hòa ước sau chiến tranh và hội nghị ở Oa-sinh-tơn đã tạo nên hệ thống Véc-xai - Oa-sinh-tơn.",
        ),
        q(
          "c1s1q2",
          "Nguyên nhân trực tiếp dẫn đến cuộc khủng hoảng kinh tế thế giới 1929-1933 là gì?",
          ["Sản xuất ồ ạt, cung vượt cầu", "Chiến tranh lạnh bùng nổ", "Thuộc địa đồng loạt nổi dậy", "Thiếu lao động công nghiệp"],
          0,
          "Sản xuất tư bản chủ nghĩa phát triển tự phát làm hàng hóa ế thừa, dẫn đến khủng hoảng thừa.",
        ),
        q(
          "c1s1q3",
          "Quốc gia nào là nơi chủ nghĩa phát xít lên cầm quyền sớm nhất ở châu Âu?",
          ["Đức", "I-ta-li-a", "Nhật Bản", "Tây Ban Nha"],
          1,
          "Ở I-ta-li-a, chủ nghĩa phát xít do Mút-xô-li-ni đứng đầu lên cầm quyền từ năm 1922.",
        ),
        q(
          "c1s1q4",
          "Sự kiện nào mở đầu Chiến tranh thế giới thứ hai ở châu Âu?",
          ["Đức tấn công Liên Xô", "Nhật tấn công Trân Châu Cảng", "Đức tấn công Ba Lan", "I-ta-li-a tấn công Ê-ti-ô-pi-a"],
          2,
          "Ngày 1/9/1939, Đức tấn công Ba Lan, chiến tranh thế giới thứ hai bùng nổ ở châu Âu.",
        ),
        q(
          "c1s1q5",
          "Tổ chức quốc tế được thành lập sau Chiến tranh thế giới thứ nhất nhằm duy trì hòa bình là",
          ["Liên hợp quốc", "Hội Quốc liên", "ASEAN", "NATO"],
          1,
          "Sau Chiến tranh thế giới thứ nhất, Hội Quốc liên được thành lập nhưng hoạt động không hiệu quả.",
        ),
      ]),
      set("c1-set-2", "Bộ câu hỏi 2", [
        q(
          "c1s2q1",
          "Biện pháp tiêu biểu của Mĩ nhằm thoát khỏi khủng hoảng 1929-1933 là gì?",
          ["Thực hiện Chính sách mới", "Phát động chiến tranh xâm lược", "Thiết lập chế độ phát xít", "Đóng cửa hoàn toàn thị trường"],
          0,
          "Tổng thống Ru-dơ-ven đã thực hiện Chính sách mới để phục hồi kinh tế và ổn định xã hội.",
        ),
        q(
          "c1s2q2",
          "Đâu là đặc điểm nổi bật của chủ nghĩa phát xít?",
          ["Đề cao dân chủ nghị viện", "Thi hành chính sách độc tài, hiếu chiến", "Ủng hộ quyền tự quyết của thuộc địa", "Xóa bỏ quân đội thường trực"],
          1,
          "Chủ nghĩa phát xít thiết lập nền chuyên chế độc tài, quân phiệt và chủ trương chiến tranh xâm lược.",
        ),
        q(
          "c1s2q3",
          "Chiến thắng nào của Hồng quân Liên Xô được coi là bước ngoặt của Chiến tranh thế giới thứ hai?",
          ["Chiến thắng Xtalingrát", "Chiến thắng Điện Biên Phủ", "Chiến thắng Oa-téc-lô", "Chiến thắng Mat-xcơ-va 1812"],
          0,
          "Chiến thắng Xtalingrát đã tạo bước ngoặt, chuyển phe Đồng minh sang thế phản công.",
        ),
        q(
          "c1s2q4",
          "Kết quả cuối cùng của Chiến tranh thế giới thứ hai là gì?",
          ["Phe phát xít thắng lợi", "Phe Đồng minh thắng lợi", "Hai phe đình chiến, không phân thắng bại", "Chiến tranh chuyển thành Chiến tranh lạnh ngay lập tức"],
          1,
          "Năm 1945, phe phát xít Đức - Ý - Nhật bị đánh bại hoàn toàn, phe Đồng minh thắng lợi.",
        ),
        q(
          "c1s2q5",
          "Nhật Bản tấn công Trân Châu Cảng vào năm nào?",
          ["1939", "1940", "1941", "1945"],
          2,
          "Ngày 7/12/1941, Nhật Bản tấn công Trân Châu Cảng, chiến tranh lan rộng ở Thái Bình Dương.",
        ),
      ]),
      set("c1-set-3", "Bộ câu hỏi 3", [
        q(
          "c1s3q1",
          "Sự kiện nào cho thấy khủng hoảng kinh tế 1929-1933 bắt đầu ở Mĩ?",
          ["Khởi nghĩa ở Ba Lan", "Sụp đổ thị trường chứng khoán Niu Oóc", "Đức tấn công Pháp", "Anh rút khỏi Hội Quốc liên"],
          1,
          "Khủng hoảng bùng nổ từ sự sụp đổ của thị trường chứng khoán Niu Oóc năm 1929.",
        ),
        q(
          "c1s3q2",
          "Khối nước nào đã liên kết chống phát xít trong Chiến tranh thế giới thứ hai?",
          ["Khối Đồng minh", "Khối Tam cường", "Khối Trục", "Khối Véc-xai"],
          0,
          "Liên Xô, Mĩ, Anh và nhiều nước khác liên kết thành phe Đồng minh chống phát xít.",
        ),
        q(
          "c1s3q3",
          "Đức đầu hàng không điều kiện vào năm nào?",
          ["1943", "1944", "1945", "1946"],
          2,
          "Tháng 5/1945, Đức đầu hàng không điều kiện.",
        ),
        q(
          "c1s3q4",
          "Tính chất của Chiến tranh thế giới thứ hai từ sau khi Liên Xô tham chiến là gì?",
          ["Chiến tranh đế quốc phi nghĩa", "Chiến tranh giải phóng chính nghĩa chống phát xít", "Nội chiến trong châu Âu", "Chiến tranh lạnh"],
          1,
          "Từ khi Liên Xô tham chiến, cuộc chiến mang tính chất chính nghĩa chống phát xít rõ nét.",
        ),
        q(
          "c1s3q5",
          "Yếu tố nào góp phần quan trọng làm phát xít Đức thất bại?",
          ["Không có quân đội", "Phong trào kháng chiến và sự phản công của phe Đồng minh", "Thiếu dân số châu Âu", "Không có công nghiệp"],
          1,
          "Sự phản công của phe Đồng minh cùng phong trào kháng chiến ở các nước bị chiếm đóng góp phần quyết định.",
        ),
      ]),
    ],
  },
  {
    id: "chuong-2-viet-nam-1918-1945",
    title: "Chương 2. Việt Nam từ năm 1918 đến năm 1945",
    summary:
      "Tìm hiểu chính sách khai thác thuộc địa lần thứ hai của Pháp, hoạt động của Nguyễn Ái Quốc, sự thành lập Đảng Cộng sản Việt Nam và Cách mạng tháng Tám.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c2-set-1", "Bộ câu hỏi 1", [
        q(
          "c2s1q1",
          "Sau Chiến tranh thế giới thứ nhất, Pháp tiến hành ở Đông Dương cuộc khai thác thuộc địa lần thứ mấy?",
          ["Lần thứ nhất", "Lần thứ hai", "Lần thứ ba", "Lần thứ tư"],
          1,
          "Từ năm 1919, thực dân Pháp đẩy mạnh khai thác thuộc địa lần thứ hai ở Đông Dương.",
        ),
        q(
          "c2s1q2",
          "Nguyễn Ái Quốc đọc Sơ thảo luận cương của Lê-nin về vấn đề dân tộc và thuộc địa vào năm nào?",
          ["1919", "1920", "1925", "1930"],
          1,
          "Tháng 7/1920, Nguyễn Ái Quốc đọc Sơ thảo luận cương của Lê-nin và tìm thấy con đường cứu nước đúng đắn.",
        ),
        q(
          "c2s1q3",
          "Đảng Cộng sản Việt Nam được thành lập vào thời gian nào?",
          ["Tháng 2 năm 1930", "Tháng 8 năm 1945", "Tháng 6 năm 1925", "Tháng 9 năm 1945"],
          0,
          "Hội nghị hợp nhất các tổ chức cộng sản đầu năm 1930 đã thành lập Đảng Cộng sản Việt Nam.",
        ),
        q(
          "c2s1q4",
          "Sự kiện nào trực tiếp tạo thời cơ cho Tổng khởi nghĩa tháng Tám năm 1945?",
          ["Pháp đầu hàng Đồng minh", "Nhật đầu hàng Đồng minh", "Mĩ ném bom nguyên tử xuống Nhật", "Đức đầu hàng Liên Xô"],
          1,
          "Nhật đầu hàng Đồng minh ngày 15/8/1945 tạo thời cơ trực tiếp cho tổng khởi nghĩa.",
        ),
        q(
          "c2s1q5",
          "Tầng lớp nào ra đời và phát triển nhanh trong cuộc khai thác thuộc địa lần thứ hai của Pháp?",
          ["Địa chủ phong kiến", "Giai cấp công nhân", "Nông dân tự do", "Quý tộc cũ"],
          1,
          "Khai thác thuộc địa lần hai làm giai cấp công nhân Việt Nam phát triển nhanh về số lượng.",
        ),
      ]),
      set("c2-set-2", "Bộ câu hỏi 2", [
        q(
          "c2s2q1",
          "Tổ chức nào do Nguyễn Ái Quốc thành lập ở Quảng Châu năm 1925?",
          ["Việt Nam Quốc dân đảng", "Hội Việt Nam Cách mạng Thanh niên", "Mặt trận Việt Minh", "Tân Việt Cách mạng đảng"],
          1,
          "Tháng 6/1925, Nguyễn Ái Quốc thành lập Hội Việt Nam Cách mạng Thanh niên.",
        ),
        q(
          "c2s2q2",
          "Phong trào cách mạng 1930-1931 phát triển đỉnh cao ở đâu?",
          ["Hà Nội", "Huế", "Nghệ An và Hà Tĩnh", "Sài Gòn"],
          2,
          "Đỉnh cao của phong trào 1930-1931 là Xô viết Nghệ - Tĩnh.",
        ),
        q(
          "c2s2q3",
          "Mặt trận Việt Minh được thành lập vào năm nào?",
          ["1930", "1936", "1941", "1945"],
          2,
          "Ngày 19/5/1941, Mặt trận Việt Nam Độc lập Đồng minh được thành lập.",
        ),
        q(
          "c2s2q4",
          "Ngày 2/9/1945 gắn với sự kiện lịch sử nào của dân tộc Việt Nam?",
          ["Tổng khởi nghĩa giành chính quyền ở Hà Nội", "Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập", "Thành lập Đảng Cộng sản Việt Nam", "Nhật đảo chính Pháp ở Đông Dương"],
          1,
          "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.",
        ),
        q(
          "c2s2q5",
          "Mục tiêu lớn nhất của Cách mạng tháng Tám năm 1945 là gì?",
          ["Cải cách ruộng đất ngay lập tức", "Giành chính quyền về tay nhân dân", "Liên minh quân sự với Nhật", "Thiết lập chế độ quân chủ"],
          1,
          "Cách mạng tháng Tám nhằm giành chính quyền trên phạm vi cả nước về tay nhân dân.",
        ),
      ]),
      set("c2-set-3", "Bộ câu hỏi 3", [
        q(
          "c2s3q1",
          "Nguyễn Ái Quốc gửi bản Yêu sách của nhân dân An Nam tới Hội nghị Véc-xai vào năm nào?",
          ["1918", "1919", "1923", "1930"],
          1,
          "Năm 1919, Nguyễn Ái Quốc gửi bản Yêu sách tới Hội nghị Véc-xai.",
        ),
        q(
          "c2s3q2",
          "Tổ chức nào được thành lập đầu tiên theo khuynh hướng vô sản ở Việt Nam?",
          ["Việt Nam Quốc dân đảng", "Tân Việt Cách mạng đảng", "Hội Việt Nam Cách mạng Thanh niên", "Đại Việt Quốc dân đảng"],
          2,
          "Hội Việt Nam Cách mạng Thanh niên là tổ chức tiêu biểu đầu tiên theo khuynh hướng vô sản.",
        ),
        q(
          "c2s3q3",
          "Sự kiện nào đánh dấu phong trào công nhân Việt Nam chuyển sang tự giác?",
          ["Bãi công Ba Son năm 1925", "Khởi nghĩa Yên Bái", "Phong trào Đông Du", "Phong trào Cần Vương"],
          0,
          "Bãi công Ba Son năm 1925 cho thấy phong trào công nhân chuyển dần sang tự giác.",
        ),
        q(
          "c2s3q4",
          "Cơ quan lãnh đạo tổng khởi nghĩa tháng Tám được thành lập là",
          ["Ủy ban Dân tộc giải phóng Việt Nam", "Tổng liên đoàn lao động", "Hội Quốc liên", "Viện Dân biểu Trung Kì"],
          0,
          "Ủy ban Dân tộc giải phóng Việt Nam giữ vai trò như chính phủ lâm thời.",
        ),
        q(
          "c2s3q5",
          "Ý nghĩa lớn nhất của Cách mạng tháng Tám là gì?",
          ["Mở đầu Chiến tranh lạnh", "Lật đổ chế độ phong kiến và thực dân, lập nên nhà nước dân chủ nhân dân", "Giúp Nhật thắng trận", "Đưa Pháp quay lại Đông Dương"],
          1,
          "Cách mạng tháng Tám đập tan ách thống trị thực dân - phong kiến, mở ra kỉ nguyên độc lập cho dân tộc.",
        ),
      ]),
    ],
  },
  {
    id: "chuong-3-the-gioi-1945-1991",
    title: "Chương 3. Thế giới từ năm 1945 đến năm 1991",
    summary:
      "Khái quát Chiến tranh lạnh, tình hình Liên Xô và Đông Âu, sự phát triển của Mĩ, Tây Âu, Mỹ La-tinh và châu Á sau năm 1945.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c3-set-1", "Bộ câu hỏi 1", [
        q(
          "c3s1q1",
          "Chiến tranh lạnh là trạng thái đối đầu chủ yếu giữa hai siêu cường nào?",
          ["Mĩ và Nhật Bản", "Liên Xô và Trung Quốc", "Mĩ và Liên Xô", "Anh và Pháp"],
          2,
          "Sau Chiến tranh thế giới thứ hai, Mĩ và Liên Xô đối đầu trên nhiều lĩnh vực.",
        ),
        q(
          "c3s1q2",
          "Tổ chức quân sự do Mĩ đứng đầu được thành lập năm 1949 là gì?",
          ["NATO", "SEATO", "Vác-sa-va", "ASEAN"],
          0,
          "Tổ chức Hiệp ước Bắc Đại Tây Dương (NATO) được thành lập năm 1949.",
        ),
        q(
          "c3s1q3",
          "Đâu là thành tựu nổi bật của Liên Xô sau Chiến tranh thế giới thứ hai?",
          ["Trở thành nước đầu tiên đưa con người lên Mặt Trăng", "Trở thành cường quốc công nghiệp đứng thứ hai thế giới", "Thành lập Liên minh châu Âu", "Lãnh đạo phong trào không liên kết"],
          1,
          "Liên Xô phục hồi nhanh và trở thành cường quốc công nghiệp đứng thứ hai thế giới sau Mĩ.",
        ),
        q(
          "c3s1q4",
          "Sự kiện đánh dấu Chiến tranh lạnh chấm dứt là gì?",
          ["Bức tường Béc-lin sụp đổ", "Hiệp định Pa-ri về Việt Nam được kí", "Mĩ rút khỏi NATO", "Nhật Bản đầu hàng Đồng minh"],
          0,
          "Bức tường Béc-lin sụp đổ năm 1989 là biểu tượng cho sự chấm dứt Chiến tranh lạnh.",
        ),
        q(
          "c3s1q5",
          "Khối quân sự đối lập với NATO ở châu Âu là",
          ["EU", "SEATO", "Khối Vác-sa-va", "APEC"],
          2,
          "Khối Vác-sa-va ra đời năm 1955 để đối trọng với NATO.",
        ),
      ]),
      set("c3-set-2", "Bộ câu hỏi 2", [
        q(
          "c3s2q1",
          "Tổ chức liên kết kinh tế - chính trị tiêu biểu của Tây Âu là gì?",
          ["EU", "NAFTA", "ASEAN", "APEC"],
          0,
          "Liên minh châu Âu là tổ chức liên kết tiêu biểu của các nước Tây Âu.",
        ),
        q(
          "c3s2q2",
          "Cuộc cách mạng Cuba thắng lợi năm 1959 gắn với lãnh tụ nào?",
          ["Nen-xơn Man-đê-la", "Phi-đen Ca-xtơ-rô", "Mao Trạch Đông", "Xu-các-nô"],
          1,
          "Phi-đen Ca-xtơ-rô là lãnh tụ tiêu biểu của cách mạng Cuba.",
        ),
        q(
          "c3s2q3",
          "Điểm chung của nhiều nước châu Á sau năm 1945 là gì?",
          ["Đều trở thành cường quốc quân sự", "Đều tiến hành đấu tranh giành hoặc củng cố độc lập", "Đều gia nhập NATO", "Đều theo chế độ quân chủ lập hiến"],
          1,
          "Nhiều nước châu Á tập trung đấu tranh giành độc lập, xây dựng và phát triển đất nước.",
        ),
        q(
          "c3s2q4",
          "Nguyên nhân chủ yếu dẫn đến sự tan rã của Liên Xô và Đông Âu là gì?",
          ["Do tác động của chiến tranh thế giới", "Do đường lối cải tổ sai lầm và khủng hoảng kéo dài", "Do thiên tai kéo dài", "Do bị Nhật Bản xâm lược"],
          1,
          "Khủng hoảng kéo dài cùng sai lầm cải tổ là nguyên nhân quan trọng.",
        ),
        q(
          "c3s2q5",
          "Sau năm 1945, Nhật Bản nổi lên chủ yếu trong lĩnh vực nào?",
          ["Nông nghiệp", "Kinh tế công nghiệp và công nghệ", "Phong kiến quân sự", "Thuộc địa hóa châu Á"],
          1,
          "Nhật Bản phát triển mạnh về kinh tế, công nghiệp và công nghệ.",
        ),
      ]),
      set("c3-set-3", "Bộ câu hỏi 3", [
        q(
          "c3s3q1",
          "Mĩ phát động Chiến tranh lạnh nhằm mục đích chủ yếu nào?",
          ["Ngăn chặn và tiến tới xóa bỏ chủ nghĩa xã hội", "Xóa bỏ hoàn toàn chiến tranh", "Tăng viện trợ cho thuộc địa", "Giúp các nước châu Á thống nhất"],
          0,
          "Mĩ muốn ngăn chặn ảnh hưởng của Liên Xô và phong trào cách mạng thế giới.",
        ),
        q(
          "c3s3q2",
          "Nước nào mở đầu phong trào giải phóng dân tộc ở Mỹ La-tinh tiêu biểu sau 1945?",
          ["Bra-xin", "Achentina", "Cuba", "Mexico"],
          2,
          "Cuba là lá cờ đầu của phong trào đấu tranh ở Mỹ La-tinh.",
        ),
        q(
          "c3s3q3",
          "Liên Xô là nước đầu tiên phóng thành công vệ tinh nhân tạo vào năm nào?",
          ["1955", "1957", "1961", "1969"],
          1,
          "Năm 1957, Liên Xô phóng thành công vệ tinh nhân tạo đầu tiên của loài người.",
        ),
        q(
          "c3s3q4",
          "Biểu hiện rõ của sự đối đầu Đông - Tây là",
          ["Cuộc chạy đua vũ trang", "Tăng cường sản xuất nông nghiệp", "Giảm chi tiêu quân sự toàn cầu", "Xóa bỏ các căn cứ quân sự"],
          0,
          "Cuộc chạy đua vũ trang phản ánh rõ trạng thái đối đầu căng thẳng giữa hai khối.",
        ),
        q(
          "c3s3q5",
          "Thành tựu quan trọng của cách mạng khoa học - kĩ thuật giúp Chiến tranh lạnh thêm căng thẳng là",
          ["Vũ khí hạt nhân", "Máy cày nông nghiệp", "Đường sắt hơi nước", "Thuyền buồm lớn"],
          0,
          "Vũ khí hạt nhân làm cho cuộc chạy đua vũ trang trở nên nguy hiểm hơn.",
        ),
      ]),
    ],
  },
  {
    id: "chuong-4-viet-nam-1945-1991",
    title: "Chương 4. Việt Nam từ năm 1945 đến năm 1991",
    summary:
      "Bao quát quá trình xây dựng chính quyền cách mạng, kháng chiến chống Pháp, chống Mĩ và công cuộc xây dựng đất nước đến trước Đổi mới.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c4-set-1", "Bộ câu hỏi 1", [
        q(
          "c4s1q1",
          "Khó khăn lớn nhất của nước Việt Nam Dân chủ Cộng hòa ngay sau ngày độc lập là gì?",
          ["Thiếu tài nguyên thiên nhiên", "Thù trong giặc ngoài cùng nạn đói, nạn dốt", "Không có chính phủ", "Không có lực lượng vũ trang"],
          1,
          "Ngay sau Cách mạng tháng Tám, nước ta phải đối mặt với nhiều khó khăn nghiêm trọng.",
        ),
        q(
          "c4s1q2",
          "Chiến thắng nào quyết định kết thúc cuộc kháng chiến chống Pháp?",
          ["Chiến thắng Việt Bắc", "Chiến thắng Biên giới", "Chiến thắng Điện Biên Phủ", "Chiến thắng Tây Nguyên"],
          2,
          "Chiến thắng Điện Biên Phủ năm 1954 buộc Pháp kí Hiệp định Giơ-ne-vơ.",
        ),
        q(
          "c4s1q3",
          "Hiệp định Giơ-ne-vơ năm 1954 quy định điều gì đối với Việt Nam?",
          ["Việt Nam trở thành thuộc địa của Mĩ", "Tạm thời lấy vĩ tuyến 17 làm giới tuyến quân sự", "Việt Nam bị chia cắt lâu dài thành hai quốc gia", "Pháp tiếp tục chiếm đóng miền Bắc"],
          1,
          "Hiệp định Giơ-ne-vơ quy định tạm thời chia cắt hai miền ở vĩ tuyến 17.",
        ),
        q(
          "c4s1q4",
          "Chiến dịch nào mở đầu cuộc Tổng tiến công và nổi dậy mùa Xuân 1975?",
          ["Chiến dịch Huế - Đà Nẵng", "Chiến dịch Hồ Chí Minh", "Chiến dịch Tây Nguyên", "Chiến dịch Điện Biên Phủ trên không"],
          2,
          "Chiến dịch Tây Nguyên thắng lợi đã mở đầu cho cuộc Tổng tiến công và nổi dậy mùa Xuân 1975.",
        ),
        q(
          "c4s1q5",
          "Chủ trương nào giúp chính quyền cách mạng vượt qua nạn dốt sau 1945?",
          ["Bình dân học vụ", "Cưỡng bức quân dịch", "Khóa cửa trường học", "Bỏ thi cử hoàn toàn"],
          0,
          "Phong trào Bình dân học vụ góp phần xóa nạn mù chữ cho nhân dân.",
        ),
      ]),
      set("c4-set-2", "Bộ câu hỏi 2", [
        q(
          "c4s2q1",
          "Hiệp định Pa-ri năm 1973 được kí nhằm mục đích gì?",
          ["Chấm dứt chiến tranh, lập lại hòa bình ở Việt Nam", "Chia Việt Nam thành ba miền", "Thành lập ASEAN", "Thống nhất đất nước về mặt nhà nước"],
          0,
          "Hiệp định Pa-ri 1973 buộc Mĩ chấm dứt chiến tranh, rút quân về nước.",
        ),
        q(
          "c4s2q2",
          "Sự kiện nào đánh dấu miền Nam hoàn toàn giải phóng?",
          ["Ta giải phóng Huế", "Xe tăng tiến vào Dinh Độc Lập ngày 30/4/1975", "Hiệp định Giơ-ne-vơ được kí", "Mặt trận Dân tộc Giải phóng miền Nam thành lập"],
          1,
          "Ngày 30/4/1975, quân giải phóng tiến vào Dinh Độc Lập, miền Nam được giải phóng hoàn toàn.",
        ),
        q(
          "c4s2q3",
          "Quốc hội khóa VI quyết định đổi tên nước ta thành gì?",
          ["Việt Nam Dân chủ Cộng hòa", "Cộng hòa Xã hội chủ nghĩa Việt Nam", "Đại Việt", "Liên bang Đông Dương"],
          1,
          "Năm 1976, Quốc hội khóa VI quyết định đặt tên nước là Cộng hòa Xã hội chủ nghĩa Việt Nam.",
        ),
        q(
          "c4s2q4",
          "Đại hội nào của Đảng đề ra đường lối Đổi mới?",
          ["Đại hội IV", "Đại hội V", "Đại hội VI", "Đại hội VII"],
          2,
          "Đại hội VI của Đảng năm 1986 đề ra đường lối Đổi mới.",
        ),
        q(
          "c4s2q5",
          "Chiến thắng “Điện Biên Phủ trên không” diễn ra vào năm nào?",
          ["1968", "1972", "1973", "1975"],
          1,
          "Cuối năm 1972, quân dân miền Bắc đánh bại cuộc tập kích bằng B-52 của Mĩ.",
        ),
      ]),
      set("c4-set-3", "Bộ câu hỏi 3", [
        q(
          "c4s3q1",
          "Lời kêu gọi toàn quốc kháng chiến được Chủ tịch Hồ Chí Minh đưa ra vào thời điểm nào?",
          ["19/12/1946", "2/9/1945", "7/5/1954", "30/4/1975"],
          0,
          "Ngày 19/12/1946, Hồ Chí Minh ra Lời kêu gọi toàn quốc kháng chiến.",
        ),
        q(
          "c4s3q2",
          "Ý nghĩa lớn nhất của chiến thắng Điện Biên Phủ là",
          ["Giải phóng hoàn toàn miền Nam", "Buộc Pháp chấm dứt chiến tranh xâm lược ở Đông Dương", "Làm Nhật đầu hàng", "Đưa Việt Nam gia nhập ASEAN"],
          1,
          "Chiến thắng Điện Biên Phủ buộc Pháp phải kí Hiệp định Giơ-ne-vơ, chấm dứt chiến tranh xâm lược.",
        ),
        q(
          "c4s3q3",
          "Nhiệm vụ chiến lược của miền Bắc sau năm 1954 là gì?",
          ["Làm hậu phương lớn cho miền Nam", "Chỉ tập trung xuất khẩu", "Chuyển toàn bộ dân vào Nam", "Từ bỏ xây dựng chủ nghĩa xã hội"],
          0,
          "Miền Bắc vừa xây dựng chủ nghĩa xã hội, vừa làm hậu phương lớn cho miền Nam.",
        ),
        q(
          "c4s3q4",
          "Chiến dịch cuối cùng giải phóng Sài Gòn mang tên gì?",
          ["Chiến dịch Biên giới", "Chiến dịch Hồ Chí Minh", "Chiến dịch Việt Bắc", "Chiến dịch Đồng khởi"],
          1,
          "Chiến dịch Hồ Chí Minh là chiến dịch cuối cùng giải phóng Sài Gòn.",
        ),
        q(
          "c4s3q5",
          "Sau 1975, nhiệm vụ lịch sử trọng tâm của cả nước là",
          ["Tiếp tục chia cắt hai miền", "Thống nhất đất nước về mặt nhà nước và xây dựng đất nước", "Trở lại chế độ thuộc địa", "Rút lui khỏi quan hệ quốc tế"],
          1,
          "Sau khi giải phóng miền Nam, cả nước bước vào thời kì thống nhất và xây dựng đất nước.",
        ),
      ]),
    ],
  },
  {
    id: "chuong-5-the-gioi-tu-1991-den-nay",
    title: "Chương 5. Thế giới từ năm 1991 đến nay",
    summary:
      "Tìm hiểu xu thế phát triển của thế giới sau Chiến tranh lạnh, trật tự đa cực, toàn cầu hóa và vai trò của các tổ chức quốc tế.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c5-set-1", "Bộ câu hỏi 1", [
        q(
          "c5s1q1",
          "Sau Chiến tranh lạnh, xu thế chung nổi bật của thế giới là gì?",
          ["Đối đầu quân sự gay gắt", "Hòa bình, ổn định và hợp tác phát triển", "Quay trở lại trật tự hai cực", "Mọi quốc gia đều đóng cửa nền kinh tế"],
          1,
          "Sau Chiến tranh lạnh, hòa bình, hợp tác và phát triển trở thành xu thế lớn.",
        ),
        q(
          "c5s1q2",
          "Toàn cầu hóa là quá trình gì?",
          ["Mỗi nước tách khỏi quan hệ quốc tế", "Các quốc gia ngày càng phụ thuộc và liên kết chặt chẽ với nhau", "Xóa bỏ hoàn toàn mọi biên giới quốc gia", "Chỉ diễn ra trong lĩnh vực quân sự"],
          1,
          "Toàn cầu hóa thể hiện sự liên hệ và phụ thuộc lẫn nhau ngày càng sâu rộng.",
        ),
        q(
          "c5s1q3",
          "Tổ chức nào giữ vai trò quan trọng trong việc duy trì hòa bình và an ninh quốc tế?",
          ["ASEAN", "EU", "Liên hợp quốc", "NATO"],
          2,
          "Liên hợp quốc có vai trò quan trọng trong duy trì hòa bình, an ninh quốc tế.",
        ),
        q(
          "c5s1q4",
          "Một biểu hiện của xu thế đa cực trong quan hệ quốc tế là gì?",
          ["Chỉ còn một trung tâm quyền lực duy nhất", "Xuất hiện nhiều trung tâm kinh tế - chính trị lớn", "Mọi quốc gia đều có sức mạnh ngang nhau", "Không còn tổ chức khu vực nào tồn tại"],
          1,
          "Sau 1991, quan hệ quốc tế có xu hướng đa cực với nhiều trung tâm lớn.",
        ),
        q(
          "c5s1q5",
          "Xu thế hòa bình, ổn định tạo điều kiện thuận lợi cho",
          ["Phát triển kinh tế và hợp tác quốc tế", "Mở rộng chiến tranh xâm lược", "Xóa bỏ mọi tổ chức khu vực", "Ngừng tiến bộ khoa học"],
          0,
          "Môi trường hòa bình tạo điều kiện cho hợp tác và phát triển kinh tế.",
        ),
      ]),
      set("c5-set-2", "Bộ câu hỏi 2", [
        q(
          "c5s2q1",
          "Mặt tích cực nổi bật của toàn cầu hóa là gì?",
          ["Thúc đẩy hợp tác, trao đổi và tiếp cận khoa học - công nghệ", "Xóa bỏ hoàn toàn khoảng cách giàu nghèo", "Chấm dứt mọi cuộc xung đột", "Làm biến mất vai trò của nhà nước"],
          0,
          "Toàn cầu hóa giúp mở rộng hợp tác và chuyển giao công nghệ.",
        ),
        q(
          "c5s2q2",
          "Thách thức lớn mà nhiều nước đang phát triển phải đối mặt trong bối cảnh toàn cầu hóa là gì?",
          ["Không có cơ hội tiếp cận thị trường", "Nguy cơ tụt hậu và lệ thuộc", "Không cần đổi mới công nghệ", "Không phải cạnh tranh quốc tế"],
          1,
          "Nếu không tận dụng cơ hội, các nước đang phát triển dễ tụt hậu và lệ thuộc.",
        ),
        q(
          "c5s2q3",
          "Nội dung nào phù hợp với xu thế phát triển của thế giới hiện nay?",
          ["Mở rộng chiến tranh để giải quyết tranh chấp", "Tăng cường đối thoại và hợp tác cùng phát triển", "Tự cô lập khỏi khu vực và thế giới", "Từ chối mọi tiến bộ khoa học - kĩ thuật"],
          1,
          "Đối thoại và hợp tác là xu thế phù hợp của thế giới hiện nay.",
        ),
        q(
          "c5s2q4",
          "Vì sao nhiều quốc gia phải điều chỉnh chiến lược phát triển sau năm 1991?",
          ["Do trật tự thế giới và môi trường quốc tế thay đổi", "Do khoa học - kĩ thuật chấm dứt phát triển", "Do không còn nhu cầu hội nhập", "Do Liên hợp quốc giải thể"],
          0,
          "Bối cảnh quốc tế sau Chiến tranh lạnh thay đổi mạnh, buộc các quốc gia điều chỉnh chiến lược.",
        ),
        q(
          "c5s2q5",
          "Một đặc điểm nổi bật của quan hệ quốc tế sau 1991 là",
          ["Chỉ xoay quanh xung đột quân sự", "Vừa hợp tác, vừa đấu tranh giữa các quốc gia", "Không còn cạnh tranh kinh tế", "Không còn ảnh hưởng của công nghệ"],
          1,
          "Quan hệ quốc tế đan xen giữa hợp tác và cạnh tranh, đấu tranh.",
        ),
      ]),
      set("c5-set-3", "Bộ câu hỏi 3", [
        q(
          "c5s3q1",
          "Yếu tố nào thúc đẩy mạnh mẽ quá trình toàn cầu hóa?",
          ["Sự phát triển của khoa học - công nghệ", "Việc đóng cửa biên giới", "Suy giảm thương mại", "Ngừng phát triển thông tin liên lạc"],
          0,
          "Tiến bộ khoa học - công nghệ, nhất là giao thông và thông tin, thúc đẩy toàn cầu hóa.",
        ),
        q(
          "c5s3q2",
          "Xu thế đa cực có nghĩa là",
          ["Thế giới do một nước chi phối hoàn toàn", "Nhiều trung tâm quyền lực cùng tồn tại", "Mọi nước đều ngang nhau tuyệt đối", "Không còn tổ chức quốc tế"],
          1,
          "Đa cực thể hiện việc tồn tại nhiều trung tâm kinh tế - chính trị lớn trong thế giới.",
        ),
        q(
          "c5s3q3",
          "Một trong những nhiệm vụ quan trọng của Liên hợp quốc là",
          ["Duy trì hòa bình và an ninh quốc tế", "Thiết lập chủ nghĩa phát xít", "Chỉ quản lí kinh tế châu Âu", "Thay thế mọi chính phủ quốc gia"],
          0,
          "Liên hợp quốc có vai trò quan trọng trong duy trì hòa bình và an ninh quốc tế.",
        ),
        q(
          "c5s3q4",
          "Trong bối cảnh hiện nay, các nước cần làm gì để phát triển?",
          ["Tăng cường hợp tác nhưng bảo vệ lợi ích dân tộc", "Từ chối hội nhập", "Chỉ dựa vào chiến tranh", "Giảm toàn bộ đầu tư giáo dục"],
          0,
          "Muốn phát triển, các nước cần chủ động hội nhập nhưng vẫn giữ vững lợi ích quốc gia.",
        ),
        q(
          "c5s3q5",
          "Ví dụ nào phản ánh đúng tác động hai mặt của toàn cầu hóa?",
          ["Mở rộng thị trường nhưng cũng tăng cạnh tranh", "Chỉ đem lại lợi ích", "Chỉ gây hại", "Không ảnh hưởng đến kinh tế"],
          0,
          "Toàn cầu hóa vừa tạo cơ hội mở rộng thị trường vừa làm tăng áp lực cạnh tranh.",
        ),
      ]),
    ],
  },
  {
    id: "chuong-6-viet-nam-tu-1991-den-nay",
    title: "Chương 6. Việt Nam từ năm 1991 đến nay",
    summary:
      "Khái quát thành tựu của công cuộc Đổi mới, quá trình hội nhập quốc tế và những định hướng phát triển của Việt Nam thời kì mới.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c6-set-1", "Bộ câu hỏi 1", [
        q(
          "c6s1q1",
          "Công cuộc Đổi mới ở Việt Nam được triển khai từ năm nào?",
          ["1975", "1986", "1991", "2000"],
          1,
          "Đường lối Đổi mới được đề ra từ Đại hội VI của Đảng năm 1986.",
        ),
        q(
          "c6s1q2",
          "Một thành tựu nổi bật của Việt Nam trong thời kì Đổi mới là gì?",
          ["Kinh tế lâm vào khủng hoảng kéo dài", "Đời sống nhân dân từng bước được cải thiện", "Ngừng hội nhập với khu vực", "Chỉ phát triển nông nghiệp tự cung tự cấp"],
          1,
          "Đổi mới giúp kinh tế tăng trưởng, đời sống nhân dân được cải thiện.",
        ),
        q(
          "c6s1q3",
          "Việt Nam gia nhập ASEAN vào năm nào?",
          ["1986", "1995", "2007", "2015"],
          1,
          "Việt Nam chính thức gia nhập ASEAN năm 1995.",
        ),
        q(
          "c6s1q4",
          "Việc Việt Nam gia nhập WTO có ý nghĩa gì?",
          ["Khẳng định quá trình hội nhập quốc tế sâu rộng", "Chấm dứt quan hệ với ASEAN", "Thu hẹp thị trường xuất khẩu", "Bỏ hoàn toàn vai trò của nhà nước"],
          0,
          "Gia nhập WTO là bước tiến quan trọng trong hội nhập kinh tế quốc tế.",
        ),
        q(
          "c6s1q5",
          "Một yêu cầu lớn của phát triển đất nước hiện nay là",
          ["Đóng cửa nền kinh tế", "Đẩy mạnh công nghiệp hóa, hiện đại hóa", "Ngừng hội nhập", "Giảm vai trò giáo dục"],
          1,
          "Công nghiệp hóa, hiện đại hóa là yêu cầu lớn của quá trình phát triển đất nước.",
        ),
      ]),
      set("c6-set-2", "Bộ câu hỏi 2", [
        q(
          "c6s2q1",
          "Một trong những yêu cầu quan trọng để Việt Nam phát triển bền vững hiện nay là gì?",
          ["Chỉ chú trọng tăng trưởng bằng mọi giá", "Gắn phát triển kinh tế với bảo vệ môi trường", "Tách khỏi hội nhập quốc tế", "Giảm đầu tư cho giáo dục và khoa học"],
          1,
          "Phát triển bền vững đòi hỏi tăng trưởng đi đôi với bảo vệ môi trường.",
        ),
        q(
          "c6s2q2",
          "Vai trò của khoa học - công nghệ trong giai đoạn hiện nay của Việt Nam là gì?",
          ["Không còn quan trọng như trước", "Là động lực thúc đẩy năng suất và năng lực cạnh tranh", "Chỉ phục vụ lĩnh vực quân sự", "Không liên quan đến hội nhập"],
          1,
          "Khoa học - công nghệ là động lực quan trọng cho tăng trưởng và cạnh tranh.",
        ),
        q(
          "c6s2q3",
          "Nội dung nào phản ánh đúng chủ trương hội nhập của Việt Nam?",
          ["Hội nhập nhưng giữ vững độc lập, tự chủ", "Phụ thuộc hoàn toàn vào bên ngoài", "Không tham gia tổ chức quốc tế nào", "Chỉ hợp tác trong một lĩnh vực duy nhất"],
          0,
          "Việt Nam chủ trương chủ động hội nhập trên cơ sở giữ vững độc lập, tự chủ.",
        ),
        q(
          "c6s2q4",
          "Đâu là biểu hiện cho vị thế quốc tế ngày càng cao của Việt Nam?",
          ["Không tham gia hoạt động đa phương", "Đảm nhiệm nhiều vai trò tại các diễn đàn quốc tế", "Giảm quan hệ ngoại giao với các nước", "Ngừng cử lực lượng tham gia gìn giữ hòa bình"],
          1,
          "Việt Nam ngày càng tham gia tích cực và giữ nhiều vai trò tại các diễn đàn quốc tế.",
        ),
        q(
          "c6s2q5",
          "Một kết quả tích cực của Đổi mới là",
          ["Kinh tế trì trệ kéo dài", "Mở rộng quan hệ đối ngoại và hội nhập", "Bị cô lập hoàn toàn", "Không thu hút đầu tư"],
          1,
          "Đổi mới giúp Việt Nam mở rộng quan hệ đối ngoại và hội nhập quốc tế.",
        ),
      ]),
      set("c6-set-3", "Bộ câu hỏi 3", [
        q(
          "c6s3q1",
          "Đổi mới ở Việt Nam là đổi mới",
          ["Chỉ về kinh tế", "Toàn diện nhưng lấy kinh tế làm trọng tâm", "Chỉ về văn hóa", "Chỉ về quân sự"],
          1,
          "Đổi mới được tiến hành toàn diện, trong đó kinh tế là trọng tâm.",
        ),
        q(
          "c6s3q2",
          "Việt Nam gia nhập WTO vào năm nào?",
          ["1995", "2000", "2007", "2015"],
          2,
          "Việt Nam trở thành thành viên WTO năm 2007.",
        ),
        q(
          "c6s3q3",
          "Mục tiêu của phát triển bền vững là",
          ["Tăng trưởng nhưng bỏ qua con người", "Kết hợp kinh tế, xã hội và môi trường", "Chỉ tăng sản lượng xuất khẩu", "Chỉ chú trọng đô thị hóa"],
          1,
          "Phát triển bền vững phải hài hòa giữa kinh tế, xã hội và môi trường.",
        ),
        q(
          "c6s3q4",
          "Một nội dung quan trọng để nâng cao năng lực cạnh tranh quốc gia là",
          ["Giảm đầu tư giáo dục", "Phát triển nguồn nhân lực chất lượng cao", "Ngừng ứng dụng công nghệ", "Hạn chế đổi mới sáng tạo"],
          1,
          "Nguồn nhân lực chất lượng cao là yếu tố then chốt cho phát triển hiện đại.",
        ),
        q(
          "c6s3q5",
          "Chủ trương đối ngoại của Việt Nam hiện nay là",
          ["Khép kín và cô lập", "Độc lập, tự chủ, hòa bình, hợp tác và phát triển", "Chỉ liên kết quân sự", "Không tham gia tổ chức quốc tế"],
          1,
          "Việt Nam theo đuổi đường lối đối ngoại độc lập, tự chủ, hòa bình, hợp tác và phát triển.",
        ),
      ]),
    ],
  },
  {
    id: "chuong-7-cach-mang-khoa-hoc-ki-thuat-va-toan-cau-hoa",
    title: "Chương 7. Cách mạng khoa học - kĩ thuật và xu thế toàn cầu hóa",
    summary:
      "Khái quát thành tựu khoa học - kĩ thuật hiện đại, tác động của nó tới đời sống và mối liên hệ với xu thế toàn cầu hóa.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("c7-set-1", "Bộ câu hỏi 1", [
        q(
          "c7s1q1",
          "Cuộc cách mạng khoa học - kĩ thuật hiện đại bùng nổ từ khoảng thời gian nào?",
          ["Cuối thế kỉ XVIII", "Giữa thế kỉ XIX", "Từ những năm 40 của thế kỉ XX", "Đầu thế kỉ XXI"],
          2,
          "Cuộc cách mạng khoa học - kĩ thuật hiện đại bùng nổ từ những năm 40 của thế kỉ XX.",
        ),
        q(
          "c7s1q2",
          "Lĩnh vực nào dưới đây là thành tựu tiêu biểu của cuộc cách mạng khoa học - kĩ thuật hiện đại?",
          ["Công nghệ thông tin", "Luyện kim thủ công", "Canh tác lạc hậu", "Trao đổi hiện vật"],
          0,
          "Công nghệ thông tin là thành tựu tiêu biểu, làm thay đổi sâu sắc đời sống xã hội.",
        ),
        q(
          "c7s1q3",
          "Tác động tích cực nổi bật của khoa học - kĩ thuật là gì?",
          ["Nâng cao năng suất lao động và chất lượng cuộc sống", "Làm con người quay lại sản xuất thủ công", "Xóa bỏ hoàn toàn ô nhiễm môi trường", "Chấm dứt mọi bất bình đẳng xã hội"],
          0,
          "Khoa học - kĩ thuật giúp tăng năng suất và cải thiện chất lượng cuộc sống.",
        ),
        q(
          "c7s1q4",
          "Một hệ quả tiêu cực cần chú ý của cách mạng khoa học - kĩ thuật là gì?",
          ["Không tạo ra thay đổi xã hội nào", "Nguy cơ ô nhiễm môi trường và vũ khí hủy diệt", "Làm mọi quốc gia giàu lên như nhau", "Xóa bỏ hoàn toàn cạnh tranh"],
          1,
          "Bên cạnh mặt tích cực, cách mạng khoa học - kĩ thuật cũng tạo ra nhiều thách thức.",
        ),
        q(
          "c7s1q5",
          "Thành tựu nào làm thay đổi mạnh mẽ liên lạc toàn cầu?",
          ["Internet", "Ngựa kéo", "Thư tay truyền thống", "Máy in gỗ cổ"],
          0,
          "Internet là thành tựu nổi bật làm thay đổi cách con người kết nối và trao đổi thông tin.",
        ),
      ]),
      set("c7-set-2", "Bộ câu hỏi 2", [
        q(
          "c7s2q1",
          "Mối quan hệ giữa cách mạng khoa học - kĩ thuật và toàn cầu hóa là gì?",
          ["Không liên quan đến nhau", "Khoa học - kĩ thuật thúc đẩy mạnh mẽ toàn cầu hóa", "Toàn cầu hóa làm khoa học - kĩ thuật chậm lại", "Hai quá trình luôn đối lập nhau"],
          1,
          "Những tiến bộ về giao thông, thông tin liên lạc và công nghệ đã thúc đẩy toàn cầu hóa diễn ra nhanh hơn.",
        ),
        q(
          "c7s2q2",
          "Ví dụ nào thể hiện rõ tác động của công nghệ thông tin đến đời sống xã hội?",
          ["Trao đổi thư tay mất nhiều tháng", "Học tập và làm việc trực tuyến", "Chỉ liên lạc bằng tín hiệu khói", "Ngừng sử dụng thiết bị điện tử"],
          1,
          "Công nghệ thông tin giúp con người học tập, làm việc và trao đổi nhanh chóng.",
        ),
        q(
          "c7s2q3",
          "Để tận dụng thành tựu khoa học - kĩ thuật, học sinh cần chú ý điều gì?",
          ["Rèn luyện tư duy, kĩ năng số và khả năng tự học", "Phụ thuộc hoàn toàn vào máy móc", "Từ chối mọi công nghệ mới", "Chỉ học thuộc lòng, không cần thực hành"],
          0,
          "Học sinh cần phát triển năng lực tự học, tư duy phản biện và kĩ năng số.",
        ),
        q(
          "c7s2q4",
          "Nhận định nào đúng về cách mạng khoa học - kĩ thuật hiện đại?",
          ["Chỉ có tác động tích cực", "Vừa tạo thời cơ vừa đặt ra thách thức cho các quốc gia", "Chỉ diễn ra ở các nước phát triển", "Không làm thay đổi cơ cấu kinh tế"],
          1,
          "Cách mạng khoa học - kĩ thuật hiện đại mang lại cả cơ hội và thách thức.",
        ),
        q(
          "c7s2q5",
          "Một lĩnh vực tiến bộ mạnh trong cách mạng khoa học - kĩ thuật hiện đại là",
          ["Công nghệ sinh học", "Phong kiến quân sự", "Thủ công lạc hậu", "Trao đổi hàng đổi hàng"],
          0,
          "Công nghệ sinh học là một lĩnh vực phát triển mạnh của khoa học hiện đại.",
        ),
      ]),
      set("c7-set-3", "Bộ câu hỏi 3", [
        q(
          "c7s3q1",
          "Tác động nào dưới đây của khoa học - kĩ thuật gắn trực tiếp với toàn cầu hóa?",
          ["Thu hẹp giao lưu quốc tế", "Tăng tốc độ truyền tải thông tin và kết nối thị trường", "Xóa bỏ hoàn toàn vai trò của con người", "Làm ngừng phát triển thương mại"],
          1,
          "Thông tin và vận tải hiện đại giúp các thị trường và con người kết nối nhanh hơn trên toàn cầu.",
        ),
        q(
          "c7s3q2",
          "Một yêu cầu quan trọng đối với con người trong thời đại công nghệ là",
          ["Ngừng học tập sau phổ thông", "Liên tục cập nhật tri thức và kĩ năng", "Không cần sử dụng công nghệ", "Chỉ dựa vào trí nhớ máy móc"],
          1,
          "Trong thời đại công nghệ, con người phải học tập suốt đời và liên tục cập nhật kĩ năng.",
        ),
        q(
          "c7s3q3",
          "Ví dụ nào cho thấy mặt tiêu cực của tiến bộ khoa học - kĩ thuật?",
          ["Tăng năng suất sản xuất", "Ô nhiễm môi trường do công nghiệp và công nghệ", "Mở rộng giao lưu văn hóa", "Nâng cao chất lượng y tế"],
          1,
          "Bên cạnh lợi ích, công nghệ và công nghiệp hóa cũng có thể gây ô nhiễm môi trường.",
        ),
        q(
          "c7s3q4",
          "Một biểu hiện của toàn cầu hóa trong đời sống hằng ngày là",
          ["Trao đổi thông tin tức thời qua Internet", "Chỉ học bằng bảng đá", "Không có vận tải hàng không", "Ngừng thương mại quốc tế"],
          0,
          "Internet và công nghệ số làm cho trao đổi thông tin xuyên biên giới trở nên tức thời.",
        ),
        q(
          "c7s3q5",
          "Thái độ phù hợp trước sự phát triển của khoa học - kĩ thuật là",
          ["Chủ động học hỏi và sử dụng có trách nhiệm", "Từ chối hoàn toàn công nghệ", "Phụ thuộc tuyệt đối vào máy móc", "Bỏ qua vấn đề an toàn thông tin"],
          0,
          "Cần chủ động tiếp cận công nghệ nhưng phải sử dụng một cách có trách nhiệm và an toàn.",
        ),
      ]),
    ],
  },
];

const historyChapterModeContent: Record<string, HistoryChapterModeContent> = {
  "chuong-1-the-gioi-1918-1945": {
    learn: {
      overview:
        "Tập trung nắm bối cảnh thế giới sau Chiến tranh thế giới thứ nhất, các mâu thuẫn của chủ nghĩa tư bản và quá trình dẫn tới Chiến tranh thế giới thứ hai.",
      keyIdeas: [
        "Nắm được hệ thống Véc-xai - Oa-sinh-tơn hình thành như thế nào.",
        "Hiểu nguyên nhân và tác động của khủng hoảng kinh tế 1929-1933.",
        "Phân biệt đặc điểm của chủ nghĩa phát xít ở Đức, I-ta-li-a và Nhật Bản.",
        "Ghi nhớ diễn biến chính và bước ngoặt của Chiến tranh thế giới thứ hai.",
      ],
    },
    review: {
      checklist: [
        "Em có nhớ được tên hệ thống trật tự thế giới sau Chiến tranh thế giới thứ nhất không?",
        "Em đã phân biệt được nguyên nhân của khủng hoảng kinh tế và hậu quả chính trị của nó chưa?",
        "Em có thể giải thích vì sao chiến thắng Xtalingrát là bước ngoặt của chiến tranh không?",
      ],
      quickPrompts: [
        "Hãy tóm tắt chương này bằng 4 mốc thời gian quan trọng.",
        "So sánh cách Mĩ và các nước phát xít phản ứng trước khủng hoảng 1929-1933.",
      ],
    },
  },
  "chuong-2-viet-nam-1918-1945": {
    learn: {
      overview:
        "Đây là chương nền tảng của Lịch sử 9, giúp học sinh hiểu tiến trình cách mạng Việt Nam từ sau Chiến tranh thế giới thứ nhất đến Cách mạng tháng Tám năm 1945.",
      keyIdeas: [
        "Nhớ chính sách khai thác thuộc địa lần thứ hai của Pháp và tác động tới xã hội Việt Nam.",
        "Theo dõi hành trình Nguyễn Ái Quốc tìm đường cứu nước và truyền bá chủ nghĩa Mác - Lê-nin.",
        "Nắm được ý nghĩa của việc thành lập Đảng Cộng sản Việt Nam năm 1930.",
        "Hiểu vì sao tháng Tám năm 1945 là thời cơ cách mạng chín muồi.",
      ],
    },
    review: {
      checklist: [
        "Em đã nối được các mốc 1925, 1930, 1941, 1945 với đúng sự kiện chưa?",
        "Em có thể giải thích ngắn gọn vai trò của Nguyễn Ái Quốc trong chương này không?",
        "Em đã phân biệt được phong trào 1930-1931 với cao trào giải phóng dân tộc 1939-1945 chưa?",
      ],
      quickPrompts: [
        "Tóm tắt quá trình chuẩn bị cho Cách mạng tháng Tám bằng 5 ý ngắn.",
        "Nếu ra đề tự luận, em sẽ trình bày ý nghĩa của việc thành lập Đảng như thế nào?",
      ],
    },
  },
  "chuong-3-the-gioi-1945-1991": {
    learn: {
      overview:
        "Chương này giúp học sinh hiểu thế giới trong thời kì Chiến tranh lạnh và những biến chuyển lớn về chính trị, kinh tế, khu vực sau năm 1945.",
      keyIdeas: [
        "Hiểu khái niệm Chiến tranh lạnh và những biểu hiện chính.",
        "Nắm được thành tựu và khó khăn của Liên Xô, Đông Âu sau chiến tranh.",
        "Biết được sự phát triển của Mĩ, Tây Âu, Mỹ La-tinh và châu Á.",
        "Nhớ nguyên nhân cơ bản dẫn tới sự tan rã của Liên Xô và Đông Âu.",
      ],
    },
    review: {
      checklist: [
        "Em có thể nêu 2 biểu hiện rõ nhất của Chiến tranh lạnh không?",
        "Em đã phân biệt NATO và khối Vác-sa-va chưa?",
        "Em có nhớ vì sao năm 1989-1991 là mốc chuyển biến rất lớn của thế giới không?",
      ],
      quickPrompts: [
        "Hãy lập một sơ đồ tư duy nhỏ về thế giới từ 1945 đến 1991.",
        "Viết 3 câu giải thích vì sao Chiến tranh lạnh ảnh hưởng đến nhiều khu vực trên thế giới.",
      ],
    },
  },
  "chuong-4-viet-nam-1945-1991": {
    learn: {
      overview:
        "Đây là chương trọng tâm về quá trình giữ vững chính quyền, kháng chiến chống Pháp, chống Mĩ và xây dựng đất nước của Việt Nam.",
      keyIdeas: [
        "Nắm được tình thế hiểm nghèo của nước Việt Nam Dân chủ Cộng hòa sau 1945.",
        "Ghi nhớ ý nghĩa của chiến thắng Điện Biên Phủ và Hiệp định Giơ-ne-vơ.",
        "Hiểu tiến trình đấu tranh chống Mĩ đi tới đại thắng mùa Xuân 1975.",
        "Biết được ý nghĩa thống nhất đất nước và bối cảnh trước Đổi mới.",
      ],
    },
    review: {
      checklist: [
        "Em có thể nối các mốc 1954, 1973, 1975, 1976, 1986 với đúng sự kiện chưa?",
        "Em đã phân biệt được ý nghĩa của Hiệp định Giơ-ne-vơ và Hiệp định Pa-ri chưa?",
        "Em có thể trình bày ngắn gọn nguyên nhân thắng lợi của cuộc kháng chiến chống Mĩ không?",
      ],
      quickPrompts: [
        "Viết lại tiến trình 1945-1975 bằng 5 sự kiện lớn nhất.",
        "Nếu phải ôn nhanh, em sẽ nhớ chương này theo các mốc nào?",
      ],
    },
  },
  "chuong-5-the-gioi-tu-1991-den-nay": {
    learn: {
      overview:
        "Học sinh cần hiểu trật tự thế giới sau Chiến tranh lạnh, xu thế hòa bình - hợp tác và tác động của toàn cầu hóa trong giai đoạn mới.",
      keyIdeas: [
        "Nắm được xu thế chung của thế giới sau năm 1991.",
        "Hiểu khái niệm toàn cầu hóa và tác động hai mặt của nó.",
        "Biết vai trò của Liên hợp quốc và các trung tâm lớn trong quan hệ quốc tế.",
      ],
    },
    review: {
      checklist: [
        "Em đã nhớ được 2 mặt tích cực và 2 mặt thách thức của toàn cầu hóa chưa?",
        "Em có thể giải thích vì sao thế giới có xu hướng đa cực không?",
      ],
      quickPrompts: [
        "Liệt kê 4 ý chính để trả lời câu hỏi: thế giới sau 1991 có đặc điểm gì?",
        "Tự đặt một câu hỏi trắc nghiệm về toàn cầu hóa rồi thử trả lời.",
      ],
    },
  },
  "chuong-6-viet-nam-tu-1991-den-nay": {
    learn: {
      overview:
        "Chương này giúp học sinh liên hệ lịch sử với hiện tại thông qua công cuộc Đổi mới, hội nhập quốc tế và định hướng phát triển của Việt Nam.",
      keyIdeas: [
        "Nắm được những thành tựu nổi bật của công cuộc Đổi mới.",
        "Ghi nhớ các dấu mốc hội nhập như gia nhập ASEAN và WTO.",
        "Hiểu yêu cầu phát triển bền vững, khoa học - công nghệ và hội nhập hiện nay.",
      ],
    },
    review: {
      checklist: [
        "Em có thể nêu 3 thành tựu tiêu biểu của Việt Nam thời kì Đổi mới không?",
        "Em đã nhớ được năm Việt Nam gia nhập ASEAN và WTO chưa?",
        "Em có phân biệt được hội nhập quốc tế với phụ thuộc bên ngoài không?",
      ],
      quickPrompts: [
        "Tóm tắt chương này như một bản tin ngắn về Việt Nam thời kì mới.",
        "Viết 3 dòng về vai trò của khoa học - công nghệ trong phát triển đất nước.",
      ],
    },
  },
  "chuong-7-cach-mang-khoa-hoc-ki-thuat-va-toan-cau-hoa": {
    learn: {
      overview:
        "Học sinh cần hiểu thành tựu, tác động và yêu cầu thích ứng trước cuộc cách mạng khoa học - kĩ thuật hiện đại và xu thế toàn cầu hóa.",
      keyIdeas: [
        "Biết thời điểm bùng nổ và các lĩnh vực tiêu biểu của cách mạng khoa học - kĩ thuật hiện đại.",
        "Phân tích được cả mặt tích cực lẫn tiêu cực của tiến bộ khoa học - công nghệ.",
        "Hiểu mối liên hệ giữa công nghệ hiện đại và toàn cầu hóa.",
      ],
    },
    review: {
      checklist: [
        "Em có thể nêu ít nhất 3 thành tựu tiêu biểu của khoa học - kĩ thuật hiện đại không?",
        "Em đã phân biệt được thời cơ và thách thức mà công nghệ mang lại chưa?",
      ],
      quickPrompts: [
        "Tự liên hệ một ví dụ trong đời sống cho thấy công nghệ thay đổi cách học của em.",
        "Nếu ra đề tự luận, em sẽ giải thích tác động hai mặt của khoa học - kĩ thuật như thế nào?",
      ],
    },
  },
};

export function getHistoryChapterById(chapterId: string) {
  return grade9HistoryChapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function getHistoryChapterModeContent(chapterId: string) {
  return historyChapterModeContent[chapterId] ?? null;
}
