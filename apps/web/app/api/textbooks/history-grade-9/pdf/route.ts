import fs from "node:fs/promises";
import path from "node:path";

const pdfPath = path.resolve(
  process.cwd(),
  "../../books/Lich_su_va_Dia_li_9_-_Ket_noi_tri_thuc.pdf",
);

export async function GET() {
  const fileBuffer = await fs.readFile(pdfPath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Lich_su_va_Dia_li_9_-_Ket_noi_tri_thuc.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
