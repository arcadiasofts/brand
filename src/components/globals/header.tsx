import logo from "@/assets/brand/logo.png";
import { useEffect, useRef, useState } from "react";

export default function GlobalHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(80); // 기본 높이 설정
  const [mounted, setMounted] = useState(false);
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
          <h1>브랜드 리소스 센터</h1>
        </a>
        <nav className="uppercase flex pr-5 gap-3">
          <a href="/brand/arcadia">아르카디아</a>
          <a href="/brand/odin">오딘</a>
          <a href="/brand/stella">스텔라</a>
        </nav>
      </header>
      {/* Spacer div - 항상 최소 높이 보장 */}
      <div style={{ height: `${headerHeight}px` }}></div>
    </>
  );
}
