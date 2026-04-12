
## IELTS Speaking Practice App

### Tổng quan
App luyện tập IELTS Speaking với giao diện gamified kiểu Duolingo, sử dụng mic để ghi âm → transcribe → AI chấm điểm 4 tiêu chí. Dữ liệu lưu local storage.

### Trang chính

**1. Home / Dashboard**
- Streak tracker (số ngày liên tục luyện tập) với flame icon animation
- Progress bar tổng thể (level system: Beginner → Intermediate → Advanced)
- Thống kê hôm nay: số câu đã luyện, điểm trung bình
- Weekly chart (biểu đồ 7 ngày gần nhất)
- XP points & level badge

**2. Practice Page**
- Chọn Part (1, 2, 3) với cards sinh động
- Mỗi part có bộ câu hỏi hardcoded phổ biến (~15-20 câu/part)
- Part 2 sẽ hiển thị cue card đầy đủ (topic + bullet points + time)
- Nút "Start" → yêu cầu quyền mic → bắt đầu ghi âm
- Hiển thị timer đếm ngược/đếm lên
- Real-time transcription hiển thị trong ô Answer
- Nút "Done" → dừng ghi âm → gửi transcript cho AI chấm điểm

**3. Scoring / Results Page**
- Hiển thị điểm 4 tiêu chí IELTS Speaking:
  - Fluency & Coherence
  - Lexical Resource
  - Grammatical Range & Accuracy
  - Pronunciation
- Band score tổng (0-9)
- Feedback chi tiết cho từng tiêu chí
- Sample answer gợi ý
- Nút "Try Again" hoặc "Next Question"
- Animation congratulations khi đạt điểm cao

**4. History Page**
- Danh sách các bài đã luyện (ngày, part, câu hỏi, điểm)
- Filter theo Part, theo ngày
- Xem lại chi tiết từng bài

### Tech
- **Speech-to-Text**: Web Speech API (browser built-in, miễn phí)
- **AI Scoring**: Lovable AI (edge function) để phân tích và chấm điểm
- **Storage**: localStorage cho lịch sử, streak, XP
- **UI**: Tailwind + animations, màu sắc tươi sáng, badges, confetti effects
- **Câu hỏi**: Hardcoded ~50 câu hỏi IELTS Speaking phổ biến (Part 1, 2, 3)
