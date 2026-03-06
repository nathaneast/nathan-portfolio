export const metadata = {
  title: "관리자 | Nathan Portfolio",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <h1 className="text-2xl font-bold text-foreground">관리자 페이지</h1>
        <p className="mt-2 text-muted-foreground">
          프로필 및 프로덕트를 관리합니다.
        </p>
      </div>
    </main>
  );
}
