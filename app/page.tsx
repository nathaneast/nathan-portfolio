import HomeContent from "./_components/home/HomeContent";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-4 lg:py-20">
        <HomeContent />
      </div>
    </main>
  );
}
