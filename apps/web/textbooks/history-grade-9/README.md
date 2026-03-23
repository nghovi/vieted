# Nhập nội dung sách giáo khoa Lịch sử 9

Đặt mỗi chương vào một tệp `.txt` trong thư mục này, với tên tệp trùng `chapter_id`:

- `chuong-1-the-gioi-1918-1945.txt`
- `chuong-2-viet-nam-1918-1945.txt`
- `chuong-3-the-gioi-1945-1991.txt`
- `chuong-4-viet-nam-1945-1991.txt`
- `chuong-5-the-gioi-tu-1991-den-nay.txt`
- `chuong-6-viet-nam-tu-1991-den-nay.txt`
- `chuong-7-cach-mang-khoa-hoc-ki-thuat-va-toan-cau-hoa.txt`

Sau khi thêm tệp, chạy:

`npm run db:import-textbook --workspace web`

Khi đó trang `Học` sẽ tự ưu tiên hiển thị nội dung chương đầy đủ từ cơ sở dữ liệu.
