# Accessibility (a11y) Rules

## 필수 사항
- 모든 이미지에 `alt` 속성
- 모든 인터랙티브 요소에 키보드 접근 가능
- 적절한 색상 대비 (WCAG AA 기준)
- 시맨틱 HTML 사용 (div 남용 금지)

## 시맨틱 HTML
```tsx
// 좋음
<header>...</header>
<nav>...</nav>
<main>...</main>
<section>...</section>
<article>...</article>
<aside>...</aside>
<footer>...</footer>

// 나쁨: 모든 것을 div로
<div class="header">...</div>
<div class="nav">...</div>
```

## 인터랙티브 요소
```tsx
// 버튼: 클릭 액션
<button onClick={handleAction}>액션</button>

// 링크: 페이지 이동
<Link href="/page">이동</Link>
<a href="https://external.com" target="_blank" rel="noopener noreferrer">외부</a>

// 나쁨: div에 onClick
<div onClick={handleAction}>클릭</div>
```

## 폼 접근성
```tsx
<label htmlFor="email">이메일</label>
<input id="email" type="email" aria-describedby="email-help" />
<span id="email-help">예: user@example.com</span>
```

## 포커스 관리
- 모달 열릴 때 포커스 트랩
- 모달 닫힐 때 이전 포커스 복원
- skip navigation 링크 고려

## aria 속성
- `aria-label`: 시각적 텍스트 없는 요소에 라벨
- `aria-hidden="true"`: 장식용 요소 스크린리더 숨김
- `role`: 시맨틱 HTML로 대체 불가능할 때만 사용
