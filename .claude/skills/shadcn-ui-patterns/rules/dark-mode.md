# Dark Mode Rules

## 색상 체계
- 배경: 어두운 네이비/차콜 계열 (`bg-background`)
- 카드: 배경보다 약간 밝은 톤 (`bg-card`)
- 텍스트: 밝은 회색~흰색 (`text-foreground`)
- 보조 텍스트: 중간 밝기 (`text-muted-foreground`)
- 테두리: 미묘한 구분선 (`border-border`)

## 디자인 원칙
- 깔끔하고 모던한 느낌
- 가독성 최우선 — 충분한 명암 대비
- 카드형 UI로 콘텐츠 구분
- 호버/포커스 상태에서 미묘한 밝기 변화

## 사용 패턴
```tsx
// 배경
<div className="bg-background text-foreground">

// 카드
<div className="bg-card text-card-foreground rounded-lg border border-border">

// 보조 텍스트
<p className="text-muted-foreground text-sm">

// 호버 효과
<div className="hover:bg-accent transition-colors">
```

## 금지 사항
- `bg-white`, `text-black` 등 하드코딩된 색상 사용 금지
- 항상 시맨틱 색상 변수(`bg-background`, `text-foreground` 등) 사용
