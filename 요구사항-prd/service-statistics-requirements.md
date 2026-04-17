# 요구사항 문서: 서비스 이용 통계 (Service Statistics)

## 소개

서비스 이용 통계 화면은 실시간으로 모니터링되던 운영 지표들을 일별(Daily)로 마감·적재하여, 특정 기간 동안의 운영 성과 추이와 서비스 이용 현황을 분석하기 위한 화면이다. 센터 관리자, 운영 팀장, 데이터 분석가가 기간별 검색, 주요 지표 요약(Card), 추이 그래프(Chart), 상세 랭킹 테이블(Table), 엑셀 다운로드 기능을 활용하여 운영 데이터를 분석한다.

## 용어 정의 (Glossary)

- **포털(Portal)**: 실시간 운영현황 홈, 서비스 이용 통계 등 여러 메뉴를 포함하는 웹 애플리케이션 전체를 의미한다.
- **LNB(Left Navigation Bar)**: 포털 좌측에 위치한 수직 내비게이션 메뉴로, 각 화면 간 이동을 제공한다.
- **서비스_이용_통계_화면(Service_Statistics_View)**: 기간별 운영 성과 추이와 서비스 이용 현황을 분석하는 화면이다.
- **검색_필터(Search_Filter)**: 기간, 채널, 센터, 팀 조건을 설정하여 데이터를 조회하는 UI 영역이다.
- **Date_Picker**: 시작일과 종료일을 선택하는 날짜 입력 컴포넌트이다.
- **종합_지표_카드(Summary_Card)**: 선택된 기간의 일평균 데이터를 요약하여 표시하는 카드 컴포넌트이다.
- **도넛_차트(Donut_Chart)**: 비율 지표를 외곽 링과 색상 링으로 시각화하는 원형 차트 컴포넌트이다.
- **추이_차트(Trend_Chart)**: X축(날짜)과 Y축(지표 값)으로 시계열 데이터를 시각화하는 꺾은선 그래프 컴포넌트이다.
- **랭킹_테이블(Ranking_Table)**: 상담코드 등 항목을 순위별로 정렬하여 표시하는 테이블 컴포넌트이다.
- **전기(Previous_Period)**: 조회 기간과 동일한 기간 길이의 직전 기간을 의미한다. 예: 조회 기간이 7일이면 전기는 그 직전 7일이다.
- **상담_콜(Consultation_Call)**: 상담어드바이저로 연결된 개별 상담 통화 건을 의미한다.
- **평균_상담시간(Average_Consultation_Time)**: 기간 내 처리 완료된 콜의 평균 처리 시간(초 단위)이다.
- **어드바이저_이용률(Advisor_Utilization_Rate)**: (이용 상담사 수 / 활성 상담석 수) × 100으로 산출되는 백분율이다.
- **활성_상담석(Active_Seat)**: 콜 상태가 활성화되어 있는 상담어드바이저 좌석 수이다. 라이선스 수와 다르다.
- **앱_접속자(App_Accessor)**: 당일 상담어드바이저 앱에 누적 접속한 상담사 수이다.
- **지식검색_활용률(Knowledge_Search_Utilization_Rate)**: (검색·클릭 수 / 추천 수) × 100으로 산출되는 백분율이다.
- **추천_지식(Recommended_Knowledge)**: 상담사에게 추천된 지식 항목의 총 수이다.
- **답변_확인(Answer_Confirmation)**: 추천된 지식의 답변을 확인하기 위해 검색 버튼을 클릭한 횟수이다.
- **AI_추천_증가율(AI_Recommendation_Growth_Rate)**: (기간 종료 추천횟수 − 기간 시작 추천횟수) / (기간 시작 추천횟수 + 1) × 100으로 산출되는 백분율이다.
- **디자인_시스템(Design_System)**: 피그마에서 정의된 UI 규격(폰트, 컬러, 컴포넌트 크기 등)을 의미한다.

---

## 요구사항

### 요구사항 1: LNB 내비게이션

**사용자 스토리:** 센터 관리자로서, 포털 좌측 LNB 메뉴를 통해 실시간 운영현황 홈과 서비스 이용 통계 화면 간 이동을 하고 싶다. 이를 통해 페이지 전체 새로고침 없이 빠르게 화면을 전환할 수 있다.

#### 인수 조건

1. 포털(Portal)은 좌측에 LNB(Left Navigation Bar)를 표시해야 한다(THE Portal SHALL display the LNB on the left side of the screen).
2. WHEN 사용자가 LNB에서 "서비스 이용 통계" 메뉴를 클릭하면, THE Portal SHALL 서비스_이용_통계_화면(Service_Statistics_View)으로 이동한다.
3. WHEN 사용자가 LNB에서 "실시간 운영현황 홈" 메뉴를 클릭하면, THE Portal SHALL 실시간 운영현황 홈 화면으로 이동한다.
4. WHILE 서비스_이용_통계_화면이 활성 상태인 동안, THE LNB SHALL "서비스 이용 통계" 메뉴 항목을 활성(선택됨) 상태로 시각적으로 표시한다.

---

### 요구사항 2: 검색 필터 — 기간 설정

**사용자 스토리:** 센터 관리자로서, 시작일과 종료일을 지정하여 원하는 기간의 통계 데이터를 조회하고 싶다. 이를 통해 특정 기간의 운영 성과를 분석할 수 있다.

#### 인수 조건

1. 서비스_이용_통계_화면(Service_Statistics_View)은 상단에 Date_Picker를 표시해야 한다(THE Service_Statistics_View SHALL display a Date_Picker at the top of the screen).
2. THE Date_Picker SHALL 시작일과 종료일을 선택할 수 있는 두 개의 날짜 입력 필드를 제공한다.
3. WHEN 서비스_이용_통계_화면이 최초 로드되면, THE Date_Picker SHALL 기본값으로 최근 7일(오늘 기준 7일 전 ~ 오늘)을 설정한다.
4. THE Date_Picker SHALL 너비 280px, 높이 32px, Calendar 아이콘(16×16, 색상 #020617), 텍스트 14px medium 색상 #020617 규격을 따른다.

---

### 요구사항 3: 검색 필터 — 조직/팀 필터

**사용자 스토리:** 운영 팀장으로서, 채널, 센터, 팀 단위로 데이터를 필터링하고 싶다. 이를 통해 소속 조직의 성과를 세분화하여 분석할 수 있다.

#### 인수 조건

1. THE 검색_필터(Search_Filter) SHALL 채널, 센터, 팀 세 개의 필터 버튼을 Date_Picker 우측에 표시한다.
2. THE 채널 필터 SHALL "전체", "홈", "모바일" 옵션을 체크박스 형태로 제공한다.
3. WHEN 사용자가 채널을 선택하면, THE 센터 필터 SHALL 선택된 채널에 해당하는 센터 유형 목록을 표시한다.
4. WHEN 사용자가 센터를 선택하면, THE 팀 필터 SHALL 선택된 센터에 소속된 팀 목록을 표시한다.
5. WHEN 사용자가 채널, 센터, 팀 필터 중 하나의 설정값을 변경하면, THE Service_Statistics_View SHALL 변경된 필터 조건으로 화면 데이터를 자동 갱신한다.

---

### 요구사항 4: 종합 지표 — 평균 상담시간 카드

**사용자 스토리:** 센터 관리자로서, 선택 기간의 일평균 상담시간과 전기 대비 변화를 한눈에 확인하고 싶다. 이를 통해 상담 효율의 개선 또는 악화 여부를 빠르게 판단할 수 있다.

#### 인수 조건

1. THE 종합_지표_카드(Summary_Card) SHALL 선택된 기간 내 처리 완료 콜의 일평균 상담시간을 초 단위로 표시한다.
2. WHEN 평균_상담시간이 전기(Previous_Period) 대비 상승하면, THE Summary_Card SHALL 변화량을 빨간색(#EF4444)으로 표시한다.
3. WHEN 평균_상담시간이 전기 대비 하락하면, THE Summary_Card SHALL 변화량을 파란색(#3B82F6)으로 표시한다.
4. WHEN 사용자가 평균 상담시간 카드의 도움말 아이콘(CircleHelp, 16×16)에 호버하면, THE Summary_Card SHALL "조회 기간의 평균 상담 시간입니다." 툴팁을 표시한다.
5. THE Summary_Card SHALL 카드 수치를 24px bold(text-2xl), 카드 타이틀을 16px semibold(text-base), border-radius 10px, 패딩 24px 규격으로 표시한다.

---

### 요구사항 5: 종합 지표 — 총 상담 콜 수 카드

**사용자 스토리:** 운영 팀장으로서, 선택 기간의 총 상담 콜 수와 전기 대비 변화를 확인하고 싶다. 이를 통해 콜 볼륨 추이를 파악할 수 있다.

#### 인수 조건

1. THE Summary_Card SHALL 선택된 기간 내 누적 상담_콜(Consultation_Call) 수 합계를 표시한다.
2. WHEN 총 상담 콜 수가 전기 대비 상승하면, THE Summary_Card SHALL 변화량을 빨간색(#EF4444)으로 표시한다.
3. WHEN 총 상담 콜 수가 전기 대비 하락하면, THE Summary_Card SHALL 변화량을 파란색(#3B82F6)으로 표시한다.
4. WHEN 사용자가 총 상담 콜 수 카드의 도움말 아이콘에 호버하면, THE Summary_Card SHALL "조회 기간 동안 상담어드바이저로 연결된 총 상담 콜 수입니다." 툴팁을 표시한다.

---

### 요구사항 6: 종합 지표 — 평균 어드바이저 이용률 도넛 차트

**사용자 스토리:** 데이터 분석가로서, 활성 상담석 대비 실제 이용 상담사 비율을 시각적으로 확인하고 싶다. 이를 통해 상담 자원의 활용 효율을 분석할 수 있다.

#### 인수 조건

1. THE 도넛_차트(Donut_Chart) SHALL 선택된 기간 내 어드바이저_이용률(Advisor_Utilization_Rate)의 일평균 백분율을 중앙에 30px bold 텍스트로 표시한다.
2. THE Donut_Chart SHALL 212×212 크기로 렌더링한다.
3. THE Donut_Chart의 외곽 링 SHALL 총 활성_상담석(Active_Seat) 수를 나타내며, "총 활성 좌석수 {n} 석" 형식으로 표기한다.
4. THE Donut_Chart의 색상 링 SHALL 총 앱_접속자(App_Accessor) 수를 나타내며, "총 앱 접속자수 {n} 명" 형식으로 표기한다.
5. WHEN 사용자가 도넛 차트의 외곽 링 영역에 호버하면, THE Donut_Chart SHALL "총 활성 좌석수 {n}" 툴팁을 표시한다.
6. WHEN 사용자가 도넛 차트의 색상 링 영역에 호버하면, THE Donut_Chart SHALL "총 앱 접속자수 {n}" 툴팁을 표시한다.
7. WHEN 사용자가 평균 어드바이저 이용률 카드의 도움말 아이콘에 호버하면, THE Summary_Card SHALL "활성화된 상담석 중에서 상담어드바이저를 이용한 상담사 평균 비율입니다." 툴팁을 표시한다.

---

### 요구사항 7: 종합 지표 — 평균 지식검색 활용률 도넛 차트

**사용자 스토리:** 데이터 분석가로서, 추천 지식 대비 실제 답변 확인 비율을 시각적으로 확인하고 싶다. 이를 통해 지식 추천 시스템의 활용도를 분석할 수 있다.

#### 인수 조건

1. THE Donut_Chart SHALL 선택된 기간 내 지식검색_활용률(Knowledge_Search_Utilization_Rate)의 일평균 백분율을 중앙에 30px bold 텍스트로 표시한다.
2. THE Donut_Chart SHALL 212×212 크기로 렌더링한다.
3. THE Donut_Chart의 외곽 링 SHALL 총 추천_지식(Recommended_Knowledge) 수를 나타내며, "총 추천 지식 수 {n}건" 형식으로 표기한다.
4. THE Donut_Chart의 색상 링 SHALL 총 답변_확인(Answer_Confirmation) 수를 나타내며, "총 답변 확인 {n} 건" 형식으로 표기한다.
5. WHEN 사용자가 도넛 차트의 외곽 링 영역에 호버하면, THE Donut_Chart SHALL "총 추천 지식 수 {n}" 툴팁을 표시한다.
6. WHEN 사용자가 도넛 차트의 색상 링 영역에 호버하면, THE Donut_Chart SHALL "총 답변 확인 {n}" 툴팁을 표시한다.
7. WHEN 사용자가 평균 지식검색 활용률 카드의 도움말 아이콘에 호버하면, THE Summary_Card SHALL "상담어드바이저 지식 추천을 이용하여 답변을 확인한 평균 비율입니다." 툴팁을 표시한다.

---

### 요구사항 8: 시계열 추이 — 운영 효율 추이 차트

**사용자 스토리:** 센터 관리자로서, 일별 상담 콜 수와 평균 상담시간의 변화를 하나의 차트에서 비교하고 싶다. 이를 통해 콜량 변화에 따른 상담시간 변화의 상관관계를 파악할 수 있다.

#### 인수 조건

1. THE 추이_차트(Trend_Chart) SHALL X축에 날짜(일 단위), 좌측 Y축에 상담 콜 수, 우측 Y축에 평균 상담시간(초)을 표시하는 Dual Y-Axis 꺾은선 그래프를 렌더링한다.
2. THE Trend_Chart SHALL 일별 상담_콜 수를 첫 번째 꺾은선으로 표시한다.
3. THE Trend_Chart SHALL 일별 평균_상담시간을 두 번째 꺾은선으로 표시한다.
4. WHEN 사용자가 차트의 데이터 포인트에 호버하면, THE Trend_Chart SHALL 해당 날짜의 "일 총 상담 콜 수 {n}건"과 "일 평균 상담 시간 {n}초"를 툴팁으로 표시한다.
5. THE Trend_Chart SHALL 너비 568px, 그리드 border 1px solid #E2E8F0 opacity 0.8, X축 라벨 12px normal #64748B 규격을 따른다.

---

### 요구사항 9: 시계열 추이 — 시스템 활용도 추이 차트

**사용자 스토리:** 운영 팀장으로서, 일별 어드바이저 이용률과 지식 검색률의 변화 추이를 확인하고 싶다. 이를 통해 상담사의 시스템 활용성 변화를 파악할 수 있다.

#### 인수 조건

1. THE Trend_Chart SHALL X축에 날짜(일 단위), Y축에 백분율(%)을 표시하는 꺾은선 그래프를 렌더링한다.
2. THE Trend_Chart SHALL 일별 어드바이저_이용률을 Line A로 표시한다.
3. THE Trend_Chart SHALL 일별 지식검색_활용률을 Line B로 표시한다.
4. WHEN 사용자가 차트의 데이터 포인트에 호버하면, THE Trend_Chart SHALL 해당 날짜의 "어드바이저 이용률 {n.n}%"와 "지식검색률 {n.n}%"를 소수점 첫째 자리까지 툴팁으로 표시한다.
5. THE Trend_Chart SHALL 너비 568px, 범례 아이템을 8×8 사각형과 12px normal #020617 텍스트로 표시한다.

---

### 요구사항 10: 상세 랭킹 — AI 추천 상담코드 TOP 10

**사용자 스토리:** 데이터 분석가로서, AI 추천 증가율이 높은 상위 10개 상담코드를 확인하고 싶다. 이를 통해 급증하는 상담 유형을 조기에 파악할 수 있다.

#### 인수 조건

1. THE 랭킹_테이블(Ranking_Table) SHALL AI_추천_증가율 기준 상위 10개 상담코드를 순위별로 표시한다.
2. THE Ranking_Table SHALL 각 행에 순위, 상담 소카테고리명, 코드 번호를 표시한다.
3. THE Ranking_Table SHALL 각 행의 서브 지표로 추천 횟수와 AI_추천_증가율(%)을 표시한다.
4. WHEN AI_추천_증가율이 양수(상승)이면, THE Ranking_Table SHALL 해당 증가율을 "+X.X%" 형식으로 빨간색(#EF4444)으로 표시한다.
5. WHEN AI_추천_증가율이 음수(하락)이면, THE Ranking_Table SHALL 해당 증가율을 "−X.X%" 형식으로 파란색(#3B82F6)으로 표시한다.
6. THE Ranking_Table SHALL AI_추천_증가율을 다음 계산식으로 산출한다: (기간 종료 추천횟수 − 기간 시작 추천횟수) / (기간 시작 추천횟수 + 1) × 100.
7. WHEN 사용자가 랭킹 테이블 헤더의 도움말 아이콘에 호버하면, THE Ranking_Table SHALL "AI 추천 상대적 증가율을 기준으로 선정한 상위 10개 코드입니다" 툴팁을 표시한다.
8. THE Ranking_Table SHALL 테이블 컨테이너 border 1px solid #E2E8F0, border-radius 8px, 헤더 셀 높이 40px, 바디 셀 높이 48px 규격을 따른다.

---

### 요구사항 11: 페이지 레이아웃

**사용자 스토리:** 센터 관리자로서, 서비스 이용 통계 화면의 모든 구성 요소가 일관된 레이아웃으로 배치되기를 원한다. 이를 통해 정보를 체계적으로 탐색할 수 있다.

#### 인수 조건

1. THE Service_Statistics_View SHALL 콘텐츠 영역 너비를 1152px로 설정한다.
2. THE Service_Statistics_View SHALL 상단에 Date_Picker와 필터 버튼 3개를 배치한다.
3. THE Service_Statistics_View SHALL Row 1에 도넛_차트 2개(각 332px 너비)와 종합_지표_카드 2개(각 456px 너비, 세로 배치)를 배치한다.
4. THE Service_Statistics_View SHALL Row 2에 추이_차트 2개(각 568px 너비)를 배치한다.
5. THE Service_Statistics_View SHALL Row 3에 랭킹_테이블 카드(1152px 너비, 좌우 분할)를 배치한다.
6. THE Service_Statistics_View SHALL 콘텐츠 패딩 16px 16px 80px, 기본 gap 16px 규격을 따른다.

---

### 요구사항 12: 디자인 시스템 준수

**사용자 스토리:** 센터 관리자로서, 서비스 이용 통계 화면이 포털 전체의 디자인 시스템과 일관된 스타일로 표시되기를 원한다. 이를 통해 통일된 사용자 경험을 제공받을 수 있다.

#### 인수 조건

1. THE Service_Statistics_View SHALL 본문 폰트로 Pretendard, 제목 일부에 Geist 폰트를 사용한다.
2. THE Service_Statistics_View SHALL Primary 컬러로 #7732F8을 사용한다.
3. THE Service_Statistics_View SHALL 카드 컴포넌트에 대형 border-radius 14px, 소형 border-radius 10px을 적용한다.
4. THE Service_Statistics_View SHALL 도넛_차트 크기를 212×212으로 렌더링한다.
5. THE Service_Statistics_View SHALL 테이블 헤더 셀 높이 40px, 바디 셀 높이 48px을 적용한다.

---

### 요구사항 13: 데이터 갱신 및 오류 처리

**사용자 스토리:** 센터 관리자로서, 필터 조건 변경 시 데이터가 자동으로 갱신되고, 오류 발생 시 적절한 안내를 받고 싶다. 이를 통해 안정적으로 데이터를 조회할 수 있다.

#### 인수 조건

1. WHEN 사용자가 Date_Picker에서 기간을 변경하면, THE Service_Statistics_View SHALL 변경된 기간 조건으로 모든 지표(종합_지표_카드, 추이_차트, 랭킹_테이블)를 자동 갱신한다.
2. WHILE 데이터 로딩이 진행 중인 동안, THE Service_Statistics_View SHALL 각 컴포넌트 영역에 로딩 인디케이터를 표시한다.
3. IF 데이터 조회 요청이 실패하면, THEN THE Service_Statistics_View SHALL 사용자에게 오류 메시지를 표시하고 재시도 옵션을 제공한다.
4. IF 선택된 기간에 해당하는 데이터가 존재하지 않으면, THEN THE Service_Statistics_View SHALL 각 컴포넌트 영역에 "데이터 없음" 안내 메시지를 표시한다.

---

### 요구사항 14: 엑셀 다운로드

**사용자 스토리:** 데이터 분석가로서, 조회된 통계 데이터를 엑셀 파일로 다운로드하고 싶다. 이를 통해 외부 도구에서 추가 분석을 수행할 수 있다.

#### 인수 조건

1. THE Service_Statistics_View SHALL 엑셀 다운로드 버튼을 제공한다.
2. WHEN 사용자가 엑셀 다운로드 버튼을 클릭하면, THE Service_Statistics_View SHALL 현재 필터 조건에 해당하는 통계 데이터를 엑셀(.xlsx) 파일로 다운로드한다.
3. THE 다운로드된 엑셀 파일 SHALL 종합 지표 요약, 일별 추이 데이터, 랭킹 테이블 데이터를 포함한다.
