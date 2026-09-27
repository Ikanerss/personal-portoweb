export default function Footer() {
  return (
    <footer className="py-12 border-t border-neutral-100 text-center">
      <div className="max-w-6xl mx-auto px-6 space-y-2">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Faizano. Built with Next.js, Tailwind CSS, & Supabase.
        </p>
        <p className="text-[11px] text-neutral-400">
          Designed with clean minimalism & data-driven mindset.
        </p>
      </div>
    </footer>
  );
}