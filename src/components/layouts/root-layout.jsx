import { Outlet, Link, NavLink } from "react-router";
import { paths } from "@/config/paths";

export function RootLayout() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-body)" }}>
      <header className="border-b border-white/10 px-6 py-4">
        <nav className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to={paths.home.getHref()}
            className="font-semibold text-sm tracking-wide hover:text-white/70 transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            exam-starter
          </Link>
          <div className="flex items-center gap-6 text-sm text-white/60">
            <NavLink
              to={paths.posts.getHref()}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white transition-colors"
              }
            >
              Posts
            </NavLink>
            <NavLink
              to={paths.errorTest.getHref()}
              className={({ isActive }) =>
                isActive ? "text-white" : "hover:text-white transition-colors"
              }
            >
              Error Test
            </NavLink>
            <a
              href="/exam.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Exam Doc
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
