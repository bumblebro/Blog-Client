import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex  flex-col items-center justify-center gap-2 h-screen">
      <h2 className="text-xl font-semibold ">404 Not Found</h2>
      <p className="leading-[1.7rem] font-[330]">
        Could not find the requested page.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-[#004ff2] px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Home
      </Link>
    </main>
  );
}
