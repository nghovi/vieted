import fs from "node:fs/promises";
import path from "node:path";

const pdfPath = path.resolve(
  process.cwd(),
  "../../books/Tieng_Anh_9_Global_success.pdf",
);

export async function GET() {
  const fileBuffer = await fs.readFile(pdfPath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Tieng-Anh-9-Global-Success.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
