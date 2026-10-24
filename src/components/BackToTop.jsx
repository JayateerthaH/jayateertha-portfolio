import { useEffect, useState } from "react";

// Floating "back to top" button, shown after the visitor scrolls past the hero.
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return <a href="#top" className="to-top" aria-label="Back to top">↑</a>;
}
