import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSection from "./_components/profile/ProfileSection";
import SnsLinksSection from "./_components/profile/SnsLinksSection";
import PersonalPagesSection from "./_components/profile/PersonalPagesSection";
import { ProductsSection } from "./_components/products/ProductsSection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "관리자 | Nathan Portfolio",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-foreground mb-8">관리자</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="products">프로덕트</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileSection />
            <SnsLinksSection />
            <PersonalPagesSection />
          </TabsContent>

          <TabsContent value="products">
            <ProductsSection />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
