import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/Input';
import { Button } from '../common/Button';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';
import { theme } from '../../styles/theme';
import { formatKRW, toUSD } from '../../utils/helpers';
import { useWindowSize } from '../../hooks/useWindowSize';

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
        fontSize: 14,
        fontWeight: 600,
        marginTop: 0,
        marginBottom: 20,
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        Shipping Address
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
        fontSize: 14,
        fontWeight: 600,
        marginTop: 0,
        marginBottom: 20,
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        Payment Method
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '14px 16px',
              border: `2px solid ${paymentMethod === method.value ? theme.colors.brandPrimary : theme.colors.borderLight}`,
              cursor: 'pointer',
              background: paymentMethod === method.value ? theme.colors.surfaceLight : 'transparent',
            }}
          >
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontSize: 14 }}>{method.label}</span>
          </label>
        ))}
      </div>

      {paymentMethod === 'card' && (
        <div style={{
          padding: 20,
          background: theme.colors.surfaceLight,
          marginTop: 8,
        }}>
          <Input
            label="Card Number"
            value={cardDetails.number}
            onChange={handleCardChange('number')}
            placeholder="1234 5678 9012 3456"
            required
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
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
        fontSize: 14,
        fontWeight: 600,
        marginTop: 0,
        marginBottom: 20,
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}>
        Order Summary
      </h3>

      {/* Items */}
      <div style={{
        marginBottom: 20,
        maxHeight: 200,
        overflowY: 'auto',
        padding: '12px 0',
        borderTop: `1px solid ${theme.colors.borderLight}`,
        borderBottom: `1px solid ${theme.colors.borderLight}`,
      }}>
        {items.map((item) => (
          <div key={item.id} style={{
            display: 'flex',
            gap: 12,
            marginBottom: 12,
          }}>
            <img
              src={item.img}
              alt={item.name}
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, margin: 0, fontWeight: 500 }}>{item.name}</p>
              <p style={{ fontSize: 11, color: theme.colors.textMuted, margin: '4px 0 0' }}>
                Qty: {item.quantity} × ₩{formatKRW(item.price)}
              </p>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600 }}>
              ₩{formatKRW(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      <div style={{ marginBottom: 16 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: theme.colors.textMuted,
          margin: '0 0 6px',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Shipping To
        </p>
        <p style={{ fontSize: 13, margin: 0, lineHeight: 1.5 }}>
          {shippingAddress.name}<br />
          {shippingAddress.phone}<br />
          {shippingAddress.address} {shippingAddress.addressDetail}<br />
          {shippingAddress.city} {shippingAddress.postalCode}
        </p>
      </div>

      {/* Payment */}
      <div style={{ marginBottom: 20 }}>
        <p style={{
          fontSize: 11,
          fontWeight: 600,
          color: theme.colors.textMuted,
          margin: '0 0 6px',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Payment
        </p>
        <p style={{ fontSize: 13, margin: 0 }}>
          {PAYMENT_METHODS.find(m => m.value === paymentMethod)?.label}
        </p>
      </div>

      {/* Totals */}
      <div style={{
        background: theme.colors.surfaceLight,
        padding: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13 }}>Subtotal</span>
          <span style={{ fontSize: 13 }}>₩{formatKRW(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13 }}>Shipping</span>
          <span style={{ fontSize: 13, color: shippingFee === 0 ? theme.colors.uiSuccess : 'inherit' }}>
            {shippingFee === 0 ? 'FREE' : `₩${formatKRW(shippingFee)}`}
          </span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 12,
          borderTop: `1px solid ${theme.colors.borderLight}`,
          marginTop: 8,
        }}>
          <span style={{ fontSize: 16, fontWeight: 600 }}>Total</span>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 18, fontWeight: 700, fontFamily: theme.fonts.mono }}>
              ₩{formatKRW(total)}
            </span>
            <span style={{ display: 'block', fontSize: 11, color: theme.colors.textMuted }}>
              ≈${toUSD(total)}
            </span>
          </div>
        </div>
      </div>

      {hasRocketItems && (
        <div style={{
          background: '#E3F2FD',
          padding: '12px 14px',
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span>🚀</span>
          <span style={{ fontSize: 12, color: theme.colors.brandBlue }}>
            <strong>Rocket Delivery</strong> - Your order will arrive by 7AM tomorrow!
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
        marginBottom: 24,
        gap: 8,
      }}>
        {['Shipping', 'Payment', 'Review'].map((label, i) => (
          <div key={label} style={{ flex: 1 }}>
            <div style={{
              height: 4,
              background: i + 1 <= step ? theme.colors.brandPrimary : theme.colors.borderLight,
              marginBottom: 6,
            }} />
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: i + 1 <= step ? theme.colors.textPrimary : theme.colors.textMuted,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          background: '#FEE',
          border: `1px solid ${theme.colors.uiError}`,
          padding: '12px 14px',
          marginBottom: 20,
          fontSize: 13,
          color: theme.colors.uiError,
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
        gap: 12,
        marginTop: 24,
      }}>
        {step > 1 && (
          <Button variant="secondary" onClick={handleBack} style={{ flex: 1 }}>
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
            Place Order - ₩{formatKRW(total)}
          </Button>
        )}
      </div>
    </Modal>
  );
}

export default CheckoutModal;
