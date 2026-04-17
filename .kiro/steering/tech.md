# Tech Stack

순수 HTML/CSS/JS 기반 정적 웹 포털 (상담어드바이저 포털)

## Build & Run Commands

- 별도 빌드 불필요. index.html을 브라우저에서 직접 열기.
- VS Code Live Server 또는 `npx serve .` 로 로컬 서버 실행 가능.

## Libraries & Frameworks

- **Pretendard** (CDN) — 본문 폰트
- **Chart.js 4.4.1** (CDN) — 라인 차트 렌더링

## 파일 구조

- `index.html` — 메인 SPA (모든 화면 포함)
- `styles.css` — 전체 스타일시트
- `app.js` — 네비게이션, 탭, 차트 초기화 등 JS 로직
- `design/pages/` — 피그마 스크린샷 레퍼런스

## Notes

- 단일 HTML 파일 SPA 방식. 화면 전환은 JS로 view 토글.
- 백엔드 API 없이 정적 더미 데이터로 구현.
