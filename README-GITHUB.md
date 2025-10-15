# Taxi Việt Nam - Deploy trên GitHub Pages

## 🚀 Hướng dẫn triển khai

### Bước 1: Tạo Repository trên GitHub

1. Vào [GitHub](https://github.com) và tạo repository mới
2. Đặt tên: `taxi-vietnam`
3. Chọn **Public** (miễn phí)
4. **Không** chọn "Add a README file" (vì đã có sẵn)

### Bước 2: Push code lên GitHub

```bash
# Thay đổi URL repository của bạn
git remote set-url origin https://github.com/TEN_TAI_KHOAN/taxi-vietnam.git

# Add tất cả file
git add .

# Commit
git commit -m "Initial commit - Taxi Vietnam App"

# Push lên GitHub
git push -u origin main
```

### Bước 3: Cấu hình GitHub Pages

1. Vào repository của bạn trên GitHub
2. Click **Settings** tab
3. Scroll xuống **Pages** section
4. Trong **Source**, chọn **GitHub Actions**

### Bước 4: Kiểm tra Deployment

1. Vào **Actions** tab
2. Chờ workflow chạy hoàn tất (khoảng 2-3 phút)
3. Sau khi thành công, vào **Settings > Pages**
4. Click vào link để xem ứng dụng

## 📱 URL sau khi deploy

Ứng dụng sẽ có dạng:
```
https://TEN_TAI_KHOAN.github.io/taxi-vietnam/
```

## 🔧 Cấu hình đã có sẵn

- ✅ Next.js static export
- ✅ GitHub Actions workflow
- ✅ Favicon và PWA icons
- ✅ Responsive design
- ✅ SEO metadata

## 🌐 Tính năng

- 🔍 Tìm taxi theo 34 tỉnh thành
- 📍 Định vị GPS tự động
- 📞 Gọi taxi trực tiếp
- 📱 Responsive hoàn hảo
- 🎨 Logo chuyên nghiệp

## 📄 License

MIT License - © 2025 Taxi Vietnam. Powered by ThanhLV87 & Z.ai