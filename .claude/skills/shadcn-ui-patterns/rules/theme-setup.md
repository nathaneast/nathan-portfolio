# Theme Setup Rules

## 다크모드 전용 설정
- 이 프로젝트는 다크모드 전용 — `<html>` 태그에 `class="dark"` 항상 적용
- 라이트모드 토글 불필요

## CSS 변수 설정 (globals.css)

```css
@layer base {
  :root {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;
    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;
    --popover: 224 71% 4%;
    --popover-foreground: 213 31% 91%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;
    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;
    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;
    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;
    --border: 216 34% 17%;
    --input: 216 34% 17%;
    --ring: 216 34% 17%;
    --radius: 0.5rem;
  }
}
```

## Tailwind 설정
- shadcn/ui 설치 시 자동 생성되는 설정 활용
- 커스텀 색상은 CSS 변수로 관리
- `darkMode: "class"` 설정 유지
