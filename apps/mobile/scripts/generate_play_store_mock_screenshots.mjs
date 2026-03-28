import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(currentDir, "../play-store-assets");

fs.mkdirSync(outputDir, { recursive: true });

const width = 1080;
const height = 1920;

const palette = {
  bg: "#f6f2ea",
  surface: "#fffaf1",
  line: "rgba(22,49,39,0.1)",
  text: "#163127",
  muted: "#5d6f68",
  accent: "#db6b2d",
  highlight: "#1f8f6b",
  cream: "#fbf7ef",
};

function wrapText(text, maxCharsPerLine) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function textBlock(text, x, y, opts = {}) {
  const {
    fontSize = 42,
    lineHeight = 1.35,
    fill = palette.text,
    weight = 600,
    maxCharsPerLine = 24,
  } = opts;
  const lines = wrapText(text, maxCharsPerLine);
  const tspans = lines
    .map(
      (line, index) =>
        `<tspan x="${x}" dy="${index === 0 ? 0 : fontSize * lineHeight}">${line}</tspan>`,
    )
    .join("");
  return `<text x="${x}" y="${y}" fill="${fill}" font-size="${fontSize}" font-weight="${weight}" font-family="Georgia, 'Times New Roman', serif">${tspans}</text>`;
}

function card(x, y, w, h, extra = "") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="${palette.surface}" stroke="rgba(22,49,39,0.1)" stroke-width="2"/>${extra}`;
}

function button(x, y, w, h, label, tone = "primary") {
  const fill = tone === "primary" ? palette.accent : "rgba(255,250,241,0.88)";
  const stroke = tone === "primary" ? "none" : "rgba(22,49,39,0.12)";
  const color = tone === "primary" ? "#fff9f2" : palette.text;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="30" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${x + w / 2}" y="${y + h / 2 + 9}" text-anchor="middle" fill="${color}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">${label}</text>
  `;
}

function levelNode(x, y, title, status, theme) {
  const backgrounds = {
    local: { top: "#edf8ee", bottom: "#fff7ee", accent: "#73b88b" },
    city: { top: "#edf4ff", bottom: "#fff8f0", accent: "#7b94bf" },
    health: { top: "#f1fbe9", bottom: "#fff8ef", accent: "#8fc96d" },
    past: { top: "#f4e3cc", bottom: "#fff7eb", accent: "#c09058" },
    exp: { top: "#fff0df", bottom: "#f7fbff", accent: "#ff9d55" },
  };
  const bg = backgrounds[theme];
  const glow =
    status === "current"
      ? `<rect x="${x - 8}" y="${y - 8}" width="184" height="164" rx="36" fill="none" stroke="rgba(219,107,45,0.35)" stroke-width="4"/>`
      : "";
  const opacity = status === "locked" ? 0.55 : 1;
  const label =
    status === "done" ? "Đã vượt ải" : status === "current" ? "Đang mở" : "Đang khóa";
  return `
    ${glow}
    <g opacity="${opacity}">
      <rect x="${x}" y="${y}" width="168" height="148" rx="30" fill="url(#${theme}-grad)" stroke="rgba(22,49,39,0.12)" stroke-width="2"/>
      <circle cx="${x + 34}" cy="${y + 34}" r="18" fill="${bg.accent}" opacity="0.18"/>
      <text x="${x + 84}" y="${y + 54}" text-anchor="middle" fill="${palette.text}" font-size="24" font-weight="700" font-family="Georgia, 'Times New Roman', serif">${title}</text>
      <text x="${x + 84}" y="${y + 100}" text-anchor="middle" fill="${palette.muted}" font-size="22" font-weight="600" font-family="Georgia, 'Times New Roman', serif">${label}</text>
    </g>
  `;
}

function shell(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbf7ef"/>
      <stop offset="100%" stop-color="#f1eadf"/>
    </linearGradient>
    <linearGradient id="local-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#edf8ee"/>
      <stop offset="100%" stop-color="#fff7ee"/>
    </linearGradient>
    <linearGradient id="city-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#edf4ff"/>
      <stop offset="100%" stop-color="#fff8f0"/>
    </linearGradient>
    <linearGradient id="health-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f1fbe9"/>
      <stop offset="100%" stop-color="#fff8ef"/>
    </linearGradient>
    <linearGradient id="past-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f4e3cc"/>
      <stop offset="100%" stop-color="#fff7eb"/>
    </linearGradient>
    <linearGradient id="exp-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fff0df"/>
      <stop offset="100%" stop-color="#f7fbff"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg-grad)"/>
  <circle cx="180" cy="110" r="160" fill="rgba(219,107,45,0.09)"/>
  <circle cx="930" cy="1760" r="180" fill="rgba(31,143,107,0.08)"/>
  <text x="88" y="110" fill="${palette.highlight}" font-size="26" font-weight="700" letter-spacing="6" font-family="Georgia, 'Times New Roman', serif">TRƯỜNG ĐIỂM TA9</text>
  ${content}
</svg>`;
}

const screens = [
  {
    name: "01-home-level-map",
    render: () =>
      shell(`
        ${textBlock("Mở dần từng unit để tiến bộ vững hơn mỗi ngày.", 88, 210, {
          fontSize: 70,
          maxCharsPerLine: 17,
        })}
        <text x="88" y="430" fill="${palette.muted}" font-size="34" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Học đúng trọng tâm, sửa đúng lỗi sai và nhìn rõ tiến độ của em.</text>
        ${card(64, 520, 952, 760, `
          <text x="104" y="596" fill="${palette.highlight}" font-size="24" font-weight="700" letter-spacing="4" font-family="Georgia, 'Times New Roman', serif">BẢN ĐỒ CẤP ĐỘ</text>
          ${levelNode(96, 660, "Unit 1", "done", "local")}
          <rect x="264" y="732" width="42" height="4" rx="2" fill="rgba(31,143,107,0.45)"/>
          ${levelNode(318, 660, "Unit 2", "current", "city")}
          <rect x="486" y="732" width="42" height="4" rx="2" fill="rgba(22,49,39,0.10)"/>
          ${levelNode(540, 660, "Unit 3", "locked", "health")}
          <rect x="708" y="732" width="42" height="4" rx="2" fill="rgba(22,49,39,0.10)"/>
          ${levelNode(762, 660, "Unit 4", "locked", "past")}
          ${levelNode(430, 850, "Unit 5", "locked", "exp")}
          <text x="104" y="1080" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Unit đang mở: Unit 2. City Life</text>
          <text x="104" y="1136" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Hoàn thành bộ ôn tập tổng hợp và đạt 80% ở mọi kỹ năng để mở unit tiếp theo.</text>
        `)}
        ${button(88, 1336, 320, 92, "Tiếp tục học")}
        ${button(432, 1336, 252, 92, "Hồ sơ", "secondary")}
      `),
  },
  {
    name: "02-unit-overview",
    render: () =>
      shell(`
        ${textBlock("Unit 2. City Life", 88, 210, { fontSize: 72, maxCharsPerLine: 16 })}
        <text x="88" y="360" fill="${palette.muted}" font-size="34" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Học từ vựng, so sánh, giao thông và cách nói về ưu nhược điểm của cuộc sống thành phố.</text>
        ${card(64, 470, 952, 320, `
          <text x="104" y="548" fill="${palette.highlight}" font-size="24" font-weight="700" letter-spacing="4" font-family="Georgia, 'Times New Roman', serif">THÔNG TIN UNIT</text>
          <text x="104" y="630" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">4 ý chính • 3 bộ luyện • 1 bộ chốt cấp độ</text>
          <text x="104" y="690" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Tiếp tục học theo từng bước, rồi sang kiểm tra để biết mình còn yếu ở đâu.</text>
        `)}
        ${button(88, 856, 240, 92, "Học")}
        ${button(352, 856, 260, 92, "Kiểm tra", "secondary")}
        ${button(636, 856, 280, 92, "Đánh giá", "secondary")}
        ${card(64, 1010, 952, 600, `
          <text x="104" y="1088" fill="${palette.highlight}" font-size="24" font-weight="700" letter-spacing="4" font-family="Georgia, 'Times New Roman', serif">LỘ TRÌNH BÀI HỌC</text>
          <rect x="104" y="1144" width="872" height="94" rx="26" fill="url(#city-grad)"/>
          <rect x="104" y="1260" width="872" height="94" rx="26" fill="rgba(255,250,241,0.88)"/>
          <rect x="104" y="1376" width="872" height="94" rx="26" fill="rgba(255,250,241,0.88)"/>
          <text x="140" y="1200" fill="${palette.text}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">1. Từ vựng và chủ điểm thành phố</text>
          <text x="140" y="1316" fill="${palette.text}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">2. So sánh và nêu quan điểm</text>
          <text x="140" y="1432" fill="${palette.text}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">3. Ôn tập và vượt bài chốt</text>
        `)}
      `),
  },
  {
    name: "03-quiz",
    render: () =>
      shell(`
        ${textBlock("Làm bài ngắn để biết em đang mạnh và yếu ở đâu.", 88, 210, {
          fontSize: 66,
          maxCharsPerLine: 17,
        })}
        ${card(64, 430, 952, 1260, `
          <text x="104" y="510" fill="${palette.highlight}" font-size="24" font-weight="700" letter-spacing="4" font-family="Georgia, 'Times New Roman', serif">BỘ KIỂM TRA</text>
          <text x="104" y="580" fill="${palette.text}" font-size="40" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Bộ câu hỏi 2</text>
          <text x="820" y="580" fill="${palette.muted}" font-size="28" font-weight="600" font-family="Georgia, 'Times New Roman', serif">3/10 câu</text>
          <text x="104" y="670" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">City life can be convenient, ____ it can also be stressful.</text>
          <rect x="104" y="736" width="872" height="110" rx="28" fill="rgba(255,250,241,0.9)" stroke="rgba(22,49,39,0.08)"/>
          <rect x="104" y="868" width="872" height="110" rx="28" fill="rgba(255,239,224,0.92)" stroke="rgba(219,107,45,0.3)"/>
          <rect x="104" y="1000" width="872" height="110" rx="28" fill="rgba(255,250,241,0.9)" stroke="rgba(22,49,39,0.08)"/>
          <rect x="104" y="1132" width="872" height="110" rx="28" fill="rgba(255,250,241,0.9)" stroke="rgba(22,49,39,0.08)"/>
          <text x="148" y="805" fill="${palette.text}" font-size="32" font-weight="700" font-family="Georgia, 'Times New Roman', serif">A. but</text>
          <text x="148" y="937" fill="${palette.text}" font-size="32" font-weight="700" font-family="Georgia, 'Times New Roman', serif">B. because</text>
          <text x="148" y="1069" fill="${palette.text}" font-size="32" font-weight="700" font-family="Georgia, 'Times New Roman', serif">C. so</text>
          <text x="148" y="1201" fill="${palette.text}" font-size="32" font-weight="700" font-family="Georgia, 'Times New Roman', serif">D. or</text>
        `)}
        ${button(720, 1732, 256, 96, "Nộp bài")}
      `),
  },
  {
    name: "04-result-feedback",
    render: () =>
      shell(`
        ${textBlock("Thấy ngay lỗi sai, gợi ý và mẹo nhớ sau mỗi lần làm bài.", 88, 210, {
          fontSize: 64,
          maxCharsPerLine: 18,
        })}
        ${card(64, 430, 952, 240, `
          <text x="104" y="520" fill="${palette.text}" font-size="56" font-weight="700" font-family="Georgia, 'Times New Roman', serif">80%</text>
          <text x="104" y="586" fill="${palette.muted}" font-size="30" font-weight="500" font-family="Georgia, 'Times New Roman', serif">8/10 câu đúng • 2 kỹ năng cần ưu tiên</text>
          <text x="640" y="552" fill="${palette.highlight}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Ôn tập đến hạn: 2</text>
        `)}
        ${card(64, 710, 952, 440, `
          <text x="104" y="790" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Điểm yếu cần sửa ngay</text>
          <rect x="104" y="840" width="398" height="220" rx="28" fill="url(#city-grad)"/>
          <rect x="518" y="840" width="458" height="220" rx="28" fill="url(#local-grad)"/>
          <text x="138" y="910" fill="${palette.text}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Cấu trúc câu</text>
          <text x="138" y="962" fill="${palette.muted}" font-size="26" font-weight="500" font-family="Georgia, 'Times New Roman', serif">2 câu sai • ôn lại hôm nay</text>
          <text x="552" y="910" fill="${palette.text}" font-size="30" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Giới từ và cụm từ</text>
          <text x="552" y="962" fill="${palette.muted}" font-size="26" font-weight="500" font-family="Georgia, 'Times New Roman', serif">1 câu sai • gợi ý luyện tiếp</text>
        `)}
        ${card(64, 1180, 952, 520, `
          <text x="104" y="1260" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Giải thích thêm</text>
          <text x="104" y="1338" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Em sai ở: Cấu trúc câu</text>
          <text x="104" y="1410" fill="${palette.text}" font-size="30" font-weight="600" font-family="Georgia, 'Times New Roman', serif">Vì sao sai:</text>
          <text x="104" y="1460" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Câu này cần liên từ nối hai ý đối lập nên đáp án đúng là "but".</text>
          <text x="104" y="1534" fill="${palette.text}" font-size="30" font-weight="600" font-family="Georgia, 'Times New Roman', serif">Mẹo nhớ:</text>
          <text x="104" y="1584" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Khi hai vế mang ý trái nhau, hãy kiểm tra các từ nối như but, however.</text>
        `)}
      `),
  },
  {
    name: "05-review-srs",
    render: () =>
      shell(`
        ${textBlock("Ôn lại đúng kỹ năng đến hạn để nhớ chắc hơn mỗi ngày.", 88, 210, {
          fontSize: 64,
          maxCharsPerLine: 18,
        })}
        ${card(64, 440, 952, 1240, `
          <text x="104" y="520" fill="${palette.highlight}" font-size="24" font-weight="700" letter-spacing="4" font-family="Georgia, 'Times New Roman', serif">ÔN TẬP THEO SRS</text>
          <rect x="104" y="590" width="872" height="260" rx="30" fill="url(#city-grad)"/>
          <text x="144" y="670" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Cấu trúc câu</text>
          <text x="144" y="726" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Chu kỳ hiện tại: 3 ngày • số lần nhớ lại: 2</text>
          <text x="144" y="782" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Em đã trả lời đúng nhưng cần củng cố thêm.</text>
          <rect x="104" y="892" width="872" height="260" rx="30" fill="url(#health-grad)"/>
          <text x="144" y="972" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Đọc hiểu</text>
          <text x="144" y="1028" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Chu kỳ hiện tại: 1 ngày • số lần nhớ lại: 0</text>
          <text x="144" y="1084" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Em vẫn còn nhầm ở kỹ năng này.</text>
          <rect x="104" y="1194" width="872" height="380" rx="30" fill="rgba(255,250,241,0.88)"/>
          <text x="144" y="1274" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Gợi ý cho hôm nay</text>
          <text x="144" y="1346" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Ôn 2 kỹ năng đến hạn rồi làm lại 1 bộ ngắn để củng cố.</text>
        `)}
        ${button(680, 1728, 296, 96, "Vào làm bài ôn")}
      `),
  },
  {
    name: "06-progress",
    render: () =>
      shell(`
        ${textBlock("Theo dõi tiến độ để biết mình đang tiến bộ đến đâu.", 88, 210, {
          fontSize: 66,
          maxCharsPerLine: 18,
        })}
        ${card(64, 430, 952, 1200, `
          <text x="104" y="510" fill="${palette.highlight}" font-size="24" font-weight="700" letter-spacing="4" font-family="Georgia, 'Times New Roman', serif">TIẾN ĐỘ HỌC TẬP</text>
          <rect x="104" y="566" width="260" height="220" rx="28" fill="rgba(255,245,230,0.92)"/>
          <rect x="386" y="566" width="260" height="220" rx="28" fill="rgba(240,252,244,0.92)"/>
          <rect x="668" y="566" width="308" height="220" rx="28" fill="rgba(243,247,255,0.92)"/>
          <text x="136" y="646" fill="${palette.text}" font-size="28" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Hoàn thành học</text>
          <text x="136" y="722" fill="${palette.text}" font-size="54" font-weight="700" font-family="Georgia, 'Times New Roman', serif">2/5</text>
          <text x="418" y="646" fill="${palette.text}" font-size="28" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Điểm trung bình</text>
          <text x="418" y="722" fill="${palette.text}" font-size="54" font-weight="700" font-family="Georgia, 'Times New Roman', serif">84%</text>
          <text x="700" y="646" fill="${palette.text}" font-size="28" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Cần ưu tiên</text>
          <text x="700" y="722" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Đọc hiểu</text>
          <text x="104" y="878" fill="${palette.text}" font-size="34" font-weight="700" font-family="Georgia, 'Times New Roman', serif">Đường tiến bộ</text>
          <path d="M124 1250 C250 1160 330 1180 450 1070 C570 960 690 1030 820 900" stroke="${palette.accent}" stroke-width="10" fill="none" stroke-linecap="round"/>
          <circle cx="124" cy="1250" r="10" fill="${palette.accent}"/>
          <circle cx="450" cy="1070" r="10" fill="${palette.accent}"/>
          <circle cx="820" cy="900" r="10" fill="${palette.accent}"/>
          <text x="104" y="1396" fill="${palette.muted}" font-size="28" font-weight="500" font-family="Georgia, 'Times New Roman', serif">Mỗi lần học giúp em thấy rõ hơn mình đang mạnh lên ở đâu.</text>
        `)}
      `),
  },
];

for (const screen of screens) {
  const svgPath = path.join(outputDir, `${screen.name}.svg`);
  fs.writeFileSync(svgPath, screen.render(), "utf8");
}

execFileSync("qlmanage", ["-t", "-s", "1080", "-o", outputDir, ...screens.map((screen) => path.join(outputDir, `${screen.name}.svg`))], {
  stdio: "ignore",
});

console.log(`Generated ${screens.length} mock screenshots in ${outputDir}`);
