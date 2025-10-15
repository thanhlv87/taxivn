# Taxi Việt Nam - Ứng dụng tìm kiếm và gọi taxi

Ứng dụng web giúp người dùng tìm kiếm và gọi taxi nhanh chóng tại 34 tỉnh thành Việt Nam.

## Tính năng

- 🔍 **Tìm kiếm theo tỉnh**: Chọn tỉnh/thành phố từ menu dropdown để xem danh sách các hãng taxi
- 📍 **Định vị tự động**: Sử dụng GPS để tự động xác định vị trí và hiển thị taxi tại tỉnh hiện tại
- 📞 **Gọi taxi trực tiếp**: Bấm nút "Gọi ngay" để gọi điện thoại trực tiếp đến hãng taxi
- 📱 **Giao diện di động**: Tối ưu hóa hoàn hảo cho điện thoại di động
- 🚖 **Thông tin chi tiết**: Hiển thị tên hãng taxi và số điện thoại liên hệ

## Công nghệ

- **Frontend**: Next.js 15 với TypeScript
- **Styling**: Tailwind CSS và shadcn/ui
- **API**: Next.js API Routes
- **Responsive**: Mobile-first design

## Cách sử dụng

1. **Chọn tỉnh**: Sử dụng menu dropdown để chọn tỉnh/thành phố bạn muốn tìm taxi
2. **Hoặc định vị**: Bấm nút "Định vị" để tự động xác định vị trí hiện tại
3. **Xem danh sách**: Các hãng taxi sẽ hiển thị dưới dạng thẻ với thông tin chi tiết
4. **Gọi taxi**: Bấm nút "Gọi ngay" trên thẻ taxi để gọi điện thoại trực tiếp

## Danh sách tỉnh thành hỗ trợ

Ứng dụng hỗ trợ 34 tỉnh thành trên toàn quốc, bao gồm:
- Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Hải Phòng, Cần Thơ
- Và 29 tỉnh thành khác

## Triển khai

Ứng dụng được thiết kế để triển khai trên các nền tảng hosting tĩnh:
- GitHub Pages
- Cloudflare Pages
- Vercel
- Netlify

## Lưu ý

- Ứng dụng yêu cầu kết nối internet để gọi API
- Tính năng định vị yêu cầu quyền truy cập vị trí trên trình duyệt
- Số điện thoại được định dạng để gọi trực tiếp từ thiết bị di động

## License

MIT License