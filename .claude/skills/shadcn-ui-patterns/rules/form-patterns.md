# Form Patterns Rules

## 기술 스택
- `react-hook-form`: 폼 상태 관리
- `zod`: 스키마 유효성 검사
- `@hookform/resolvers/zod`: 연동

## 패턴

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form, FormControl, FormField, FormItem,
  FormLabel, FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  description: z.string().min(1, "설명을 입력해주세요"),
  serviceUrl: z.string().url("유효한 URL을 입력해주세요").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function ProductForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", description: "", serviceUrl: "" },
  });

  function onSubmit(values: FormValues) {
    // mutation 호출
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
```

## 규칙
- 모든 폼은 zod 스키마로 유효성 검사
- 에러 메시지는 한국어로 표시
- optional URL 필드는 `.optional().or(z.literal(""))` 패턴
- 제출 중 로딩 상태 표시 (Button disabled + spinner)
