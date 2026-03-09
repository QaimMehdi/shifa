import { useState } from "react";
import { useNavigate } from "react-router-dom";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "AI Chat", href: "/chat" },
      { label: "Nearby Care", href: "/nearby-care" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms & Privacy", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNavigate = (href: string) => {
    if (href.startsWith("/")) {
      navigate(href);
    } else if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0A0A0B] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Noise texture overlay for premium tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Ultra-thin border */}
      <div className="absolute top-0 inset-x-0 h-[0.5px] bg-white/10" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-20 lg:gap-32">
        {/* MEGA LEFT COLUMN - 50% width */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2
              className="leading-[0.8] tracking-tighter"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(5rem, 12vw, 9rem)",
                color: "#FFFFFF",
              }}
            >
              Shifa.
            </h2>
            
            <div className="mt-16 mb-16">
              <h3 
                className="leading-none tracking-tight mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  color: "#FFFFFF",
                }}
              >
                WHO WE ARE
              </h3>
              <p
                className="max-w-md leading-relaxed"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: "15px",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
              >
                An AI-powered healthcare platform on a mission to make preventive
                care, emergency guidance, and drug safety accessible to everyone.
              </p>
            </div>
          </div>

          {/* Newsletter inside Mega Column */}
          <div className="w-full max-w-md">
            <p
              className="uppercase mb-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              Join our newsletter
            </p>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none pb-4"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 200,
                  fontSize: "14px",
                  color: "#FFFFFF",
                  borderBottom: "0.5px solid rgba(255, 255, 255, 0.15)",
                  transition: "border-color 0.4s ease",
                }}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255, 255, 255, 0.6)")}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(255, 255, 255, 0.15)")}
              />
              <button
                className="absolute right-0 top-0 uppercase transition-opacity duration-500 hover:opacity-60"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  color: "#FFFFFF",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* REFINED SIDEBAR (RIGHT COLUMN) */}
        <div className="lg:w-1/2 flex flex-col justify-between pt-4 lg:pt-8">
          <div className="grid grid-cols-2 gap-y-16 gap-x-8">
            {footerLinks.map((group) => (
              <div key={group.heading}>
                <h4
                  className="mb-8 uppercase"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    color: "#FFFFFF",
                  }}
                >
                  {group.heading}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleNavigate(link.href)}
                        className="group relative text-left pb-1"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 200,
                          fontSize: "14px",
                          letterSpacing: "0.03em",
                          color: "rgba(255, 255, 255, 0.5)",
                          transition: "color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)")}
                      >
                        {link.label}
                        {/* Ultra-thin elegant underline, growing from left */}
                        <span
                          className="absolute bottom-0 left-0 h-[0.5px] bg-white w-0 group-hover:w-full"
                          style={{
                            transition: "width 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
                          }}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Info inside the sidebar */}
          <div className="mt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.1)", borderTopWidth: "0.5px" }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 200,
                fontSize: "12px",
                letterSpacing: "0.05em",
                color: "rgba(255, 255, 255, 0.3)",
              }}
            >
              © {new Date().getFullYear()} Shifa. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-6">
              {["facebook", "twitter", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="transition-colors duration-500"
                  style={{ color: "rgba(255, 255, 255, 0.3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.3)")}
                >
                  {social === "facebook" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  )}
                  {social === "twitter" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  )}
                  {social === "linkedin" && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
