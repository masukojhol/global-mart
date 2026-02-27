/**
 * CHECKOUT MODAL COMPONENT
 * ========================
 * Multi-step checkout using GoFresh design tokens with localization.
 */

import { useState, useRef } from 'react';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/Input';
import { Button } from '../common/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, toUSD } from '../../utils/helpers';
import { useWindowSize } from '../../hooks/useWindowSize';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

// Bank transfer details for receipt upload
const BANK_DETAILS = {
  bankName: 'Shinhan Bank / 신한은행',
  accountNumber: '110-123-456789',
  accountHolder: 'GoFresh Market Co., Ltd.',
};

export function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const { items, subtotal, shippingFee, total, hasRocketItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const { isMobile } = useWindowSize();
  const { t, isKorean } = useLanguage();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    addressDetail: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  // Bank transfer receipt state
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);

  // Payment methods with localized labels
  const PAYMENT_METHODS = [
    { value: 'card', label: isKorean ? '💳 신용/체크카드' : '💳 Credit/Debit Card' },
    { value: 'kakao', label: '🟡 Kakao Pay' },
    { value: 'naver', label: '🟢 Naver Pay' },
    { value: 'paypal', label: '🔵 PayPal' },
    { value: 'bank', label: isKorean ? '🏦 계좌이체' : '🏦 Bank Transfer' },
    { value: 'bank_receipt', label: isKorean ? '🧾 계좌이체 (영수증 업로드)' : '🧾 Bank Transfer (Upload Receipt)' },
  ];

  const handleShippingChange = (field) => (e) => {
    setShippingAddress(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleCardChange = (field) => (e) => {
    setCardDetails(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(isKorean ? '이미지 파일만 업로드 가능합니다' : 'Please upload an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(isKorean ? '파일 크기는 5MB 이하여야 합니다' : 'File size must be less than 5MB');
        return;
      }

      setReceiptFile(file);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setReceiptPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateShipping = () => {
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address) {
      setError(t('checkout.fillRequired'));
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentMethod) {
      setError(t('checkout.selectPayment'));
      return false;
    }
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        setError(t('checkout.fillCardDetails'));
        return false;
      }
    }
    if (paymentMethod === 'bank_receipt' && !receiptFile) {
      setError(t('checkout.uploadReceiptRequired'));
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create order
      const order = createOrder(
        items,
        shippingAddress,
        paymentMethod,
        { subtotal, shippingFee, total },
        user?.id || 'guest'
      );

      // Clear cart
      clearCart();

      // Close modal and show success
      onClose();
      onSuccess(order);
    } catch (err) {
      setError(t('checkout.paymentFailed'));
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <h3 style={{
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        marginTop: 0,
        marginBottom: spacing[5],
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.heading,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wide,
      }}>
        {t('checkout.shippingAddress')}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
        <Input
          label={t('checkout.fullName')}
          value={shippingAddress.name}
          onChange={handleShippingChange('name')}
          placeholder={t('checkout.yourName')}
          required
          style={{ gridColumn: '1 / -1' }}
        />
        <Input
          label={t('checkout.phone')}
          value={shippingAddress.phone}
          onChange={handleShippingChange('phone')}
          placeholder="010-1234-5678"
          required
        />
        <Input
          label={t('checkout.postalCode')}
          value={shippingAddress.postalCode}
          onChange={handleShippingChange('postalCode')}
          placeholder="12345"
        />
        <Input
          label={t('checkout.address')}
          value={shippingAddress.address}
          onChange={handleShippingChange('address')}
          placeholder={t('checkout.streetAddress')}
          required
          style={{ gridColumn: '1 / -1' }}
        />
        <Input
          label={t('checkout.addressDetail')}
          value={shippingAddress.addressDetail}
          onChange={handleShippingChange('addressDetail')}
          placeholder={t('checkout.aptSuite')}
          style={{ gridColumn: '1 / -1' }}
        />
        <Input
          label={t('checkout.city')}
          value={shippingAddress.city}
          onChange={handleShippingChange('city')}
          placeholder="Seoul, Busan..."
        />
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <h3 style={{
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        marginTop: 0,
        marginBottom: spacing[5],
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.heading,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wide,
      }}>
        {t('checkout.paymentMethod')}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3], marginBottom: spacing[6] }}>
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[3],
              padding: `${spacing[4]}px ${spacing[4]}px`,
              border: `2px solid ${paymentMethod === method.value ? colors.primary : colors.border}`,
              cursor: 'pointer',
              background: paymentMethod === method.value ? colors.backgroundSoft : 'transparent',
              borderRadius: borderRadius.default,
              transition: transitions.hover,
            }}
          >
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setError('');
              }}
              style={{ width: 18, height: 18, accentColor: colors.primary }}
            />
            <span style={{ fontSize: typography.fontSize.base }}>{method.label}</span>
          </label>
        ))}
      </div>

      {/* Card Details Form */}
      {paymentMethod === 'card' && (
        <div style={{
          padding: spacing[5],
          background: colors.backgroundSoft,
          marginTop: spacing[2],
          borderRadius: borderRadius.default,
        }}>
          <Input
            label={t('checkout.cardNumber')}
            value={cardDetails.number}
            onChange={handleCardChange('number')}
            placeholder="1234 5678 9012 3456"
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
            <Input
              label={t('checkout.expiry')}
              value={cardDetails.expiry}
              onChange={handleCardChange('expiry')}
              placeholder="MM/YY"
              required
            />
            <Input
              label={t('checkout.cvv')}
              value={cardDetails.cvv}
              onChange={handleCardChange('cvv')}
              placeholder="123"
              required
            />
          </div>
          <Input
            label={t('checkout.nameOnCard')}
            value={cardDetails.name}
            onChange={handleCardChange('name')}
            placeholder="JOHN DOE"
          />
        </div>
      )}

      {/* Bank Transfer Receipt Upload Form */}
      {paymentMethod === 'bank_receipt' && (
        <div style={{
          padding: spacing[5],
          background: colors.backgroundSoft,
          marginTop: spacing[2],
          borderRadius: borderRadius.default,
        }}>
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.textSecondary,
            margin: `0 0 ${spacing[4]}px`,
          }}>
            {t('checkout.receiptInstructions')}
          </p>

          {/* Bank Details */}
          <div style={{
            background: colors.background,
            border: `1px solid ${colors.border}`,
            padding: spacing[4],
            marginBottom: spacing[5],
            borderRadius: borderRadius.default,
          }}>
            <div style={{ marginBottom: spacing[3] }}>
              <span style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                display: 'block',
                marginBottom: spacing[1],
              }}>
                {t('checkout.bankName')}
              </span>
              <span style={{
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.semibold,
                color: colors.text,
              }}>
                {BANK_DETAILS.bankName}
              </span>
            </div>
            <div style={{ marginBottom: spacing[3] }}>
              <span style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                display: 'block',
                marginBottom: spacing[1],
              }}>
                {t('checkout.accountNumber')}
              </span>
              <span style={{
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.bold,
                fontFamily: typography.fontFamily.mono,
                color: colors.primary,
              }}>
                {BANK_DETAILS.accountNumber}
              </span>
            </div>
            <div>
              <span style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
                display: 'block',
                marginBottom: spacing[1],
              }}>
                {t('checkout.accountHolder')}
              </span>
              <span style={{
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: colors.text,
              }}>
                {BANK_DETAILS.accountHolder}
              </span>
            </div>
          </div>

          {/* File Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {!receiptPreview ? (
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: spacing[6],
                border: `2px dashed ${colors.border}`,
                background: colors.background,
                borderRadius: borderRadius.default,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: spacing[3],
                transition: transitions.hover,
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                background: colors.primaryLight,
                borderRadius: borderRadius.circle,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <span style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                color: colors.primary,
              }}>
                {t('checkout.uploadReceiptButton')}
              </span>
              <span style={{
                fontSize: typography.fontSize.xs,
                color: colors.textMuted,
              }}>
                JPG, PNG (max 5MB)
              </span>
            </button>
          ) : (
            <div style={{
              position: 'relative',
              borderRadius: borderRadius.default,
              overflow: 'hidden',
              border: `2px solid ${colors.success}`,
            }}>
              <img
                src={receiptPreview}
                alt="Receipt"
                style={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'contain',
                  background: colors.background,
                }}
              />
              <div style={{
                position: 'absolute',
                top: spacing[2],
                right: spacing[2],
                display: 'flex',
                gap: spacing[2],
              }}>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    padding: `${spacing[2]}px ${spacing[3]}px`,
                    background: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: borderRadius.default,
                    cursor: 'pointer',
                    fontSize: typography.fontSize.xs,
                    color: colors.textSecondary,
                  }}
                >
                  {t('checkout.changeReceipt')}
                </button>
                <button
                  onClick={handleRemoveReceipt}
                  style={{
                    padding: `${spacing[2]}px ${spacing[3]}px`,
                    background: colors.error,
                    border: 'none',
                    borderRadius: borderRadius.default,
                    cursor: 'pointer',
                    fontSize: typography.fontSize.xs,
                    color: colors.white,
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: `${spacing[2]}px ${spacing[3]}px`,
                background: colors.success,
                color: colors.white,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
              }}>
                <span>✓</span>
                <span>{t('checkout.receiptUploaded')}</span>
              </div>
            </div>
          )}

          <p style={{
            fontSize: typography.fontSize.xs,
            color: colors.textMuted,
            marginTop: spacing[3],
            textAlign: 'center',
          }}>
            {t('checkout.receiptNote')}
          </p>
        </div>
      )}
    </>
  );

  const renderStep3 = () => (
    <>
      <h3 style={{
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        marginTop: 0,
        marginBottom: spacing[5],
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.heading,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wide,
      }}>
        {t('checkout.orderSummary')}
      </h3>

      {/* Items */}
      <div style={{
        marginBottom: spacing[5],
        maxHeight: 200,
        overflowY: 'auto',
        padding: `${spacing[3]}px 0`,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {items.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            gap: spacing[3],
            marginBottom: spacing[3],
          }}>
            <img
              src={item.img}
              alt={item.name}
              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: borderRadius.default }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: typography.fontSize.xs, margin: 0, fontWeight: typography.fontWeight.medium, color: colors.text }}>{item.name}</p>
              <p style={{ fontSize: typography.fontSize.xs, color: colors.textMuted, margin: `${spacing[1]}px 0 0` }}>
                {t('common.quantity')}: {item.quantity} × ₩{formatKRW(item.price)}
              </p>
            </div>
            <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.semibold, fontFamily: typography.fontFamily.mono }}>
              ₩{formatKRW(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div style={{ marginBottom: spacing[4] }}>
        <p style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: colors.textMuted,
          margin: `0 0 ${spacing[2]}px`,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wide,
        }}>
          {t('checkout.shippingTo')}
        </p>
        <p style={{ fontSize: typography.fontSize.sm, margin: 0, lineHeight: typography.lineHeight.relaxed, color: colors.text }}>
          {shippingAddress.name}<br />
          {shippingAddress.phone}<br />
          {shippingAddress.address} {shippingAddress.addressDetail}<br />
          {shippingAddress.city} {shippingAddress.postalCode}
        </p>
      </div>

      {/* Payment */}
      <div style={{ marginBottom: spacing[5] }}>
        <p style={{
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: colors.textMuted,
          margin: `0 0 ${spacing[2]}px`,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wide,
        }}>
          {t('checkout.payment')}
        </p>
        <p style={{ fontSize: typography.fontSize.sm, margin: 0, color: colors.text }}>
          {PAYMENT_METHODS.find(m => m.value === paymentMethod)?.label}
        </p>
        {paymentMethod === 'bank_receipt' && receiptPreview && (
          <div style={{
            marginTop: spacing[2],
            padding: spacing[2],
            background: colors.successLight,
            borderRadius: borderRadius.default,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
          }}>
            <span style={{ color: colors.success }}>✓</span>
            <span style={{ fontSize: typography.fontSize.xs, color: colors.success }}>
              {t('checkout.receiptUploaded')}
            </span>
          </div>
        )}
      </div>

      {/* Totals */}
      <div style={{
        background: colors.backgroundSoft,
        padding: spacing[4],
        borderRadius: borderRadius.default,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
          <span style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>{t('common.subtotal')}</span>
          <span style={{ fontSize: typography.fontSize.sm, fontFamily: typography.fontFamily.mono }}>₩{formatKRW(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
          <span style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>{t('common.shipping')}</span>
          <span style={{ fontSize: typography.fontSize.sm, color: shippingFee === 0 ? colors.success : colors.text, fontFamily: typography.fontFamily.mono }}>
            {shippingFee === 0 ? t('common.free') : `₩${formatKRW(shippingFee)}`}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: spacing[3],
          borderTop: `1px solid ${colors.border}`,
          marginTop: spacing[2],
        }}>
          <span style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>{t('common.total')}</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 18, fontWeight: typography.fontWeight.bold, fontFamily: typography.fontFamily.mono, color: colors.primary }}>
              ₩{formatKRW(total)}
            </span>
            <span style={{ display: 'block', fontSize: typography.fontSize.xs, color: colors.textMuted }}>
              ≈${toUSD(total)}
            </span>
          </div>
        </div>
      </div>

      {hasRocketItems && (
        <div style={{
          background: `${colors.primary}15`,
          padding: `${spacing[3]}px ${spacing[4]}px`,
          marginTop: spacing[4],
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          borderRadius: borderRadius.default,
        }}>
          <span>🚀</span>
          <span style={{ fontSize: typography.fontSize.xs, color: colors.primary }}>
            <strong>{t('product.rocketDelivery')}</strong> - {t('checkout.rocketDeliveryMessage')}
          </span>
        </div>
      )}
    </>
  );

  const stepLabels = [t('checkout.shipping'), t('checkout.payment'), t('checkout.review')];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${t('checkout.title')} (${t('checkout.step', { current: step, total: 3 })})`}
      size="md"
    >
      {/* Progress */}
      <div style={{
        display: 'flex',
        marginBottom: spacing[6],
        gap: spacing[2],
      }}>
        {stepLabels.map((label, i) => (
          <div key={label} style={{ flex: 1 }}>
            <div style={{
              height: 4,
              background: i + 1 <= step ? colors.primary : colors.border,
              marginBottom: spacing[2],
              borderRadius: borderRadius.default,
            }} />
            <span style={{
              fontSize: 10,
              fontWeight: typography.fontWeight.semibold,
              color: i + 1 <= step ? colors.text : colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: typography.letterSpacing.wide,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          background: colors.errorLight,
          border: `1px solid ${colors.error}`,
          padding: `${spacing[3]}px ${spacing[4]}px`,
          marginBottom: spacing[5],
          fontSize: typography.fontSize.sm,
          color: colors.error,
          borderRadius: borderRadius.default,
        }}>
          {error}
        </div>
      )}

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Actions */}
      <div style={{
        display: 'flex',
        gap: spacing[3],
        marginTop: spacing[6],
      }}>
        {step > 1 && (
          <Button variant="outline" onClick={handleBack} style={{ flex: 1 }}>
            {t('common.back')}
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} style={{ flex: step > 1 ? 2 : 1 }} fullWidth={step === 1}>
            {t('common.continue')}
          </Button>
        ) : (
          <Button
            onClick={handlePlaceOrder}
            loading={loading}
            style={{ flex: 2 }}
          >
            {t('checkout.placeOrder')} - ₩{formatKRW(total)}
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default CheckoutModal;
