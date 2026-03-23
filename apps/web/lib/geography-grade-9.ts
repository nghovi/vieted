export type GeographyQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export type GeographyQuestionSet = {
  id: string;
  title: string;
  questions: GeographyQuestion[];
};

export type GeographyChapter = {
  id: string;
  title: string;
  summary: string;
  textbookScope: string;
  questionSets: GeographyQuestionSet[];
};

export type GeographyChapterModeContent = {
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
): GeographyQuestion {
  return { id, prompt, options, correctOption, explanation };
}

function set(
  id: string,
  title: string,
  questions: GeographyQuestion[],
): GeographyQuestionSet {
  return { id, title, questions };
}

export const grade9GeographyChapters: GeographyChapter[] = [
  {
    id: "chuong-1-dia-li-dan-cu-viet-nam",
    title: "Chương 1. Địa lí dân cư Việt Nam",
    summary:
      "Khái quát quy mô dân số, gia tăng dân số, cơ cấu dân số, phân bố dân cư và đặc điểm đô thị hóa ở Việt Nam.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("g1-set-1", "Bộ câu hỏi 1", [
        q("g1s1q1", "Việt Nam thuộc nhóm nước có quy mô dân số như thế nào ở Đông Nam Á?", ["Rất nhỏ", "Khá đông", "Ổn định thấp", "Giảm liên tục"], 1, "Việt Nam có quy mô dân số khá đông trong khu vực Đông Nam Á."),
        q("g1s1q2", "Tỉ lệ gia tăng dân số tự nhiên của Việt Nam có xu hướng như thế nào trong những thập kỉ gần đây?", ["Tăng rất nhanh", "Giảm dần", "Không thay đổi", "Luôn âm"], 1, "Nhờ chính sách dân số và chuyển biến kinh tế - xã hội, tỉ lệ gia tăng dân số tự nhiên có xu hướng giảm."),
        q("g1s1q3", "Cơ cấu dân số theo độ tuổi của Việt Nam hiện nay có đặc điểm nổi bật là", ["Dân số già hoàn toàn", "Tỉ lệ trẻ em rất thấp", "Đang trong thời kì dân số vàng", "Thiếu hoàn toàn lao động"], 2, "Việt Nam đang trong thời kì dân số vàng với lực lượng lao động dồi dào."),
        q("g1s1q4", "Khu vực nào ở Việt Nam tập trung dân cư đông nhất?", ["Trung du và miền núi Bắc Bộ", "Đồng bằng", "Tây Nguyên", "Biển đảo xa bờ"], 1, "Dân cư Việt Nam tập trung đông ở các vùng đồng bằng, đặc biệt là đồng bằng sông Hồng và đồng bằng sông Cửu Long."),
        q("g1s1q5", "Nguyên nhân quan trọng làm dân cư phân bố không đều ở Việt Nam là", ["Mọi nơi đều có điều kiện sống giống nhau", "Điều kiện tự nhiên và kinh tế - xã hội khác nhau", "Toàn bộ dân cư thích sống ở miền núi", "Giao thông phát triển đồng đều"], 1, "Điều kiện tự nhiên, lịch sử khai thác lãnh thổ và cơ hội việc làm khác nhau làm dân cư phân bố không đều."),
        q("g1s1q6", "Đô thị hóa ở Việt Nam thể hiện rõ qua dấu hiệu nào?", ["Tỉ lệ dân nông thôn tăng liên tục", "Số lượng và quy mô đô thị tăng", "Mọi vùng đều trở thành thành phố", "Không có dịch chuyển dân cư"], 1, "Đô thị hóa thể hiện ở sự tăng lên về số lượng, quy mô đô thị và tỉ lệ dân thành thị."),
        q("g1s1q7", "Vấn đề nào thường xuất hiện ở các đô thị lớn do đô thị hóa nhanh?", ["Thiếu việc làm, ùn tắc, ô nhiễm", "Đất nông nghiệp tăng mạnh", "Mật độ dân cư giảm sâu", "Không cần hạ tầng xã hội"], 0, "Đô thị hóa nhanh có thể gây sức ép về việc làm, nhà ở, giao thông và môi trường."),
        q("g1s1q8", "Nhóm dân tộc chiếm tỉ lệ lớn nhất trong cơ cấu dân tộc Việt Nam là", ["Tày", "Thái", "Kinh", "Mường"], 2, "Dân tộc Kinh chiếm tỉ lệ lớn nhất trong dân số Việt Nam."),
        q("g1s1q9", "Ý nghĩa lớn của dân số vàng đối với phát triển kinh tế là", ["Làm giảm lực lượng lao động", "Tăng gánh nặng phụ thuộc", "Tạo cơ hội đẩy mạnh tăng trưởng", "Làm mất cân bằng giới tính ngay lập tức"], 2, "Thời kì dân số vàng tạo nguồn lao động lớn, thuận lợi cho phát triển kinh tế nếu được khai thác tốt."),
        q("g1s1q10", "Biện pháp phù hợp để nâng cao chất lượng dân số là", ["Giảm hoàn toàn giáo dục phổ thông", "Đầu tư giáo dục, y tế và việc làm", "Chỉ tập trung vào tăng dân số", "Hạn chế đào tạo nghề"], 1, "Giáo dục, y tế, dinh dưỡng và đào tạo nghề là những yếu tố quan trọng để nâng cao chất lượng dân số."),
      ]),
      set("g1-set-2", "Bộ câu hỏi 2", [
        q("g1s2q1", "Mật độ dân số cao nhất thường thuộc về khu vực nào?", ["Đồng bằng sông Hồng", "Tây Nguyên", "Trường Sa", "Vùng núi cao"], 0, "Đồng bằng sông Hồng là vùng có mật độ dân số rất cao."),
        q("g1s2q2", "Một trong những nguyên nhân thúc đẩy di dân từ nông thôn ra thành thị là", ["Nhu cầu tìm việc làm", "Muốn giảm mức sống", "Đất sản xuất tăng mạnh", "Không có tác động từ công nghiệp hóa"], 0, "Công nghiệp hóa và dịch vụ phát triển ở đô thị thu hút người lao động từ nông thôn."),
        q("g1s2q3", "Thành phần dân cư nào tăng lên cùng với quá trình đô thị hóa?", ["Dân thành thị", "Dân du mục", "Dân làm nương rẫy", "Dân ở đảo xa"], 0, "Khi đô thị hóa diễn ra, tỉ lệ dân thành thị tăng lên."),
        q("g1s2q4", "Một đặc điểm tích cực của đô thị hóa là", ["Thúc đẩy chuyển dịch cơ cấu kinh tế", "Làm giao thông kém phát triển", "Giảm tiếp cận dịch vụ", "Làm sản xuất công nghiệp biến mất"], 0, "Đô thị hóa thường gắn với phát triển công nghiệp, dịch vụ và chuyển dịch cơ cấu kinh tế."),
        q("g1s2q5", "Tình trạng mất cân bằng giới tính khi sinh cần được hiểu là", ["Tỉ lệ nam nữ hoàn toàn bằng nhau", "Tỉ lệ trẻ em trai sinh ra cao hơn mức tự nhiên", "Chỉ xuất hiện ở thành thị", "Không ảnh hưởng đến xã hội"], 1, "Mất cân bằng giới tính khi sinh là khi tỉ lệ trẻ em trai cao hơn mức cân bằng sinh học thông thường."),
        q("g1s2q6", "Phân bố dân cư thưa thớt thường gặp ở vùng nào?", ["Đông Nam Bộ", "Đồng bằng sông Hồng", "Tây Nguyên", "Các đô thị lớn"], 2, "Tây Nguyên là một trong các vùng có mật độ dân số tương đối thấp."),
        q("g1s2q7", "Lao động nước ta hiện nay chuyển dịch theo hướng", ["Giảm ở công nghiệp và dịch vụ", "Tăng trong nông nghiệp truyền thống", "Tăng ở công nghiệp và dịch vụ", "Không thay đổi giữa các khu vực"], 2, "Cơ cấu lao động đang chuyển dịch theo hướng giảm tỉ trọng nông nghiệp, tăng công nghiệp và dịch vụ."),
        q("g1s2q8", "Nhân tố nào giúp phân bố lại dân cư hợp lí hơn?", ["Chỉ tập trung phát triển đô thị lớn", "Phát triển hạ tầng và việc làm ở vùng khó khăn", "Ngăn hoàn toàn sự di cư", "Bỏ đầu tư giao thông"], 1, "Hạ tầng, việc làm và dịch vụ xã hội góp phần phân bố lại dân cư hợp lí hơn."),
        q("g1s2q9", "Dân cư nước ta có đặc điểm", ["Hoàn toàn sống ở nông thôn", "Phân bố đều ở mọi nơi", "Phân bố không đều", "Chỉ tập trung ở biên giới"], 2, "Dân cư Việt Nam phân bố không đều giữa đồng bằng và miền núi, giữa thành thị và nông thôn."),
        q("g1s2q10", "Một biểu hiện của chất lượng cuộc sống được cải thiện là", ["Tuổi thọ trung bình tăng", "Tỉ lệ biết chữ giảm", "Dịch vụ y tế kém hơn", "Tỉ lệ nghèo tăng mạnh"], 0, "Tuổi thọ tăng là một chỉ báo quan trọng về cải thiện chất lượng cuộc sống."),
      ]),
      set("g1-set-3", "Bộ câu hỏi 3", [
        q("g1s3q1", "Dân số nước ta đông tạo thuận lợi gì?", ["Nguồn lao động dồi dào", "Không cần giáo dục", "Không cần mở rộng thị trường", "Giảm hoàn toàn sức ép xã hội"], 0, "Dân số đông là nguồn lao động và thị trường tiêu thụ lớn."),
        q("g1s3q2", "Sức ép lớn nhất do dân số đông và tăng nhanh trong quá khứ là", ["Thuận lợi cho việc làm", "Nhu cầu về việc làm, giáo dục, y tế", "Giảm nhu cầu nhà ở", "Giảm sử dụng tài nguyên"], 1, "Dân số đông từng tạo áp lực lớn lên việc làm và các dịch vụ xã hội."),
        q("g1s3q3", "Vùng có điều kiện tự nhiên thuận lợi thường có dân cư", ["Thưa thớt", "Đông đúc hơn", "Không có người ở", "Chỉ có dân di cư"], 1, "Điều kiện tự nhiên thuận lợi cho sản xuất và sinh hoạt thường thu hút dân cư tập trung."),
        q("g1s3q4", "Đô thị hóa gắn chặt với quá trình nào?", ["Công nghiệp hóa và hiện đại hóa", "Thu hẹp dịch vụ", "Giảm kết nối giao thông", "Giảm trao đổi hàng hóa"], 0, "Đô thị hóa thường đi cùng công nghiệp hóa và hiện đại hóa."),
        q("g1s3q5", "Dân số vàng sẽ chỉ trở thành lợi thế khi", ["Lao động được đào tạo tốt", "Không cần việc làm", "Mọi người đều di cư", "Ngừng phát triển công nghiệp"], 0, "Lực lượng lao động phải có kỹ năng và việc làm phù hợp thì dân số vàng mới thành lợi thế."),
        q("g1s3q6", "Một mục tiêu của chính sách dân số là", ["Nâng cao chất lượng dân số", "Tăng dân số bằng mọi giá", "Chỉ khuyến khích sinh nhiều con", "Bỏ chăm sóc sức khỏe"], 0, "Chính sách dân số hướng tới quy mô hợp lí, cơ cấu phù hợp và chất lượng dân số tốt hơn."),
        q("g1s3q7", "Đặc điểm đô thị hóa ở Việt Nam là", ["Diễn ra rất sớm từ thời cổ đại", "Gắn với đổi mới và phát triển kinh tế", "Không liên quan đến công nghiệp", "Làm giảm vai trò của thành phố"], 1, "Đô thị hóa ở Việt Nam diễn ra mạnh hơn cùng với công cuộc đổi mới."),
        q("g1s3q8", "Nguồn lao động dồi dào là lợi thế để phát triển", ["Nhiều ngành kinh tế", "Chỉ nông nghiệp tự cấp", "Chỉ khai thác thủ công", "Không ngành nào"], 0, "Nguồn lao động dồi dào là lợi thế cho nhiều ngành sản xuất và dịch vụ."),
        q("g1s3q9", "Phân bố dân cư không đều có thể gây khó khăn gì?", ["Khai thác lãnh thổ cân đối hoàn toàn", "Quá tải ở nơi đông và thiếu lao động ở nơi thưa", "Giảm áp lực hạ tầng ở đô thị lớn", "Phát triển đồng đều mọi nơi"], 1, "Nơi đông dân có thể quá tải trong khi nơi thưa dân khó phát triển đồng bộ."),
        q("g1s3q10", "Giải pháp lâu dài để giảm sức ép đô thị hóa là", ["Phát triển đồng đều các vùng", "Chỉ xây thêm nhà cao tầng", "Ngừng đầu tư giao thông", "Cấm di chuyển dân cư"], 0, "Phát triển các vùng và hệ thống đô thị hợp lí sẽ góp phần giảm sức ép cho đô thị lớn."),
      ]),
    ],
  },
  {
    id: "chuong-2-dia-li-cac-nganh-kinh-te",
    title: "Chương 2. Địa lí các ngành kinh tế",
    summary:
      "Tìm hiểu sự phát triển và phân bố của nông nghiệp, công nghiệp, dịch vụ và các nhân tố tác động đến cơ cấu ngành kinh tế Việt Nam.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("g2-set-1", "Bộ câu hỏi 1", [
        q("g2s1q1", "Ngành sản xuất vật chất giữ vai trò quan trọng trong việc bảo đảm lương thực của nước ta là", ["Dịch vụ", "Nông nghiệp", "Du lịch", "Viễn thông"], 1, "Nông nghiệp đóng vai trò quan trọng trong bảo đảm lương thực, thực phẩm."),
        q("g2s1q2", "Cây công nghiệp lâu năm tập trung nhiều ở vùng nào?", ["Đồng bằng sông Hồng", "Tây Nguyên", "Duyên hải Nam Trung Bộ", "Ven biển Bắc Bộ"], 1, "Tây Nguyên là vùng trồng cây công nghiệp lâu năm lớn của nước ta."),
        q("g2s1q3", "Một trong các trung tâm công nghiệp lớn của nước ta là", ["Hà Nội", "Sa Pa", "Mộc Châu", "Đồng Văn"], 0, "Hà Nội là một trong những trung tâm công nghiệp lớn."),
        q("g2s1q4", "Ngành dịch vụ nào phát triển mạnh cùng với quá trình hội nhập và số hóa?", ["Thương mại điện tử và logistics", "Làm nương rẫy", "Săn bắt", "Du canh"], 0, "Hội nhập và công nghệ thúc đẩy thương mại điện tử và logistics phát triển."),
        q("g2s1q5", "Nhân tố nào có ảnh hưởng lớn đến sự phân bố công nghiệp?", ["Nguồn nguyên liệu, lao động, thị trường", "Chỉ khí hậu", "Chỉ độ cao địa hình", "Chỉ chế độ mưa"], 0, "Công nghiệp chịu tác động tổng hợp của nguyên liệu, lao động, năng lượng, thị trường và hạ tầng."),
        q("g2s1q6", "Sự chuyển dịch cơ cấu kinh tế nước ta hiện nay theo hướng", ["Giảm công nghiệp và dịch vụ", "Tăng tỉ trọng công nghiệp và dịch vụ", "Chỉ tăng nông nghiệp", "Không thay đổi"], 1, "Cơ cấu kinh tế đang chuyển dịch theo hướng tăng công nghiệp và dịch vụ."),
        q("g2s1q7", "Loại hình giao thông có vai trò lớn trong vận chuyển hàng hóa khối lượng lớn trên quãng đường xa là", ["Đường thủy và đường biển", "Đường mòn", "Đường làng", "Đường nội bộ"], 0, "Đường thủy và đặc biệt là đường biển có lợi thế về chi phí vận chuyển khối lượng lớn."),
        q("g2s1q8", "Ngành nào thuộc khu vực dịch vụ?", ["Trồng lúa", "Khai thác than", "Tài chính - ngân hàng", "Luyện kim"], 2, "Tài chính - ngân hàng là ngành thuộc khu vực dịch vụ."),
        q("g2s1q9", "Nông nghiệp nước ta phát triển theo hướng nào?", ["Thuần túy tự cấp tự túc", "Sản xuất hàng hóa gắn với thị trường", "Giảm hoàn toàn ứng dụng khoa học", "Không đổi mới giống cây trồng"], 1, "Nông nghiệp đang phát triển theo hướng sản xuất hàng hóa và ứng dụng khoa học - công nghệ."),
        q("g2s1q10", "Yếu tố nào hỗ trợ mạnh cho sự phát triển dịch vụ du lịch?", ["Tài nguyên du lịch và hạ tầng", "Chỉ có dân số đông", "Chỉ có khí hậu nóng", "Không cần giao thông"], 0, "Du lịch phát triển nhờ tài nguyên du lịch phong phú và hạ tầng dịch vụ phù hợp."),
      ]),
      set("g2-set-2", "Bộ câu hỏi 2", [
        q("g2s2q1", "Vật nuôi quan trọng trong nông nghiệp Việt Nam gồm", ["Trâu, bò, lợn, gia cầm", "Lạc đà, tuần lộc", "Cá voi, hải cẩu", "Chuột túi, kangaroo"], 0, "Chăn nuôi nước ta phát triển với các vật nuôi chủ yếu là trâu, bò, lợn và gia cầm."),
        q("g2s2q2", "Ngành công nghiệp năng lượng bao gồm", ["Khai thác than, dầu khí, sản xuất điện", "Trồng rừng", "Nuôi trồng thủy sản", "Du lịch nghỉ dưỡng"], 0, "Năng lượng gồm khai thác nhiên liệu và sản xuất điện."),
        q("g2s2q3", "Một trong những ngành công nghiệp trọng điểm của nước ta là", ["Dệt may", "Săn bắn", "Hái lượm", "Du mục"], 0, "Dệt may là ngành công nghiệp trọng điểm nhờ nhu cầu thị trường lớn và khả năng tạo việc làm."),
        q("g2s2q4", "Mạng lưới giao thông phát triển có ý nghĩa gì?", ["Tăng cường liên kết vùng", "Làm thu hẹp trao đổi hàng hóa", "Giảm kết nối thị trường", "Chỉ phục vụ đô thị lớn"], 0, "Giao thông phát triển giúp liên kết lãnh thổ và mở rộng thị trường."),
        q("g2s2q5", "Dịch vụ nào có vai trò kết nối sản xuất với tiêu dùng?", ["Thương mại", "Trồng trọt", "Chăn nuôi", "Khai khoáng"], 0, "Thương mại đảm nhiệm vai trò lưu thông hàng hóa giữa sản xuất và tiêu dùng."),
        q("g2s2q6", "Vùng biển có ý nghĩa lớn đối với ngành kinh tế nào?", ["Thủy sản và giao thông biển", "Chỉ trồng lúa", "Chỉ luyện kim", "Không ảnh hưởng đến kinh tế"], 0, "Biển quan trọng cho đánh bắt, nuôi trồng thủy sản, cảng biển và dịch vụ hàng hải."),
        q("g2s2q7", "Công nghiệp chế biến lương thực, thực phẩm gắn chặt với", ["Nguồn nguyên liệu nông nghiệp", "Độ cao địa hình", "Gió mùa đông bắc", "Khoáng sản kim loại quý"], 0, "Công nghiệp chế biến thực phẩm phụ thuộc lớn vào nguồn nguyên liệu nông nghiệp."),
        q("g2s2q8", "Một biểu hiện của hiện đại hóa nông nghiệp là", ["Ứng dụng công nghệ và cơ giới hóa", "Giảm dùng giống mới", "Bỏ thủy lợi", "Giảm liên kết sản xuất"], 0, "Ứng dụng cơ giới hóa và công nghệ giúp nâng cao năng suất, chất lượng nông nghiệp."),
        q("g2s2q9", "Ngành dịch vụ nào giữ vai trò quan trọng trong kỉ nguyên số?", ["Thông tin truyền thông", "Du canh", "Săn bắt", "Phá rừng"], 0, "Thông tin truyền thông là một ngành dịch vụ quan trọng trong nền kinh tế số."),
        q("g2s2q10", "Sự phát triển các ngành kinh tế chịu tác động của", ["Nhân tố tự nhiên và kinh tế - xã hội", "Chỉ thời tiết trong ngày", "Chỉ địa hình núi cao", "Chỉ thủy triều"], 0, "Các ngành kinh tế chịu tác động tổng hợp của cả tự nhiên và kinh tế - xã hội."),
      ]),
      set("g2-set-3", "Bộ câu hỏi 3", [
        q("g2s3q1", "Lúa gạo được trồng nhiều nhất ở các vùng đồng bằng vì", ["Địa hình thấp, đất phù sa, nguồn nước thuận lợi", "Khí hậu băng giá", "Thiếu lao động", "Không cần thủy lợi"], 0, "Đồng bằng có điều kiện thuận lợi về địa hình, đất và nước cho trồng lúa."),
        q("g2s3q2", "Cây cà phê ở nước ta phát triển mạnh nhất ở", ["Tây Nguyên", "Đồng bằng sông Hồng", "Đông Bắc", "Ven biển Bắc Trung Bộ"], 0, "Tây Nguyên có đất badan và khí hậu phù hợp cho cây cà phê."),
        q("g2s3q3", "Ngành công nghiệp nào gắn với quá trình đô thị hóa và xây dựng cơ sở hạ tầng?", ["Vật liệu xây dựng", "Săn bắt", "Đánh bắt thủ công", "Canh tác nương rẫy"], 0, "Vật liệu xây dựng là ngành quan trọng phục vụ phát triển hạ tầng và đô thị hóa."),
        q("g2s3q4", "Một lợi thế lớn của nước ta để phát triển dịch vụ du lịch là", ["Tài nguyên tự nhiên và văn hóa đa dạng", "Không có bờ biển", "Thiếu di sản", "Khí hậu đồng nhất quanh năm"], 0, "Việt Nam có tài nguyên du lịch tự nhiên và văn hóa phong phú."),
        q("g2s3q5", "Xu hướng chung của nền kinh tế nước ta hiện nay là", ["Tăng hội nhập và chuyên môn hóa", "Tách rời thị trường quốc tế", "Giảm ứng dụng công nghệ", "Thu hẹp dịch vụ"], 0, "Nền kinh tế ngày càng hội nhập sâu hơn và tăng cường chuyên môn hóa."),
        q("g2s3q6", "Ngành nào sau đây thuộc khu vực công nghiệp?", ["Chế biến thủy sản", "Tài chính", "Giáo dục", "Du lịch"], 0, "Chế biến thủy sản thuộc khu vực công nghiệp."),
        q("g2s3q7", "Một điều kiện để dịch vụ phát triển mạnh là", ["Thu nhập và nhu cầu xã hội tăng", "Giao thông kém phát triển", "Kinh tế đóng cửa", "Dân cư ít giao lưu"], 0, "Khi thu nhập và nhu cầu tăng, các loại hình dịch vụ có điều kiện phát triển mạnh hơn."),
        q("g2s3q8", "Vai trò quan trọng của công nghiệp là", ["Tạo ra khối lượng lớn sản phẩm và thúc đẩy hiện đại hóa", "Chỉ phục vụ tiêu dùng gia đình", "Không tạo việc làm", "Không liên quan đến xuất khẩu"], 0, "Công nghiệp tạo động lực cho tăng trưởng và hiện đại hóa nền kinh tế."),
        q("g2s3q9", "Sự phát triển của logistics giúp", ["Giảm chi phí và tăng hiệu quả lưu thông hàng hóa", "Làm chậm giao thương", "Giảm kết nối thị trường", "Tăng cô lập vùng"], 0, "Logistics tốt giúp lưu thông hàng hóa hiệu quả và giảm chi phí."),
        q("g2s3q10", "Để phát triển bền vững các ngành kinh tế cần", ["Kết hợp tăng trưởng với bảo vệ môi trường", "Khai thác tài nguyên bằng mọi giá", "Giảm đầu tư công nghệ", "Bỏ quy hoạch"], 0, "Phát triển bền vững đòi hỏi hài hòa tăng trưởng kinh tế và bảo vệ môi trường."),
      ]),
    ],
  },
  {
    id: "chuong-3-su-phan-hoa-lanh-tho",
    title: "Chương 3. Sự phân hóa lãnh thổ",
    summary:
      "Tìm hiểu đặc điểm phát triển kinh tế - xã hội theo vùng, các vùng kinh tế trọng điểm và sự khác biệt lãnh thổ ở Việt Nam.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("g3-set-1", "Bộ câu hỏi 1", [
        q("g3s1q1", "Sự phân hóa lãnh thổ của nước ta thể hiện ở", ["Mọi vùng hoàn toàn giống nhau", "Các vùng có đặc điểm tự nhiên và kinh tế khác nhau", "Chỉ khác nhau về diện tích", "Không có khác biệt về tài nguyên"], 1, "Mỗi vùng có điều kiện tự nhiên, dân cư và kinh tế khác nhau."),
        q("g3s1q2", "Vùng kinh tế trọng điểm có vai trò", ["Tạo động lực tăng trưởng cho cả nước", "Chỉ sản xuất tự cấp", "Không thu hút đầu tư", "Không liên kết với vùng khác"], 0, "Các vùng kinh tế trọng điểm giữ vai trò đầu tàu tăng trưởng và lan tỏa phát triển."),
        q("g3s1q3", "Vùng Trung du và miền núi Bắc Bộ có thế mạnh nổi bật về", ["Khai khoáng và thủy điện", "Nuôi trồng lúa nước diện rộng nhất", "Du lịch biển đảo", "Khai thác dầu khí ngoài khơi"], 0, "Vùng có nhiều khoáng sản và tiềm năng thủy điện lớn."),
        q("g3s1q4", "Đồng bằng sông Hồng nổi bật với thế mạnh nào?", ["Nông nghiệp hàng hóa và công nghiệp, dịch vụ phát triển", "Chăn thả du mục", "Khai thác hải sản xa bờ là chủ yếu", "Rừng nguyên sinh lớn nhất"], 0, "Đồng bằng sông Hồng là vùng có dân cư đông, kinh tế tổng hợp phát triển."),
        q("g3s1q5", "Tây Nguyên có thế mạnh lớn về", ["Cây công nghiệp lâu năm", "Lúa nước quy mô lớn nhất", "Cảng biển quốc tế dày đặc", "Luyện kim màu"], 0, "Tây Nguyên nổi bật với cà phê, cao su, hồ tiêu và thủy điện."),
        q("g3s1q6", "Đông Nam Bộ là vùng", ["Công nghiệp và dịch vụ phát triển năng động", "Có mật độ dân cư thấp nhất nước", "Chủ yếu sống bằng du canh", "Ít thu hút đầu tư"], 0, "Đông Nam Bộ là vùng kinh tế năng động với công nghiệp và dịch vụ phát triển mạnh."),
        q("g3s1q7", "Đồng bằng sông Cửu Long có thế mạnh hàng đầu về", ["Sản xuất lương thực, thủy sản", "Khai khoáng kim loại", "Cây chè ôn đới", "Thủy điện bậc thang"], 0, "Đồng bằng sông Cửu Long là vùng trọng điểm lúa gạo và thủy sản."),
        q("g3s1q8", "Duyên hải Nam Trung Bộ có lợi thế lớn về", ["Kinh tế biển", "Khai thác than đá", "Rừng lá kim", "Nuôi tuần lộc"], 0, "Vùng có bờ biển dài, thuận lợi cho khai thác tổng hợp kinh tế biển."),
        q("g3s1q9", "Liên kết vùng có ý nghĩa gì?", ["Phát huy thế mạnh và hỗ trợ nhau phát triển", "Làm giảm giao lưu", "Tăng sự chia cắt", "Không tác động đến thị trường"], 0, "Liên kết vùng giúp sử dụng hiệu quả nguồn lực và phát huy lợi thế mỗi vùng."),
        q("g3s1q10", "Sự phân hóa lãnh thổ đòi hỏi", ["Khai thác phù hợp với điều kiện từng vùng", "Áp dụng một mô hình cho mọi nơi", "Bỏ quy hoạch lãnh thổ", "Không cần liên kết"], 0, "Mỗi vùng cần định hướng phát triển phù hợp với điều kiện riêng."),
      ]),
      set("g3-set-2", "Bộ câu hỏi 2", [
        q("g3s2q1", "Vùng nào có trung tâm công nghiệp lớn nhất cả nước?", ["Đông Nam Bộ", "Tây Bắc", "Bắc Trung Bộ", "Tây Nguyên"], 0, "Đông Nam Bộ, đặc biệt là TP. Hồ Chí Minh và vùng phụ cận, có quy mô công nghiệp rất lớn."),
        q("g3s2q2", "Một khó khăn lớn của Đồng bằng sông Cửu Long hiện nay là", ["Xâm nhập mặn và biến đổi khí hậu", "Thiếu đất phù sa hoàn toàn", "Không có sông ngòi", "Thiếu lao động tuyệt đối"], 0, "Biến đổi khí hậu và xâm nhập mặn ảnh hưởng mạnh đến vùng."),
        q("g3s2q3", "Miền núi và trung du thường thuận lợi cho", ["Phát triển thủy điện, lâm nghiệp, cây công nghiệp", "Xây dựng cảng biển lớn", "Trồng lúa nước diện rộng", "Nuôi trồng hải sản ven bờ"], 0, "Địa hình dốc và tài nguyên rừng, khoáng sản tạo lợi thế riêng cho vùng miền núi."),
        q("g3s2q4", "Vùng kinh tế trọng điểm phía Bắc có hạt nhân là", ["Hà Nội và vùng phụ cận", "Huế", "Buôn Ma Thuột", "Cà Mau"], 0, "Hà Nội giữ vai trò hạt nhân của vùng kinh tế trọng điểm phía Bắc."),
        q("g3s2q5", "Sự khác nhau giữa các vùng trước hết do", ["Điều kiện tự nhiên và lịch sử khai thác khác nhau", "Tất cả đều giống nhau", "Chỉ do tên gọi", "Chỉ do dân số"], 0, "Điều kiện tự nhiên và lịch sử phát triển tạo nên sự khác biệt vùng."),
        q("g3s2q6", "Bắc Trung Bộ và Duyên hải miền Trung có tiềm năng phát triển", ["Du lịch, kinh tế biển, năng lượng", "Chỉ trồng chè", "Chỉ luyện kim", "Không có tiềm năng dịch vụ"], 0, "Vùng có bờ biển dài, du lịch và nhiều tiềm năng kinh tế biển."),
        q("g3s2q7", "Một mục tiêu của phát triển vùng là", ["Thu hẹp chênh lệch giữa các vùng", "Tăng khoảng cách phát triển", "Chỉ tập trung vùng giàu", "Bỏ đầu tư vùng khó khăn"], 0, "Phát triển vùng hướng tới khai thác lợi thế và giảm chênh lệch phát triển."),
        q("g3s2q8", "Liên kết giữa vùng nguyên liệu và cơ sở chế biến giúp", ["Nâng cao hiệu quả sản xuất", "Tăng thất thoát", "Giảm giá trị sản phẩm", "Giảm sức cạnh tranh"], 0, "Liên kết sản xuất - chế biến giúp tăng giá trị và giảm chi phí."),
        q("g3s2q9", "Đô thị lớn thường đóng vai trò", ["Trung tâm kinh tế, dịch vụ, đầu mối giao thông", "Khu vực ít giao lưu", "Chỉ có chức năng hành chính", "Không ảnh hưởng vùng xung quanh"], 0, "Các đô thị lớn có vai trò trung tâm và lan tỏa phát triển cho vùng."),
        q("g3s2q10", "Sự phân hóa lãnh thổ có thể tạo ra", ["Cơ hội chuyên môn hóa sản xuất theo vùng", "Sự đồng nhất tuyệt đối", "Không cần trao đổi hàng hóa", "Giảm vai trò quy hoạch"], 0, "Phân hóa lãnh thổ tạo điều kiện cho chuyên môn hóa và trao đổi hàng hóa giữa các vùng."),
      ]),
      set("g3-set-3", "Bộ câu hỏi 3", [
        q("g3s3q1", "Thế mạnh nổi bật của vùng biển và ven biển là", ["Phát triển tổng hợp kinh tế biển", "Chỉ khai thác gỗ", "Chỉ nuôi trâu bò", "Không có du lịch"], 0, "Biển và ven biển thuận lợi cho thủy sản, giao thông, du lịch và năng lượng."),
        q("g3s3q2", "Yếu tố giúp tăng cường liên kết lãnh thổ là", ["Hạ tầng giao thông và số hóa", "Giảm kết nối", "Hạn chế giao thương", "Cắt giảm logistics"], 0, "Hạ tầng giao thông và số hóa giúp tăng liên kết giữa các vùng."),
        q("g3s3q3", "Vùng nào có vai trò quan trọng về trồng cây công nghiệp, thủy điện và du lịch cao nguyên?", ["Tây Nguyên", "Đồng bằng sông Hồng", "Ven biển Bắc Bộ", "Đảo Phú Quốc"], 0, "Tây Nguyên hội tụ các thế mạnh về cây công nghiệp, thủy điện và du lịch."),
        q("g3s3q4", "Một thách thức trong phát triển lãnh thổ là", ["Chênh lệch trình độ phát triển giữa các vùng", "Mọi vùng đều phát triển như nhau", "Không có sức ép tài nguyên", "Không có rủi ro thiên tai"], 0, "Các vùng phát triển không đồng đều và chịu tác động thiên tai khác nhau."),
        q("g3s3q5", "Quy hoạch vùng có tác dụng", ["Định hướng khai thác hợp lí nguồn lực", "Làm phát triển tự phát hơn", "Giảm phối hợp lãnh thổ", "Không cần thiết trong quản lí"], 0, "Quy hoạch vùng giúp định hướng sử dụng nguồn lực hiệu quả."),
        q("g3s3q6", "Vai trò của vùng kinh tế trọng điểm là", ["Tạo sức lan tỏa phát triển", "Chỉ phục vụ nội bộ vùng", "Không kết nối quốc tế", "Giảm đầu tư"], 0, "Các vùng trọng điểm tạo động lực và lan tỏa cho các vùng khác."),
        q("g3s3q7", "Để phát huy thế mạnh vùng cần", ["Kết hợp nội lực với liên kết vùng", "Phát triển tách biệt", "Bỏ qua hạ tầng", "Không đào tạo lao động"], 0, "Phát huy thế mạnh vùng cần cả đầu tư nội tại và tăng liên kết với các vùng khác."),
        q("g3s3q8", "Đông Nam Bộ phát triển mạnh nhờ", ["Vị trí thuận lợi, hạ tầng, thị trường, lao động", "Thiếu đô thị", "Ít đầu tư", "Không có công nghiệp"], 0, "Vùng có vị trí tốt, hạ tầng khá hoàn thiện và sức hút đầu tư cao."),
        q("g3s3q9", "Đồng bằng sông Hồng là vùng", ["Có truyền thống thâm canh và mạng lưới đô thị dày", "Dân cư rất thưa", "Ít liên kết giao thông", "Không phát triển dịch vụ"], 0, "Đồng bằng sông Hồng có dân cư đông, thâm canh cao và đô thị phát triển."),
        q("g3s3q10", "Ý nghĩa của phát triển lãnh thổ cân bằng là", ["Nâng cao hiệu quả quốc gia và giảm chênh lệch vùng", "Tăng tập trung quá mức vào một nơi", "Làm giảm liên kết", "Bỏ qua vùng khó khăn"], 0, "Phát triển lãnh thổ cân bằng giúp sử dụng hiệu quả nguồn lực trên phạm vi cả nước."),
      ]),
    ],
  },
  {
    id: "chuong-4-bien-dao-va-phat-trien-ben-vung",
    title: "Chương 4. Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo",
    summary:
      "Khái quát vai trò của biển đảo Việt Nam, phát triển tổng hợp kinh tế biển và yêu cầu bảo vệ tài nguyên, môi trường hướng tới phát triển bền vững.",
    textbookScope: "Lịch sử và Địa lí 9 - Kết nối tri thức với cuộc sống",
    questionSets: [
      set("g4-set-1", "Bộ câu hỏi 1", [
        q("g4s1q1", "Biển Đông có ý nghĩa lớn đối với Việt Nam trước hết vì", ["Mở rộng không gian phát triển và giao lưu", "Làm giảm hoàn toàn thiên tai", "Chỉ có giá trị cảnh quan", "Không liên quan an ninh"], 0, "Biển Đông mở rộng không gian sinh tồn, phát triển kinh tế và giao lưu quốc tế."),
        q("g4s1q2", "Một ngành kinh tế biển quan trọng của nước ta là", ["Khai thác, nuôi trồng thủy sản", "Trồng lúa trên cát", "Làm nương rẫy", "Du mục"], 0, "Thủy sản là một ngành kinh tế biển quan trọng của Việt Nam."),
        q("g4s1q3", "Phát triển tổng hợp kinh tế biển nghĩa là", ["Kết hợp nhiều ngành kinh tế biển một cách hợp lí", "Chỉ khai thác một ngành duy nhất", "Khai thác biển không cần bảo vệ", "Bỏ qua dịch vụ cảng biển"], 0, "Phát triển tổng hợp là kết hợp thủy sản, giao thông, du lịch, dầu khí, năng lượng..."),
        q("g4s1q4", "Tài nguyên biển đảo cần được khai thác theo hướng", ["Hợp lí và bền vững", "Tận thu bằng mọi giá", "Không cần quy hoạch", "Chỉ phục vụ ngắn hạn"], 0, "Khai thác biển đảo phải gắn với bảo vệ tài nguyên và môi trường."),
        q("g4s1q5", "Một vấn đề môi trường biển hiện nay là", ["Ô nhiễm rác thải nhựa", "Tăng mạnh rừng ngập mặn ở mọi nơi", "Biển hoàn toàn không bị tác động", "Nguồn lợi thủy sản luôn tăng"], 0, "Ô nhiễm rác thải nhựa là một vấn đề nổi bật của môi trường biển."),
        q("g4s1q6", "Du lịch biển đảo phát triển cần gắn với", ["Bảo vệ cảnh quan và hệ sinh thái", "Phá rừng ngập mặn", "Xả thải tự do", "Xây dựng tràn lan"], 0, "Du lịch bền vững phải gắn với bảo vệ tài nguyên và môi trường."),
        q("g4s1q7", "Hệ sinh thái nào có vai trò bảo vệ bờ biển và đa dạng sinh học?", ["Rừng ngập mặn", "Thảo nguyên ôn đới", "Sa mạc cát", "Rừng lá kim"], 0, "Rừng ngập mặn giúp chắn sóng, bảo vệ bờ và là nơi cư trú của nhiều loài."),
        q("g4s1q8", "Cảng biển có vai trò", ["Thúc đẩy giao thương trong nước và quốc tế", "Làm giảm giao lưu hàng hóa", "Chỉ phục vụ du lịch nội địa", "Không liên quan logistics"], 0, "Cảng biển là đầu mối quan trọng của vận tải và logistics."),
        q("g4s1q9", "Phát triển kinh tế biển cần chú ý đến yếu tố nào?", ["Chủ quyền và an ninh biển đảo", "Chỉ lợi nhuận trước mắt", "Bỏ qua môi trường", "Không cần phối hợp vùng"], 0, "Kinh tế biển gắn liền với bảo vệ chủ quyền và phát triển bền vững."),
        q("g4s1q10", "Một giải pháp bảo vệ nguồn lợi thủy sản là", ["Khai thác theo mùa vụ và quy định", "Đánh bắt hủy diệt", "Khai thác cá con tràn lan", "Xả chất độc xuống biển"], 0, "Khai thác hợp lí theo quy định giúp bảo vệ nguồn lợi thủy sản lâu dài."),
      ]),
      set("g4-set-2", "Bộ câu hỏi 2", [
        q("g4s2q1", "Ngành nào có thể gắn với tài nguyên dầu khí ngoài khơi?", ["Khai thác năng lượng", "Trồng lúa", "Chăn nuôi đại gia súc", "Lâm nghiệp"], 0, "Dầu khí là nguồn tài nguyên quan trọng cho ngành năng lượng."),
        q("g4s2q2", "Một biểu hiện của phát triển bền vững biển đảo là", ["Khai thác đi đôi với bảo vệ hệ sinh thái", "Tăng khai thác bất chấp tác động", "Giảm hoàn toàn quản lí", "Bỏ kiểm soát chất thải"], 0, "Phát triển bền vững yêu cầu cân bằng giữa kinh tế và môi trường."),
        q("g4s2q3", "Biến đổi khí hậu có thể làm tăng", ["Nước biển dâng, xói lở bờ biển", "Diện tích đất liền tăng ở mọi nơi", "Nguồn lợi biển tăng vô hạn", "Môi trường biển tự sạch"], 0, "Biến đổi khí hậu gây nước biển dâng và gia tăng xói lở, thiên tai ven biển."),
        q("g4s2q4", "Tài nguyên du lịch biển đảo gồm", ["Bãi biển, vịnh, đảo, hệ sinh thái biển", "Chỉ đồng bằng phù sa", "Chỉ đồi núi cao", "Chỉ rừng lá kim"], 0, "Biển đảo có nhiều tài nguyên cảnh quan và sinh thái phục vụ du lịch."),
        q("g4s2q5", "Vì sao cần bảo vệ môi trường biển?", ["Để giữ nguồn lợi và sinh kế lâu dài", "Vì biển không liên quan đời sống", "Để giảm hoàn toàn giao thương", "Vì biển chỉ có giá trị ngắn hạn"], 0, "Môi trường biển gắn với nguồn lợi, sức khỏe cộng đồng và phát triển bền vững."),
        q("g4s2q6", "Một hoạt động thể hiện khai thác biển bền vững là", ["Nuôi trồng thủy sản có kiểm soát môi trường", "Xả thải trực tiếp xuống biển", "Phá san hô để khai thác", "Đánh bắt bằng chất nổ"], 0, "Nuôi trồng thủy sản cần đi kèm quản lí môi trường và quy hoạch phù hợp."),
        q("g4s2q7", "Biển đảo Việt Nam có vai trò với giao thông vì", ["Nằm gần các tuyến hàng hải quốc tế", "Hoàn toàn tách biệt với khu vực", "Không có cảng biển", "Không có nhu cầu vận tải"], 0, "Vị trí biển Việt Nam thuận lợi cho giao thông và giao lưu quốc tế."),
        q("g4s2q8", "Bảo vệ biển đảo không bao gồm hành động nào sau đây?", ["Khai thác tận diệt nguồn lợi", "Thu gom rác thải ven biển", "Bảo vệ rừng ngập mặn", "Tuân thủ quy định khai thác"], 0, "Khai thác tận diệt là hành động đi ngược bảo vệ tài nguyên môi trường biển."),
        q("g4s2q9", "Một mục tiêu của quy hoạch không gian biển là", ["Sử dụng hợp lí tài nguyên biển", "Tăng xung đột giữa các ngành", "Khai thác tự phát", "Loại bỏ hoàn toàn dịch vụ biển"], 0, "Quy hoạch không gian biển giúp phân bổ và sử dụng hợp lí tài nguyên."),
        q("g4s2q10", "Kinh tế biển phát triển mạnh có thể góp phần", ["Tăng trưởng kinh tế và củng cố chủ quyền", "Làm mất vai trò của biển đảo", "Giảm kết nối quốc tế", "Xóa bỏ nhu cầu logistics"], 0, "Kinh tế biển vừa thúc đẩy tăng trưởng vừa gắn với chủ quyền và an ninh quốc gia."),
      ]),
      set("g4-set-3", "Bộ câu hỏi 3", [
        q("g4s3q1", "Rác thải nhựa trên biển gây hại vì", ["Ảnh hưởng sinh vật và hệ sinh thái", "Làm biển sạch hơn", "Tăng nguồn lợi thủy sản", "Không tác động đến con người"], 0, "Rác thải nhựa làm suy giảm chất lượng môi trường và đe dọa sinh vật biển."),
        q("g4s3q2", "Một hướng phát triển năng lượng biển là", ["Điện gió ngoài khơi", "Chỉ nhiệt điện than", "Chỉ thủy điện hồ chứa", "Không có tiềm năng"], 0, "Điện gió ngoài khơi là hướng phát triển năng lượng biển đầy tiềm năng."),
        q("g4s3q3", "Kinh tế biển tổng hợp đòi hỏi", ["Phối hợp giữa các ngành và địa phương", "Phát triển riêng lẻ từng ngành", "Không cần quy hoạch", "Bỏ qua bảo tồn"], 0, "Phát triển tổng hợp cần liên kết không gian và quản lí đồng bộ."),
        q("g4s3q4", "Nguồn lợi hải sản có thể suy giảm khi", ["Đánh bắt quá mức", "Khai thác đúng mùa vụ", "Bảo vệ bãi giống", "Thiết lập khu bảo tồn"], 0, "Đánh bắt quá mức làm suy giảm nguồn lợi hải sản."),
        q("g4s3q5", "Bảo vệ rừng ngập mặn giúp", ["Giảm xói lở và bảo vệ đa dạng sinh học", "Tăng ô nhiễm nước", "Giảm hoàn toàn du lịch", "Mất nơi cư trú của sinh vật"], 0, "Rừng ngập mặn có vai trò phòng hộ và bảo tồn hệ sinh thái."),
        q("g4s3q6", "Khai thác bền vững tài nguyên biển là", ["Khai thác trong giới hạn cho phép và có phục hồi", "Khai thác đến cạn kiệt", "Không cần đánh giá tác động", "Bỏ quản lí nghề cá"], 0, "Khai thác bền vững yêu cầu tuân thủ giới hạn và phục hồi nguồn lợi."),
        q("g4s3q7", "Hợp tác trong quản lí biển đảo giúp", ["Tăng hiệu quả khai thác và bảo vệ", "Làm giảm phối hợp", "Tăng xung đột sử dụng tài nguyên", "Bỏ qua dữ liệu khoa học"], 0, "Hợp tác liên ngành và liên vùng giúp quản lí hiệu quả hơn."),
        q("g4s3q8", "Vai trò của khu bảo tồn biển là", ["Bảo vệ hệ sinh thái và nguồn lợi", "Tăng khai thác hủy diệt", "Loại bỏ hoàn toàn sinh kế", "Chỉ phục vụ xây dựng cảng"], 0, "Khu bảo tồn biển góp phần phục hồi và bảo vệ hệ sinh thái."),
        q("g4s3q9", "Khi phát triển du lịch biển cần tránh", ["Xây dựng phá vỡ cảnh quan và xả thải bừa bãi", "Bảo vệ bãi biển", "Quy hoạch hạ tầng phù hợp", "Tuyên truyền bảo vệ môi trường"], 0, "Phát triển thiếu kiểm soát có thể làm suy giảm tài nguyên du lịch biển."),
        q("g4s3q10", "Mục tiêu cuối cùng của phát triển biển đảo là", ["Hiệu quả kinh tế gắn với bền vững lâu dài", "Lợi nhuận ngắn hạn bằng mọi giá", "Khai thác không kiểm soát", "Giảm vai trò của cộng đồng ven biển"], 0, "Phát triển biển đảo cần hướng tới hiệu quả lâu dài, an toàn và bền vững."),
      ]),
    ],
  },
];

const geographyChapterModeContent: Record<string, GeographyChapterModeContent> = {
  "chuong-1-dia-li-dan-cu-viet-nam": {
    learn: {
      overview:
        "Chương này giúp học sinh nắm được các đặc điểm dân số, cơ cấu dân số, phân bố dân cư và đô thị hóa của Việt Nam, từ đó hiểu rõ mối liên hệ giữa dân cư với phát triển kinh tế - xã hội.",
      keyIdeas: [
        "Nắm quy mô dân số và xu hướng gia tăng dân số của Việt Nam.",
        "Hiểu cơ cấu dân số theo tuổi, giới tính và ý nghĩa của thời kì dân số vàng.",
        "Giải thích được vì sao dân cư nước ta phân bố không đều.",
        "Nhận biết đặc điểm và tác động của đô thị hóa ở Việt Nam.",
      ],
    },
    review: {
      checklist: [
        "Em đã phân biệt được quy mô dân số với chất lượng dân số.",
        "Em đã nêu được nguyên nhân phân bố dân cư không đều.",
        "Em đã hiểu mặt tích cực và sức ép của đô thị hóa.",
      ],
      quickPrompts: [
        "Vì sao đồng bằng thường tập trung dân cư đông hơn miền núi?",
        "Thời kì dân số vàng mang lại cơ hội gì cho Việt Nam?",
      ],
    },
  },
  "chuong-2-dia-li-cac-nganh-kinh-te": {
    learn: {
      overview:
        "Chương này khái quát sự phát triển của nông nghiệp, công nghiệp và dịch vụ; đồng thời chỉ ra các nhân tố ảnh hưởng đến cơ cấu ngành kinh tế và sự chuyển dịch của nền kinh tế Việt Nam.",
      keyIdeas: [
        "Nhận biết thế mạnh của nông nghiệp, công nghiệp và dịch vụ ở nước ta.",
        "Hiểu vai trò của từng khu vực kinh tế trong phát triển đất nước.",
        "Giải thích được các nhân tố ảnh hưởng đến phân bố ngành kinh tế.",
        "Nắm xu hướng chuyển dịch cơ cấu kinh tế theo hướng công nghiệp hóa, hiện đại hóa.",
      ],
    },
    review: {
      checklist: [
        "Em đã phân biệt được khu vực nông nghiệp, công nghiệp và dịch vụ.",
        "Em đã chỉ ra được ví dụ về một trung tâm công nghiệp và một vùng nông nghiệp lớn.",
        "Em đã hiểu vì sao giao thông và thị trường quan trọng đối với kinh tế.",
      ],
      quickPrompts: [
        "Vì sao Tây Nguyên phù hợp với cây công nghiệp lâu năm?",
        "Dịch vụ phát triển mạnh mang lại lợi ích gì cho nền kinh tế?",
      ],
    },
  },
  "chuong-3-su-phan-hoa-lanh-tho": {
    learn: {
      overview:
        "Chương này giúp học sinh nhìn thấy sự khác biệt giữa các vùng kinh tế của Việt Nam, vai trò của các vùng kinh tế trọng điểm và yêu cầu liên kết vùng trong phát triển lãnh thổ.",
      keyIdeas: [
        "Nhận biết sự phân hóa lãnh thổ về tự nhiên và kinh tế - xã hội.",
        "Hiểu thế mạnh của một số vùng kinh tế tiêu biểu.",
        "Biết vai trò của các vùng kinh tế trọng điểm.",
        "Hiểu ý nghĩa của liên kết vùng và quy hoạch lãnh thổ.",
      ],
    },
    review: {
      checklist: [
        "Em đã nêu được ít nhất 3 vùng có thế mạnh kinh tế khác nhau.",
        "Em đã hiểu vai trò của vùng kinh tế trọng điểm.",
        "Em đã giải thích được vì sao cần liên kết vùng.",
      ],
      quickPrompts: [
        "Vì sao Đông Nam Bộ phát triển công nghiệp và dịch vụ mạnh?",
        "Đồng bằng sông Cửu Long có vai trò gì trong sản xuất lương thực?",
      ],
    },
  },
  "chuong-4-bien-dao-va-phat-trien-ben-vung": {
    learn: {
      overview:
        "Chương này tập trung vào vai trò của biển đảo Việt Nam, các ngành kinh tế biển quan trọng và yêu cầu bảo vệ tài nguyên, môi trường hướng tới phát triển bền vững.",
      keyIdeas: [
        "Nhận biết vai trò của biển đảo trong phát triển kinh tế và bảo vệ chủ quyền.",
        "Hiểu nội dung của phát triển tổng hợp kinh tế biển.",
        "Biết các vấn đề môi trường biển nổi bật hiện nay.",
        "Giải thích được vì sao khai thác biển đảo phải gắn với bảo vệ tài nguyên và môi trường.",
      ],
    },
    review: {
      checklist: [
        "Em đã nêu được ít nhất 3 ngành kinh tế biển quan trọng.",
        "Em đã hiểu khái niệm phát triển biển đảo bền vững.",
        "Em đã chỉ ra được một số giải pháp bảo vệ tài nguyên và môi trường biển.",
      ],
      quickPrompts: [
        "Vì sao biển đảo có ý nghĩa quan trọng đối với Việt Nam?",
        "Khai thác hải sản bền vững cần tuân theo những nguyên tắc nào?",
      ],
    },
  },
};

export function getGeographyChapterById(chapterId: string) {
  return grade9GeographyChapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function getGeographyChapterModeContent(chapterId: string) {
  return geographyChapterModeContent[chapterId] ?? null;
}
