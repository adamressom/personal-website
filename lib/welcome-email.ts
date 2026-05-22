function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildWelcomeEmail({
  appUrl,
  name,
}: {
  appUrl: string;
  name: string | null;
}) {
  const baseUrl = appUrl.replace(/\/$/, "");
  const safeUrl = escapeHtml(baseUrl);
  const firstName = name?.trim().split(/\s+/)[0] ?? null;
  const textGreeting = firstName ? `Hey ${firstName},` : "Hey,";
  const headline = "Welcome.";

  return {
    text: [
      textGreeting,
      "",
      "A short, weekly note on shipping software, lessons from building, and what broke along the way. No fluff, no spam.",
      "",
      "🚀 • 🛠️ • 🔭",
      "",
      "Explore site:",
      baseUrl,
      "",
      "Links:",
      "GitHub: https://github.com/adamressom",
      "LinkedIn: https://linkedin.com/in/adam-ressom",
      "Email: aressom@umich.edu",
      "",
      "If you did not create this account, you can ignore this email.",
      "",
      "Adam",
    ].join("\n"),
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Welcome to adamressom.dev</title>
    <style>
      @media (prefers-reduced-motion: no-preference) {
        .email-shell { animation: cardIn 620ms cubic-bezier(.2,.8,.2,1) both; }
        .cta { transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease; }
        .cta:hover { transform: translateY(-1px) scale(1.025); background:#2f6f91 !important; box-shadow:0 16px 36px rgba(47,111,145,0.24) !important; }
        .social { transition: background 180ms ease, border-color 180ms ease, color 180ms ease; }
        .social:hover { background:rgba(47,111,145,0.09) !important; border-color:rgba(47,111,145,0.28) !important; color:#172023 !important; }
      }
      @keyframes cardIn {
        0% { opacity: 0; transform: translateY(12px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      @media only screen and (max-width: 620px) {
        .page-pad { padding: 18px 12px !important; }
        .shell { width: 100% !important; }
        .card-pad { padding: 28px 22px 24px !important; }
        .headline { font-size: 44px !important; line-height: 46px !important; }
        .copy { font-size: 14px !important; line-height: 22px !important; }
        .tag-cell { display: inline-block !important; padding: 4px 2px !important; }
        .tag { padding: 7px 9px !important; font-size: 10px !important; }
        .link-cell { padding: 3px !important; }
        .social { padding: 9px 8px !important; font-size: 11px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#151719;color:#f5f1e8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      A short weekly note on shipping software, lessons from building, and what broke along the way.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="page-pad" style="background:#151719;margin:0;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" class="email-shell shell" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;">
            <tr>
              <td style="padding:0 4px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;color:#f5f1e8;font-size:12px;letter-spacing:0.4px;">
                      adamressom.dev
                    </td>
                    <td align="right">
                      <span style="display:inline-block;border:1px solid rgba(198,208,218,0.18);border-radius:999px;background:rgba(198,208,218,0.08);padding:6px 10px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;color:#c6d0da;font-size:10px;line-height:12px;letter-spacing:0.4px;">
                        + subscribed
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="card-pad" style="background:#f5f1e8;border:1px solid #dfd9cc;border-radius:28px;padding:34px 34px 28px;text-align:left;box-shadow:0 30px 80px rgba(0,0,0,0.28);">
                <p style="margin:0 0 10px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;color:#70808d;font-size:11px;line-height:16px;letter-spacing:1.3px;text-transform:uppercase;">
                  signal received
                </p>
                <h1 class="headline" style="margin:0;color:#161819;font-size:54px;line-height:56px;font-weight:800;letter-spacing:0;">
                  ${headline}
                </h1>
                <p class="copy" style="margin:14px 0 0;max-width:410px;color:#3f464b;font-size:15px;line-height:24px;">
                  A short, weekly note on shipping software, lessons from building, and what broke along the way. No fluff, no spam.
                </p>
                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:22px 0 0;">
                  <tr>
                    <td class="tag-cell" style="padding:0 6px 0 0;">
                      <span class="tag" style="display:inline-block;border:1px solid #d8d2c6;border-radius:999px;background:#fffaf0;padding:8px 13px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;color:#20272b;font-size:15px;line-height:17px;">🚀</span>
                    </td>
                    <td class="tag-cell" style="padding:0 6px;">
                      <span class="tag" style="display:inline-block;border:1px solid #d8d2c6;border-radius:999px;background:#edf4f8;padding:8px 13px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;color:#20272b;font-size:15px;line-height:17px;">🛠️</span>
                    </td>
                    <td class="tag-cell" style="padding:0 0 0 6px;">
                      <span class="tag" style="display:inline-block;border:1px solid #d8d2c6;border-radius:999px;background:#eceff1;padding:8px 13px;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;color:#20272b;font-size:15px;line-height:17px;">🔭</span>
                    </td>
                  </tr>
                </table>
                <a class="cta" href="${safeUrl}" style="display:inline-block;margin:26px 0 0;background:#171a1c;color:#fffaf0;text-decoration:none;border-radius:999px;padding:14px 20px;font-size:14px;line-height:18px;font-weight:700;box-shadow:0 12px 28px rgba(23,26,28,0.18);">
                  Explore Site &rarr;
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 0 0;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td class="link-cell" width="33.33%" style="padding:4px;">
                      <a class="social" href="https://github.com/adamressom" style="display:block;border:1px solid rgba(198,208,218,0.16);border-radius:999px;background:rgba(245,241,232,0.04);padding:10px 10px;text-align:center;color:#e8e1d5;text-decoration:none;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:12px;line-height:14px;">
                        <svg role="img" aria-label="GitHub" width="18" height="18" viewBox="0 0 24 24" style="display:block;margin:0 auto 6px;fill:#f5f1e8;">
                          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.3-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.6 4.7 18.7 5 18.7 5c.7 1.6.2 2.9.1 3.2.8.9 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z"/>
                        </svg>
                        GitHub
                        <span style="display:block;margin-top:3px;color:#8e9aa3;font-size:10px;">adamressom</span>
                      </a>
                    </td>
                    <td class="link-cell" width="33.33%" style="padding:4px;">
                      <a class="social" href="https://linkedin.com/in/adam-ressom" style="display:block;border:1px solid rgba(198,208,218,0.16);border-radius:999px;background:rgba(245,241,232,0.04);padding:10px 10px;text-align:center;color:#e8e1d5;text-decoration:none;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:12px;line-height:14px;">
                        <svg role="img" aria-label="LinkedIn" width="18" height="18" viewBox="0 0 24 24" style="display:block;margin:0 auto 6px;">
                          <rect width="24" height="24" rx="3" fill="#0A66C2"/>
                          <path fill="#fff" d="M6.9 9.2H3.8v10h3.1v-10ZM5.4 7.8a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm13.8 11.4h-3.1v-4.9c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6v5h-3.1v-10h3v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v5.5Z"/>
                        </svg>
                        LinkedIn
                        <span style="display:block;margin-top:3px;color:#8e9aa3;font-size:10px;">adam-ressom</span>
                      </a>
                    </td>
                    <td class="link-cell" width="33.33%" style="padding:4px;">
                      <a class="social" href="mailto:aressom@umich.edu" style="display:block;border:1px solid rgba(198,208,218,0.16);border-radius:999px;background:rgba(245,241,232,0.04);padding:10px 10px;text-align:center;color:#e8e1d5;text-decoration:none;font-family:'SFMono-Regular',Consolas,'Liberation Mono',monospace;font-size:12px;line-height:14px;">
                        <svg role="img" aria-label="Gmail" width="22" height="18" viewBox="0 0 256 193" style="display:block;margin:0 auto 6px;">
                          <path fill="#4285F4" d="M58.2 192.1V93.4L27.3 65.1 0 49.7v125c0 9.6 7.8 17.4 17.4 17.4h40.8Z"/>
                          <path fill="#34A853" d="M197.8 192.1h40.8c9.6 0 17.4-7.8 17.4-17.4v-125l-31 17.7-27.2 26v98.7Z"/>
                          <path fill="#EA4335" d="M58.2 93.4 54 54.3l4.2-37.4L128 69.3l69.8-52.4 4.7 35.4-4.7 41.1L128 145.8 58.2 93.4Z"/>
                          <path fill="#FBBC04" d="M197.8 16.9v76.5L256 49.7V25.6c0-21.5-24.6-33.7-41.7-20.8l-16.5 12.1Z"/>
                          <path fill="#C5221F" d="M0 49.7 26.8 69.8l31.4 23.6V16.9L41.7 4.8C24.6-8.1 0 4.1 0 25.6v24.1Z"/>
                        </svg>
                        Email
                        <span style="display:block;margin-top:3px;color:#8e9aa3;font-size:10px;">umich</span>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 4px 0;text-align:center;">
                <p style="margin:0;color:#69747c;font-size:11px;line-height:18px;">
                  If you did not create this account, you can ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };
}
