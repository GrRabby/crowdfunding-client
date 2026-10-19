// Dashboard route group: /dashboard/**
// Dark sidebar layout — sidebar will be built in Phase 4
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-[#0d0e1a] text-[#f0f1ff]">
      {/* Sidebar placeholder — built in Phase 4 */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
