# Trang Web Làm Bài Trắc Nghiệm - Điện Toán Đám Mây

## Hướng dẫn sử dụng

### 1. Mở trang web
- Mở file `index.html` bằng trình duyệt web (Chrome, Firefox, Edge, Safari...)
- Hoặc double-click vào file `index.html`

### 2. Làm bài thi
- Đọc câu hỏi và chọn đáp án
- Sử dụng nút "Câu trước" và "Câu sau" để di chuyển giữa các câu
- Thời gian làm bài: 60 phút
- Số câu hỏi: 20 câu

### 3. Nộp bài
- Nhấn nút "Nộp bài" khi hoàn thành
- Xem kết quả và đáp án chi tiết
- Có thể làm lại bằng nút "Làm lại"

## Tính năng

✅ Giao diện đẹp, responsive
✅ Đếm ngược thời gian
✅ Hiển thị số câu đã trả lời
✅ Tính điểm tự động
✅ Xem lại đáp án chi tiết
✅ Làm lại bài thi

## Tùy chỉnh câu hỏi

Để thêm/sửa câu hỏi, mở file `questions.js` và chỉnh sửa mảng `quizData`:

```javascript
{
    question: "Câu hỏi của bạn?",
    options: [
        "Đáp án A",
        "Đáp án B", 
        "Đáp án C",
        "Đáp án D"
    ],
    correct: 0  // Index của đáp án đúng (0=A, 1=B, 2=C, 3=D)
}
```

## Cấu trúc file

```
├── index.html       # Trang chính
├── style.css        # Giao diện
├── script.js        # Logic xử lý
├── questions.js     # Dữ liệu câu hỏi
└── README.md        # Hướng dẫn
```

## Lưu ý

- Trang web hoạt động offline, không cần Internet
- Dữ liệu không được lưu khi tải lại trang
- Tương thích với mọi trình duyệt hiện đại
