import Link from "next/link";

const navItems = [
  { label: "Review Your Area", href: "/review" },
  { label: "Find Places to Live", href: "/find" },
  { label: "Rankings", href: "/rankings" },
  { label: "Home Buying Tips", href: "/tips" },
];

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-3 px-6 border-b border-amber-300 bg-amber-50 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold tracking-tight text-amber-800 hover:text-amber-700 transition-colors">
        NeighborFit
      </Link>
      <div className="flex gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 rounded-full text-amber-700 hover:bg-amber-100 hover:text-amber-800 transition-colors font-medium text-sm"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 