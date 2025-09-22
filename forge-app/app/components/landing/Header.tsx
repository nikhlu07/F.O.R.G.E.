
import Image from "next/image";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-gray-800">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/logo.svg" width={24} height={24} alt="F.O.R.G.E. Logo" />
          <span className="text-xl font-bold tracking-tight text-white">F.O.R.G.E.</span>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 text-sm font-semibold text-black bg-cyan-400 rounded-full hover:bg-white transition-colors shadow-[0_0_20px_rgba(56,189,248,0.5)]"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
};
