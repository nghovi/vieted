import fs from "node:fs/promises";
import path from "node:path";

const pdfPath = path.resolve(
  process.cwd(),
  "../../books/SGK Lịch sử và Địa lí 9 Cánh diều.pdf",
);

export async function GET() {
  const fileBuffer = await fs.readFile(pdfPath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="SGK-Lich-su-va-Dia-li-9-Canh-dieu.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
