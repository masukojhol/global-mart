/**
 * PROFILE MODAL COMPONENT
 * =======================
 * User profile management with settings and order history tabs.
 * Uses generic components: Modal, Button, Input, Card, Badge.
 */

import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button, ButtonGroup } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { Badge, StatusBadge } from '../common/Badge';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders, ORDER_STATUS, STATUS_LABELS } from '../../contexts/OrderContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, formatDateTime } from '../../utils/helpers';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// Tab definitions
const TABS = {
  SETTINGS: 'settings',
  ORDERS: 'orders',
};

export function ProfileModal({ isOpen, onClose, onTrackOrder }) {
  const { user, updateProfile, logout } = useAuth();
  const { getUserOrders } = useOrders();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState(TABS.SETTINGS);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  if (!user) return null;

  const userOrders = getUserOrders(user.id);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      updateProfile(formData);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case ORDER_STATUS.DELIVERED:
        return 'success';
      case ORDER_STATUS.CANCELLED:
        return 'error';
      case ORDER_STATUS.SHIPPED:
      case ORDER_STATUS.OUT_FOR_DELIVERY:
        return 'primary';
      case ORDER_STATUS.PROCESSING:
        return 'info';
      default:
        return 'warning';
    }
  };

  const renderTabs = () => (
    <div style={{
      display: 'flex',
      borderBottom: `1px solid ${colors.border}`,
      marginBottom: spacing[5],
    }}>
      {[
        { id: TABS.SETTINGS, label: t('profile.settings'), icon: '⚙️' },
        { id: TABS.ORDERS, label: t('profile.orderHistory'), icon: '📦' },
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            flex: 1,
            padding: `${spacing[3]}px ${spacing[4]}px`,
            background: 'none',
            border: 'none',
            borderBottom: activeTab === tab.id ? `2px solid ${colors.primary}` : '2px solid transparent',
            color: activeTab === tab.id ? colors.primary : colors.textSecondary,
            fontSize: typography.fontSize.sm,
            fontWeight: activeTab === tab.id ? typography.fontWeight.semibold : typography.fontWeight.regular,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
            transition: transitions.hover,
          }}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div>
      {/* Success Message */}
      {saveSuccess && (
        <Card variant="filled" padding="compact" style={{ marginBottom: spacing[4], background: colors.successLight }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], color: colors.success }}>
            <span>✓</span>
            <span style={{ fontSize: typography.fontSize.sm }}>{t('profile.saveSuccess')}</span>
          </div>
        </Card>
      )}

      {/* Profile Header */}
      <Card variant="filled" padding="default" style={{ marginBottom: spacing[6] }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: borderRadius.circle,
            background: colors.primary,
            color: colors.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            fontWeight: typography.fontWeight.semibold,
          }}>
            {user.name?.charAt(0)?.toUpperCase() || '👤'}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              margin: 0,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              color: colors.text,
            }}>
              {user.name}
            </h3>
            <p style={{
              margin: `${spacing[1]}px 0 0`,
              fontSize: typography.fontSize.sm,
              color: colors.textSecondary,
            }}>
              {t('profile.memberSince')} {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
          {!isEditing && (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              {t('common.edit')}
            </Button>
          )}
        </div>
      </Card>

      {/* Contact Information */}
      <div style={{ marginBottom: spacing[6] }}>
        <h4 style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: colors.textSecondary,
          margin: `0 0 ${spacing[4]}px`,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wide,
        }}>
          {t('profile.contactInfo')}
        </h4>

        {isEditing ? (
          <div>
            <Input
              label={t('profile.fullName')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <Input
              label={t('profile.email')}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={t('profile.emailPlaceholder')}
            />
            <Input
              label={t('profile.phone')}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled
              helperText={t('profile.phoneHint')}
            />
            <Input
              label={t('profile.address')}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder={t('profile.addressPlaceholder')}
            />

            <ButtonGroup spacing={12}>
              <Button variant="outline" onClick={handleCancel} style={{ flex: 1 }}>
                {t('common.cancel')}
              </Button>
              <Button onClick={handleSave} loading={isSaving} style={{ flex: 1 }}>
                {t('common.save')}
              </Button>
            </ButtonGroup>
          </div>
        ) : (
          <Card variant="outlined" padding="none">
            {[
              { label: t('profile.fullName'), value: user.name, icon: '👤' },
              { label: t('profile.email'), value: user.email || t('profile.notSet'), icon: '✉️' },
              { label: t('profile.phone'), value: user.phone, icon: '📱' },
              { label: t('profile.address'), value: user.address || t('profile.notSet'), icon: '📍' },
            ].map((field, index, arr) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: spacing[3],
                  padding: spacing[4],
                  borderBottom: index < arr.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <span style={{ fontSize: 16 }}>{field.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.textMuted,
                    margin: 0,
                  }}>
                    {field.label}
                  </p>
                  <p style={{
                    fontSize: typography.fontSize.base,
                    color: field.value === t('profile.notSet') ? colors.textMuted : colors.text,
                    margin: `${spacing[1]}px 0 0`,
                    fontStyle: field.value === t('profile.notSet') ? 'italic' : 'normal',
                  }}>
                    {field.value}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Preferences Section */}
      <div style={{ marginBottom: spacing[6] }}>
        <h4 style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: colors.textSecondary,
          margin: `0 0 ${spacing[4]}px`,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wide,
        }}>
          {t('profile.preferences')}
        </h4>

        <Card variant="filled" padding="none">
          {[
            { label: t('profile.notifications'), value: t('profile.enabled'), icon: '🔔' },
            { label: t('profile.newsletter'), value: t('profile.subscribed'), icon: '📧' },
            { label: t('profile.language'), value: t('languages.en'), icon: '🌐' },
          ].map((pref, index, arr) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: `${spacing[3]}px ${spacing[4]}px`,
                borderBottom: index < arr.length - 1 ? `1px solid ${colors.border}` : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                <span style={{ fontSize: 16 }}>{pref.icon}</span>
                <span style={{ fontSize: typography.fontSize.sm, color: colors.text }}>
                  {pref.label}
                </span>
              </div>
              <Badge variant="subtle" size="sm">{pref.value}</Badge>
            </div>
          ))}
        </Card>
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        fullWidth
        onClick={handleLogout}
        style={{ color: colors.error, borderColor: colors.error }}
      >
        {t('nav.signOut')}
      </Button>
    </div>
  );

  const renderOrders = () => (
    <div>
      {userOrders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: `${spacing[10]}px ${spacing[4]}px` }}>
          <div style={{
            width: 80,
            height: 80,
            background: colors.backgroundSoft,
            borderRadius: borderRadius.circle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: `0 auto ${spacing[4]}px`,
            fontSize: 36,
          }}>
            📦
          </div>
          <h3 style={{
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.semibold,
            color: colors.text,
            margin: `0 0 ${spacing[2]}px`,
          }}>
            {t('profile.noOrders')}
          </h3>
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.textSecondary,
            margin: 0,
          }}>
            {t('profile.noOrdersDescription')}
          </p>
          <Button onClick={onClose} style={{ marginTop: spacing[5] }}>
            {t('profile.startShopping')}
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          {/* Order Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: spacing[3],
            marginBottom: spacing[4],
          }}>
            {[
              { label: t('profile.totalOrders'), value: userOrders.length, icon: '📦' },
              { label: t('profile.delivered'), value: userOrders.filter(o => o.status === ORDER_STATUS.DELIVERED).length, icon: '✓' },
              { label: t('profile.totalSpent'), value: `₩${formatKRW(userOrders.reduce((sum, o) => sum + o.total, 0))}`, icon: '💰' },
            ].map((stat, index) => (
              <Card key={index} variant="filled" padding="compact" style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 20 }}>{stat.icon}</span>
                <p style={{
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text,
                  margin: `${spacing[1]}px 0 0`,
                  fontFamily: typography.fontFamily.mono,
                }}>
                  {stat.value}
                </p>
                <p style={{
                  fontSize: typography.fontSize.xs,
                  color: colors.textMuted,
                  margin: `${spacing[1]}px 0 0`,
                }}>
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>

          {/* Order List Header */}
          <h4 style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.semibold,
            color: colors.textSecondary,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wide,
          }}>
            {t('profile.recentOrders')}
          </h4>

          {/* Order List */}
          {userOrders.map((order) => (
            <Card key={order.id} variant="outlined" padding="none">
              {/* Order Header */}
              <div style={{
                padding: `${spacing[3]}px ${spacing[4]}px`,
                background: colors.backgroundSoft,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: spacing[2],
              }}>
                <div>
                  <p style={{
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                    fontFamily: typography.fontFamily.mono,
                    color: colors.text,
                    margin: 0,
                  }}>
                    {order.id}
                  </p>
                  <p style={{
                    fontSize: typography.fontSize.xs,
                    color: colors.textMuted,
                    margin: `${spacing[1]}px 0 0`,
                  }}>
                    {formatDateTime(order.createdAt)}
                  </p>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {STATUS_LABELS[order.status]}
                </Badge>
              </div>

              {/* Order Items Preview */}
              <div style={{ padding: spacing[4] }}>
                <div style={{
                  display: 'flex',
                  gap: spacing[2],
                  marginBottom: spacing[3],
                  flexWrap: 'wrap',
                }}>
                  {order.items.slice(0, 4).map((item) => (
                    <img
                      key={item.id}
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: 'cover',
                        borderRadius: borderRadius.default,
                        border: `1px solid ${colors.border}`,
                      }}
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div style={{
                      width: 50,
                      height: 50,
                      borderRadius: borderRadius.default,
                      background: colors.backgroundSoft,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: typography.fontSize.xs,
                      color: colors.textSecondary,
                    }}>
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                <p style={{
                  fontSize: typography.fontSize.xs,
                  color: colors.textSecondary,
                  margin: `0 0 ${spacing[3]}px`,
                }}>
                  {order.items.length} {order.items.length === 1 ? t('profile.item') : t('profile.items')} • ₩{formatKRW(order.total)}
                </p>

                {/* Order Actions */}
                <ButtonGroup spacing={8}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onClose();
                      onTrackOrder(order.id);
                    }}
                    style={{ flex: 1 }}
                  >
                    {t('profile.trackOrder')}
                  </Button>
                  {order.status === ORDER_STATUS.DELIVERED && (
                    <Button variant="outline" size="sm" style={{ flex: 1 }}>
                      {t('profile.reorder')}
                    </Button>
                  )}
                </ButtonGroup>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('profile.title')}
      size="md"
    >
      {renderTabs()}
      {activeTab === TABS.SETTINGS ? renderSettings() : renderOrders()}
    </Modal>
  );
}

export default ProfileModal;
