# 2025년 연말 파티 - 이벤트 참여 신청 페이지

간단하고 깔끔한 이벤트 참여 신청 페이지입니다.

## 🎯 기능

- ✅ 이벤트 참여자 정보 수집 (이름, 휴대폰 번호, 이메일)
- ✅ PostgreSQL 데이터베이스에 신청 정보 저장
- ✅ 이메일 중복 방지
- ✅ 입력 데이터 유효성 검사
- ✅ 사용자 친화적인 UI/UX
- ✅ 반응형 디자인

## 🛠️ 기술 스택

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **Notifications**: Sonner (Toast)

## 📋 프로젝트 구조

```
event-registration/
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts          # 신청 API 엔드포인트
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 메인 신청 페이지
│   └── globals.css               # 전역 스타일
├── lib/
│   ├── db.ts                     # 데이터베이스 유틸리티
│   └── utils.ts                  # 유틸리티 함수
├── components/
│   └── ui/                       # shadcn/ui 컴포넌트
├── .env.example                  # 환경 변수 예제
└── package.json
```

## 🚀 시작하기

### 1. 환경 설정

```bash
# 저장소 클론
git clone https://github.com/jyc0124/event-apply.git
cd event-apply

# 의존성 설치
npm install
```

### 2. 데이터베이스 설정

```bash
# PostgreSQL 데이터베이스 생성
createdb -h localhost -U your_username event_registration

# 테이블 생성
psql -h localhost -U your_username -d event_registration << 'SQL'
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SQL
```

### 3. 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# .env.local 파일 수정 (데이터베이스 연결 정보 입력)
# DATABASE_URL="postgresql://username:password@localhost:5432/event_registration"
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 으로 접속하면 신청 페이지를 볼 수 있습니다.

## 📝 API 엔드포인트

### POST /api/register

이벤트 참여 신청을 처리합니다.

**요청 본문:**
```json
{
  "name": "홍길동",
  "mobile": "010-1234-5678",
  "email": "hong@example.com"
}
```

**성공 응답 (201):**
```json
{
  "message": "신청이 완료되었습니다!",
  "data": {
    "id": 1,
    "name": "홍길동",
    "mobile": "010-1234-5678",
    "email": "hong@example.com",
    "created_at": "2025-12-01T10:00:00Z"
  }
}
```

**에러 응답 (400):**
```json
{
  "error": "이미 등록된 이메일입니다."
}
```

## 🔍 데이터베이스 스키마

### event_registrations 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | SERIAL | 고유 ID (Primary Key) |
| name | VARCHAR(255) | 신청자 이름 |
| mobile | VARCHAR(20) | 휴대폰 번호 |
| email | VARCHAR(255) | 이메일 (UNIQUE) |
| created_at | TIMESTAMP | 신청 시간 |
| updated_at | TIMESTAMP | 수정 시간 |

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
npm start
```

### Vercel 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

## 🔐 보안 주의사항

- `.env.local` 파일은 `.gitignore`에 포함되어 있으므로 커밋되지 않습니다.
- 데이터베이스 연결 정보는 환경 변수로 관리하세요.
- 프로덕션 환경에서는 HTTPS를 사용하세요.

## 📄 라이선스

MIT License

## 👨‍💻 개발자

Jae Young Chang (jyc0124@gmail.com)
