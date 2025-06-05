# 📊 Profiler App

**Profiler App**은 Node.js 기반의 웹 애플리케이션으로, 사용자가 업로드한 `.txt` 파일 데이터를 자동 분석하고 시각화하는 통계 분석 도구입니다. Core별 Task 데이터를 파싱하여 데이터베이스에 저장하고, 다양한 통계 정보를 Chart.js를 통해 시각적으로 제공합니다.


## ✅ 주요 기능

### 📁 파일 업로드 및 분석
- `.txt` 파일 업로드 시 자동으로 데이터 파싱 및 분석 처리

### 🧩 Core / Task 단위 데이터 처리
- Core/Task 데이터를 추출하고 DB에 저장
- 사용 기술: **Sequelize + SQLite**

### 📐 통계값 계산
- MIN (최솟값)
- MAX (최댓값)
- AVG (평균)
- STD (표준편차)

### 📊 시각화 (Chart.js)
- 다양한 차트 유형 지원: **Bar, Line, Pie**
- Core 단위 분석 그래프 제공
- 사용자 인터랙션 기반 **동적 그래프 전환**

## 🧪 샘플 데이터: `inputFile_3000.txt`

- 위치: `sample data/` 폴더 내  
- 구성:
  - **Core**: `core1` ~ `core5`
  - **Task**: `task1` ~ `task5`
  - **값 범위**: `0 ~ 5000` 사이의 난수
- 총 3000개의 Core/Task 데이터를 포함  
- 앱 기능과 시각화 성능 테스트에 사용 가능

## 🚀 실행 방법

### 1️⃣ 의존성 설치
npm install

### 2️⃣ 애플리케이션 실행
node app.js

### 3️⃣ 웹에서 접속
http://localhost:3000

### 4️⃣ 파일 업로드
.txt 파일을 업로드하여 분석 및 시각화 결과를 확인하세요.
