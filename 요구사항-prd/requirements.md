# Requirements Document

## Introduction

상담어드바이저 포털의 실시간 운영현황 홈 화면 기능에 대한 요구사항 문서이다. 본 문서는 상담센터 운영자, 리더, 상담사, 기획/품질/교육 담당자가 실시간 운영 KPI, 상담어드바이저 이용률, 지식/검색 트렌드, AI 추천 상담코드 급상승 TOP5 등을 한 화면에서 모니터링하고 의사결정할 수 있도록 하는 웹 기반 대시보드의 요구사항을 정의한다.

## Glossary

- **Dashboard**: 실시간 운영현황 홈 화면을 구성하는 웹 기반 대시보드 페이지
- **Channel_Toggle**: 홈/모바일 채널을 전환하는 탭 UI 컴포넌트
- **Update_Indicator**: 화면 상단에 표시되는 데이터 업데이트 기준 일시 표기 영역
- **KPI_Card**: 실시간 상담시간, 당일 상담 누적 콜 수 등 운영 KPI를 표시하는 통계 카드 컴포넌트
- **Donut_Chart**: 이용률 및 활용률을 시각화하는 도넛링 차트 컴포넌트
- **Trend_Comparator**: 최근 4주 동요일 동시간대 산술 평균 대비 증감률을 계산하는 모듈
- **Batch_Processor**: 30분 단위로 데이터를 집계하는 백엔드 배치 처리 모듈
- **CTI**: Computer Telephony Integration, 상담사가 전화 상담을 위해 로그인하는 시스템
- **Knowledge_Assist**: 상담 중 지식을 추천하고 검색 기능을 제공하는 AI 기반 모듈
- **Consultation_Code**: AI가 상담 내용을 분석하여 추천하는 상담 분류 코드
- **Working_Day**: 상담사 1명 이상이 CTI에 로그인하고 08:00~영업종료 사이 콜 인입 또는 상담이 발생한 날
- **Inbound_Call**: 고객센터 연결을 위해 대기 중인 고객(대기 중 이탈 고객 포함)과 상담사와 연결된 전화
- **Consultation_Call**: 고객센터의 상담사와 실제 상담이 이루어진 전화

## Requirements

### Requirement 1: 채널 기본 조회 및 토글

**User Story:** 운영자/리더로서, 로그인 시 본인 소속 채널 기준으로 대시보드를 조회하고 홈/모바일 채널을 전환할 수 있기를 원한다. 이를 통해 담당 채널의 실시간 현황을 빠르게 파악할 수 있다.

#### Acceptance Criteria

1. WHEN 사용자가 Dashboard에 접속하면, THE Dashboard SHALL 로그인 사용자의 소속 채널을 기본 조회 채널로 설정하여 데이터를 표시한다.
2. WHEN 사용자가 Channel_Toggle에서 "홈" 또는 "모바일" 탭을 선택하면, THE Dashboard SHALL 선택된 채널 기준으로 모든 KPI 및 차트 데이터를 갱신한다.
3. THE Channel_Toggle SHALL "모바일"과 "홈" 두 개의 탭을 제공한다.

### Requirement 2: 데이터 업데이트 일시 표기

**User Story:** 운영자/리더로서, 현재 보고 있는 데이터가 언제 기준인지 명확히 알고 싶다. 이를 통해 데이터의 신뢰성을 판단하고 적절한 의사결정을 할 수 있다.

#### Acceptance Criteria

1. THE Update_Indicator SHALL 화면 상단에 "업데이트 일시: YYYY-MM-DD, HH:MM" 형식으로 마지막 데이터 업데이트 시각을 표시한다.
2. IF Batch_Processor에서 오류가 발생하면, THEN THE Update_Indicator SHALL 마지막 성공한 업데이트 일시를 유지하여 표시한다.
3. WHILE 마지막 업데이트 이후 4시간 이상 경과한 상태이면, THE Update_Indicator SHALL 업데이트 일시 옆에 "!" 삼각 경고 아이콘을 표시하고 텍스트 색상을 변경한다.

### Requirement 3: 데이터 업데이트 주기

**User Story:** 운영자/리더로서, 대시보드 데이터가 주기적으로 자동 갱신되기를 원한다. 이를 통해 수동 새로고침 없이 최신 운영 현황을 확인할 수 있다.

#### Acceptance Criteria

1. THE Batch_Processor SHALL 30분 단위로 대시보드 데이터를 집계한다.
2. THE Dashboard SHALL Batch_Processor의 집계 완료 후 프론트엔드 자동 새로고침을 통해 화면 데이터를 갱신한다.
3. WHEN 사용자가 업데이트 주기 영역에 마우스를 호버하면, THE Dashboard SHALL "30분 단위로 업데이트 됩니다." 툴팁을 표시한다.

### Requirement 4: 증감 비교 기준 산출

**User Story:** 운영자/리더로서, 현재 KPI 수치가 평소 대비 어떤 수준인지 알고 싶다. 이를 통해 이상 징후를 빠르게 감지하고 대응할 수 있다.

#### Acceptance Criteria

1. THE Trend_Comparator SHALL 최근 4주간 동일 요일의 08시부터 현재 업데이트 시각까지의 데이터를 산술 평균하여 비교 기준값을 산출한다.
2. WHEN 비교 대상 주에 비근무일이 포함되면, THE Trend_Comparator SHALL 해당 비근무일을 건너뛰고 이전 주로 소급하여 동요일 데이터 4건을 확보한다.
3. THE Trend_Comparator SHALL Working_Day 판정 시 상담사 1명 이상의 CTI 로그인 발생 여부와 08:00~영업종료 사이 콜 인입 또는 상담 발생 여부를 기준으로 판단한다.
4. THE Trend_Comparator SHALL 최대 8주 전까지 소급하여 동요일 데이터 4건 확보를 시도한다.
5. IF 8주 내 동요일 데이터가 4건 미만이면, THEN THE Trend_Comparator SHALL 확보된 건수(최소 1건)로 산술 평균을 계산한다.
6. IF 8주 내 동요일 데이터가 0건이면, THEN THE Trend_Comparator SHALL 증감률 대신 "- " 텍스트를 표시한다.

### Requirement 5: 실시간 상담시간 KPI

**User Story:** 리더로서, 실시간 평균 상담시간을 확인하여 상담 효율이 평소 대비 악화되었는지 판단하고 인력 배치를 조정하고 싶다.

#### Acceptance Criteria

1. THE KPI_Card SHALL "실시간 상담시간" 타이틀과 함께 당일 마지막 업데이트 시점까지의 콜당 누적 평균 처리시간을 "sss초" 형식으로 표시한다.
2. THE KPI_Card SHALL 실시간 상담시간을 상담 완료 콜들의 처리 시간 합계(초)를 상담 완료 콜 수로 나누어 산출한다.
3. THE KPI_Card SHALL Trend_Comparator가 산출한 비교 기준값 대비 증감률을 백분율(예: +8.2%)로 표시한다.
4. WHEN 실시간 상담시간이 비교 기준값 대비 상승(성과 악화)하면, THE KPI_Card SHALL 증감률 텍스트를 빨강 색상으로 표시한다.
5. WHEN 실시간 상담시간이 비교 기준값 대비 하락(성과 개선)하면, THE KPI_Card SHALL 증감률 텍스트를 파랑 색상으로 표시한다.
6. WHEN 실시간 상담시간의 증감률이 산출 불가하면, THE KPI_Card SHALL 증감률 영역에 "- " 텍스트를 표시한다.
7. WHEN 사용자가 실시간 상담시간 KPI_Card의 도움말 아이콘에 마우스를 호버하면, THE KPI_Card SHALL "현재까지 측정된 실시간 누적 평균 상담 시간 입니다." 툴팁을 표시한다.

### Requirement 6: 당일 상담 누적 콜 수 KPI

**User Story:** 리더로서, 당일 상담 콜 수 추이를 실시간으로 확인하여 인력 추가 배치 여부를 결정하고 싶다.

#### Acceptance Criteria

1. THE KPI_Card SHALL "당일 상담 누적 콜 수" 타이틀과 함께 09:00부터 마지막 업데이트 시간까지의 Consultation_Call 수를 천 단위 콤마와 "건" 단위로 표시한다.
2. THE KPI_Card SHALL Trend_Comparator가 산출한 비교 기준값 대비 증감률을 백분율로 표시한다.
3. WHEN 당일 상담 누적 콜 수가 비교 기준값 대비 상승하면, THE KPI_Card SHALL 증감률 텍스트를 빨강 색상으로 표시한다.
4. WHEN 당일 상담 누적 콜 수가 비교 기준값 대비 하락하면, THE KPI_Card SHALL 증감률 텍스트를 파랑 색상으로 표시한다.
5. WHEN 사용자가 당일 상담 누적 콜 수 KPI_Card의 도움말 아이콘에 마우스를 호버하면, THE KPI_Card SHALL "09시~현재까지 채널 상담어드바이저로 연결된 상담 콜 수 입니다." 툴팁을 표시한다.

### Requirement 7: 상담어드바이저 이용률

**User Story:** 운영자로서, 상담어드바이저 앱의 이용률을 확인하여 미이용 상담사 대상 교육 및 공지 필요성을 판단하고 싶다.

#### Acceptance Criteria

1. THE Donut_Chart SHALL "오늘의 이용률" 타이틀과 함께 이용률을 백분율로 중앙에 표시한다.
2. THE Donut_Chart SHALL 이용률을 어드바이저 앱 접속 상담사 수를 활성화된 상담어드바이저 좌석 수로 나눈 후 100을 곱하여 산출한다.
3. THE Donut_Chart SHALL 외곽 링에 당일 활성 좌석수를 "{n} 석" 형식으로 표시한다.
4. THE Donut_Chart SHALL 색상 링에 당일 누적 앱 접속자수를 "{n} 명" 형식으로 표시한다.
5. WHEN 사용자가 Donut_Chart의 각 영역에 마우스를 호버하면, THE Donut_Chart SHALL 해당 영역의 타이틀과 수치를 표시한다.
6. WHEN 사용자가 이용률 Donut_Chart의 도움말 아이콘에 마우스를 호버하면, THE Donut_Chart SHALL "오늘 상담중인 상담사 중 상담어드바이저를 이용한 상담사 수입니다." 툴팁을 표시한다.

### Requirement 8: 실시간 지식추천 활용률

**User Story:** 기획/교육 담당자로서, 지식 추천 기능의 활용률을 확인하여 지식 콘텐츠 개선 방향을 도출하고 싶다.

#### Acceptance Criteria

1. THE Donut_Chart SHALL "실시간 지식추천 활용률" 타이틀과 함께 활용률을 백분율로 중앙에 표시한다.
2. THE Donut_Chart SHALL 지식추천 활용률을 Knowledge_Assist의 검색 클릭 횟수를 추천된 지식 수로 나눈 후 100을 곱하여 산출한다.
3. THE Donut_Chart SHALL 외곽 링에 추천 지식 수를 "{n} 건" 형식으로 표시한다.
4. THE Donut_Chart SHALL 색상 강조 링에 답변 확인 수를 "{n} 건" 형식으로 표시한다.
5. WHEN 사용자가 지식추천 활용률 Donut_Chart의 도움말 아이콘에 마우스를 호버하면, THE Donut_Chart SHALL "상담어드바이저 지식 추천을 이용하여 답변을 확인한 비율 입니다." 툴팁을 표시한다.

### Requirement 9: AI 추천 상담코드 급상승 TOP5

**User Story:** 리더/기획자로서, AI 추천 상담코드 중 급상승한 코드를 확인하여 고객 문의 유형 변화를 빠르게 인지하고 대응하고 싶다.

#### Acceptance Criteria

1. THE Dashboard SHALL "AI 추천 상담코드 급상승 TOP5" 영역에 Consultation_Code 중 최근 4주 동일 요일·동시간대 평균 대비 추천 횟수 증가율이 가장 높은 상위 5개를 순위별로 표시한다.
2. THE Dashboard SHALL 각 Consultation_Code의 증가율을 (오늘 추천 횟수 − 최근 4주 평균 추천 횟수) ÷ 최근 4주 평균 추천 횟수 × 100 수식으로 산출한다.
3. THE Dashboard SHALL 각 순위 항목에 순위 번호, 상담코드명, 추천 횟수, 변동률을 표시한다.
4. WHEN 변동률이 양수(상승)이면, THE Dashboard SHALL 변동률 텍스트를 빨강 색상으로 표시한다.
5. WHEN 변동률이 음수(하락)이면, THE Dashboard SHALL 변동률 텍스트를 파랑 색상으로 표시한다.
6. WHEN 변동률이 산출 불가하면, THE Dashboard SHALL 변동률 영역에 "- " 텍스트를 표시한다.
7. WHEN 사용자가 AI 추천 상담코드 급상승 TOP5 영역의 도움말 아이콘에 마우스를 호버하면, THE Dashboard SHALL "최근 4주 평균과 비교해 누적 추천횟수가 가장 크게 증가한 상담코드 순위입니다." 툴팁을 표시한다.

### Requirement 10: 페이지 레이아웃

**User Story:** 운영자/리더로서, 주요 운영 지표를 한 화면에서 직관적으로 파악할 수 있는 구조화된 레이아웃을 원한다. 이를 통해 화면 전환 없이 빠르게 현황을 모니터링할 수 있다.

#### Acceptance Criteria

1. THE Dashboard SHALL 콘텐츠 영역 너비를 1152px로 구성한다.
2. THE Dashboard SHALL Row 1에 이용률 Donut_Chart 카드(332px 너비)와 KPI_Card 2개(804px 너비, 세로 배치)를 가로로 배치한다.
3. THE Dashboard SHALL Row 2에 지식추천 활용률 Donut_Chart 카드(332px 너비)와 AI 추천 상담코드 급상승 TOP5 테이블 카드(804px 너비)를 가로로 배치한다.
4. THE Dashboard SHALL Row 3에 테이블 카드 2개(각 568px 너비)를 가로로 배치한다.
5. THE Dashboard SHALL 카드 컴포넌트에 대형 카드는 border-radius 14px, 소형 카드는 border-radius 10px을 적용한다.
6. THE Dashboard SHALL Donut_Chart 크기를 212x212px로 렌더링한다.
7. THE Dashboard SHALL 홈 채널 선택 시 Donut_Chart 색상을 #FF009A, #8B5CF6, #A78BFA, #F1F5F9 조합으로 적용한다.

### Requirement 11: 공통 에러 및 Null 처리

**User Story:** 운영자/리더로서, 데이터 오류나 값이 없는 상황에서도 대시보드가 안정적으로 표시되기를 원한다. 이를 통해 혼란 없이 유효한 데이터를 구분할 수 있다.

#### Acceptance Criteria

1. IF Batch_Processor에서 일부 데이터 누락 또는 오류가 발생하면, THEN THE Dashboard SHALL 디자인시스템 가이드의 에러 정책에 따라 해당 영역을 표시한다.
2. WHEN 실시간 상담 콜이 없거나 값이 0인 경우, THE Dashboard SHALL 디자인시스템 가이드의 null 정책에 따라 해당 영역을 표시한다.
