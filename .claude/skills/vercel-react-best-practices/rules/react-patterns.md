# React 19 Patterns

## 컴포넌트 설계
- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- Props 타입은 interface/type으로 명시
- children prop은 `ReactNode` 타입
- 컴포넌트당 하나의 책임 (SRP)
- 200줄 초과 시 분리

## Props 패턴
```tsx
interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function Card({ title, description, children }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
```

## 상태 관리
- 로컬 상태: useState
- 복잡한 상태: useReducer
- 전역 상태: 필요 시 Context API (과도한 사용 금지)
- 서버 상태: Convex useQuery/useMutation (이 프로젝트)

## 조건부 렌더링
```tsx
// 좋음: 명확한 조건
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataView data={data} />}

// 나쁨: 중첩된 삼항
{isLoading ? <Spinner /> : error ? <Error /> : <Data />}
```

## 리스트 렌더링
- key는 고유하고 안정적인 값 사용 (index 지양)
- Convex의 `_id` 활용
```tsx
{items.map((item) => (
  <ItemCard key={item._id} item={item} />
))}
```

## 이벤트 핸들러
- 핸들러 함수명: `handle` 접두사 (handleClick, handleSubmit)
- Props 콜백명: `on` 접두사 (onClick, onSubmit)

## 커스텀 훅
- `use` 접두사 필수
- 하나의 관심사에 집중
- 재사용 가능한 로직 추출 시 활용
