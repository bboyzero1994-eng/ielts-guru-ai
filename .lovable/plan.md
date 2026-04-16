

## Đánh giá App IELTS Speaking - Góc nhìn Senior Dev & Người học IELTS

---

### PROS (Điểm tốt)

1. **Core flow hoạt động**: Chọn Part → Nói → Transcribe → AI chấm 4 tiêu chí → Xem kết quả. Đây là flow cơ bản đúng.
2. **Gamification cơ bản**: Streak, XP, level system, confetti — tạo động lực ban đầu.
3. **AI scoring chất lượng**: Dùng Gemini với structured output (tool calling), prompt rõ ràng theo từng Part.
4. **Part 2 có prep time**: Đúng format thi thật (60s chuẩn bị).
5. **UI tươi sáng, font Nunito**: Thân thiện, không gây áp lực.

### CONS (Vấn đề nghiêm trọng)

**Về UX cho người học IELTS thực tế:**

1. **Không có hướng dẫn trước khi nói**: Người mới hoàn toàn không biết nói gì, nói bao lâu, cấu trúc câu trả lời ra sao. App thiếu "coaching layer" — tips ngắn trước mỗi câu hỏi.
2. **Part 1 không có nhóm follow-up questions**: IELTS Part 1 thật thường hỏi 3-4 câu liên tiếp cùng topic. App hiện tại mỗi câu đứng riêng lẻ — không giống trải nghiệm thi thật.
3. **Không track câu nào đã làm**: Vào Practice thấy danh sách dài, không biết câu nào đã luyện, điểm bao nhiêu. Gây overwhelm.
4. **Không có daily goal / reminder**: Không có lý do để quay lại mỗi ngày. Streak chỉ hiển thị nhưng không có push notification hay daily target.
5. **Speech recognition quá phụ thuộc browser**: Web Speech API không hoạt động trên Firefox, nhiều mobile browser. Không có fallback tốt (chỉ có textarea nhưng gõ thì mất ý nghĩa luyện speaking).
6. **Không có audio playback**: Người học muốn nghe lại giọng mình để tự đánh giá. Hiện tại chỉ có text transcript.
7. **Sample answer chỉ hiển thị text**: Không highlight được từ vựng hay, cấu trúc câu mẫu để người học "absorb".
8. **History page quá đơn giản**: Không có trend line, không thấy mình tiến bộ ở tiêu chí nào.
9. **Không có bottom navigation**: User phải bấm back liên tục, không có cách nhanh để jump giữa Home / Practice / History.
10. **40 câu hỏi là quá ít**: Người luyện nghiêm túc sẽ hết câu trong 1-2 tuần.

**Về Technical:**

11. **localStorage sẽ mất data**: Clear browser = mất hết lịch sử. Không có export/backup.
12. **Không có loading state cho trang Practice**: Danh sách câu hỏi render ngay nhưng không có skeleton.
13. **Recording không có time limit**: Part 1 nên ~30-60s, Part 2 nên 2 phút. Hiện tại đếm lên vô hạn.
14. **Pronunciation score không đáng tin**: AI chấm pronunciation từ TEXT, không từ audio. Cần disclaimer rõ ràng.

---

### Người mới học IELTS Speaking THẬT SỰ CẦN GÌ?

1. **Biết mình đang ở đâu**: Diagnostic test ban đầu, target band rõ ràng
2. **Hướng dẫn cách trả lời**: Tips framework (PEEL, STAR) trước khi nói
3. **Luyện từng tiêu chí riêng**: "Hôm nay focus Lexical Resource" — có vocabulary suggestions
4. **Nghe lại bản thân**: Audio recording + playback
5. **So sánh với model answer**: Highlight differences
6. **Thấy tiến bộ rõ ràng**: Chart trend cho từng tiêu chí qua thời gian
7. **Daily routine ngắn gọn**: 10-15 phút/ngày, 3-5 câu, không overwhelm
8. **Vocabulary bank**: Từ vựng hay từ sample answers được save lại

---

### KẾ HOẠCH CẢI THIỆN (Chia theo priority)

#### Phase 1: Critical UX Fixes (Retention killers)

| # | Task | Mục đích |
|---|------|----------|
| 1 | **Bottom navigation bar** (Home / Practice / History) | Giảm friction di chuyển giữa các trang |
| 2 | **Track trạng thái câu hỏi** trong Practice list (chưa làm / đã làm / điểm) | Người dùng biết mình đang ở đâu |
| 3 | **Speaking tips trước mỗi câu hỏi** — modal/drawer ngắn gọn với framework gợi ý | Giúp người mới không bị "blank" khi mic bật |
| 4 | **Recording time limit** — auto-stop sau 60s (Part 1), 120s (Part 2), 90s (Part 3) với warning ở 10s cuối | Giống thi thật, tạo áp lực tích cực |
| 5 | **Audio recording + playback** — dùng MediaRecorder API song song với speech recognition | Người học nghe lại giọng mình |
| 6 | **Pronunciation disclaimer** — thêm note nhỏ "Pronunciation score is estimated from text only" | Trung thực với người dùng |

#### Phase 2: Engagement & Retention

| # | Task | Mục đích |
|---|------|----------|
| 7 | **Daily Goal system** — target "3 câu/ngày", progress ring trên Dashboard | Lý do quay lại mỗi ngày |
| 8 | **"Quick Practice" button** trên Home — random 1 câu, bắt đầu ngay | Giảm friction tới mức tối thiểu |
| 9 | **Progress chart theo tiêu chí** — line chart 4 criteria qua thời gian trên History | Thấy rõ tiến bộ |
| 10 | **Highlight vocabulary & grammar** trong sample answer — bold từ vựng band 7+, underline cấu trúc hay | Học được từ model answer |
| 11 | **Part 1 question grouping** — 3-4 câu follow-up cùng topic, luyện liên tiếp như thi thật | Realistic practice |
| 12 | **Onboarding flow** — chọn target band, current level, daily time commitment | Personalize trải nghiệm |

#### Phase 3: Stickiness & Growth

| # | Task | Mục đích |
|---|------|----------|
| 13 | **Vocabulary bank** — save từ hay từ sample answers, review flashcard style | Học sâu hơn |
| 14 | **Mock test mode** — Part 1 (4-5 câu) → Part 2 (cue card) → Part 3 (3-4 câu) liên tục, tổng ~11-14 phút | Trải nghiệm thi thật |
| 15 | **Achievement badges** — "First Part 2 completed", "5-day streak", "Band 7 reached" | Gamification sâu hơn |
| 16 | **Export/Share results** — ảnh summary đẹp để share lên social | Organic growth |
| 17 | **Thêm 50+ câu hỏi mới** — đặc biệt Part 2, 3 từ đề thi gần đây | Content mới để quay lại |
| 18 | **Data backup to cloud** — sync lịch sử lên database (cần auth) | Không mất data |

---

### Technical Implementation Notes

- **Audio recording**: MediaRecorder API chạy song song với SpeechRecognition, lưu blob URL trong PracticeResult, playback bằng `<audio>` element
- **Bottom nav**: Fixed bottom bar component, dùng `useLocation` để highlight active tab
- **Question status tracking**: Thêm field `completedQuestionIds: string[]` và `questionScores: Record<string, number>` vào UserProgress
- **Daily goal**: Thêm `dailyGoal: number` vào UserProgress, progress ring component trên Dashboard
- **Criteria trend chart**: Dùng Recharts LineChart, aggregate scores theo ngày cho mỗi tiêu chí
- **Time limits**: Map `{ 1: 60, 2: 120, 3: 90 }`, countdown timer thay vì count up, auto-submit khi hết giờ

Bạn muốn tôi bắt đầu implement từ Phase nào?

