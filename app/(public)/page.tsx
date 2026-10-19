// Home page placeholder — full hero built in Phase 2
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[80dvh] bg-gray-50">
      <h1
        className="font-extrabold text-4xl tracking-tight text-[#0f0a1e]"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        Navbar done ✅
      </h1>
      <p className="text-gray-500 text-base">
        Building <strong className="text-brand">Auth Context + Login</strong> next
      </p>
    </div>
  );
}
