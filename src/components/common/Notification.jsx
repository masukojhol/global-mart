/**
 * NOTIFICATION COMPONENT
 * ======================
 * Bell icon with dropdown panel showing notifications.
 * Includes order updates, promotions, and system messages.
 *
 * Usage:
 * <NotificationBell onTrackOrder={handleTrackOrder} />
 */

import { useState, useRef, useEffect } from 'react';
import { useNotifications, NOTIFICATION_TYPES } from '../../contexts/NotificationContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { tokens } from '../../styles/tokens';
import { Button } from './Button';
import { Badge } from './Badge';

const { colors, typography, borderRadius, shadows, spacing, transitions } = tokens;

// =============================================================================
// NOTIFICATION BELL (Icon with badge)
// =============================================================================

export function NotificationBell({ onTrackOrder, onOpenAuth }) {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAll(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBellClick = () => {
    if (!user) {
      onOpenAuth?.();
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    if (notification.actionType === 'track' && notification.orderId) {
      setIsOpen(false);
      onTrackOrder?.(notification.orderId);
    } else if (notification.actionType === 'shop') {
      setIsOpen(false);
      // Could navigate to shop/deals page
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t('notifications.justNow') || 'Just now';
    if (minutes < 60) return `${minutes}${t('notifications.minAgo') || 'm ago'}`;
    if (hours < 24) return `${hours}${t('notifications.hourAgo') || 'h ago'}`;
    if (days < 7) return `${days}${t('notifications.dayAgo') || 'd ago'}`;
    return date.toLocaleDateString();
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Bell Icon Button */}
      <button
        onClick={handleBellClick}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: spacing[2],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: borderRadius.default,
          transition: transitions.hover,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = colors.backgroundSoft;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none';
        }}
        aria-label={t('notifications.title') || 'Notifications'}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.text}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              minWidth: 18,
              height: 18,
              padding: '0 5px',
              borderRadius: borderRadius.circle,
              background: colors.accent,
              color: colors.white,
              fontSize: 10,
              fontWeight: typography.fontWeight.bold,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${colors.background}`,
            }}
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: spacing[2],
            width: 360,
            maxWidth: 'calc(100vw - 32px)',
            background: colors.background,
            borderRadius: borderRadius.default,
            boxShadow: shadows.dropdown,
            border: `1px solid ${colors.border}`,
            zIndex: 1000,
            overflow: 'hidden',
            animation: `fadeIn ${transitions.duration.fast}ms ease-out`,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: `${spacing[4]}px`,
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text,
              }}
            >
              {t('notifications.title') || 'Notifications'}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.primary,
                  fontSize: typography.fontSize.sm,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                {t('notifications.markAllRead') || 'Mark all read'}
              </button>
            )}
          </div>

          {/* Notification List */}
          <div
            style={{
              maxHeight: 400,
              overflowY: 'auto',
            }}
          >
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: `${spacing[8]}px ${spacing[4]}px`,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    background: colors.backgroundSoft,
                    borderRadius: borderRadius.circle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: `0 auto ${spacing[3]}px`,
                    fontSize: 28,
                  }}
                >
                  🔔
                </div>
                <p
                  style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.textSecondary,
                    margin: 0,
                  }}
                >
                  {t('notifications.empty') || 'No notifications yet'}
                </p>
              </div>
            ) : (
              displayedNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                  formatTimeAgo={formatTimeAgo}
                  t={t}
                />
              ))
            )}
          </div>

          {/* Footer - See More */}
          {notifications.length > 0 && (
            <div
              style={{
                padding: `${spacing[3]}px ${spacing[4]}px`,
                borderTop: `1px solid ${colors.border}`,
                textAlign: 'center',
              }}
            >
              {notifications.length > 5 ? (
                <button
                  onClick={() => setShowAll(!showAll)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: colors.primary,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    cursor: 'pointer',
                    padding: `${spacing[2]}px ${spacing[4]}px`,
                    borderRadius: borderRadius.default,
                    transition: transitions.hover,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: spacing[1],
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = colors.backgroundSoft;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                  }}
                >
                  {showAll
                    ? (t('notifications.showLess') || 'Show less')
                    : (t('notifications.seeMore') || `See more (${notifications.length - 5})`)}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: transitions.hover,
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              ) : (
                <button
                  style={{
                    background: colors.primary,
                    border: 'none',
                    color: colors.white,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.medium,
                    cursor: 'pointer',
                    padding: `${spacing[3]}px ${spacing[4]}px`,
                    borderRadius: borderRadius.default,
                    transition: transitions.hover,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: spacing[2],
                    width: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  {t('notifications.viewAll') || 'View all notifications'}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// NOTIFICATION ITEM
// =============================================================================

function NotificationItem({ notification, onClick, formatTimeAgo, t }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: spacing[4],
        borderBottom: `1px solid ${colors.border}`,
        cursor: 'pointer',
        background: notification.read
          ? (isHovered ? colors.backgroundSoft : 'transparent')
          : (isHovered ? `${colors.primary}15` : `${colors.primary}08`),
        transition: transitions.hover,
        display: 'flex',
        gap: spacing[3],
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: borderRadius.circle,
          background: `${notification.color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {notification.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: spacing[2],
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: typography.fontSize.sm,
              fontWeight: notification.read
                ? typography.fontWeight.regular
                : typography.fontWeight.semibold,
              color: colors.text,
            }}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: borderRadius.circle,
                background: colors.primary,
                flexShrink: 0,
                marginTop: 6,
              }}
            />
          )}
        </div>
        <p
          style={{
            margin: `${spacing[1]}px 0 0`,
            fontSize: typography.fontSize.xs,
            color: colors.textSecondary,
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {notification.message}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: spacing[2],
          }}
        >
          <span
            style={{
              fontSize: typography.fontSize.xs,
              color: colors.textMuted,
            }}
          >
            {formatTimeAgo(notification.timestamp)}
          </span>
          {notification.actionLabel && (
            <span
              style={{
                fontSize: typography.fontSize.xs,
                color: colors.primary,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {notification.actionLabel} →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationBell;
