VIETTECH - WEBSITE THƯƠNG MẠI ĐIỆN TỬ (GIAO DIỆN DEMO)
=====================================================

Cách chạy:
1. Giải nén thư mục.
2. Mở index.html bằng trình duyệt.
3. Sửa danh sách sản phẩm và giá trong js/app.js.

Tính năng:
- Giao diện công nghệ hiện đại, nội dung tiếng Việt.
- Giá hiển thị bằng Đồng Việt Nam (VND).
- Ảnh sản phẩm dạng chụp thực tế, tải từ Unsplash qua kết nối Internet.
- Lọc danh mục, thêm/xóa sản phẩm, thay đổi số lượng.
- Lưu giỏ hàng bằng localStorage.
- Khi thanh toán, yêu cầu đăng nhập Google trước.

CẤU HÌNH GOOGLE SIGN-IN:
- Tạo OAuth 2.0 Client ID loại Web trong Google Cloud Console.
- Khai báo domain website trong Authorized JavaScript origins.
- Thay YOUR_GOOGLE_CLIENT_ID trong js/app.js bằng Client ID.
- Cần backend xác minh ID token trước khi tạo phiên đăng nhập/đơn hàng.
- Không bao giờ thu thập hoặc lưu mật khẩu Gmail. Google xử lý mật khẩu trên trang đăng nhập chính thức của Google.

LƯU Ý:
Đây mới là bản giao diện/front-end demo. Chưa có backend, xác minh token phía máy chủ,
quản lý đơn hàng, tồn kho, cổng thanh toán hoặc tính phí vận chuyển thực tế.
Email liên hệ support@viettech.example là địa chỉ mẫu, cần thay bằng email thật.

THONG TIN LIEN HE DA CAP NHAT:
Dia chi: Tang 3, so 383 Vo Van Tan, Phuong Ban Co, TP. Ho Chi Minh.
Hotline: 0941 354 227.
