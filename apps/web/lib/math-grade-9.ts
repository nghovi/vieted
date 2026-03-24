export type MathQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
};

export type MathQuestionSet = {
  id: string;
  title: string;
  questions: MathQuestion[];
};

export type MathChapter = {
  id: string;
  title: string;
  summary: string;
  textbookScope: string;
  questionSets: MathQuestionSet[];
};

export type MathChapterModeContent = {
  learn: {
    overview: string;
    keyIdeas: string[];
  };
  review: {
    checklist: string[];
    quickPrompts: string[];
  };
};

type MathConcept = {
  term: string;
  definition: string;
  example: string;
  commonMistake: string;
  strategy: string;
  symbol?: string;
  contrast?: string;
};

type MathChapterSeed = {
  id: string;
  title: string;
  summary: string;
  overview: string;
  keyIdeas: string[];
  checklist: string[];
  quickPrompts: string[];
  concepts: MathConcept[];
};

function createQuestion(
  id: string,
  prompt: string,
  options: string[],
  correctOption: number,
  explanation: string,
): MathQuestion {
  return { id, prompt, options, correctOption, explanation };
}

function buildQuestionSets(chapter: MathChapterSeed, chapterIndex: number) {
  return [0, 1, 2].map((setIndex) => {
    const questions = chapter.concepts.flatMap((concept, conceptIndex) => {
      const baseId = `m${chapterIndex + 1}s${setIndex + 1}c${conceptIndex + 1}`;
      const symbol = concept.symbol ?? concept.term;
      const contrast = concept.contrast ?? `${concept.term} ở dạng khác`;

      return [
        createQuestion(
          `${baseId}q1`,
          `Trong chương này, ${concept.term.toLowerCase()} được hiểu là gì?`,
          [
            concept.definition,
            contrast,
            concept.commonMistake,
            `Một bước tính không liên quan đến ${concept.term.toLowerCase()}`,
          ],
          0,
          concept.definition,
        ),
        createQuestion(
          `${baseId}q2`,
          `Ví dụ nào phù hợp nhất với ${concept.term.toLowerCase()}?`,
          [
            concept.example,
            concept.commonMistake,
            `Một tình huống không sử dụng ${symbol}`,
            `Một kết luận trái với ${concept.term.toLowerCase()}`,
          ],
          0,
          `${concept.example} là ví dụ trực tiếp của ${concept.term.toLowerCase()}.`,
        ),
      ];
    });

    return {
      id: `math-${chapterIndex + 1}-set-${setIndex + 1}`,
      title: `Bộ câu hỏi ${setIndex + 1}`,
      questions,
    } satisfies MathQuestionSet;
  });
}

const mathChapterSeeds: MathChapterSeed[] = [
  {
    id: "chuong-1-can-bac-hai-va-can-thuc",
    title: "Chương 1. Căn bậc hai và căn thức",
    summary:
      "Ôn lại căn bậc hai, biến đổi căn thức và luyện các phép tính thường gặp với biểu thức chứa căn.",
    overview:
      "Học sinh làm quen lại với căn bậc hai số học, điều kiện xác định và cách rút gọn các biểu thức chứa căn.",
    keyIdeas: [
      "Nhận biết căn bậc hai số học và điều kiện xác định của căn thức.",
      "Rút gọn biểu thức chứa căn bằng các quy tắc biến đổi cơ bản.",
      "Thực hiện các phép cộng, trừ, nhân, chia căn thức đúng thứ tự.",
      "Tránh nhầm dấu và nhầm điều kiện xác định khi biến đổi biểu thức.",
    ],
    checklist: [
      "Em kiểm tra điều kiện xác định trước khi biến đổi căn thức.",
      "Em phân biệt được căn bậc hai số học với hai nghiệm đối nhau.",
      "Em rút gọn đúng các biểu thức có nhân tử chung dưới dấu căn.",
    ],
    quickPrompts: [
      "Khi nào cần đặt điều kiện xác định cho biểu thức chứa căn?",
      "Vì sao căn bậc hai số học luôn không âm?",
      "Những lỗi nào dễ gặp khi trục căn ở mẫu?",
    ],
    concepts: [
      {
        term: "căn bậc hai số học",
        definition: "Là số không âm mà bình phương của nó bằng số đã cho.",
        example: "√49 = 7 vì 7^2 = 49.",
        commonMistake: "Cho rằng √49 có thể bằng -7.",
        strategy: "Luôn nhớ kết quả của căn bậc hai số học là số không âm.",
        symbol: "√a",
        contrast: "Hai nghiệm của phương trình x^2 = a",
      },
      {
        term: "điều kiện xác định",
        definition: "Biểu thức dưới dấu căn phải lớn hơn hoặc bằng 0.",
        example: "Biểu thức √(x - 3) xác định khi x ≥ 3.",
        commonMistake: "Quên đặt điều kiện x - 3 ≥ 0 trước khi tính.",
        strategy: "Xét ngay biểu thức dưới dấu căn trước mọi bước rút gọn.",
      },
      {
        term: "rút gọn căn thức",
        definition: "Đưa biểu thức chứa căn về dạng đơn giản hơn bằng cách tách thừa số chính phương.",
        example: "√50 = √(25×2) = 5√2.",
        commonMistake: "Viết √50 = 25√2.",
        strategy: "Tách số dưới căn thành tích của một số chính phương và phần còn lại.",
      },
      {
        term: "trục căn ở mẫu",
        definition: "Biến đổi phân thức để mẫu số không còn chứa dấu căn.",
        example: "1/√5 = √5/5.",
        commonMistake: "Chỉ nhân tử số mà không nhân cả tử và mẫu.",
        strategy: "Nhân cả tử và mẫu với cùng một biểu thức thích hợp.",
      },
      {
        term: "phép tính với căn thức",
        definition: "Thực hiện cộng, trừ, nhân, chia các căn thức đồng dạng hoặc đưa về đồng dạng.",
        example: "3√2 + 5√2 = 8√2.",
        commonMistake: "Cộng 3√2 + 5√3 thành 8√5.",
        strategy: "Chỉ cộng trừ các căn thức đồng dạng, còn nhân chia theo quy tắc riêng.",
      },
    ],
  },
  {
    id: "chuong-2-ham-so-bac-nhat",
    title: "Chương 2. Hàm số bậc nhất",
    summary:
      "Tìm hiểu hàm số bậc nhất, đồ thị đường thẳng, hệ số góc và mối liên hệ giữa bảng giá trị với đồ thị.",
    overview:
      "Chương này giúp học sinh nhìn thấy cách biểu diễn mối quan hệ tuyến tính bằng công thức, bảng và đồ thị.",
    keyIdeas: [
      "Nhận biết dạng tổng quát y = ax + b với a khác 0.",
      "Đọc được ý nghĩa của hệ số a và số tự do b.",
      "Vẽ đồ thị đường thẳng từ hai điểm hoặc từ giao trục.",
      "Liên hệ độ dốc của đường thẳng với tính đồng biến, nghịch biến.",
    ],
    checklist: [
      "Em xác định đúng hệ số a và b trong công thức.",
      "Em biết chọn hai điểm thuận tiện để vẽ đường thẳng.",
      "Em giải thích được vì sao a > 0 thì hàm số đồng biến.",
    ],
    quickPrompts: [
      "Nếu b = 0 thì đồ thị đi qua điểm nào?",
      "Làm sao nhận ra hai đường thẳng song song qua hệ số góc?",
      "Bảng giá trị hỗ trợ việc vẽ đồ thị như thế nào?",
    ],
    concepts: [
      {
        term: "hàm số bậc nhất",
        definition: "Là hàm số có dạng y = ax + b với a khác 0.",
        example: "y = 2x + 1 là một hàm số bậc nhất.",
        commonMistake: "Nhầm y = 5 thành hàm số bậc nhất.",
        strategy: "Kiểm tra xem hệ số của x có khác 0 hay không.",
        symbol: "y = ax + b",
      },
      {
        term: "hệ số góc",
        definition: "Là hệ số a cho biết mức độ nghiêng và chiều biến thiên của đường thẳng.",
        example: "Trong y = -3x + 2 thì hệ số góc là -3.",
        commonMistake: "Nhầm số tự do b là hệ số góc.",
        strategy: "Nhìn vào hệ số đứng trước x để xác định độ dốc.",
      },
      {
        term: "số tự do",
        definition: "Là giá trị b, cũng là tung độ giao điểm của đồ thị với trục Oy.",
        example: "Trong y = 2x + 1 thì đường thẳng cắt Oy tại điểm có tung độ 1.",
        commonMistake: "Cho rằng b quyết định chiều tăng giảm của hàm số.",
        strategy: "Tách vai trò của a và b: a cho độ dốc, b cho vị trí cắt trục Oy.",
      },
      {
        term: "đồ thị đường thẳng",
        definition: "Là tập hợp các điểm biểu diễn hàm số bậc nhất trên mặt phẳng tọa độ.",
        example: "Đồ thị của y = x + 2 đi qua (0;2) và (-2;0).",
        commonMistake: "Chỉ lấy một điểm rồi kết luận được cả đường thẳng.",
        strategy: "Luôn chọn ít nhất hai điểm phân biệt trước khi kẻ đường thẳng.",
      },
      {
        term: "tính đồng biến nghịch biến",
        definition: "a > 0 thì hàm số đồng biến, a < 0 thì hàm số nghịch biến.",
        example: "Hàm số y = -x + 4 nghịch biến vì a = -1.",
        commonMistake: "Dựa vào b để kết luận đồng biến hoặc nghịch biến.",
        strategy: "Xét dấu của a trước, không dùng b để kết luận chiều biến thiên.",
      },
    ],
  },
  {
    id: "chuong-3-he-thuc-luong-trong-tam-giac-vuong",
    title: "Chương 3. Hệ thức lượng trong tam giác vuông",
    summary:
      "Luyện các tỉ số lượng giác cơ bản, hệ thức giữa cạnh và đường cao trong tam giác vuông, cùng ứng dụng giải bài toán thực tế.",
    overview:
      "Học sinh dùng tam giác vuông để liên hệ cạnh, góc và các tỉ số lượng giác trong những bài toán đo đạc quen thuộc.",
    keyIdeas: [
      "Nhớ đúng sin, cos, tan của góc nhọn trong tam giác vuông.",
      "Áp dụng hệ thức giữa cạnh góc vuông, cạnh huyền và đường cao.",
      "Chọn tỉ số lượng giác phù hợp với dữ kiện đã biết.",
      "Giải bài toán thực tế về chiều cao, khoảng cách bằng tam giác vuông.",
    ],
    checklist: [
      "Em xác định đúng cạnh đối, cạnh kề và cạnh huyền theo góc đang xét.",
      "Em tránh nhầm giữa sin với cos khi đổi góc quan sát.",
      "Em kiểm tra đơn vị đo trong các bài toán thực tế.",
    ],
    quickPrompts: [
      "Khi nào nên dùng tan thay vì sin hoặc cos?",
      "Đổi góc đang xét có làm đổi cạnh đối và cạnh kề không?",
      "Đường cao trong tam giác vuông tạo ra những hệ thức quen thuộc nào?",
    ],
    concepts: [
      {
        term: "sin của góc nhọn",
        definition: "Là tỉ số giữa cạnh đối và cạnh huyền.",
        example: "sin A = cạnh đối / cạnh huyền.",
        commonMistake: "Đổi chỗ cạnh đối với cạnh kề.",
        strategy: "Vẽ lại góc đang xét rồi đánh dấu rõ ba cạnh trước khi lập tỉ số.",
      },
      {
        term: "cos của góc nhọn",
        definition: "Là tỉ số giữa cạnh kề và cạnh huyền.",
        example: "cos A = cạnh kề / cạnh huyền.",
        commonMistake: "Nhầm cos A bằng cạnh đối / cạnh huyền.",
        strategy: "Nhớ cos đi với cạnh kề, sin đi với cạnh đối.",
      },
      {
        term: "tan của góc nhọn",
        definition: "Là tỉ số giữa cạnh đối và cạnh kề.",
        example: "tan A = cạnh đối / cạnh kề.",
        commonMistake: "Dùng cạnh huyền trong công thức của tan.",
        strategy: "Khi bài chỉ cho hai cạnh góc vuông, tan thường là lựa chọn nhanh nhất.",
      },
      {
        term: "hệ thức về cạnh và đường cao",
        definition: "Là các công thức liên hệ giữa cạnh huyền, hình chiếu và đường cao trong tam giác vuông.",
        example: "h^2 = m×n là một hệ thức quen thuộc.",
        commonMistake: "Đổi sai vị trí các đoạn hình chiếu.",
        strategy: "Đặt ký hiệu thống nhất trên hình trước khi thay vào công thức.",
      },
      {
        term: "ứng dụng đo đạc",
        definition: "Dùng các tỉ số lượng giác để tính chiều cao, khoảng cách, độ dài khó đo trực tiếp.",
        example: "Tính chiều cao cột cờ qua góc nâng và khoảng cách quan sát.",
        commonMistake: "Không đổi đơn vị hoặc không xác định rõ góc nhìn.",
        strategy: "Viết mô hình tam giác vuông từ tình huống thực tế rồi mới chọn công thức.",
      },
    ],
  },
  {
    id: "chuong-4-phuong-trinh-bac-hai-mot-an",
    title: "Chương 4. Phương trình bậc hai một ẩn",
    summary:
      "Nhận dạng, giải và phân tích nghiệm của phương trình bậc hai một ẩn, đồng thời liên hệ với biểu thức và đồ thị đơn giản.",
    overview:
      "Chương này giúp học sinh thành thạo các bước đưa phương trình về dạng chuẩn, tính biệt thức và kết luận số nghiệm.",
    keyIdeas: [
      "Nhận biết dạng ax^2 + bx + c = 0 với a khác 0.",
      "Giải phương trình bằng công thức nghiệm hoặc phân tích thành nhân tử khi phù hợp.",
      "Dùng biệt thức Delta để kết luận số nghiệm.",
      "Kiểm tra lại nghiệm và đối chiếu với điều kiện của bài toán.",
    ],
    checklist: [
      "Em đưa phương trình về dạng chuẩn trước khi áp dụng công thức.",
      "Em tính đúng Delta và đọc đúng số nghiệm tương ứng.",
      "Em thử lại nghiệm trong các bài toán có điều kiện.",
    ],
    quickPrompts: [
      "Khi nào nên dùng phân tích nhân tử thay vì công thức nghiệm?",
      "Delta âm, bằng 0, dương cho biết điều gì?",
      "Một nghiệm kép được hiểu như thế nào trên phương diện đại số?",
    ],
    concepts: [
      {
        term: "dạng chuẩn của phương trình bậc hai",
        definition: "Là dạng ax^2 + bx + c = 0 với a khác 0.",
        example: "2x^2 - 3x + 1 = 0 là phương trình bậc hai một ẩn.",
        commonMistake: "Giữ lại phương trình chưa chuyển hết sang một vế.",
        strategy: "Thu gọn và chuyển tất cả về một vế trước khi xác định a, b, c.",
      },
      {
        term: "biệt thức Delta",
        definition: "Delta = b^2 - 4ac dùng để xét số nghiệm của phương trình bậc hai.",
        example: "Nếu Delta > 0 thì phương trình có hai nghiệm phân biệt.",
        commonMistake: "Quên bình phương b hoặc sai dấu của 4ac.",
        strategy: "Thay chậm từng hệ số vào công thức Delta để hạn chế sai dấu.",
      },
      {
        term: "công thức nghiệm",
        definition: "Là công thức tính nghiệm theo a, b, c khi phương trình ở dạng chuẩn.",
        example: "x = (-b ± √Delta)/(2a).",
        commonMistake: "Quên chia cho 2a ở bước cuối cùng.",
        strategy: "Tính tử và mẫu riêng, giữ ngoặc rõ ràng khi thay số.",
      },
      {
        term: "nghiệm kép",
        definition: "Là trường hợp phương trình có một nghiệm duy nhất lặp lại khi Delta = 0.",
        example: "x = -b/(2a) khi Delta = 0.",
        commonMistake: "Vẫn kết luận có hai nghiệm phân biệt khi Delta = 0.",
        strategy: "Nhớ ba trường hợp của Delta và so sánh ngay sau khi tính xong.",
      },
      {
        term: "phân tích thành nhân tử",
        definition: "Là đưa phương trình về dạng tích bằng 0 để suy ra nghiệm.",
        example: "(x - 1)(x - 3) = 0 cho nghiệm x = 1 hoặc x = 3.",
        commonMistake: "Tách nhân tử sai hoặc quên xét đủ các thừa số bằng 0.",
        strategy: "Ưu tiên cách này khi hệ số gọn và dễ nhìn ra hai số thích hợp.",
      },
    ],
  },
  {
    id: "chuong-5-thong-ke-va-xac-suat-thuc-nghiem",
    title: "Chương 5. Thống kê và xác suất thực nghiệm",
    summary:
      "Đọc bảng số liệu, tính tần số, tần số tương đối và làm quen với xác suất thực nghiệm qua các tình huống quen thuộc.",
    overview:
      "Học sinh luyện cách tổ chức dữ liệu, đọc ý nghĩa của tần số và dùng số liệu thực nghiệm để ước lượng khả năng xảy ra của một biến cố.",
    keyIdeas: [
      "Biết cách lập bảng tần số từ dữ liệu ban đầu.",
      "Phân biệt tần số với tần số tương đối.",
      "Tính xác suất thực nghiệm từ số lần xuất hiện trên tổng số phép thử.",
      "Đọc kết quả thống kê để đưa ra nhận xét phù hợp.",
    ],
    checklist: [
      "Em đếm đủ số lần xuất hiện của từng giá trị trong bảng.",
      "Em chia đúng cho tổng số quan sát khi tính tần số tương đối.",
      "Em diễn giải được ý nghĩa của một xác suất thực nghiệm trong ngữ cảnh bài toán.",
    ],
    quickPrompts: [
      "Tần số tương đối khác gì với tần số?",
      "Vì sao xác suất thực nghiệm chỉ là một ước lượng?",
      "Nhận xét nào hợp lý khi đọc một bảng số liệu?",
    ],
    concepts: [
      {
        term: "tần số",
        definition: "Là số lần một giá trị xuất hiện trong tập dữ liệu.",
        example: "Nếu điểm 8 xuất hiện 5 lần thì tần số của 8 là 5.",
        commonMistake: "Nhầm tần số với tổng số phần tử của mẫu.",
        strategy: "Đếm riêng cho từng giá trị rồi kiểm tra tổng các tần số.",
      },
      {
        term: "tần số tương đối",
        definition: "Là tỉ số giữa tần số của một giá trị và tổng số quan sát.",
        example: "Nếu điểm 8 xuất hiện 5 lần trong 20 lần quan sát thì tần số tương đối là 5/20.",
        commonMistake: "Quên chia cho tổng số quan sát.",
        strategy: "Viết rõ phân số tần số trên tổng số quan sát trước khi rút gọn hoặc đổi sang phần trăm.",
      },
      {
        term: "mẫu số liệu",
        definition: "Là tập hợp các dữ liệu thu được từ quan sát hoặc điều tra.",
        example: "Điểm kiểm tra của 30 học sinh là một mẫu số liệu.",
        commonMistake: "Lẫn lộn giữa một giá trị đơn lẻ và cả mẫu số liệu.",
        strategy: "Xác định rõ bài đang nói về một giá trị hay toàn bộ dữ liệu thu thập.",
      },
      {
        term: "xác suất thực nghiệm",
        definition: "Là tỉ số giữa số lần biến cố xảy ra và tổng số phép thử.",
        example: "Tung đồng xu 50 lần thấy mặt ngửa 28 lần thì xác suất thực nghiệm của mặt ngửa là 28/50.",
        commonMistake: "Nhầm xác suất thực nghiệm với xác suất lí thuyết.",
        strategy: "Dựa đúng số liệu đã thử nghiệm, không thay bằng kết quả mong đợi lí thuyết.",
      },
      {
        term: "nhận xét dữ liệu",
        definition: "Là kết luận ngắn gọn rút ra từ bảng hoặc biểu đồ số liệu.",
        example: "Giá trị 8 xuất hiện nhiều nhất nên đây là nhóm nổi bật trong mẫu.",
        commonMistake: "Đưa ra nhận xét không bám vào số liệu cụ thể.",
        strategy: "Luôn nêu nhận xét gắn với con số hoặc xu hướng quan sát được.",
      },
    ],
  },
];

export const grade9MathChapters: MathChapter[] = mathChapterSeeds.map(
  (chapter, chapterIndex) => ({
    id: chapter.id,
    title: chapter.title,
    summary: chapter.summary,
    textbookScope: "Toán 9 - Kết nối tri thức với cuộc sống",
    questionSets: buildQuestionSets(chapter, chapterIndex),
  }),
);

export function getMathChapterById(chapterId: string) {
  return grade9MathChapters.find((chapter) => chapter.id === chapterId) ?? null;
}

export function getMathChapterModeContent(
  chapterId: string,
): MathChapterModeContent | null {
  const chapter = mathChapterSeeds.find((item) => item.id === chapterId);
  if (!chapter) {
    return null;
  }

  return {
    learn: {
      overview: chapter.overview,
      keyIdeas: chapter.keyIdeas,
    },
    review: {
      checklist: chapter.checklist,
      quickPrompts: chapter.quickPrompts,
    },
  };
}
