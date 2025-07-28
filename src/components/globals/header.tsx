import logo from "@/assets/brand/logo.png";
import { useEffect, useRef, useState } from "react";

const menuItem: { title: string; href: string }[] = [
  {
    title: "아르카디아",
    href: "/brand/arcadia",
  },
  {
    title: "오딘",
    href: "/brand/odin",
  },
];

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);

    const updateScrollState = () => {
      setScrolled(window.pageYOffset > 0);
    };

    updateScrollState();

    const handleScroll = () => {
      requestAnimationFrame(updateScrollState);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current || !mounted) return;

    const updateHeight = () => {
      const height = headerRef.current?.offsetHeight ?? 80;
      setHeaderHeight(height);
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [mounted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className="p-3 border-b border-b-border flex justify-between items-center fixed top-0 w-full transition-all duration-150 ease-in-out z-50"
        style={{
          background: scrolled ? "rgba(0, 0, 0, 0.2)" : "inherit",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
          backdropFilter: scrolled ? "blur(6.3px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(6.3px)" : "none",
        }}
        ref={headerRef}
      >
        <a
          href="/"
          className="flex items-center font-bold text-2xl uppercase gap-2"
        >
          <img src={logo.src} alt="Logo" width={60} />
          <h1 className="hidden md:block">브랜드 리소스 센터</h1>
        </a>

        <nav className="hidden md:flex uppercase pr-5 gap-3">
          {menuItem.map((item, i) => (
            <a
              href={item.href}
              key={i}
              className="hover:text-primary transition-colors"
            >
              {item.title}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 mr-5 focus:outline-none cursor-pointer"
          onClick={toggleMenu}
          aria-label="메뉴 토글"
        >
          <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            <span
              className="absolute w-6 h-0.5 bg-foreground transition-all duration-600 ease-in-out"
              style={{
                transform: isMenuOpen
                  ? "rotate(45deg)"
                  : "rotate(0) translateY(-6px)",
                transformOrigin: "center",
              }}
            />
            <span
              className="absolute w-6 h-0.5 bg-foreground transition-all duration-600 ease-in-out"
              style={{
                opacity: isMenuOpen ? 0 : 1,
                transform: "rotate(0)",
                transformOrigin: "center",
              }}
            />
            <span
              className="absolute w-6 h-0.5 bg-foreground transition-all duration-600 ease-in-out"
              style={{
                transform: isMenuOpen
                  ? "rotate(-45deg)"
                  : "rotate(0) translateY(6px)",
                transformOrigin: "center",
              }}
            />
          </div>
        </button>
      </header>

      <div
        className={`fixed top-0 left-0 w-full backdrop-blur-md transition-all duration-600 ease-in-out z-40 md:hidden ${
          isMenuOpen ? `opacity-100` : "opacity-0"
        }`}
        style={{
          background: isMenuOpen ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
          paddingTop: `${headerHeight}px`,
          height: isMenuOpen ? `100vh` : "0",
        }}
      >
        <nav className="flex flex-col items-center py-8 space-y-6">
          {menuItem.map((item, i) => (
            <a
              href={item.href}
              key={i}
              className="text-2xl font-bold uppercase hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
      <div style={{ height: `${headerHeight}px` }}></div>
    </>
  );
}
