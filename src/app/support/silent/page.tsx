// ✅ FILE: src/app/support/silent/page.tsx
export const runtime = "nodejs";
export const dynamic = "force-static";

export default function SilentSupportPlaceholder() {
  return (
    <main className="min-h-screen grid place-items-center bg-black text-white px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-semibold">Silent Support</h1>
        <p className="mt-3 text-white/70">
          This form is coming soon. For now, email support@eccoozs.com.
        </p>
      </div>
    </main>
  );
}
