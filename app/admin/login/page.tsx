import { LoginForm } from "./_components/LoginForm";

export const metadata = {
  title: "관리자 로그인 | Nathan Portfolio",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}
