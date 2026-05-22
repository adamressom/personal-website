import { buildWelcomeEmail } from "@/lib/welcome-email";

export const metadata = {
  title: "Email Preview | adamressom.dev",
  description: "Preview the adamressom.dev welcome email.",
};

export const dynamic = "force-dynamic";

export default function EmailPreviewPage() {
  const email = buildWelcomeEmail({
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://adamressom.dev",
    name: "Adam",
  });

  return (
    <main className="min-h-screen bg-[#151719] px-4 pb-14 pt-14 text-[#f5f1e8]">
      <section className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="mono-font text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8fa8b6]">
            resend preview
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
            Welcome email
          </h1>
          <p className="mt-2 text-sm text-[#8e9aa3]">
            Compact welcome card with GitHub, LinkedIn, and school email links.
          </p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#151719] shadow-[0_28px_90px_rgba(0,0,0,0.36)]">
          <div className="border-b border-white/10 bg-[#101214] px-5 py-4 text-[#f5f1e8]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-[#8fa8b6]">
                  from
                </p>
                <p className="mt-1 text-sm font-semibold">Adam Ressom</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="mono-font text-[10px] uppercase tracking-[0.16em] text-[#8fa8b6]">
                  subject
                </p>
                <p className="mt-1 text-sm font-semibold">
                  Welcome to adamressom.dev
                </p>
              </div>
            </div>
          </div>

          <iframe
            title="Welcome email preview"
            srcDoc={email.html}
            className="h-[620px] w-full bg-[#151719]"
          />
        </div>
      </section>
    </main>
  );
}
