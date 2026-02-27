/**
 * PROFILE MODAL COMPONENT (Coupang-Style Redesign)
 * =================================================
 * Full-page profile layout with left sidebar navigation,
 * order search, date filters, and product action buttons.
 *
 * Design follows Coupang's "MY Coupang" page pattern.
 */

import { useState, useEffect, useMemo } from 'react';
import { Modal } from '../common/Modal';
import { Button, ButtonGroup } from '../common/Button';
import { Input, Select, SearchInput } from '../common/Input';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Section } from '../common/Section';
import { Toggle, ToggleGroup } from '../common/Toggle';
import { InfoRow, InfoList, StatCard, StatGrid } from '../common/InfoRow';
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarBalanceCard } from '../common/Sidebar';
import { FilterTabs, DateFilterTabs } from '../common/FilterTabs';
import { OrderCard, OrderGroupHeader, OrderItemRow, OrderActions, OrderStatusHeader } from '../common/OrderCard';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders, ORDER_STATUS, STATUS_LABELS } from '../../contexts/OrderContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, formatDateTime } from '../../utils/helpers';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// =============================================================================
// MENU CONFIGURATION
// =============================================================================

const MENU_SECTIONS = {
  SHOPPING: 'shopping',
  BENEFITS: 'benefits',
  ACTIVITIES: 'activities',
  INFORMATION: 'information',
};

const MENU_ITEMS = {
  // Shopping
  ORDERS: 'orders',
  CANCELLATIONS: 'cancellations',
  RECEIPTS: 'receipts',
  // Benefits
  COUPONS: 'coupons',
  POINTS: 'points',
  // Activities
  REVIEWS: 'reviews',
  WISHLIST: 'wishlist',
  INQUIRIES: 'inquiries',
  // Information
  PROFILE: 'profile',
  ADDRESSES: 'addresses',
  PAYMENT: 'payment',
  SETTINGS: 'settings',
};

// =============================================================================
// MAIN PROFILE MODAL
// =============================================================================

export function ProfileModal({ isOpen, onClose, onTrackOrder }) {
  const { user, updateProfile, logout } = useAuth();
  const { getUserOrders } = useOrders();
  const { addItem } = useCart();
  const { t, language, setLanguage } = useLanguage();

  const [activeMenu, setActiveMenu] = useState(MENU_ITEMS.ORDERS);
  const [orderSearch, setOrderSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('6m');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

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

  const userOrders = user ? getUserOrders(user.id) : [];

  // Filter orders based on search and date
  const filteredOrders = useMemo(() => {
    if (!user) return [];
    let filtered = [...userOrders];

    // Date filter
    if (dateFilter === '6m') {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      filtered = filtered.filter(o => new Date(o.createdAt) >= sixMonthsAgo);
    } else {
      const year = parseInt(dateFilter);
      filtered = filtered.filter(o => new Date(o.createdAt).getFullYear() === year);
    }

    // Search filter
    if (orderSearch) {
      const searchLower = orderSearch.toLowerCase();
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(searchLower) ||
        o.items.some(item => item.name.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [user, userOrders, dateFilter, orderSearch]);

  // Group orders by date
  const groupedOrders = useMemo(() => {
    if (!user) return {};
    const groups = {};
    filteredOrders.forEach(order => {
      const date = new Date(order.createdAt).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(order);
    });
    return groups;
  }, [user, filteredOrders]);

  // Early return AFTER all hooks - but still render Modal for consistent hook counts
  if (!user) {
    return (
      <Modal isOpen={false} onClose={onClose} title="" size="xl" showHeader={false} padding={false}>
        <div />
      </Modal>
    );
  }

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
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const handleTrackOrderClick = (orderId) => {
    onClose();
    onTrackOrder?.(orderId);
  };

  // ===========================================================================
  // RENDER SIDEBAR
  // ===========================================================================

  const renderSidebar = () => (
    <Sidebar style={{ height: '100%' }}>
      {/* User Header */}
      <SidebarHeader
        title={`MY ${t('profile.title') || 'GoFresh'}`}
        icon="🛒"
      />

      {/* Balance Cards */}
      <SidebarBalanceCard
        items={[
          { label: t('profile.points') || 'Points', value: '2,500' },
          { label: t('profile.coupons') || 'Coupons', value: '3' },
        ]}
      />

      {/* My Shopping */}
      <SidebarSection title={t('profile.myShopping') || 'MY Shopping'}>
        <SidebarItem
          icon="📦"
          label={t('profile.orderList') || 'Order List/Delivery'}
          active={activeMenu === MENU_ITEMS.ORDERS}
          onClick={() => setActiveMenu(MENU_ITEMS.ORDERS)}
          badge={userOrders.length > 0 ? userOrders.length : undefined}
        />
        <SidebarItem
          icon="↩️"
          label={t('profile.cancellations') || 'Cancellation/Return'}
          active={activeMenu === MENU_ITEMS.CANCELLATIONS}
          onClick={() => setActiveMenu(MENU_ITEMS.CANCELLATIONS)}
        />
        <SidebarItem
          icon="🧾"
          label={t('profile.receipts') || 'Receipt Inquiry/Print'}
          active={activeMenu === MENU_ITEMS.RECEIPTS}
          onClick={() => setActiveMenu(MENU_ITEMS.RECEIPTS)}
        />
      </SidebarSection>

      {/* My Benefits */}
      <SidebarSection title={t('profile.myBenefits') || 'MY Benefits'}>
        <SidebarItem
          icon="🎟️"
          label={t('profile.couponsVouchers') || 'Coupons and vouchers'}
          active={activeMenu === MENU_ITEMS.COUPONS}
          onClick={() => setActiveMenu(MENU_ITEMS.COUPONS)}
        />
        <SidebarItem
          icon="💰"
          label={t('profile.cashPoints') || 'Cash/Gift Card'}
          active={activeMenu === MENU_ITEMS.POINTS}
          onClick={() => setActiveMenu(MENU_ITEMS.POINTS)}
        />
      </SidebarSection>

      {/* My Activities */}
      <SidebarSection title={t('profile.myActivities') || 'MY Activities'}>
        <SidebarItem
          icon="💬"
          label={t('profile.contactUs') || 'Contact Us'}
          active={activeMenu === MENU_ITEMS.INQUIRIES}
          onClick={() => setActiveMenu(MENU_ITEMS.INQUIRIES)}
        />
        <SidebarItem
          icon="⭐"
          label={t('profile.reviewManagement') || 'Review Management'}
          active={activeMenu === MENU_ITEMS.REVIEWS}
          onClick={() => setActiveMenu(MENU_ITEMS.REVIEWS)}
          badge="N"
          badgeVariant="error"
        />
        <SidebarItem
          icon="❤️"
          label={t('profile.wishlist') || 'Wishlist'}
          active={activeMenu === MENU_ITEMS.WISHLIST}
          onClick={() => setActiveMenu(MENU_ITEMS.WISHLIST)}
        />
      </SidebarSection>

      {/* My Information */}
      <SidebarSection title={t('profile.myInformation') || 'MY Information'}>
        <SidebarItem
          icon="👤"
          label={t('profile.editProfile') || 'Confirm/edit personal info'}
          active={activeMenu === MENU_ITEMS.PROFILE}
          onClick={() => setActiveMenu(MENU_ITEMS.PROFILE)}
        />
        <SidebarItem
          icon="💳"
          label={t('profile.paymentMethod') || 'Payment method'}
          active={activeMenu === MENU_ITEMS.PAYMENT}
          onClick={() => setActiveMenu(MENU_ITEMS.PAYMENT)}
        />
        <SidebarItem
          icon="📍"
          label={t('profile.addressManagement') || 'Delivery address'}
          active={activeMenu === MENU_ITEMS.ADDRESSES}
          onClick={() => setActiveMenu(MENU_ITEMS.ADDRESSES)}
        />
        <SidebarItem
          icon="⚙️"
          label={t('profile.settings') || 'Settings'}
          active={activeMenu === MENU_ITEMS.SETTINGS}
          onClick={() => setActiveMenu(MENU_ITEMS.SETTINGS)}
        />
      </SidebarSection>

      {/* Logout */}
      <div style={{ padding: spacing[4] }}>
        <Button
          variant="outline"
          fullWidth
          onClick={handleLogout}
          style={{ color: colors.error, borderColor: colors.error }}
        >
          {t('nav.signOut') || 'Sign Out'}
        </Button>
      </div>
    </Sidebar>
  );

  // ===========================================================================
  // RENDER ORDERS CONTENT
  // ===========================================================================

  const renderOrdersContent = () => (
    <div>
      {/* Page Header */}
      <h1 style={{
        margin: `0 0 ${spacing[5]}px`,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.regular,
        color: colors.text,
      }}>
        {t('profile.orderList') || 'Order list'}
      </h1>

      {/* Search Bar */}
      <div style={{ marginBottom: spacing[4] }}>
        <SearchInput
          value={orderSearch}
          onChange={(e) => setOrderSearch(e.target.value)}
          placeholder={t('profile.searchOrders') || 'You can search for the products you ordered'}
          style={{ maxWidth: 500 }}
        />
      </div>

      {/* Date Filter Tabs */}
      <div style={{ marginBottom: spacing[5] }}>
        <DateFilterTabs
          value={dateFilter}
          onChange={setDateFilter}
        />
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <Card variant="outlined" padding="relaxed" style={{ textAlign: 'center' }}>
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
            {t('profile.noOrders') || 'No orders yet'}
          </h3>
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.textSecondary,
            margin: 0,
          }}>
            {t('profile.noOrdersDescription') || 'Your order history will appear here once you make a purchase.'}
          </p>
          <Button onClick={onClose} style={{ marginTop: spacing[5] }}>
            {t('profile.startShopping') || 'Start shopping'}
          </Button>
        </Card>
      ) : (
        <div>
          {Object.entries(groupedOrders).map(([date, orders]) => (
            <div key={date} style={{ marginBottom: spacing[6] }}>
              {/* Date Group Header */}
              <OrderGroupHeader
                date={date}
                onViewDetails={() => {}}
                t={t}
              />

              {/* Orders in this group */}
              {orders.map((order) => (
                <div
                  key={order.id}
                  style={{
                    background: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: borderRadius.default,
                    overflow: 'hidden',
                    marginTop: spacing[4],
                  }}
                >
                  {/* Status Header */}
                  <OrderStatusHeader
                    status={order.status}
                    expectedDate={order.expectedDelivery}
                    t={t}
                  />

                  {/* Items + Actions */}
                  <div style={{ display: 'flex' }}>
                    {/* Items List */}
                    <div style={{ flex: 1 }}>
                      {order.items?.map((item, index) => (
                        <OrderItemRow
                          key={item.id || index}
                          item={item}
                          onAddToCart={() => handleAddToCart(item)}
                          isRocket={order.isRocket || item.isRocket}
                          t={t}
                        />
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <OrderActions
                      onTrack={() => handleTrackOrderClick(order.id)}
                      onExchange={() => {}}
                      onReview={() => {}}
                      t={t}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // ===========================================================================
  // RENDER PROFILE CONTENT
  // ===========================================================================

  const renderProfileContent = () => (
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

      {/* Page Header */}
      <h1 style={{
        margin: `0 0 ${spacing[5]}px`,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.regular,
        color: colors.text,
      }}>
        {t('profile.editProfile') || 'Edit Profile'}
      </h1>

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
      </Card>

      {/* Personal Information Section */}
      <Section
        title={t('profile.personalInfo') || 'Personal Information'}
        icon="👤"
        editable
        isEditing={editingSection === 'personal'}
        onEdit={() => setEditingSection('personal')}
        onSave={() => handleSaveSection('personal')}
        onCancel={handleCancelEdit}
        editLabel={t('common.edit')}
        saveLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        loading={isSaving}
      >
        {editingSection === 'personal' ? (
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
              <InfoRow icon="👤" label={t('profile.fullName')} value={user.name} />
              <InfoRow icon="✉️" label={t('profile.email')} value={user.email || t('profile.notSet')} placeholder={!user.email} />
              <InfoRow icon="📱" label={t('profile.phone')} value={user.phone} copyable />
            </InfoList>
          </Card>
        )}
      </Section>

      {/* Shipping Address Section */}
      <Section
        title={t('profile.shippingAddress') || 'Shipping Address'}
        icon="📍"
        editable
        isEditing={editingSection === 'address'}
        onEdit={() => setEditingSection('address')}
        onSave={() => handleSaveSection('address')}
        onCancel={handleCancelEdit}
        editLabel={t('common.edit')}
        saveLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        loading={isSaving}
      >
        {editingSection === 'address' ? (
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
              />
              <Input
                label={t('checkout.postalCode')}
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <Card variant="outlined" padding="none">
            <InfoList>
              <InfoRow icon="📍" label={t('profile.address')} value={user.address || t('profile.notSet')} placeholder={!user.address} />
            </InfoList>
          </Card>
        )}
      </Section>
    </div>
  );

  // ===========================================================================
  // RENDER SETTINGS CONTENT
  // ===========================================================================

  const renderSettingsContent = () => (
    <div>
      <h1 style={{
        margin: `0 0 ${spacing[5]}px`,
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.regular,
        color: colors.text,
      }}>
        {t('profile.settings') || 'Settings'}
      </h1>

      {/* Notifications Section */}
      <Section title={t('profile.notifications') || 'Notifications'} icon="🔔">
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
      <Section title={t('profile.language') || 'Language'} icon="🌐">
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
            <InfoRow icon="🔑" label={t('profile.password') || 'Password'} value="••••••••" onClick={() => {}} />
            <InfoRow icon="📱" label={t('profile.twoFactor') || 'Two-Factor Auth'} value={t('profile.notEnabled') || 'Not enabled'} placeholder onClick={() => {}} />
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
    </div>
  );

  // ===========================================================================
  // RENDER PLACEHOLDER CONTENT
  // ===========================================================================

  const renderPlaceholderContent = (title, icon) => (
    <div style={{ textAlign: 'center', padding: spacing[10] }}>
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
        {icon}
      </div>
      <h3 style={{
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text,
        margin: `0 0 ${spacing[2]}px`,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: typography.fontSize.sm,
        color: colors.textSecondary,
        margin: 0,
      }}>
        {t('common.comingSoon') || 'Coming soon...'}
      </p>
    </div>
  );

  // ===========================================================================
  // RENDER MAIN CONTENT
  // ===========================================================================

  const renderMainContent = () => {
    switch (activeMenu) {
      case MENU_ITEMS.ORDERS:
        return renderOrdersContent();
      case MENU_ITEMS.PROFILE:
        return renderProfileContent();
      case MENU_ITEMS.SETTINGS:
        return renderSettingsContent();
      case MENU_ITEMS.CANCELLATIONS:
        return renderPlaceholderContent(t('profile.cancellations') || 'Cancellation/Return', '↩️');
      case MENU_ITEMS.RECEIPTS:
        return renderPlaceholderContent(t('profile.receipts') || 'Receipts', '🧾');
      case MENU_ITEMS.COUPONS:
        return renderPlaceholderContent(t('profile.couponsVouchers') || 'Coupons', '🎟️');
      case MENU_ITEMS.POINTS:
        return renderPlaceholderContent(t('profile.cashPoints') || 'Cash/Points', '💰');
      case MENU_ITEMS.REVIEWS:
        return renderPlaceholderContent(t('profile.reviewManagement') || 'Reviews', '⭐');
      case MENU_ITEMS.WISHLIST:
        return renderPlaceholderContent(t('profile.wishlist') || 'Wishlist', '❤️');
      case MENU_ITEMS.INQUIRIES:
        return renderPlaceholderContent(t('profile.contactUs') || 'Contact Us', '💬');
      case MENU_ITEMS.ADDRESSES:
        return renderPlaceholderContent(t('profile.addressManagement') || 'Addresses', '📍');
      case MENU_ITEMS.PAYMENT:
        return renderPlaceholderContent(t('profile.paymentMethod') || 'Payment', '💳');
      default:
        return renderOrdersContent();
    }
  };

  // ===========================================================================
  // RENDER
  // ===========================================================================

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="xl"
      showHeader={false}
      padding={false}
    >
      <div style={{
        display: 'flex',
        height: '80vh',
        minHeight: 500,
      }}>
        {/* Left Sidebar */}
        {renderSidebar()}

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          padding: spacing[6],
          overflowY: 'auto',
          background: colors.background,
        }}>
          {renderMainContent()}
        </div>
      </div>
    </Modal>
  );
}

export default ProfileModal;
