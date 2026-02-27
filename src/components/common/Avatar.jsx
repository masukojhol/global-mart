/**
 * AVATAR COMPONENT
 * ================
 * Generic avatar component with image upload capability.
 * Supports multiple sizes, upload progress, and fallback initials.
 *
 * Usage:
 * <Avatar name="John Doe" />
 * <Avatar src="/avatar.jpg" size="lg" />
 * <Avatar name="User" editable onUpload={handleUpload} />
 */

import { useState, useRef } from 'react';
import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, shadows, transitions, spacing } = tokens;

// =============================================================================
// AVATAR SIZES
// =============================================================================

const sizes = {
  xs: { size: 32, fontSize: 12, iconSize: 12 },
  sm: { size: 40, fontSize: 14, iconSize: 14 },
  md: { size: 56, fontSize: 20, iconSize: 16 },
  lg: { size: 80, fontSize: 28, iconSize: 20 },
  xl: { size: 100, fontSize: 36, iconSize: 24 },
  xxl: { size: 120, fontSize: 44, iconSize: 28 },
};

// =============================================================================
// AVATAR COMPONENT
// =============================================================================

export function Avatar({
  src,
  name,
  size = 'md',
  editable = false,
  onUpload,
  showStatus = false,
  status = 'online',
  style,
  ...props
}) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const sizeConfig = sizes[size] || sizes.md;
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      setIsUploading(true);
      try {
        await onUpload(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const statusColors = {
    online: colors.success,
    offline: colors.textMuted,
    busy: colors.error,
    away: colors.warning,
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        ...style,
      }}
      {...props}
    >
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: sizeConfig.size,
          height: sizeConfig.size,
          borderRadius: borderRadius.circle,
          background: src && !imageError ? 'transparent' : colors.primary,
          color: colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: sizeConfig.fontSize,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.body,
          overflow: 'hidden',
          cursor: editable ? 'pointer' : 'default',
          position: 'relative',
          transition: transitions.hover,
          border: `3px solid ${colors.background}`,
          boxShadow: shadows.sm,
        }}
      >
        {/* Image */}
        {src && !imageError ? (
          <img
            src={src}
            alt={name || 'Avatar'}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          // Fallback initials
          <span>{initials}</span>
        )}

        {/* Editable overlay */}
        {editable && (isHovered || isUploading) && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
            }}
          >
            {isUploading ? (
              <span
                style={{
                  width: sizeConfig.iconSize,
                  height: sizeConfig.iconSize,
                  border: '2px solid currentColor',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }}
              />
            ) : (
              <svg
                width={sizeConfig.iconSize}
                height={sizeConfig.iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      {editable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      )}

      {/* Status indicator */}
      {showStatus && (
        <span
          style={{
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: Math.max(12, sizeConfig.size * 0.2),
            height: Math.max(12, sizeConfig.size * 0.2),
            borderRadius: borderRadius.circle,
            background: statusColors[status] || statusColors.offline,
            border: `2px solid ${colors.background}`,
          }}
        />
      )}
    </div>
  );
}

// =============================================================================
// AVATAR GROUP (For showing multiple avatars)
// =============================================================================

export function AvatarGroup({
  avatars = [],
  max = 4,
  size = 'sm',
  style,
  ...props
}) {
  const sizeConfig = sizes[size] || sizes.sm;
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
      {...props}
    >
      {visible.map((avatar, index) => (
        <div
          key={index}
          style={{
            marginLeft: index === 0 ? 0 : -(sizeConfig.size * 0.3),
            zIndex: visible.length - index,
          }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          style={{
            width: sizeConfig.size,
            height: sizeConfig.size,
            borderRadius: borderRadius.circle,
            background: colors.backgroundSoft,
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: sizeConfig.fontSize * 0.7,
            fontWeight: typography.fontWeight.semibold,
            marginLeft: -(sizeConfig.size * 0.3),
            border: `2px solid ${colors.background}`,
          }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export default Avatar;
