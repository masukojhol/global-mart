/**
 * CHECKOUT MODAL COMPONENT
 * ========================
 * Multi-step checkout using GoFresh design tokens.
 */

import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/Input';
import { Button } from '../common/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';
import { tokens } from '../../styles/tokens';
import { formatKRW, toUSD } from '../../utils/helpers';
import { useWindowSize } from '../../hooks/useWindowSize';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

const PAYMENT_METHODS = [
  { value: 'card', label: '💳 Credit/Debit Card' },
  { value: 'kakao', label: '🟡 Kakao Pay' },
  { value: 'naver', label: '🟢 Naver Pay' },
  { value: 'paypal', label: '🔵 PayPal' },
  { value: 'bank', label: '🏦 Bank Transfer' },
];

export function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const { items, subtotal, shippingFee, total, hasRocketItems, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { createOrder } = useOrders();
  const { isMobile } = useWindowSize();

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

  const handleShippingChange = (field) => (e) => {
    setShippingAddress(prev => ({ ...prev, [field]: e.target.value }));
    setError('');
  };

  const handleCardChange = (field) => (e) => {
    setCardDetails(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validateShipping = () => {
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.address) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return false;
    }
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        setError('Please fill in all card details');
        return false;
      }
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
      setError('Payment failed. Please try again.');
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
        Shipping address
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
        <Input
          label="Full Name"
          value={shippingAddress.name}
          onChange={handleShippingChange('name')}
          placeholder="Your name"
          required
          style={{ gridColumn: '1 / -1' }}
        />
        <Input
          label="Phone"
          value={shippingAddress.phone}
          onChange={handleShippingChange('phone')}
          placeholder="010-1234-5678"
          required
        />
        <Input
          label="Postal Code"
          value={shippingAddress.postalCode}
          onChange={handleShippingChange('postalCode')}
          placeholder="12345"
        />
        <Input
          label="Address"
          value={shippingAddress.address}
          onChange={handleShippingChange('address')}
          placeholder="Street address"
          required
          style={{ gridColumn: '1 / -1' }}
        />
        <Input
          label="Address Detail"
          value={shippingAddress.addressDetail}
          onChange={handleShippingChange('addressDetail')}
          placeholder="Apt, Suite, Building"
          style={{ gridColumn: '1 / -1' }}
        />
        <Input
          label="City"
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
        Payment method
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
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: 18, height: 18, accentColor: colors.primary }}
            />
            <span style={{ fontSize: typography.fontSize.base }}>{method.label}</span>
          </label>
        ))}
      </div>

      {paymentMethod === 'card' && (
        <div style={{
          padding: spacing[5],
          background: colors.backgroundSoft,
          marginTop: spacing[2],
          borderRadius: borderRadius.default,
        }}>
          <Input
            label="Card Number"
            value={cardDetails.number}
            onChange={handleCardChange('number')}
            placeholder="1234 5678 9012 3456"
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
            <Input
              label="Expiry"
              value={cardDetails.expiry}
              onChange={handleCardChange('expiry')}
              placeholder="MM/YY"
              required
            />
            <Input
              label="CVV"
              value={cardDetails.cvv}
              onChange={handleCardChange('cvv')}
              placeholder="123"
              required
            />
          </div>
          <Input
            label="Name on Card"
            value={cardDetails.name}
            onChange={handleCardChange('name')}
            placeholder="JOHN DOE"
          />
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
        Order summary
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
                Qty: {item.quantity} × ₩{formatKRW(item.price)}
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
          Shipping to
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
          Payment
        </p>
        <p style={{ fontSize: typography.fontSize.sm, margin: 0, color: colors.text }}>
          {PAYMENT_METHODS.find(m => m.value === paymentMethod)?.label}
        </p>
      </div>

      {/* Totals */}
      <div style={{
        background: colors.backgroundSoft,
        padding: spacing[4],
        borderRadius: borderRadius.default,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
          <span style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>Subtotal</span>
          <span style={{ fontSize: typography.fontSize.sm, fontFamily: typography.fontFamily.mono }}>₩{formatKRW(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
          <span style={{ fontSize: typography.fontSize.sm, color: colors.textSecondary }}>Shipping</span>
          <span style={{ fontSize: typography.fontSize.sm, color: shippingFee === 0 ? colors.success : colors.text, fontFamily: typography.fontFamily.mono }}>
            {shippingFee === 0 ? 'FREE' : `₩${formatKRW(shippingFee)}`}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: spacing[3],
          borderTop: `1px solid ${colors.border}`,
          marginTop: spacing[2],
        }}>
          <span style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>Total</span>
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
            <strong>Rocket delivery</strong> - Your order will arrive by 7AM tomorrow!
          </span>
        </div>
      )}
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Checkout (Step ${step}/3)`}
      size="md"
    >
      {/* Progress */}
      <div style={{
        display: 'flex',
        marginBottom: spacing[6],
        gap: spacing[2],
      }}>
        {['Shipping', 'Payment', 'Review'].map((label, i) => (
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
            Back
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} style={{ flex: step > 1 ? 2 : 1 }} fullWidth={step === 1}>
            Continue
          </Button>
        ) : (
          <Button
            onClick={handlePlaceOrder}
            loading={loading}
            style={{ flex: 2 }}
          >
            Place order - ₩{formatKRW(total)}
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default CheckoutModal;
