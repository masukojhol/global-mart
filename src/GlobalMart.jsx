import { useState, useEffect } from "react";

const CATEGORIES = [
  { label: "New In", badge: null },
  { label: "Nepal", badge: "HOT" },
  { label: "India", badge: null },
  { label: "Pakistan", badge: null },
  { label: "Korea", badge: null },
  { label: "Grocery", badge: null },
  { label: "Spices", badge: null },
  { label: "Fashion", badge: null },
  { label: "Sale", badge: "SALE" },
];

const FLASH_DEALS = [
  { id: 1, name: "Nepali Masala Chiya Set (Premium)", originalPrice: 25000, salePrice: 17500, discount: 30, img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=533&fit=crop", sold: 92, rating: 4.9, reviews: 1240, category: "Nepal", flag: "🇳🇵" },
  { id: 2, name: "Basmati Rice Premium (5kg)", originalPrice: 32000, salePrice: 22000, discount: 31, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=533&fit=crop", sold: 88, rating: 4.8, reviews: 3420, category: "India", flag: "🇮🇳" },
  { id: 3, name: "Pakistani Biryani Masala Bundle", originalPrice: 28000, salePrice: 18900, discount: 33, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=533&fit=crop", sold: 85, rating: 4.7, reviews: 2180, category: "Pakistan", flag: "🇵🇰" },
  { id: 4, name: "Korean Gochujang Premium Set", originalPrice: 35000, salePrice: 24500, discount: 30, img: "https://images.unsplash.com/photo-1583224874284-0a3d38c1c0c3?w=400&h=533&fit=crop", sold: 78, rating: 4.8, reviews: 4560, category: "Korea", flag: "🇰🇷" },
];

const PRODUCTS = [
  // Nepal Products
  { id: 5, name: "Nepali Gundruk (Dried Leafy Greens)", price: 15000, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=533&fit=crop", rating: 4.9, reviews: 1520, tag: "Best Seller", rocket: true, category: "Nepal", flag: "🇳🇵" },
  { id: 6, name: "Himalayan Pink Salt (Premium 1kg)", price: 18000, img: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&h=533&fit=crop", rating: 4.8, reviews: 2870, tag: null, rocket: true, category: "Nepal", flag: "🇳🇵" },
  // India Products
  { id: 7, name: "MDH Garam Masala Bundle (5 Pack)", price: 25000, img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=533&fit=crop", rating: 4.7, reviews: 4230, tag: "Popular", rocket: true, category: "India", flag: "🇮🇳" },
  { id: 8, name: "Indian Ghee (Amul Premium 1L)", price: 28000, img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=533&fit=crop", rating: 4.8, reviews: 3890, rocket: true, category: "India", flag: "🇮🇳" },
  // Pakistan Products
  { id: 9, name: "Shan Nihari Masala Pack", price: 12000, img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=533&fit=crop", rating: 4.6, reviews: 1720, tag: "Top Rated", rocket: true, category: "Pakistan", flag: "🇵🇰" },
  { id: 10, name: "Pakistani Kurtis (Traditional)", price: 45000, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=533&fit=crop", rating: 4.9, reviews: 890, tag: "New", rocket: true, category: "Pakistan", flag: "🇵🇰" },
  // Korea Products
  { id: 11, name: "Korean Kimchi (Premium 1kg)", price: 22000, img: "https://images.unsplash.com/photo-1583224874284-0a3d38c1c0c3?w=400&h=533&fit=crop", rating: 4.7, reviews: 5640, category: "Korea", flag: "🇰🇷" },
  { id: 12, name: "Korean Ramen Variety Box (20pk)", price: 32000, img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=533&fit=crop", rating: 4.5, reviews: 4890, tag: "Trending", category: "Korea", flag: "🇰🇷" },
];

// Format Korean Won
const formatKRW = (price) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};

// Convert to USD (approximate)
const toUSD = (krw) => {
  return (krw / 1350).toFixed(2);
};

function useWindowSize() {
  const [size, setSize] = useState({ width: typeof window !== 'undefined' ? window.innerWidth : 1200 });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return size;
}

function StarRating({ rating }) {
  return (
    <span style={{ color: "#1A1A1A", fontSize: 11, letterSpacing: -0.5 }}>
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span style={{ color: "#BDBDBD" }}>{"★".repeat(5 - Math.ceil(rating))}</span>
    </span>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ h: 5, m: 32, s: 15 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        let { h, m, s } = t;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h: 0, m: 0, s: 0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{
            background: "#C8102E", color: "#fff", fontFamily: "var(--font-mono)",
            fontSize: 13, fontWeight: 500, padding: "4px 8px", borderRadius: 0, minWidth: 28, textAlign: "center"
          }}>{v}</span>
          {i < 2 && <span style={{ fontWeight: 500, fontSize: 14, color: "#666666" }}>:</span>}
        </span>
      ))}
    </div>
  );
}

function ProgressBar({ percent }) {
  return (
    <div style={{ width: "100%", height: 4, background: "#E8E8E6", borderRadius: 0, overflow: "hidden" }}>
      <div style={{
        width: `${percent}%`, height: "100%", borderRadius: 0,
        background: percent > 80 ? "#C8102E" : "#1A1A1A",
        transition: "width 0.6s ease"
      }} />
    </div>
  );
}

function RocketBadge({ small = false }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: "#1557FF", color: "#fff",
      padding: small ? "2px 6px" : "4px 8px",
      borderRadius: 0,
      fontSize: small ? 9 : 10,
      fontWeight: 600,
      letterSpacing: 0.3
    }}>
      <span>🚀</span>
      <span>Rocket</span>
    </div>
  );
}

export default function GlobalMart() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(2);
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showBanner, setShowBanner] = useState(true);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const { width } = useWindowSize();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const getGridColumns = () => {
    if (isMobile) return "repeat(2, 1fr)";
    if (isTablet) return "repeat(3, 1fr)";
    return "repeat(4, 1fr)";
  };

  const toggleLike = (id) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // CSS Variables - M&S inspired
  const cssVars = {
    "--brand-primary": "#000000",
    "--brand-white": "#FFFFFF",
    "--brand-offwhite": "#F8F7F5",
    "--text-primary": "#1A1A1A",
    "--text-body": "#333333",
    "--text-secondary": "#666666",
    "--text-muted": "#999999",
    "--ui-sale": "#C8102E",
    "--ui-rocket": "#1557FF",
    "--ui-success": "#2D7D3F",
    "--reward-gold": "#C8A951",
    "--reward-light": "#F5EDD6",
    "--surface-cream": "#FAF9F7",
    "--surface-light": "#F5F5F3",
    "--border-light": "#E8E8E6",
    "--border-medium": "#D0D0CE",
    "--font-primary": "'Raleway', 'Gill Sans', sans-serif",
    "--font-body": "'Libre Franklin', 'Source Sans Pro', sans-serif",
    "--font-accent": "'Cormorant Garamond', 'Playfair Display', serif",
    "--font-mono": "'DM Mono', 'SF Mono', monospace",
  };

  return (
    <div style={{
      ...cssVars,
      fontFamily: "var(--font-body)",
      background: "var(--surface-cream)",
      minHeight: "100vh",
      color: "var(--text-primary)"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Libre+Franklin:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top Promo Banner */}
      {showBanner && (
        <div style={{
          background: "#1557FF", color: "#FFFFFF", textAlign: "center", padding: isMobile ? "10px 40px 10px 16px" : "12px 16px",
          fontSize: isMobile ? 12 : 13, fontWeight: 400, letterSpacing: 0.3, position: "relative",
          fontFamily: "var(--font-body)"
        }}>
          🌍 <strong>Taste of Home in Korea</strong> — Nepal 🇳🇵 India 🇮🇳 Pakistan 🇵🇰 & More | <span style={{ fontWeight: 600 }}>Free delivery over ₩30,000</span>
          <button onClick={() => setShowBanner(false)} style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 18, padding: 4
          }}>×</button>
        </div>
      )}

      {/* Header */}
      <header style={{
        background: "#FFFFFF", borderBottom: "1px solid var(--border-light)", position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: isMobile ? "14px 16px" : "0 24px",
          display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? 14 : 24, minHeight: isMobile ? "auto" : 64
        }}>
          {/* Top row for mobile: Logo + Cart */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, flexShrink: 0 }}>
              <span style={{
                fontSize: isMobile ? 22 : 26,
                fontWeight: 300,
                letterSpacing: -1,
                fontFamily: "var(--font-accent)",
                color: "#000000"
              }}>Global</span>
              <span style={{
                fontSize: isMobile ? 22 : 26,
                fontWeight: 500,
                letterSpacing: -1,
                fontFamily: "var(--font-accent)",
                color: "#000000"
              }}>Mart</span>
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#1557FF",
                marginLeft: 6,
                fontFamily: "var(--font-primary)",
                letterSpacing: 0.5
              }}>KOREA</span>
            </div>

            {/* Mobile Nav Actions */}
            {isMobile && (
              <nav style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <button style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, color: "#1A1A1A"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </button>
                <button style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, color: "#1A1A1A"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
                <button style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0, position: "relative", color: "#1A1A1A"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                  {cartCount > 0 && (
                    <span style={{
                      position: "absolute", top: -6, right: -8, background: "#C8102E", color: "#fff",
                      fontSize: 9, fontWeight: 600, borderRadius: 10, padding: "2px 5px", minWidth: 14, textAlign: "center"
                    }}>{cartCount}</span>
                  )}
                </button>
              </nav>
            )}
          </div>

          {/* Search - Desktop */}
          {!isMobile && (
            <div style={{
              flex: 1, maxWidth: 520, display: "flex", border: "2px solid #1557FF",
              borderRadius: 0, overflow: "hidden", height: 44
            }}>
              <input
                type="text"
                placeholder="Search Nepali, Indian, Pakistani, Korean products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1, border: "none", outline: "none", padding: "0 16px",
                  fontSize: 14, fontFamily: "var(--font-body)", background: "#fff"
                }}
              />
              <button style={{
                width: 52, background: "#1557FF", border: "none", color: "#fff",
                cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          )}

          {/* Desktop Nav Actions */}
          {!isMobile && (
            <nav style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 12px", background: "var(--surface-light)", borderRadius: 0
              }}>
                <span style={{ fontSize: 14 }}>🌐</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-secondary)" }}>EN</span>
              </div>
              <button style={{
                background: "none", border: "none", cursor: "pointer", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 2, padding: 0
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-secondary)", fontFamily: "var(--font-primary)", letterSpacing: 0.5 }}>Account</span>
              </button>
              <button style={{
                background: "none", border: "none", cursor: "pointer", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 2, padding: 0
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
                <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-secondary)", fontFamily: "var(--font-primary)", letterSpacing: 0.5 }}>Wishlist</span>
              </button>
              <button style={{
                background: "none", border: "none", cursor: "pointer", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 2, padding: 0, position: "relative"
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span style={{ fontSize: 10, fontWeight: 500, color: "var(--text-secondary)", fontFamily: "var(--font-primary)", letterSpacing: 0.5 }}>Cart</span>
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute", top: -4, right: -8, background: "#C8102E", color: "#fff",
                    fontSize: 9, fontWeight: 600, borderRadius: 10, padding: "2px 5px", minWidth: 14, textAlign: "center"
                  }}>{cartCount}</span>
                )}
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Category Bar */}
      <div style={{
        background: "#FFFFFF", borderBottom: "1px solid var(--border-light)", overflowX: "auto",
        scrollbarWidth: "none", WebkitOverflowScrolling: "touch"
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 12px" : "0 24px",
          display: "flex", gap: 0, justifyContent: isMobile ? "flex-start" : "center"
        }}>
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(activeCategory === i ? null : i)}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: isMobile ? "14px 10px" : "16px 18px",
                display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap",
                borderBottom: activeCategory === i ? "2px solid #000" : "2px solid transparent",
                transition: "all 0.2s", position: "relative",
                fontFamily: "var(--font-primary)"
              }}
            >
              <span style={{
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                color: cat.badge === "SALE" ? "#C8102E" : (activeCategory === i ? "#000" : "var(--text-secondary)"),
                textTransform: "uppercase",
                letterSpacing: 0.8
              }}>{cat.label}</span>
              {cat.badge && (
                <span style={{
                  background: cat.badge === "HOT" ? "#FF6B35" : "#C8102E",
                  color: "#fff",
                  fontSize: 8,
                  fontWeight: 700,
                  padding: "2px 5px",
                  borderRadius: 0,
                  letterSpacing: 0.5
                }}>{cat.badge}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && (
        <div style={{ padding: "12px 16px", background: "#FFFFFF", borderBottom: "1px solid var(--border-light)" }}>
          <div style={{
            display: "flex", border: "2px solid #1557FF",
            borderRadius: 0, overflow: "hidden", height: 42
          }}>
            <input
              type="text"
              placeholder="Search products from home..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1, border: "none", outline: "none", padding: "0 14px",
                fontSize: 14, fontFamily: "var(--font-body)", background: "#fff"
              }}
            />
            <button style={{
              width: 48, background: "#1557FF", border: "none", color: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "20px 16px 60px" : "32px 24px 80px" }}>

        {/* Value Props Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 8 : 16,
          marginBottom: isMobile ? 24 : 40
        }}>
          {[
            { icon: "🏠", title: "Taste of Home", desc: "Authentic products" },
            { icon: "🚀", title: "Fast Delivery", desc: "Next day in Korea" },
            { icon: "💳", title: "All Cards OK", desc: "Int'l cards accepted" },
            { icon: "🗣️", title: "Multi-Language", desc: "EN, NE, HI, UR, KO" },
          ].map((item) => (
            <div key={item.title} style={{
              background: "#fff",
              border: "1px solid var(--border-light)",
              padding: isMobile ? "12px" : "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12
            }}>
              <span style={{ fontSize: isMobile ? 24 : 28 }}>{item.icon}</span>
              <div>
                <p style={{
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 600,
                  margin: 0,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-primary)"
                }}>{item.title}</p>
                <p style={{
                  fontSize: isMobile ? 10 : 11,
                  color: "var(--text-muted)",
                  margin: "2px 0 0",
                  fontFamily: "var(--font-body)"
                }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Banner */}
        <div style={{
          background: "linear-gradient(135deg, #1557FF 0%, #0A3299 100%)", color: "#fff", borderRadius: 0,
          padding: isMobile ? "32px 20px" : isTablet ? "48px 36px" : "56px 56px",
          marginBottom: isMobile ? 28 : 48, display: "flex", flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
          position: "relative", overflow: "hidden", gap: isMobile ? 20 : 0
        }}>
          <div style={{ position: "relative", zIndex: 1, maxWidth: isMobile ? "100%" : 480 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11,
              fontWeight: 600, padding: "6px 12px", borderRadius: 0, marginBottom: isMobile ? 14 : 20,
              letterSpacing: 1, textTransform: "uppercase", fontFamily: "var(--font-primary)"
            }}>
              <span>🇳🇵 🇮🇳 🇵🇰 🇰🇷</span>
              <span>Taste of Home</span>
            </div>
            <h1 style={{
              fontSize: isMobile ? 28 : isTablet ? 36 : 44,
              fontWeight: 300,
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: -1,
              fontFamily: "var(--font-accent)"
            }}>
              Your Home Products<br />
              <span style={{ fontWeight: 500 }}>Delivered in Korea</span>
            </h1>
            <p style={{
              fontSize: isMobile ? 13 : 15,
              color: "rgba(255,255,255,0.8)",
              marginTop: 14,
              marginBottom: isMobile ? 20 : 28,
              lineHeight: 1.6,
              fontFamily: "var(--font-body)",
              maxWidth: 380
            }}>
              Authentic products from Nepal, India, Pakistan & Korea. Fast delivery, multilingual support, all payment methods accepted.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{
                background: "#FFFFFF", color: "#1557FF", border: "none", padding: isMobile ? "12px 24px" : "14px 32px",
                fontSize: 12, fontWeight: 600, borderRadius: 0, cursor: "pointer",
                letterSpacing: 1, textTransform: "uppercase", fontFamily: "var(--font-primary)",
                transition: "all 0.2s"
              }}>Shop Now</button>
              <button style={{
                background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.5)",
                padding: isMobile ? "10px 20px" : "12px 28px",
                fontSize: 12, fontWeight: 600, borderRadius: 0, cursor: "pointer",
                letterSpacing: 1, textTransform: "uppercase", fontFamily: "var(--font-primary)"
              }}>How It Works</button>
            </div>
          </div>
          <div style={{
            fontSize: isMobile ? 80 : 140,
            position: isMobile ? "relative" : "absolute",
            right: isMobile ? 0 : 40,
            opacity: isMobile ? 0.3 : 0.15,
            alignSelf: isMobile ? "flex-end" : "center"
          }}>🛍️</div>
        </div>

        {/* Flash Deals Section */}
        <section style={{ marginBottom: isMobile ? 36 : 56 }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: isMobile ? 16 : 24, flexWrap: "wrap", gap: 12
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16 }}>
              <h2 style={{
                fontSize: isMobile ? 20 : 26,
                fontWeight: 300,
                margin: 0,
                letterSpacing: -0.5,
                fontFamily: "var(--font-primary)",
                color: "var(--text-primary)"
              }}>
                Flash Deals
              </h2>
              <CountdownTimer />
            </div>
            <button style={{
              background: "none", border: "1.5px solid #000", padding: isMobile ? "8px 16px" : "10px 20px",
              fontSize: 11, fontWeight: 600, borderRadius: 0, cursor: "pointer", color: "#000",
              textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-primary)"
            }}>View All</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: getGridColumns(), gap: isMobile ? 10 : 20 }}>
            {FLASH_DEALS.map((deal) => (
              <div
                key={deal.id}
                onMouseEnter={() => setHoveredProduct(deal.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  background: "#FFFFFF", borderRadius: 0, overflow: "hidden",
                  border: "1px solid var(--border-light)", cursor: "pointer",
                  boxShadow: hoveredProduct === deal.id ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{
                  aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--surface-light)", position: "relative", overflow: "hidden"
                }}>
                  <img
                    src={deal.img}
                    alt={deal.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      transform: hoveredProduct === deal.id ? "scale(1.03)" : "scale(1)"
                    }}
                  />
                  <span style={{
                    position: "absolute", top: isMobile ? 6 : 10, left: isMobile ? 6 : 10,
                    background: "#C8102E", color: "#fff",
                    fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 0,
                    letterSpacing: 0.5, fontFamily: "var(--font-primary)"
                  }}>-{deal.discount}%</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(deal.id); }}
                    style={{
                      position: "absolute", top: isMobile ? 6 : 10, right: isMobile ? 6 : 10,
                      background: "#fff",
                      border: "none", width: isMobile ? 30 : 34, height: isMobile ? 30 : 34, borderRadius: "50%",
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={likedProducts.has(deal.id) ? "#C8102E" : "none"} stroke={likedProducts.has(deal.id) ? "#C8102E" : "#1A1A1A"} strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>
                </div>
                <div style={{ padding: isMobile ? "10px" : "14px" }}>
                  <span style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    fontFamily: "var(--font-primary)"
                  }}>{deal.flag} {deal.category}</span>
                  <p style={{
                    fontSize: isMobile ? 12 : 13, fontWeight: 400, margin: "4px 0 8px", lineHeight: 1.4,
                    color: "var(--text-primary)", fontFamily: "var(--font-body)",
                    overflow: "hidden", textOverflow: "ellipsis",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    minHeight: isMobile ? 32 : 36
                  }}>{deal.name}</p>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{
                      fontSize: isMobile ? 15 : 17,
                      fontWeight: 700,
                      color: "#C8102E",
                      fontFamily: "var(--font-mono)"
                    }}>
                      ₩{formatKRW(deal.salePrice)}
                    </span>
                    <span style={{
                      fontSize: 11, color: "var(--text-muted)", marginLeft: 6
                    }}>
                      ≈ ${toUSD(deal.salePrice)}
                    </span>
                  </div>
                  <span style={{
                    fontSize: isMobile ? 11 : 12, color: "var(--text-muted)", textDecoration: "line-through"
                  }}>₩{formatKRW(deal.originalPrice)}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, margin: "8px 0" }}>
                    <StarRating rating={deal.rating} />
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>({formatKRW(deal.reviews)})</span>
                  </div>
                  <ProgressBar percent={deal.sold} />
                  <p style={{
                    fontSize: 10, color: deal.sold > 85 ? "#C8102E" : "var(--text-secondary)",
                    fontWeight: deal.sold > 85 ? 600 : 400, marginTop: 5, marginBottom: 0
                  }}>
                    {deal.sold > 85 ? "🔥 Almost sold out!" : `${deal.sold}% claimed`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why GlobalMart Section */}
        <div style={{
          background: "#FFFFFF", border: "1px solid var(--border-light)", borderRadius: 0,
          padding: isMobile ? "20px" : "28px 36px", marginBottom: isMobile ? 32 : 56,
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 16 : 24
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              background: "#1557FF",
              padding: "14px 18px",
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span style={{ fontSize: 24 }}>🏠</span>
            </div>
            <div>
              <h3 style={{
                fontSize: isMobile ? 15 : 17,
                fontWeight: 500,
                margin: 0,
                color: "var(--text-primary)",
                fontFamily: "var(--font-primary)"
              }}>Why Expats Choose GlobalMart</h3>
              <p style={{
                fontSize: isMobile ? 12 : 13,
                color: "var(--text-secondary)",
                margin: "4px 0 0",
                fontFamily: "var(--font-body)"
              }}>
                Authentic home products • Multilingual • All payment methods • Fast Korea delivery
              </p>
            </div>
          </div>
          <button style={{
            background: "#000", color: "#fff", border: "none",
            padding: isMobile ? "12px 24px" : "14px 28px",
            fontSize: 11, fontWeight: 600,
            borderRadius: 0, cursor: "pointer",
            textTransform: "uppercase", letterSpacing: 1, fontFamily: "var(--font-primary)",
            width: isMobile ? "100%" : "auto"
          }}>Learn More</button>
        </div>

        {/* Products Grid */}
        <section>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: isMobile ? 16 : 24, flexWrap: "wrap", gap: 12
          }}>
            <h2 style={{
              fontSize: isMobile ? 20 : 26,
              fontWeight: 300,
              margin: 0,
              letterSpacing: -0.5,
              fontFamily: "var(--font-primary)",
              color: "var(--text-primary)"
            }}>
              Popular with Expats
            </h2>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", flexWrap: isMobile ? "nowrap" : "wrap" }}>
              {["All", "🇳🇵 Nepal", "🇮🇳 India", "🇵🇰 Pakistan", "🇰🇷 Korea"].map((f, i) => (
                <button key={f} style={{
                  background: i === 0 ? "#000" : "transparent",
                  color: i === 0 ? "#fff" : "var(--text-primary)",
                  border: i === 0 ? "none" : "1.5px solid var(--border-medium)",
                  padding: isMobile ? "6px 12px" : "8px 16px",
                  fontSize: 11, fontWeight: 500, borderRadius: 0, cursor: "pointer", whiteSpace: "nowrap",
                  textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "var(--font-primary)"
                }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: getGridColumns(), gap: isMobile ? 10 : 20 }}>
            {PRODUCTS.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  background: "#FFFFFF", borderRadius: 0, overflow: "hidden",
                  border: "1px solid var(--border-light)", cursor: "pointer",
                  boxShadow: hoveredProduct === p.id ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{
                  aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--surface-light)", position: "relative", overflow: "hidden"
                }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                      transform: hoveredProduct === p.id ? "scale(1.03)" : "scale(1)"
                    }}
                  />
                  {p.tag && (
                    <span style={{
                      position: "absolute", top: isMobile ? 6 : 10, left: isMobile ? 6 : 10,
                      background: p.tag === "New" || p.tag === "Trending" ? "#000" : "#fff",
                      color: p.tag === "New" || p.tag === "Trending" ? "#fff" : "#000",
                      fontSize: 9, fontWeight: 700, padding: "4px 8px", borderRadius: 0,
                      border: (p.tag !== "New" && p.tag !== "Trending") ? "1px solid var(--border-medium)" : "none",
                      letterSpacing: 0.5, textTransform: "uppercase", fontFamily: "var(--font-primary)"
                    }}>{p.tag}</span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(p.id); }}
                    style={{
                      position: "absolute", top: isMobile ? 6 : 10, right: isMobile ? 6 : 10,
                      background: "#fff",
                      border: "none", width: isMobile ? 30 : 34, height: isMobile ? 30 : 34, borderRadius: "50%",
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={likedProducts.has(p.id) ? "#C8102E" : "none"} stroke={likedProducts.has(p.id) ? "#C8102E" : "#1A1A1A"} strokeWidth="1.5">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>
                  {p.rocket && (
                    <div style={{ position: "absolute", bottom: isMobile ? 6 : 10, left: isMobile ? 6 : 10 }}>
                      <RocketBadge small />
                    </div>
                  )}
                </div>
                <div style={{ padding: isMobile ? "10px" : "14px" }}>
                  <span style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                    fontFamily: "var(--font-primary)"
                  }}>{p.flag} {p.category}</span>
                  <p style={{
                    fontSize: isMobile ? 12 : 13, fontWeight: 400, margin: "4px 0 8px", lineHeight: 1.4,
                    minHeight: isMobile ? 32 : 36, color: "var(--text-primary)", fontFamily: "var(--font-body)",
                    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"
                  }}>{p.name}</p>
                  <div style={{ marginBottom: 6 }}>
                    <span style={{
                      fontSize: isMobile ? 15 : 17,
                      fontWeight: 700,
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-primary)"
                    }}>
                      ₩{formatKRW(p.price)}
                    </span>
                    <span style={{
                      fontSize: 11, color: "var(--text-muted)", marginLeft: 6
                    }}>
                      ≈ ${toUSD(p.price)}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: isMobile ? 10 : 12 }}>
                    <StarRating rating={p.rating} />
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>({formatKRW(p.reviews)})</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCartCount((c) => c + 1);
                    }}
                    style={{
                      background: "#000", color: "#fff", border: "none",
                      padding: isMobile ? "10px 14px" : "11px 18px",
                      fontSize: 11, fontWeight: 600,
                      borderRadius: 0, cursor: "pointer", width: "100%",
                      textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "var(--font-primary)"
                    }}
                  >Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: "#000000", color: "#fff", padding: isMobile ? "36px 16px 28px" : "56px 24px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr 1fr" : "2fr 1fr 1fr 1fr",
            gap: isMobile ? 28 : 40,
            marginBottom: isMobile ? 28 : 40
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 16 }}>
                <span style={{
                  fontSize: 22,
                  fontWeight: 300,
                  letterSpacing: -1,
                  fontFamily: "var(--font-accent)"
                }}>Global</span>
                <span style={{
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: -1,
                  fontFamily: "var(--font-accent)"
                }}>Mart</span>
                <span style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: "#1557FF",
                  marginLeft: 6,
                  letterSpacing: 0.5
                }}>KOREA</span>
              </div>
              <p style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: 280,
                fontFamily: "var(--font-body)"
              }}>
                Your gateway to authentic home products in Korea. Nepal, India, Pakistan, Korea & more.
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <span style={{ padding: "4px 8px", background: "rgba(255,255,255,0.1)", fontSize: 11 }}>🇳🇵 NE</span>
                <span style={{ padding: "4px 8px", background: "rgba(255,255,255,0.1)", fontSize: 11 }}>🇮🇳 HI</span>
                <span style={{ padding: "4px 8px", background: "rgba(255,255,255,0.1)", fontSize: 11 }}>🇵🇰 UR</span>
                <span style={{ padding: "4px 8px", background: "rgba(255,255,255,0.1)", fontSize: 11 }}>🇺🇸 EN</span>
              </div>
            </div>
            {[
              { title: "Shop", links: ["Nepal", "India", "Pakistan", "Korea", "Spices"] },
              { title: "Help", links: ["Shipping Info", "Returns", "Contact Us", "FAQ"] },
              { title: "About", links: ["About Us", "For Expats", "Careers", "Blog"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 style={{
                  fontSize: 11,
                  fontWeight: 600,
                  marginBottom: 14,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontFamily: "var(--font-primary)"
                }}>{col.title}</h4>
                {col.links.map((link) => (
                  <p key={link} style={{
                    fontSize: 12, color: "rgba(255,255,255,0.6)", margin: "0 0 10px",
                    cursor: "pointer", fontFamily: "var(--font-body)"
                  }}>{link}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 20,
            display: "flex", flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between", alignItems: isMobile ? "center" : "center",
            gap: isMobile ? 12 : 0
          }}>
            <p style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              margin: 0,
              fontFamily: "var(--font-body)"
            }}>
              © 2026 GlobalMart Korea. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>We accept:</span>
              <div style={{ display: "flex", gap: 8 }}>
                {["Visa", "MC", "Amex", "PayPal"].map((card) => (
                  <span key={card} style={{
                    fontSize: 10,
                    padding: "3px 6px",
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)"
                  }}>{card}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
