import fs from "node:fs/promises";
import path from "node:path";

const pdfPath = path.resolve(
  process.cwd(),
  "../../books/Toan_lop_9_Tap_1_Ket_noi_tri_thuc.pdf",
);

export async function GET() {
  const fileBuffer = await fs.readFile(pdfPath);

  return new Response(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="Toan-lop-9-Tap-1-Ket-noi-tri-thuc.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
