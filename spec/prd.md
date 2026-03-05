## 목적

- 1인 개발자인 나를 소개하고, 내가 만든 프로덕트를 나열하여 한눈에 볼 수 있도록 하기 위함
- 프로덕트들 소개에 중점이 있는 링크트리 느낌의 웹 사이트

## 핵심기능

- 내 소개, 내가 진행한 프로젝트들 구체적으로 한눈에 보고 링크 들어가서 볼 수 있어야함
- 다크모드 전용으로 구현

## 유저 스토리

### 홈 화면

- 레이아웃
  - 데스크탑/태블릿: 왼쪽에 소개, 오른쪽에 프로덕트 목록 (동일 레이아웃)
  - 모바일: 소개가 위, 프로덕트 목록이 아래 (세로 배치)

- 프로덕트 목록
  - 카드 형태로 노출: 이미지, 소개, 서비스 링크, 깃허브 링크, 소개영상 링크
  - 현재 서비스하지 않으면 서비스링크란에 "서비스 종료" 노출
  - 최신순 정렬
  - 15개씩 무한스크롤 방식으로 노출

- 내 소개
  - 프로필 이미지 (원형)
  - 소개글
  - SNS 아이콘 링크 (쓰레드, X, 링크드인, 깃허브, 메일)
  - SNS 아이콘 아래에 개인 페이지 링크 목록 (N개 등록 가능)
    - 각 항목: 아이콘, 이름, 링크, 한줄 소개
    - 예시: (아이콘) 생각노트 블로그(링크) - 내가 생각하는 글들을 모아놓은 것

### 수정 페이지

- 인증
  - 수정 페이지 접근 시 비밀번호 입력
  - 환경변수에 저장된 비밀번호와 서버 사이드에서 비교
  - 인증 성공 시 세션 유지 (브라우저 닫을 때까지)

- 내 소개 관리 (CRUD)
  - 프로필 이미지, 소개글 등록/수정
  - SNS 아이콘 및 링크 등록/수정/삭제
  - 개인 페이지 링크 등록/수정/삭제

- 프로덕트 관리 (CRUD)
  - 프로덕트 등록/수정/삭제
  - 입력 필드: 이미지, 제목, 소개, 서비스 링크, 깃허브 링크, 소개영상 링크, 서비스 상태(활성/종료)

---

## 기술

- Next.js, Vercel 배포
- Convex (DB + 파일 스토리지)
  - 이미지는 Convex 파일 스토리지에 저장 (무료 1GB, 200장 이하 규모로 충분)
- SEO 고려해서 작업
- 다크모드 전용 (라이트모드 미지원)

## 인증 방식

- 환경변수에 비밀번호 저장
- 서버 사이드에서 비밀번호 비교 후 세션 쿠키 발급
- 세션 유지: 브라우저 닫을 때까지 (session cookie)

## DB 스키마 (Convex)

### profile (단일 레코드)
- imageUrl: string (프로필 이미지 URL)
- introduction: string (소개글)
- snsLinks: array (SNS 링크 목록)
  - type: string (threads | x | linkedin | github | email)
  - url: string

### personalPages (N개)
- icon: string (아이콘 식별자)
- name: string (페이지 이름, 예: "생각노트 블로그")
- url: string (링크)
- description: string (한줄 소개)
- order: number (정렬 순서)

### products (N개)
- imageUrl: string (프로덕트 이미지 URL)
- title: string (제목)
- description: string (소개)
- serviceUrl: string (서비스 링크, optional)
- githubUrl: string (깃허브 링크, optional)
- videoUrl: string (소개영상 링크, optional)
- status: string (active | ended)
- createdAt: number (등록일, 최신순 정렬용)

## 디자인

- 다크 배경 + 카드형 UI
- 깔끔, 모던하고 가독성 좋게 한눈에 보여야함
- 벤치마킹 사이트
  - https://indielog.xyz/seonggoos
