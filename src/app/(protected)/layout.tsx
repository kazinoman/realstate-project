import ProfileSidebar from "@/components/pageComponent/profile/Sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto p-4 sm:p-5 md:p-6 lg:p-8 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        <aside className="md:col-span-4 bg-gray-50 rounded-lg shadow-sm">
          <ProfileSidebar />
        </aside>
        <main className="md:col-span-8 bg-white rounded-lg shadow-sm p-4">{children}</main>
      </div>
    </div>
  );
}
