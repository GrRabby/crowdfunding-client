// Auth route group: /login, /register
// Centered card layout on a subtle gray background
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-50 px-4 py-12">
      {children}
    </div>
  );
}
