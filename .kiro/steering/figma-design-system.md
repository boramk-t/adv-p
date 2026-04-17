# 피그마 디자인 시스템 가이드

이 문서는 피그마 소스에서 추출한 UI 디자인 시스템 규격입니다. 구현 시 반드시 이 가이드를 따릅니다.

## 기본 설정

- 폰트: Pretendard (본문), Geist (제목 일부)
- 기본 배경: #FFFFFF
- 콘텐츠 영역 너비: 1152px (패딩 16px 포함 시 1184px)
- 콘텐츠 패딩: 16px 16px 80px
- 기본 gap: 16px

## 컬러 팔레트

### 브랜드 컬러
- Primary: #7732F8
- Primary Hover/Active: #8B5CF6, #A78BFA
- Primary Light: #DDD6FE, #C4B5FD
- Secondary (홈): #FF009A

### 텍스트 컬러
- 기본 텍스트: #020617
- 보조 텍스트: #64748B
- 비활성 텍스트: #737373
- 흰색 텍스트: #F8FAFC

### 상태 컬러
- 에러/감소: #EF4444 (텍스트), #DC2626 (배지/버튼)
- 성공/증가: #3B82F6
- 필수 표시(*): #DC2626

### 배경/보더
- 보더: #E2E8F0
- 배경 (슬레이트): #F1F5F9
- 그림자 xs: 0px 1px 2px rgba(0, 0, 0, 0.05)
- 그림자 sm: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)
- 그림자 lg: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)

## 타이포그래피

| 용도 | 크기 | 두께 | 행간 |
|------|------|------|------|
| heading-sm | 24px | 600 (Geist) | 32px |
| text-3xl (도넛 차트 중앙) | 30px | 700 | 36px |
| text-2xl (카드 수치) | 24px | 700 | 32px |
| text-base (카드 타이틀) | 16px | 600 | 16px (100%) |
| text-sm (본문) | 14px | 400 | 20px |
| text-sm medium | 14px | 500 | 20px |
| text-sm semibold | 14px | 600 | 20px |
| text-xs (범례/보조) | 12px | 400 | 16px |
| text-xs medium | 12px | 500 | 16px |

## 컴포넌트 규격

### Sidebar (사이드바 / LNB)
- 전체 너비: 256px, 높이: 100vh
- 배경: #FFFFFF, border-right: 1px solid #E2E8F0
- 구조: SidebarHeader(56px) + SidebarContent(flex-grow) + SidebarFooter(128px)

#### SidebarHeader
- 높이: 56px, padding: 12px 8px
- 로고 버튼: 240px × 36px, border-radius 8px, gap 8px
- 로고 아이콘: 32x32, 배경 #F1F5F9, border-radius 10px
- 로고 텍스트: 16px semibold #020617, line-height 24px

#### SidebarContent
- flex-direction: column, gap: 8px
- SidebarGroup: padding 8px
- SidebarGroupLabel: padding 0 8px, 높이 32px, opacity 0.7, 12px medium #020617
- SidebarMenu: padding 4px 0, gap 4px

#### SidebarMenuButton
- 너비: 240px, 높이: 32px, padding 8px, gap 8px, border-radius 8px
- 아이콘: 16x16, border 1.5px solid #020617
- 텍스트(비활성): 14px normal #020617
- 텍스트(활성): 14px medium #171717
- 활성 배경: #F5F5F5
- CollapseIcon: 16x16 (접기/펼치기, 기본 숨김)

#### SidebarMenuSub (서브메뉴)
- padding: 4px 24px (또는 2px 24px), gap 4px
- 기본 숨김 (display: none), 펼침 시 표시

#### SidebarFooter
- 높이: 128px, padding 8px, gap 8px
- 공지사항 메뉴: SidebarMenuButton 동일 규격
- 사용자 프로필 버튼: 240px × 48px, border-radius 8px
  - 아바타: 32x32, border-radius 10px
  - 이름: 14px semibold #020617
  - 소속: 12px normal #020617
  - CollapseIcon(ChevronsUpDown): 16x16, border 1.5px solid #020617

### Common Header (공통 헤더)
- 높이: 56px, padding: 12px 16px, gap 20px
- 배경: #FFFFFF, border-bottom: 1px solid #E2E8F0
- Breadcrumb 타이틀: 16px semibold #020617, line-height 24px
- Breadcrumb 상위 경로: 16px normal #64748B (비활성)
- 구분자: ChevronRight 15x15, border 1.33px solid #64748B

### Tabs (탭)
- 컨테이너: 200px 너비, 36px 높이, padding 3px
- 배경: #F1F5F9, border-radius: 10px
- 활성 트리거: 배경 #FFFFFF, shadow sm, border-radius 8px
- 비활성 트리거: 배경 투명, border-radius 8px
- 텍스트: 14px medium, #020617

### Card (카드)
- 보더: 1px solid #E2E8F0
- border-radius: 14px (대형), 10px (소형/통계)
- 패딩: 24px
- gap: 24px
- 그림자: sm (대형), xs (소형)
- 카드 헤더 타이틀: 16px semibold #020617
- 도움말 아이콘: 16x16, CircleHelp

### Table (테이블)
- 컨테이너: border 1px solid #E2E8F0, border-radius 8px
- 헤더 셀: 높이 40px, padding 0 12px, 14px medium #64748B
- 바디 셀: 높이 48px (목록) / 52px (대시보드), padding 8px 12px
- 셀 구분선: border-bottom 1px solid #E2E8F0
- 셀 텍스트: 14px normal #020617
- 정렬 아이콘: ChevronsUpDown 16x16 #64748B

### Badge (배지)
- border-radius: 9999px
- 패딩: 2px 8px
- 텍스트: 12px medium
- Primary: 배경 #7732F8, 텍스트 #F8FAFC
- Outline: 배경 #FFFFFF, border 1px solid #E2E8F0, 텍스트 #020617
- Muted: 배경 #F1F5F9, 텍스트 #0F172A
- Destructive: 배경 #DC2626, 텍스트 #FFFFFF

### Button (버튼)
- Primary: 배경 #7732F8, 텍스트 #F8FAFC, border-radius 8px
- Outline: 배경 #FFFFFF, border 1px solid #E2E8F0, shadow xs
- Ghost: 배경 투명
- 높이: 36px (기본), 32px (소형)
- 패딩: 8px 16px (기본), 8px 12px (소형)
- 아이콘 버튼: 32x32 또는 36x36
- 비활성: opacity 0.5

### Input / Select (입력 필드)
- 높이: 36px
- 패딩: 4px 12px (Input), 8px 12px (Select)
- 보더: 1px solid #E2E8F0
- border-radius: 8px
- 그림자: xs
- placeholder: 14px normal #64748B / #020617 (값 있을 때)
- 라벨: 14px medium #020617
- 필수 표시: 16px medium #DC2626 (*)
- 에러 메시지: 14px normal #DC2626

### Date Picker
- 너비: 280px, 높이: 32px
- 아이콘: Calendar 16x16 #020617
- 텍스트: 14px medium #020617

### Switch (스위치)
- 너비: 36px, 높이: 20px
- 비활성: 배경 #E2E8F0
- 활성: 배경 #7732F8
- 핸들: 16x16, 배경 #FFFFFF, shadow lg, border-radius 9999px
- 라벨: 14px medium #020617

### Slider (슬라이더)
- 트랙: 높이 6px, 배경 #F1F5F9, border-radius 9999px
- 활성 트랙: 배경 #7732F8
- 핸들: 16x16, 배경 #FFFFFF, border 1px solid #7732F8, shadow sm

### Pagination (페이지네이션)
- 페이지 정보: 14px medium #020617 (예: "1 / 10")
- 버튼: 36x36, outline 스타일
- 비활성 버튼: opacity 0.5
- 선택 정보: 14px normal #64748B

### Chat Bubble (채팅 버블)
- 발신(사용자): 배경 #7732F8, 텍스트 #F8FAFC
- 수신(상대): 배경 #F1F5F9, 텍스트 #020617
- border-radius: 8px
- 패딩: 12px
- 최대 너비: 400px (버블), 300px (텍스트)
- 시간: 14px medium #64748B

### Search Card (검색 카드)
- 보더: 1px solid #E2E8F0, shadow sm, border-radius 10px
- 검색 항목 행: gap 24px
- 필드 라벨-입력 gap: 12px
- 푸터: border-top 1px solid #E2E8F0, padding 16px
- 초기화 버튼: outline, "초기화"
- 검색 버튼: primary, "검색"

### Donut Chart (도넛 차트)
- 크기: 212x212
- 중앙 텍스트: 30px bold #020617
- 색상: #7732F8, #8B5CF6, #A78BFA, #F1F5F9 (모바일)
- 색상: #FF009A, #8B5CF6, #A78BFA, #F1F5F9 (홈)

### Line Chart (라인 차트)
- 그리드: border 1px solid #E2E8F0, opacity 0.8
- 라인 색상: #DDD6FE, #C4B5FD, #A78BFA
- X축 라벨: 12px normal #64748B
- 범례 아이템: 8x8 사각형 + 12px normal #020617

### Description Item (설명 항목)
- 구분선: border-top 1px solid #E2E8F0
- 패딩: 24px 8px 24px 0
- 라벨: 14px semibold #020617
- 값: 14px normal #64748B
- 5열 그리드 레이아웃

### Rich Text Editor (글 작성)
- 툴바: Toggle Group, border 1px solid #E2E8F0
- 도구: 글꼴, 본문, 볼드, 이탤릭, 취소선, 밑줄, 정렬, 이미지
- 본문 영역: 16px normal #020617 (입력), #64748B (placeholder)
- 첨부파일: File 아이콘 24x24 + 밑줄 텍스트

## 전체 레이아웃 구조

- 전체 화면: 1440px 너비
- 구조: Sidebar(256px, 좌측 고정) + Contents Area(1184px, flex-grow)
- Contents Area: Common Header(56px) + 콘텐츠 영역(flex-grow)
- 콘텐츠 영역: padding 16px 16px 80px, gap 16px, 최대 너비 1152px

## 페이지 레이아웃

### 실시간 운영 현황 (모바일/홈)
- 탭: 모바일 | 홈
- Row 1: 도넛 차트 카드(332px) + 통계 카드 2개(804px, 세로 배치)
- Row 2: 도넛 차트 카드(332px) + 테이블 카드(804px)
- Row 3: 테이블 카드 2개(568px씩)

### 서비스 이용 통계
- 상단: DatePicker + 필터 버튼 3개
- Row 1: 도넛 차트 2개(332px) + 통계 카드 2개(456px, 세로)
- Row 2: 라인 차트 2개(568px씩)
- Row 3: 테이블 카드(1152px, 좌우 분할)

### 서비스 정확도
- 상단: DatePicker + 필터 버튼
- Row 1: 통계 카드 3개(373.33px씩)
- Row 2: 라인 차트(1152px, 범례 3개)

### 상담 이력 조회
- 검색 카드: 4행 검색 필드 (채널, 서비스, 유형, ID, 상담유형, 상담결과, 상담기간, 상담시간, 조회기간, 처리상태 등)
- 검색/초기화 푸터
- 데이터 테이블: 10행, 다중 컬럼, 정렬 가능, 페이지네이션

### 상담 상세
- 좌측: 채팅 영역(420px) - 발신/수신 버블
- 우측: 상담 정보 카드(5열 그리드 x 4행) + AI 상담 요약 카드

### AI 정확도 평가
- 좌측: 스위치 + 채팅 영역(420px)
- 우측: 상담 정보 카드 + 탭(평가/정확도 관리/상세) + 평가 카드 + 저장 버튼

### 공지사항
- 목록: 번호, 분류(Badge), 제목, 작성자, 등록일 컬럼
- 글 작성: 분류 Select + 제목 + 구분선 + 에디터 + 첨부 + 상단고정/배너노출 Switch
- 게시글: Badge + 제목(24px) + 작성자/등록일 + 이미지 + 본문 + 첨부파일

### 상담 코드 조회
- 상단: 코드 요약 테이블 2개(568px씩, 5열)
- 하단: 상세 코드 테이블(1152px, 검색/필터/다운로드)

### 키워드 사전 관리
- 탭: Hot word | NER
- Hot word: 체크박스 + 번호 + 키워드 + 빈도 + 상태 + 등록일 + 수정일 + 추가 행(인라인 편집)
- NER: 번호 + 엔티티 + 동의어 + 상태 + 등록일 + 수정일

### AI 정확도 관리
- 검색 카드: 4행 (채널, 서비스, 유형, ID, 상담유형, 상담결과, 상담기간, 상담시간, 평가상태, 평가결과, 평가자, 정확도 점수 등)
- 데이터 테이블: 평가상태(Badge), 평가결과(Badge) 포함
