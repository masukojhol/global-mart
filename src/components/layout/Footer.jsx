import { theme } from '../../styles/theme';
import { useWindowSize } from '../../hooks/useWindowSize';

export function Footer() {
  const { isMobile, isTablet } = useWindowSize();

  return (
    <footer style={{
      background: theme.colors.brandPrimary,
      color: '#fff',
      padding: isMobile ? '36px 16px 28px' : '56px 24px 36px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? 28 : 40,
          marginBottom: isMobile ? 28 : 40,
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: 16 }}>
              <span style={{
                fontSize: 22,
                fontWeight: 300,
                letterSpacing: -1,
                fontFamily: theme.fonts.accent,
              }}>Global</span>
              <span style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: -1,
                fontFamily: theme.fonts.accent,
              }}>Mart</span>
              <span style={{
                fontSize: 9,
                fontWeight: 600,
                color: theme.colors.brandBlue,
                marginLeft: 6,
                letterSpacing: 0.5,
              }}>KOREA</span>
            </div>
            <p style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.7,
              maxWidth: 280,
              fontFamily: theme.fonts.body,
            }}>
              Your gateway to authentic home products in Korea. Nepal, India, Pakistan, Korea & more.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', fontSize: 11 }}>🇳🇵 NE</span>
              <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', fontSize: 11 }}>🇮🇳 HI</span>
              <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', fontSize: 11 }}>🇵🇰 UR</span>
              <span style={{ padding: '4px 8px', background: 'rgba(255,255,255,0.1)', fontSize: 11 }}>🇺🇸 EN</span>
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: 'Shop', links: ['Nepal', 'India', 'Pakistan', 'Korea', 'Spices'] },
            { title: 'Help', links: ['Shipping Info', 'Returns', 'Track Order', 'Contact Us', 'FAQ'] },
            { title: 'About', links: ['About Us', 'For Expats', 'Careers', 'Blog'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontSize: 11,
                fontWeight: 600,
                marginBottom: 14,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontFamily: theme.fonts.primary,
              }}>{col.title}</h4>
              {col.links.map((link) => (
                <p key={link} style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.6)',
                  margin: '0 0 10px',
                  cursor: 'pointer',
                  fontFamily: theme.fonts.body,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.9)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: 20,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'center',
          gap: isMobile ? 12 : 0,
        }}>
          <p style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
            fontFamily: theme.fonts.body,
          }}>
            © 2026 GlobalMart Korea. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>We accept:</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {['Visa', 'MC', 'Amex', 'PayPal', 'Kakao'].map((card) => (
                <span key={card} style={{
                  fontSize: 10,
                  padding: '3px 6px',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                }}>
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
