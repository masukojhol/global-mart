/**
 * FOOTER COMPONENT
 * ================
 * Footer using GoFresh design tokens.
 */

import { tokens } from '../../styles/tokens';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useLanguage } from '../../contexts/LanguageContext';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

export function Footer() {
  const { isMobile, isTablet } = useWindowSize();
  const { t } = useLanguage();

  return (
    <footer style={{
      background: colors.primaryDark,
      color: colors.white,
      padding: isMobile ? `${spacing[9]}px ${spacing[4]}px ${spacing[7]}px` : `${spacing[14]}px ${spacing[6]}px ${spacing[9]}px`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '2fr 1fr 1fr 1fr',
          gap: isMobile ? spacing[7] : spacing[10],
          marginBottom: isMobile ? spacing[7] : spacing[10],
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 2, marginBottom: spacing[4] }}>
              <span style={{
                fontSize: 22,
                fontWeight: typography.fontWeight.regular,
                letterSpacing: -1,
                fontFamily: typography.fontFamily.heading,
              }}>Go</span>
              <span style={{
                fontSize: 22,
                fontWeight: typography.fontWeight.bold,
                letterSpacing: -1,
                fontFamily: typography.fontFamily.heading,
              }}>Fresh</span>
              <span style={{
                fontSize: 9,
                fontWeight: typography.fontWeight.semibold,
                color: colors.accent,
                marginLeft: 6,
                letterSpacing: 0.5,
              }}>MARKET</span>
            </div>
            <p style={{
              fontSize: typography.fontSize.xs,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: typography.lineHeight.relaxed,
              maxWidth: 280,
              fontFamily: typography.fontFamily.body,
            }}>
              {t('footer.tagline')}
            </p>
            <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[4] }}>
              {['🇳🇵 NE', '🇮🇳 HI', '🇵🇰 UR', '🇺🇸 EN'].map((lang) => (
                <span key={lang} style={{
                  padding: `${spacing[1]}px ${spacing[2]}px`,
                  background: 'rgba(255,255,255,0.1)',
                  fontSize: typography.fontSize.xs,
                  borderRadius: borderRadius.default,
                }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: t('footer.shop'), links: [t('categories.grocery'), t('categories.spices'), t('categories.riceGrains'), t('categories.snacks'), t('categories.instantFood')] },
            { title: t('footer.help'), links: [t('footer.shippingInfo'), t('footer.returns'), t('nav.trackOrder'), t('footer.contactUs'), t('footer.faq')] },
            { title: t('footer.about'), links: [t('footer.aboutUs'), t('footer.careers'), t('footer.forExpats'), t('footer.blog')] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                marginBottom: spacing[4],
                letterSpacing: typography.letterSpacing.wider,
                textTransform: 'uppercase',
                fontFamily: typography.fontFamily.heading,
              }}>{col.title}</h4>
              {col.links.map((link) => (
                <p key={link} style={{
                  fontSize: typography.fontSize.sm,
                  color: 'rgba(255,255,255,0.6)',
                  margin: `0 0 ${spacing[2]}px`,
                  cursor: 'pointer',
                  fontFamily: typography.fontFamily.body,
                  transition: transitions.hover,
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
          paddingTop: spacing[5],
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: isMobile ? spacing[3] : 0,
        }}>
          <p style={{
            fontSize: typography.fontSize.xs,
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
            fontFamily: typography.fontFamily.body,
          }}>
            © 2026 GoFresh Market. {t('footer.allRightsReserved')}
          </p>
          <div style={{ display: 'flex', gap: spacing[5], alignItems: 'center' }}>
            <span style={{ fontSize: typography.fontSize.xs, color: 'rgba(255,255,255,0.4)' }}>{t('footer.weAccept')}</span>
            <div style={{ display: 'flex', gap: spacing[2] }}>
              {['Visa', 'MC', 'Amex', 'PayPal', 'Kakao'].map((card) => (
                <span key={card} style={{
                  fontSize: 10,
                  padding: `3px ${spacing[2]}px`,
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  borderRadius: borderRadius.default,
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
