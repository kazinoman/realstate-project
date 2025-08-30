import Container from "@/components/common/container";
import ProfileSidebar from "@/components/pageComponent/profile/Sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="p-4 sm:p-5 md:p-6 lg:p-10  bg-white-300 rounded-[20px] border border-default mt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        <aside className="md:col-span-4 bg-gray-50 sticky top-[20px]">
          <ProfileSidebar />
        </aside>
        <main className="md:col-span-8 bg-white rounded-lg shadow-sm p-10">{children}</main>
      </div>
    </Container>
  );
}
