# 구현 계획: 서비스 이용 통계 (Service Statistics)

## 개요

서비스 이용 통계 대시보드 화면을 구현한다. 기간(DatePicker) + 조직(채널/센터/팀) 필터를 통한 조건부 데이터 조회, 종합 지표 카드·도넛 차트·시계열 추이 차트·랭킹 테이블 등 UI 컴포넌트와 순수 계산 로직(집계, 전기 비교, 증가율 등)을 포함한다. 기존 포털 셸(LNB + 콘텐츠 영역) 안에서 클라이언트 사이드 라우팅으로 전환되며, REST API 호출 방식으로 일별 마감 데이터를 조회한다.

## 태스크

- [ ] 1. 프로젝트 구조 및 핵심 타입/유틸리티 설정
  - [ ] 1.1 통계 페이지 디렉토리 구조 생성 및 핵심 타입 정의
    - `FilterState`, `SummaryResponse`, `TrendResponse`, `RankingResponse`, `FiltersResponse`, `RankingItem`, `TrendDataPoint`, `LineConfig` 등 설계 문서의 모든 인터페이스를 타입 파일로 작성
    - _요구사항: 2.1, 2.2, 3.1, 11.1_
  - [ ] 1.2 순수 계산 유틸리티 함수 구현
    - `calculateDefaultDateRange(today)`: 기본 기간 계산 (오늘 - 6일 ~ 오늘, 7일)
    - `calculateAverage(values)`: 배열 평균 계산
    - `calculateSum(values)`: 배열 합계 계산
    - `getChangeDirection(current, previous)`: 전기 대비 변화 방향 판단 (상승 #EF4444 / 하락 #3B82F6 / 동일 #64748B)
    - `calculateUtilizationRate(used, total)`: 어드바이저 이용률 계산 (0 나누기 방어)
    - `calculateKnowledgeSearchRate(clicks, recommendations)`: 지식검색 활용률 계산 (0 나누기 방어)
    - `calculateGrowthRate(start, end)`: AI 추천 증가율 계산 (분모 +1 적용)
    - `formatGrowthRate(rate)`: 증가율 포맷팅 (+X.X% / −X.X%)
    - `formatLabel(template, value)`: 레이블 템플릿 포맷팅 ({n} 치환)
    - `getTopNByGrowthRate(items, n)`: 증가율 기준 내림차순 상위 N개 추출
    - `filterByParent(items, parentId)`: 종속 필터링 (채널→센터, 센터→팀)
    - _요구사항: 2.3, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1, 7.1, 10.1, 10.4, 10.5, 10.6, 3.3, 3.4_
  - [ ]* 1.3 Property 1: 기본 기간 계산 정확성 테스트
    - **Property 1: 기본 기간 계산 정확성**
    - fast-check를 사용하여 임의의 날짜에 대해 `calculateDefaultDateRange`가 시작일=(오늘-6일), 종료일=오늘, 기간=7일을 반환하는지 검증
    - **검증 대상: 요구사항 2.3**
  - [ ]* 1.4 Property 3: 집계 지표 계산 정확성 테스트
    - **Property 3: 집계 지표 계산 정확성**
    - fast-check를 사용하여 임의의 양수 배열에 대해 `calculateAverage`와 `calculateSum`이 수학적 정의와 일치하는지 검증
    - **검증 대상: 요구사항 4.1, 5.1**
  - [ ]* 1.5 Property 4: 전기 대비 변화 방향 판단 정확성 테스트
    - **Property 4: 전기 대비 변화 방향 판단 정확성**
    - fast-check를 사용하여 임의의 두 수치 쌍에 대해 `getChangeDirection`이 올바른 방향과 색상을 반환하는지 검증
    - **검증 대상: 요구사항 4.2, 4.3, 5.2, 5.3**
  - [ ]* 1.6 Property 5: 어드바이저 이용률 계산 정확성 테스트
    - **Property 5: 어드바이저 이용률 계산 정확성**
    - fast-check를 사용하여 임의의 양의 정수 쌍에 대해 `calculateUtilizationRate`가 (used/total)×100과 일치하고, total=0일 때 0%를 반환하는지 검증
    - **검증 대상: 요구사항 6.1**
  - [ ]* 1.7 Property 6: 지식검색 활용률 계산 정확성 테스트
    - **Property 6: 지식검색 활용률 계산 정확성**
    - fast-check를 사용하여 임의의 양의 정수 쌍에 대해 `calculateKnowledgeSearchRate`가 (clicks/recommendations)×100과 일치하고, recommendations=0일 때 0%를 반환하는지 검증
    - **검증 대상: 요구사항 7.1**
  - [ ]* 1.8 Property 7: 지표 레이블 포맷팅 정확성 테스트
    - **Property 7: 지표 레이블 포맷팅 정확성**
    - fast-check를 사용하여 임의의 양의 정수와 템플릿에 대해 `formatLabel`이 {n} 플레이스홀더를 올바르게 치환하는지 검증
    - **검증 대상: 요구사항 6.3, 6.4, 7.3, 7.4**
  - [ ]* 1.9 Property 8: TOP 10 랭킹 정렬 및 추출 정확성 테스트
    - **Property 8: TOP 10 랭킹 정렬 및 추출 정확성**
    - fast-check를 사용하여 임의의 RankingItem 배열에 대해 `getTopNByGrowthRate`가 내림차순 정렬된 상위 min(입력길이, 10)개를 반환하는지 검증
    - **검증 대상: 요구사항 10.1**
  - [ ]* 1.10 Property 9: AI 추천 증가율 계산 및 포맷팅 정확성 테스트
    - **Property 9: AI 추천 증가율 계산 및 포맷팅 정확성**
    - fast-check를 사용하여 임의의 양의 정수 쌍에 대해 `calculateGrowthRate`가 (end−start)/(start+1)×100과 일치하고, `formatGrowthRate`가 올바른 부호와 소수점 형식을 반환하는지 검증
    - **검증 대상: 요구사항 10.4, 10.5, 10.6, 9.4**
  - [ ]* 1.11 Property 2: 종속 필터링 정확성 테스트
    - **Property 2: 종속 필터링 정확성**
    - fast-check를 사용하여 임의의 조직 트리 데이터에 대해 `filterByParent`가 선택된 상위 항목에 소속된 하위 항목만 반환하는지 검증
    - **검증 대상: 요구사항 3.3, 3.4**

- [ ] 2. 체크포인트 — 핵심 유틸리티 검증
  - 모든 테스트가 통과하는지 확인하고, 문제가 있으면 사용자에게 질문한다.

- [ ] 3. API 서비스 레이어 구현
  - [ ] 3.1 통계 API 클라이언트 함수 구현
    - `fetchSummary(filter)`: GET /api/statistics/summary 호출
    - `fetchTrends(filter)`: GET /api/statistics/trends 호출
    - `fetchRanking(filter)`: GET /api/statistics/ranking 호출
    - `fetchFilters()`: GET /api/statistics/filters 호출
    - `downloadExcel(filter)`: GET /api/statistics/export 호출 → Blob 다운로드 처리
    - 각 함수에 에러 핸들링 포함 (네트워크 오류, 5xx, 401/403, 400, 408/timeout)
    - _요구사항: 13.1, 13.3, 14.1, 14.2_
  - [ ] 3.2 필터 상태 관리 훅(Hook) 구현
    - `useStatisticsFilter` 커스텀 훅: FilterState 초기화(기본 7일), 필터 변경 핸들러, 종속 필터 로직(채널→센터→팀)
    - 필터 변경 시 자동 데이터 갱신 트리거
    - 필터 옵션 로드 실패 시 기본값("전체") 폴백 처리
    - _요구사항: 2.3, 3.1, 3.2, 3.3, 3.4, 3.5, 13.1_
  - [ ] 3.3 통계 데이터 조회 훅(Hook) 구현
    - `useStatisticsData` 커스텀 훅: summary, trends, ranking 데이터를 필터 상태에 따라 병렬 조회
    - 각 데이터 영역별 독립적인 로딩/오류/빈 상태 관리
    - _요구사항: 13.1, 13.2, 13.3, 13.4_
  - [ ]* 3.4 API 서비스 레이어 단위 테스트
    - API 호출 함수의 파라미터 직렬화, 에러 핸들링 분기, 필터 훅의 종속 로직 테스트
    - _요구사항: 3.3, 3.4, 13.3_

- [ ] 4. 검색 필터 바 컴포넌트 구현
  - [ ] 4.1 SearchFilterBar 컴포넌트 구현
    - DateRangePicker (280px × 32px, Calendar 아이콘 16×16 #020617, 텍스트 14px medium #020617)
    - ChannelFilter (체크박스: 전체/홈/모바일)
    - CenterFilter (채널 종속, 선택된 채널에 해당하는 센터 목록)
    - TeamFilter (센터 종속, 선택된 센터에 소속된 팀 목록)
    - ExcelDownloadButton
    - 필터 변경 시 `onFilterChange` 콜백 호출 → 화면 데이터 자동 갱신
    - _요구사항: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 14.1_
  - [ ]* 4.2 SearchFilterBar 단위 테스트
    - DatePicker 기본값 검증, 채널 선택 시 센터 목록 필터링, 필터 변경 시 콜백 호출 확인
    - _요구사항: 2.3, 3.3, 3.5_

- [ ] 5. 종합 지표 컴포넌트 구현 (Row 1)
  - [ ] 5.1 SummaryCard 컴포넌트 구현
    - 평균 상담시간 카드: 값(24px bold), 전기 대비 변화량 (상승 #EF4444 ▲ / 하락 #3B82F6 ▼ / 동일 #64748B —)
    - 총 상담 콜 수 카드: 동일 구조
    - HelpTooltip (CircleHelp 16×16): 각 카드별 툴팁 텍스트 표시
    - 카드 규격: border-radius 10px, 패딩 24px, 타이틀 16px semibold
    - SummaryCardStack (456px, 세로 배치)
    - _요구사항: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 11.3_
  - [ ] 5.2 DonutChartCard 컴포넌트 구현
    - 어드바이저 이용률 도넛 차트 (212×212, 중앙 30px bold 백분율)
      - 외곽 링: "총 활성 좌석수 {n} 석", 색상 링: "총 앱 접속자수 {n} 명"
      - 호버 툴팁, 도움말 아이콘 툴팁
    - 지식검색 활용률 도넛 차트 (212×212, 동일 구조)
      - 외곽 링: "총 추천 지식 수 {n}건", 색상 링: "총 답변 확인 {n} 건"
      - 호버 툴팁, 도움말 아이콘 툴팁
    - 각 도넛 차트 카드 너비 332px
    - _요구사항: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 11.3, 12.4_
  - [ ]* 5.3 SummaryCard 및 DonutChartCard 단위 테스트
    - 변화 방향별 색상 표시, 툴팁 텍스트, 도넛 차트 중앙 값 렌더링 확인
    - _요구사항: 4.2, 4.3, 4.4, 6.1, 6.7, 7.1, 7.7_

- [ ] 6. 시계열 추이 차트 컴포넌트 구현 (Row 2)
  - [ ] 6.1 TrendChartCard 컴포넌트 구현
    - 운영 효율 추이 차트 (568px, Dual Y-Axis): 좌Y 상담 콜 수, 우Y 평균 상담시간(초), 두 꺾은선
    - 시스템 활용도 추이 차트 (568px, Single Y-Axis %): 어드바이저 이용률 Line A, 지식검색 활용률 Line B
    - 호버 시 데이터 포인트 툴팁 (운영 효율: "일 총 상담 콜 수 {n}건", "일 평균 상담 시간 {n}초" / 시스템 활용도: "어드바이저 이용률 {n.n}%", "지식검색률 {n.n}%")
    - 차트 규격: 그리드 border 1px solid #E2E8F0 opacity 0.8, X축 라벨 12px normal #64748B, 범례 8×8 사각형 + 12px normal #020617
    - _요구사항: 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2, 9.3, 9.4, 9.5, 11.4_
  - [ ]* 6.2 TrendChartCard 단위 테스트
    - 차트 렌더링, 툴팁 데이터 포맷, Dual/Single axis 분기 확인
    - _요구사항: 8.4, 9.4_

- [ ] 7. 체크포인트 — 종합 지표 및 추이 차트 검증
  - 모든 테스트가 통과하는지 확인하고, 문제가 있으면 사용자에게 질문한다.

- [ ] 8. 랭킹 테이블 컴포넌트 구현 (Row 3)
  - [ ] 8.1 RankingTableCard 컴포넌트 구현
    - AI 추천 상담코드 TOP 10 테이블 (1152px, 좌우 분할)
    - 각 행: 순위, 상담 소카테고리명, 코드 번호, 추천 횟수, AI 추천 증가율(%)
    - 증가율 색상: 양수 "+X.X%" #EF4444, 음수 "−X.X%" #3B82F6
    - 도움말 아이콘 툴팁: "AI 추천 상대적 증가율을 기준으로 선정한 상위 10개 코드입니다"
    - 테이블 규격: border 1px solid #E2E8F0, border-radius 8px, 헤더 셀 40px, 바디 셀 48px
    - _요구사항: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 11.5, 12.5_
  - [ ]* 8.2 RankingTableCard 단위 테스트
    - 정렬 순서, 증가율 포맷/색상, 10개 제한, 툴팁 텍스트 확인
    - _요구사항: 10.1, 10.4, 10.5, 10.7_

- [ ] 9. 페이지 조립 및 라우팅 연결
  - [ ] 9.1 ServiceStatisticsPage 페이지 컴포넌트 조립
    - SearchFilterBar + SummaryRow(Row 1) + TrendRow(Row 2) + RankingRow(Row 3) 조합
    - 콘텐츠 영역 너비 1152px, 패딩 16px 16px 80px, gap 16px
    - 각 컴포넌트별 독립적 로딩/오류/빈 상태 렌더링
    - _요구사항: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 12.1, 12.2, 12.3, 13.2, 13.3, 13.4_
  - [ ] 9.2 LNB 라우팅 연결
    - 클라이언트 사이드 라우터에 `/statistics` 경로 등록
    - LNB "서비스 이용 통계" 메뉴 항목 추가 및 활성 상태 표시
    - 페이지 새로고침 없이 실시간 운영현황 홈 ↔ 서비스 이용 통계 전환
    - _요구사항: 1.1, 1.2, 1.3, 1.4_

- [ ] 10. 엑셀 다운로드 기능 구현
  - [ ] 10.1 엑셀 다운로드 로직 구현
    - ExcelDownloadButton 클릭 → `downloadExcel(filter)` 호출 → Blob 응답을 .xlsx 파일로 저장
    - 다운로드 실패 시 토스트 알림 표시
    - 다운로드 파일에 종합 지표 요약, 일별 추이 데이터, 랭킹 테이블 데이터 포함
    - _요구사항: 14.1, 14.2, 14.3_
  - [ ]* 10.2 엑셀 다운로드 단위 테스트
    - API 호출 파라미터, Blob 처리, 에러 시 토스트 표시 확인
    - _요구사항: 14.2_

- [ ] 11. 통합 및 최종 체크포인트
  - [ ]* 11.1 통합 테스트 작성
    - 필터 변경 → API 호출 → UI 갱신 전체 흐름 테스트
    - LNB 메뉴 클릭 → 라우트 변경 → 화면 전환 테스트
    - _요구사항: 1.2, 3.5, 13.1_
  - [ ] 11.2 최종 체크포인트
    - 모든 테스트가 통과하는지 확인하고, 문제가 있으면 사용자에게 질문한다.

## 참고

- `*` 표시된 태스크는 선택 사항이며, 빠른 MVP를 위해 건너뛸 수 있습니다.
- 각 태스크는 추적 가능성을 위해 구체적인 요구사항을 참조합니다.
- 체크포인트는 점진적 검증을 보장합니다.
- Property 테스트는 fast-check 라이브러리를 사용하여 보편적 정확성 속성을 검증합니다.
- 단위 테스트는 구체적인 예시와 엣지 케이스를 검증합니다.
