/**
 * PROFILE MODAL COMPONENT (Redesigned)
 * =====================================
 * Modern user profile management with block-by-block editing,
 * progressive disclosure, and card-based layouts.
 *
 * Design Patterns:
 * - Tab-based navigation (Settings, Orders, Security)
 * - Block-by-block editing for each section
 * - Progressive disclosure with collapsible sections
 * - Card containers for visual grouping
 */

import { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button, ButtonGroup } from '../common/Button';
import { Input, Select } from '../common/Input';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Tabs, Tab, TabPanels, TabPanel } from '../common/Tabs';
import { Section } from '../common/Section';
import { Toggle, ToggleGroup } from '../common/Toggle';
import { InfoRow, InfoList, StatCard, StatGrid } from '../common/InfoRow';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders, ORDER_STATUS, STATUS_LABELS } from '../../contexts/OrderContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, formatDateTime } from '../../utils/helpers';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// Tab definitions
const TABS = {
  PROFILE: 'profile',
  ORDERS: 'orders',
  SETTINGS: 'settings',
};

// Editing sections
const SECTIONS = {
  PERSONAL: 'personal',
  CONTACT: 'contact',
  ADDRESS: 'address',
};

export function ProfileModal({ isOpen, onClose, onTrackOrder }) {
  const { user, updateProfile, logout } = useAuth();
  const { getUserOrders } = useOrders();
  const { t, language, setLanguage } = useLanguage();

  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [editingSection, setEditingSection] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form state for editing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  // Preferences state
  const [preferences, setPreferences] = useState({
    notifications: true,
    newsletter: true,
    darkMode: false,
  });

  // Sync form data with user
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
      });
    }
  }, [user]);

  if (!user) return null;

  const userOrders = getUserOrders(user.id);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSection = async (section) => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      updateProfile(formData);
      setEditingSection(null);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      postalCode: user.postalCode || '',
    });
    setEditingSection(null);
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleAvatarUpload = async (file) => {
    // In a real app, this would upload to a server
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case ORDER_STATUS.DELIVERED: return 'success';
      case ORDER_STATUS.CANCELLED: return 'error';
      case ORDER_STATUS.SHIPPED:
      case ORDER_STATUS.OUT_FOR_DELIVERY: return 'primary';
      case ORDER_STATUS.PROCESSING: return 'info';
      default: return 'warning';
    }
  };

  // ===========================================================================
  // PROFILE TAB
  // ===========================================================================

  const renderProfileTab = () => (
    <div>
      {/* Success Toast */}
      {saveSuccess && (
        <Card variant="filled" padding="compact" style={{
          marginBottom: spacing[4],
          background: `${colors.success}15`,
          border: `1px solid ${colors.success}30`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], color: colors.success }}>
            <span>✓</span>
            <span style={{ fontSize: typography.fontSize.sm }}>{t('profile.saveSuccess')}</span>
          </div>
        </Card>
      )}

      {/* Profile Header Card */}
      <Card variant="filled" padding="relaxed" style={{ marginBottom: spacing[5], textAlign: 'center' }}>
        <Avatar
          src={user.avatar}
          name={user.name}
          size="xl"
          editable
          onUpload={handleAvatarUpload}
          style={{ margin: '0 auto', marginBottom: spacing[4] }}
        />
        <h2 style={{
          margin: 0,
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          color: colors.text,
        }}>
          {user.name}
        </h2>
        <p style={{
          margin: `${spacing[1]}px 0 0`,
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
        }}>
          {t('profile.memberSince')} {new Date(user.createdAt).toLocaleDateString()}
        </p>
        {user.phone && (
          <Badge variant="subtle" style={{ marginTop: spacing[2] }}>
            {user.phone}
          </Badge>
        )}
      </Card>

      {/* Personal Information Section */}
      <Section
        title={t('profile.personalInfo') || 'Personal Information'}
        icon="👤"
        editable
        isEditing={editingSection === SECTIONS.PERSONAL}
        onEdit={() => setEditingSection(SECTIONS.PERSONAL)}
        onSave={() => handleSaveSection(SECTIONS.PERSONAL)}
        onCancel={handleCancelEdit}
        editLabel={t('common.edit')}
        saveLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        loading={isSaving}
      >
        {editingSection === SECTIONS.PERSONAL ? (
          <div>
            <Input
              label={t('profile.fullName')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={t('auth.enterFullName')}
            />
            <Input
              label={t('profile.email')}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder={t('profile.emailPlaceholder')}
            />
          </div>
        ) : (
          <Card variant="outlined" padding="none">
            <InfoList>
              <InfoRow
                icon="👤"
                label={t('profile.fullName')}
                value={user.name}
              />
              <InfoRow
                icon="✉️"
                label={t('profile.email')}
                value={user.email || t('profile.notSet')}
                placeholder={!user.email}
              />
            </InfoList>
          </Card>
        )}
      </Section>

      {/* Contact Information Section */}
      <Section
        title={t('profile.contactInfo')}
        icon="📱"
        editable
        isEditing={editingSection === SECTIONS.CONTACT}
        onEdit={() => setEditingSection(SECTIONS.CONTACT)}
        onSave={() => handleSaveSection(SECTIONS.CONTACT)}
        onCancel={handleCancelEdit}
        editLabel={t('common.edit')}
        saveLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        loading={isSaving}
      >
        {editingSection === SECTIONS.CONTACT ? (
          <div>
            <Input
              label={t('profile.phone')}
              value={formData.phone}
              disabled
              helperText={t('profile.phoneHint')}
            />
          </div>
        ) : (
          <Card variant="outlined" padding="none">
            <InfoList>
              <InfoRow
                icon="📱"
                label={t('profile.phone')}
                value={user.phone}
                copyable
              />
            </InfoList>
          </Card>
        )}
      </Section>

      {/* Shipping Address Section */}
      <Section
        title={t('profile.shippingAddress') || 'Shipping Address'}
        icon="📍"
        editable
        isEditing={editingSection === SECTIONS.ADDRESS}
        onEdit={() => setEditingSection(SECTIONS.ADDRESS)}
        onSave={() => handleSaveSection(SECTIONS.ADDRESS)}
        onCancel={handleCancelEdit}
        editLabel={t('common.edit')}
        saveLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        loading={isSaving}
      >
        {editingSection === SECTIONS.ADDRESS ? (
          <div>
            <Input
              label={t('profile.address')}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder={t('profile.addressPlaceholder')}
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
              <Input
                label={t('checkout.city')}
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder={t('checkout.city')}
              />
              <Input
                label={t('checkout.postalCode')}
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder={t('checkout.postalCode')}
              />
            </div>
          </div>
        ) : (
          <Card variant="outlined" padding="none">
            <InfoList>
              <InfoRow
                icon="📍"
                label={t('profile.address')}
                value={user.address || t('profile.notSet')}
                placeholder={!user.address}
              />
            </InfoList>
          </Card>
        )}
      </Section>
    </div>
  );

  // ===========================================================================
  // ORDERS TAB
  // ===========================================================================

  const renderOrdersTab = () => (
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
        <div>
          {/* Order Statistics */}
          <StatGrid columns={3} style={{ marginBottom: spacing[5] }}>
            <StatCard
              icon="📦"
              label={t('profile.totalOrders')}
              value={userOrders.length}
            />
            <StatCard
              icon="✓"
              label={t('profile.delivered')}
              value={userOrders.filter(o => o.status === ORDER_STATUS.DELIVERED).length}
            />
            <StatCard
              icon="💰"
              label={t('profile.totalSpent')}
              value={`₩${formatKRW(userOrders.reduce((sum, o) => sum + o.total, 0))}`}
            />
          </StatGrid>

          {/* Order List */}
          <Section title={t('profile.recentOrders')} icon="📋">
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
              {userOrders.map((order) => (
                <Card key={order.id} variant="outlined" padding="none" hoverable>
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
          </Section>
        </div>
      )}
    </div>
  );

  // ===========================================================================
  // SETTINGS TAB
  // ===========================================================================

  const renderSettingsTab = () => (
    <div>
      {/* Notifications Section */}
      <Section title={t('profile.notifications')} icon="🔔">
        <Card variant="outlined" padding="default">
          <ToggleGroup>
            <Toggle
              checked={preferences.notifications}
              onChange={(val) => setPreferences(p => ({ ...p, notifications: val }))}
              label={t('profile.pushNotifications') || 'Push Notifications'}
              description={t('profile.pushNotificationsDesc') || 'Receive order updates and promotions'}
            />
            <Toggle
              checked={preferences.newsletter}
              onChange={(val) => setPreferences(p => ({ ...p, newsletter: val }))}
              label={t('profile.newsletter')}
              description={t('profile.newsletterDesc') || 'Weekly deals and new products'}
            />
          </ToggleGroup>
        </Card>
      </Section>

      {/* Language Section */}
      <Section title={t('profile.language')} icon="🌐">
        <Card variant="outlined" padding="none">
          <InfoList>
            <InfoRow
              label={t('profile.appLanguage') || 'App Language'}
              value={
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'ko', label: '한국어' },
                  ]}
                  style={{ marginBottom: 0, width: 150 }}
                />
              }
            />
          </InfoList>
        </Card>
      </Section>

      {/* Security Section */}
      <Section title={t('profile.security') || 'Security'} icon="🔒" collapsible>
        <Card variant="outlined" padding="none">
          <InfoList>
            <InfoRow
              icon="🔑"
              label={t('profile.password') || 'Password'}
              value="••••••••"
              onClick={() => {}}
            />
            <InfoRow
              icon="📱"
              label={t('profile.twoFactor') || 'Two-Factor Auth'}
              value={t('profile.notEnabled') || 'Not enabled'}
              placeholder
              onClick={() => {}}
            />
          </InfoList>
        </Card>
      </Section>

      {/* Danger Zone */}
      <Section title={t('profile.dangerZone') || 'Danger Zone'} icon="⚠️" collapsible defaultCollapsed>
        <Card variant="outlined" padding="default" style={{ borderColor: `${colors.error}30` }}>
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.textSecondary,
            margin: `0 0 ${spacing[3]}px`,
          }}>
            {t('profile.deleteAccountWarning') || 'Once you delete your account, there is no going back.'}
          </p>
          <Button variant="danger" size="sm">
            {t('profile.deleteAccount') || 'Delete Account'}
          </Button>
        </Card>
      </Section>

      {/* Logout Button */}
      <Button
        variant="outline"
        fullWidth
        onClick={handleLogout}
        style={{
          color: colors.error,
          borderColor: colors.error,
          marginTop: spacing[4],
        }}
      >
        {t('nav.signOut')}
      </Button>
    </div>
  );

  // ===========================================================================
  // RENDER
  // ===========================================================================

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('profile.title')}
      size="md"
    >
      {/* Tab Navigation */}
      <Tabs
        value={activeTab}
        onChange={setActiveTab}
        variant="underline"
        style={{ marginBottom: spacing[5] }}
      >
        <Tab value={TABS.PROFILE} label={t('profile.profile') || 'Profile'} icon="👤" />
        <Tab
          value={TABS.ORDERS}
          label={t('profile.orderHistory')}
          icon="📦"
          badge={userOrders.length > 0 ? userOrders.length : undefined}
        />
        <Tab value={TABS.SETTINGS} label={t('profile.settings')} icon="⚙️" />
      </Tabs>

      {/* Tab Content */}
      <TabPanels value={activeTab}>
        <TabPanel value={TABS.PROFILE}>
          {renderProfileTab()}
        </TabPanel>
        <TabPanel value={TABS.ORDERS}>
          {renderOrdersTab()}
        </TabPanel>
        <TabPanel value={TABS.SETTINGS}>
          {renderSettingsTab()}
        </TabPanel>
      </TabPanels>
    </Modal>
  );
}

export default ProfileModal;
