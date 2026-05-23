import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/jobs">Jobs</Link>
        <Link href="/company-list">Company</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}