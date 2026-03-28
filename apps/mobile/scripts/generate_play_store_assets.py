from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "play-store-assets"
OUTPUT.mkdir(parents=True, exist_ok=True)

PHONE_W = 1080
PHONE_H = 1920
FEATURE_W = 1024
FEATURE_H = 500

COLORS = {
    "bg_top": "#fbf7ef",
    "bg_bottom": "#f1eadf",
    "surface": "#fffaf1",
    "text": "#163127",
    "muted": "#5d6f68",
    "accent": "#db6b2d",
    "highlight": "#1f8f6b",
    "line": "#dfd6c8",
    "white": "#fffaf2",
}

FONT_REG = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(size, bold=False):
    path = FONT_BOLD if bold else FONT_REG
    return ImageFont.truetype(path, size=size)


def hex_rgba(hex_color, alpha=255):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i:i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def make_canvas(width, height):
    image = Image.new("RGBA", (width, height), hex_rgba(COLORS["bg_top"]))
    draw = ImageDraw.Draw(image)
    for y in range(height):
      ratio = y / max(height - 1, 1)
      start = hex_rgba(COLORS["bg_top"])
      end = hex_rgba(COLORS["bg_bottom"])
      color = tuple(int(start[i] + (end[i] - start[i]) * ratio) for i in range(3)) + (255,)
      draw.line((0, y, width, y), fill=color)
    draw.ellipse((-40, -20, 340, 360), fill=hex_rgba("#f3dfc7", 120))
    draw.ellipse((width - 320, height - 320, width + 20, height + 20), fill=hex_rgba("#d8eee2", 110))
    return image


def rounded_card(draw, xy, fill, outline=COLORS["line"], radius=34, width=2):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_wrapped(draw, text, xy, max_width, font_obj, fill, line_gap=10):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        probe = word if not current else f"{current} {word}"
        if draw.textlength(probe, font=font_obj) <= max_width:
            current = probe
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    x, y = xy
    _, _, _, line_height = draw.textbbox((0, 0), "Ag", font=font_obj)
    for line in lines:
        draw.text((x, y), line, font=font_obj, fill=fill)
        y += line_height + line_gap
    return y


def button(draw, xy, label, primary=True):
    x1, y1, x2, y2 = xy
    fill = COLORS["accent"] if primary else COLORS["surface"]
    outline = None if primary else COLORS["line"]
    text_fill = COLORS["white"] if primary else COLORS["text"]
    draw.rounded_rectangle(xy, radius=32, fill=fill, outline=outline, width=2 if outline else 0)
    label_font = font(30, bold=True)
    bbox = draw.textbbox((0, 0), label, font=label_font)
    tx = x1 + ((x2 - x1) - (bbox[2] - bbox[0])) / 2
    ty = y1 + ((y2 - y1) - (bbox[3] - bbox[1])) / 2 - 2
    draw.text((tx, ty), label, font=label_font, fill=text_fill)


def theme_background(image, box, theme):
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x1, y1, x2, y2 = box
    rounded_card(draw, box, "#fffaf1", radius=30)

    if theme == "local":
        draw.rectangle((x1, y2 - 48, x2, y2), fill="#bdddba")
        draw.polygon([(x1 + 20, y2 - 40), (x1 + 70, y2 - 82), (x1 + 120, y2 - 40)], fill="#db6b2d")
        draw.rectangle((x1 + 32, y2 - 40, x1 + 108, y2 - 4), fill="#fffdf8")
        draw.ellipse((x2 - 88, y1 + 18, x2 - 24, y1 + 82), fill="#8ac59a")
        draw.rectangle((x2 - 62, y1 + 72, x2 - 48, y1 + 120), fill="#6c8751")
    elif theme == "city":
        for idx, h in enumerate([56, 88, 120, 72, 102]):
            left = x1 + 18 + idx * 26
            draw.rectangle((left, y2 - h - 14, left + 18, y2 - 14), fill="#7e94b8")
        draw.rectangle((x1, y2 - 18, x2, y2 - 6), fill="#6e7884")
    elif theme == "health":
        draw.ellipse((x1 + 18, y1 + 18, x1 + 72, y1 + 72), fill="#ff7a7a")
        draw.rectangle((x1 + 42, y1 + 30, x1 + 48, y1 + 62), fill="#fffdf8")
        draw.rectangle((x1 + 30, y1 + 42, x1 + 60, y1 + 48), fill="#fffdf8")
        draw.polygon([(x2 - 100, y2 - 18), (x2 - 62, y1 + 30), (x2 - 26, y2 - 18)], fill="#8ecf6f")
    elif theme == "past":
        draw.rounded_rectangle((x1 + 18, y1 + 18, x1 + 88, y1 + 112), radius=8, fill="#fff7ea", outline="#b79263", width=2)
        draw.ellipse((x1 + 34, y1 + 34, x1 + 70, y1 + 70), fill="#cfaa7c")
        for idx in range(4):
            yy = y1 + 30 + idx * 18
            draw.line((x1 + 110, yy, x2 - 20, yy), fill="#a47d54", width=3)
    elif theme == "experience":
        draw.rectangle((x1, y2 - 46, x2, y2), fill="#a8d8f1")
        draw.polygon([(x1 + 20, y2 - 46), (x1 + 74, y1 + 38), (x1 + 126, y2 - 46)], fill="#ff9a55")
        draw.arc((x2 - 110, y1 + 20, x2 - 30, y1 + 100), start=210, end=330, fill="#7faa62", width=5)

    return Image.alpha_composite(image, overlay)


def level_tile(image, box, title, subtitle, theme, current=False, locked=False):
    image = theme_background(image, box, theme)
    if current:
        glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        x1, y1, x2, y2 = box
        gd.rounded_rectangle((x1 - 8, y1 - 8, x2 + 8, y2 + 8), radius=38, outline=hex_rgba(COLORS["accent"], 150), width=5)
        glow = glow.filter(ImageFilter.GaussianBlur(4))
        image = Image.alpha_composite(image, glow)
        image = theme_background(image, box, theme)
    if locked:
        veil = Image.new("RGBA", image.size, (0, 0, 0, 0))
        vd = ImageDraw.Draw(veil)
        vd.rounded_rectangle(box, radius=30, fill=(245, 241, 234, 110))
        image = Image.alpha_composite(image, veil)

    draw = ImageDraw.Draw(image)
    x1, y1, x2, y2 = box
    draw.text((x1 + 22, y1 + 28), title, font=font(24, bold=True), fill=COLORS["text"])
    draw.text((x1 + 22, y1 + 78), subtitle, font=font(19, bold=True), fill=COLORS["muted"])
    return image


def save_phone(name, painter):
    image = make_canvas(PHONE_W, PHONE_H)
    draw = ImageDraw.Draw(image)
    draw.text((88, 80), "TRƯỜNG ĐIỂM TA9", font=font(28, bold=True), fill=COLORS["highlight"])
    painter(image, draw)
    image.convert("RGB").save(OUTPUT / f"{name}.png", quality=95)


def screen_home(image, draw):
    draw_wrapped(draw, "Mở dần từng unit để tiến bộ vững hơn mỗi ngày.", (88, 180), 880, font(78, bold=True), COLORS["text"], 0)
    draw.text((88, 432), "Học đúng trọng tâm, sửa đúng lỗi sai và nhìn rõ tiến độ của em.", font=font(32), fill=COLORS["muted"])
    rounded_card(draw, (56, 520, 1024, 1328), COLORS["surface"])
    draw.text((96, 590), "BẢN ĐỒ CẤP ĐỘ", font=font(24, bold=True), fill=COLORS["highlight"])
    level_tile(image, (88, 668, 272, 826), "Unit 1", "Đã vượt ải", "local")
    draw.rounded_rectangle((272, 744, 318, 750), radius=3, fill="#85bca0")
    level_tile(image, (330, 660, 514, 818), "Unit 2", "Đang mở", "city", current=True)
    draw.rounded_rectangle((514, 736, 560, 742), radius=3, fill="#d9d2c9")
    level_tile(image, (572, 668, 756, 826), "Unit 3", "Đang khóa", "health", locked=True)
    draw.rounded_rectangle((756, 744, 802, 750), radius=3, fill="#d9d2c9")
    level_tile(image, (814, 668, 998, 826), "Unit 4", "Đang khóa", "past", locked=True)
    level_tile(image, (452, 888, 636, 1046), "Unit 5", "Đang khóa", "experience", locked=True)
    draw.text((96, 1120), "Unit đang mở: Unit 2. City Life", font=font(34, bold=True), fill=COLORS["text"])
    draw_wrapped(draw, "Hoàn thành bộ ôn tập tổng hợp và đạt ít nhất 80% ở mọi kỹ năng để mở unit tiếp theo.", (96, 1178), 820, font(26), COLORS["muted"], 6)
    button(draw, (88, 1368, 410, 1464), "Tiếp tục học", True)
    button(draw, (438, 1368, 690, 1464), "Hồ sơ", False)


def screen_unit(image, draw):
    draw.text((88, 182), "Unit 2. City Life", font=font(76, bold=True), fill=COLORS["text"])
    draw_wrapped(draw, "Học từ vựng, so sánh, giao thông và cách nói về ưu nhược điểm của cuộc sống thành phố.", (88, 300), 900, font(32), COLORS["muted"], 8)
    rounded_card(draw, (56, 456, 1024, 790), COLORS["surface"])
    draw.text((96, 528), "THÔNG TIN UNIT", font=font(24, bold=True), fill=COLORS["highlight"])
    draw.text((96, 618), "4 ý chính • 3 bộ luyện • 1 bộ chốt cấp độ", font=font(34, bold=True), fill=COLORS["text"])
    draw_wrapped(draw, "Tiếp tục học theo từng bước, rồi sang kiểm tra để biết mình còn yếu ở đâu.", (96, 684), 820, font(26), COLORS["muted"], 6)
    button(draw, (88, 848, 320, 944), "Học", True)
    button(draw, (344, 848, 604, 944), "Kiểm tra", False)
    button(draw, (628, 848, 924, 944), "Đánh giá", False)
    rounded_card(draw, (56, 1010, 1024, 1640), COLORS["surface"])
    draw.text((96, 1082), "LỘ TRÌNH BÀI HỌC", font=font(24, bold=True), fill=COLORS["highlight"])
    for idx, label in enumerate([
        "1. Từ vựng và chủ điểm thành phố",
        "2. So sánh và nêu quan điểm",
        "3. Ôn tập và vượt bài chốt",
    ]):
        y = 1150 + idx * 118
        fill = "#edf4ff" if idx == 0 else "#fffaf1"
        rounded_card(draw, (96, y, 984, y + 92), fill)
        draw.text((132, y + 28), label, font=font(30, bold=True), fill=COLORS["text"])


def screen_quiz(image, draw):
    draw_wrapped(draw, "Làm bài ngắn để biết em đang mạnh và yếu ở đâu.", (88, 182), 900, font(70, bold=True), COLORS["text"], 2)
    rounded_card(draw, (56, 440, 1024, 1710), COLORS["surface"])
    draw.text((96, 512), "BỘ KIỂM TRA", font=font(24, bold=True), fill=COLORS["highlight"])
    draw.text((96, 588), "Bộ câu hỏi 2", font=font(42, bold=True), fill=COLORS["text"])
    draw.text((842, 592), "3/10 câu", font=font(28, bold=True), fill=COLORS["muted"])
    draw_wrapped(draw, "City life can be convenient, ____ it can also be stressful.", (96, 674), 860, font(34, bold=True), COLORS["text"], 6)
    options = [("A. but", False), ("B. because", True), ("C. so", False), ("D. or", False)]
    for idx, (label, active) in enumerate(options):
        y = 774 + idx * 132
        fill = "#ffefe0" if active else "#fffaf1"
        outline = "#e8b28f" if active else COLORS["line"]
        draw.rounded_rectangle((96, y, 984, y + 104), radius=28, fill=fill, outline=outline, width=3 if active else 2)
        draw.text((136, y + 32), label, font=font(32, bold=True), fill=COLORS["text"])
    button(draw, (712, 1740, 984, 1836), "Nộp bài", True)


def screen_result(image, draw):
    draw_wrapped(draw, "Thấy ngay lỗi sai, gợi ý và mẹo nhớ sau mỗi lần làm bài.", (88, 182), 900, font(68, bold=True), COLORS["text"], 2)
    rounded_card(draw, (56, 446, 1024, 690), COLORS["surface"])
    draw.text((96, 520), "80%", font=font(58, bold=True), fill=COLORS["text"])
    draw.text((96, 590), "8/10 câu đúng • 2 kỹ năng cần ưu tiên", font=font(28), fill=COLORS["muted"])
    draw.text((680, 548), "Ôn tập đến hạn: 2", font=font(30, bold=True), fill=COLORS["highlight"])
    rounded_card(draw, (56, 724, 1024, 1176), COLORS["surface"])
    draw.text((96, 798), "Điểm yếu cần sửa ngay", font=font(34, bold=True), fill=COLORS["text"])
    rounded_card(draw, (96, 850, 500, 1086), "#edf4ff")
    rounded_card(draw, (524, 850, 984, 1086), "#edf8ee")
    draw.text((128, 920), "Cấu trúc câu", font=font(30, bold=True), fill=COLORS["text"])
    draw.text((128, 978), "2 câu sai • ôn lại hôm nay", font=font(24), fill=COLORS["muted"])
    draw.text((556, 920), "Giới từ và cụm từ", font=font(30, bold=True), fill=COLORS["text"])
    draw.text((556, 978), "1 câu sai • gợi ý luyện tiếp", font=font(24), fill=COLORS["muted"])
    rounded_card(draw, (56, 1208, 1024, 1740), COLORS["surface"])
    draw.text((96, 1280), "Giải thích thêm", font=font(34, bold=True), fill=COLORS["text"])
    draw.text((96, 1360), "Em sai ở: Cấu trúc câu", font=font(28), fill=COLORS["muted"])
    draw.text((96, 1438), "Vì sao sai:", font=font(30, bold=True), fill=COLORS["text"])
    draw_wrapped(draw, 'Câu này cần liên từ nối hai ý đối lập nên đáp án đúng là "but".', (96, 1488), 860, font(26), COLORS["muted"], 6)
    draw.text((96, 1588), "Mẹo nhớ:", font=font(30, bold=True), fill=COLORS["text"])
    draw_wrapped(draw, "Khi hai vế mang ý trái nhau, hãy kiểm tra các từ nối như but, however.", (96, 1638), 860, font(26), COLORS["muted"], 6)


def screen_review(image, draw):
    draw_wrapped(draw, "Ôn lại đúng kỹ năng đến hạn để nhớ chắc hơn mỗi ngày.", (88, 182), 900, font(68, bold=True), COLORS["text"], 2)
    rounded_card(draw, (56, 452, 1024, 1708), COLORS["surface"])
    draw.text((96, 524), "ÔN TẬP THEO SRS", font=font(24, bold=True), fill=COLORS["highlight"])
    rounded_card(draw, (96, 590, 984, 860), "#edf4ff")
    draw.text((136, 668), "Cấu trúc câu", font=font(34, bold=True), fill=COLORS["text"])
    draw.text((136, 728), "Chu kỳ hiện tại: 3 ngày • số lần nhớ lại: 2", font=font(26), fill=COLORS["muted"])
    draw.text((136, 780), "Em đã trả lời đúng nhưng cần củng cố thêm.", font=font(26), fill=COLORS["muted"])
    rounded_card(draw, (96, 892, 984, 1162), "#f1fbe9")
    draw.text((136, 970), "Đọc hiểu", font=font(34, bold=True), fill=COLORS["text"])
    draw.text((136, 1030), "Chu kỳ hiện tại: 1 ngày • số lần nhớ lại: 0", font=font(26), fill=COLORS["muted"])
    draw.text((136, 1082), "Em vẫn còn nhầm ở kỹ năng này.", font=font(26), fill=COLORS["muted"])
    rounded_card(draw, (96, 1194, 984, 1590), COLORS["surface"])
    draw.text((136, 1270), "Gợi ý cho hôm nay", font=font(34, bold=True), fill=COLORS["text"])
    draw_wrapped(draw, "Ôn 2 kỹ năng đến hạn rồi làm lại 1 bộ ngắn để củng cố.", (136, 1340), 760, font(28), COLORS["muted"], 8)
    button(draw, (666, 1732, 984, 1828), "Vào làm bài ôn", True)


def screen_progress(image, draw):
    draw_wrapped(draw, "Theo dõi tiến độ để biết mình đang tiến bộ đến đâu.", (88, 182), 900, font(70, bold=True), COLORS["text"], 2)
    rounded_card(draw, (56, 446, 1024, 1660), COLORS["surface"])
    draw.text((96, 518), "TIẾN ĐỘ HỌC TẬP", font=font(24, bold=True), fill=COLORS["highlight"])
    stats = [
        ((96, 572, 360, 804), "#fff1e2", "Hoàn thành học", "2/5"),
        ((384, 572, 648, 804), "#eefaf2", "Điểm trung bình", "84%"),
        ((672, 572, 984, 804), "#eef4ff", "Cần ưu tiên", "Đọc hiểu"),
    ]
    for box, fill, label, value in stats:
        rounded_card(draw, box, fill)
        x1, y1, x2, _ = box
        draw.text((x1 + 28, y1 + 44), label, font=font(28, bold=True), fill=COLORS["text"])
        draw.text((x1 + 28, y1 + 118), value, font=font(54, bold=True), fill=COLORS["text"])
    draw.text((96, 900), "Đường tiến bộ", font=font(34, bold=True), fill=COLORS["text"])
    points = [(124, 1260), (320, 1174), (516, 1092), (716, 1002), (912, 904)]
    draw.line(points, fill=COLORS["accent"], width=10, joint="curve")
    for px, py in points:
        draw.ellipse((px - 10, py - 10, px + 10, py + 10), fill=COLORS["accent"])
    draw_wrapped(draw, "Mỗi lần học giúp em thấy rõ hơn mình đang mạnh lên ở đâu.", (96, 1392), 820, font(28), COLORS["muted"], 8)


def feature_graphic():
    image = make_canvas(FEATURE_W, FEATURE_H)
    draw = ImageDraw.Draw(image)
    draw.text((56, 56), "TRƯỜNG ĐIỂM TA9", font=font(22, bold=True), fill=COLORS["highlight"])
    draw.text((56, 122), "Mở dần từng unit.\nTiến bộ từng ngày.", font=font(54, bold=True), fill=COLORS["text"], spacing=4)
    draw.text((58, 284), "Học đúng trọng tâm • Sửa đúng lỗi sai • Ôn đúng điểm yếu", font=font(24), fill=COLORS["muted"])
    level_tile(image, (620, 90, 770, 222), "Unit 1", "Đã vượt ải", "local")
    level_tile(image, (788, 80, 938, 212), "Unit 2", "Đang mở", "city", current=True)
    level_tile(image, (704, 244, 854, 376), "Unit 3", "Đang khóa", "health", locked=True)
    image.convert("RGB").save(OUTPUT / "feature-graphic-1024x500.png", quality=95)


save_phone("01-home-level-map-1080x1920", screen_home)
save_phone("02-unit-overview-1080x1920", screen_unit)
save_phone("03-quiz-1080x1920", screen_quiz)
save_phone("04-result-feedback-1080x1920", screen_result)
save_phone("05-review-srs-1080x1920", screen_review)
save_phone("06-progress-1080x1920", screen_progress)
feature_graphic()

print(f"Generated phone screenshots and feature graphic in {OUTPUT}")
