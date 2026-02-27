/**
 * AUTH MODAL COMPONENT
 * ====================
 * Authentication modal using GoFresh design tokens.
 */

import { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useOrders } from '../../contexts/OrderContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { tokens } from '../../styles/tokens';

const { colors, typography, borderRadius, spacing, transitions } = tokens;

const COUNTRIES = [
  { value: 'nepal', label: '🇳🇵 Nepal', code: '+977' },
  { value: 'india', label: '🇮🇳 India', code: '+91' },
  { value: 'pakistan', label: '🇵🇰 Pakistan', code: '+92' },
  { value: 'bangladesh', label: '🇧🇩 Bangladesh', code: '+880' },
  { value: 'srilanka', label: '🇱🇰 Sri Lanka', code: '+94' },
  { value: 'philippines', label: '🇵🇭 Philippines', code: '+63' },
  { value: 'vietnam', label: '🇻🇳 Vietnam', code: '+84' },
  { value: 'indonesia', label: '🇮🇩 Indonesia', code: '+62' },
  { value: 'korea', label: '🇰🇷 Korea', code: '+82' },
  { value: 'usa', label: '🇺🇸 USA', code: '+1' },
];

export function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP, 3: Profile (for new users)
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const { login, signup } = useAuth();
  const { initializeDummyOrders } = useOrders();
  const { t } = useLanguage();

  // Form state
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('korea');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [name, setName] = useState('');

  const otpRefs = useRef([]);

  // Get country code
  const getCountryCode = () => {
    const found = COUNTRIES.find(c => c.value === country);
    return found ? found.code : '+82';
  };

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setPhone('');
      setOtp(['', '', '', '', '', '']);
      setName('');
      setError('');
      setIsNewUser(false);
    }
  }, [isOpen]);

  const handleSendOTP = async () => {
    if (!phone || phone.length < 8) {
      setError(t('auth.validPhoneError'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo: check if user exists (random for demo)
      const existingUser = Math.random() > 0.5;
      setIsNewUser(!existingUser);

      setStep(2);
      setCountdown(60); // 60 seconds countdown

      // Focus first OTP input
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      setError(t('auth.sendOTPFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
      setOtp(newOtp);
      // Focus last filled or first empty
      const focusIndex = Math.min(pastedData.length, 5);
      otpRefs.current[focusIndex]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError(t('auth.completeOTPError'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo: accept any 6-digit OTP
      // In production, this would verify with backend

      const fullPhone = `${getCountryCode()}${phone}`;

      // Try to login existing user
      try {
        const user = await login(fullPhone, 'otp-verified');
        // Initialize dummy orders for demo
        initializeDummyOrders(user.id);
        onClose();
      } catch (loginErr) {
        // User not found - go to profile step for signup
        setStep(3);
      }
    } catch (err) {
      setError(t('auth.verifyFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    if (!name.trim()) {
      setError(t('auth.enterNameError'));
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullPhone = `${getCountryCode()}${phone}`;
      const user = await signup({
        phone: fullPhone,
        name: name.trim(),
        country,
        password: 'otp-verified', // Not used but required by auth context
        email: '', // Optional
      });
      // Initialize dummy orders for demo
      initializeDummyOrders(user.id);
      onClose();
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <>
      <div style={{ textAlign: 'center', marginBottom: spacing[6] }}>
        <div style={{
          width: 64,
          height: 64,
          background: colors.backgroundSoft,
          borderRadius: borderRadius.circle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `0 auto ${spacing[4]}px`,
          fontSize: 28,
        }}>
          📱
        </div>
        <h3 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          margin: `0 0 ${spacing[2]}px`,
          fontFamily: typography.fontFamily.heading,
          color: colors.text,
        }}>
          {t('auth.enterMobile')}
        </h3>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          margin: 0,
        }}>
          {t('auth.sendOTPDescription')}
        </p>
      </div>

      <Select
        label={t('auth.country')}
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        options={COUNTRIES.map(c => ({ value: c.value, label: `${c.label} (${c.code})` }))}
      />

      <div style={{ marginBottom: spacing[4] }}>
        <label style={{
          display: 'block',
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
          color: colors.textSecondary,
          marginBottom: spacing[2],
          fontFamily: typography.fontFamily.body,
          textTransform: 'uppercase',
          letterSpacing: typography.letterSpacing.wide,
        }}>
          {t('auth.phoneNumber')} <span style={{ color: colors.sale }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: spacing[2] }}>
          <div style={{
            padding: `${spacing[3]}px ${spacing[4]}px`,
            fontSize: typography.fontSize.base,
            fontFamily: typography.fontFamily.body,
            border: `1.5px solid ${colors.border}`,
            background: colors.backgroundSoft,
            color: colors.textSecondary,
            minWidth: 70,
            textAlign: 'center',
            borderRadius: borderRadius.default,
          }}>
            {getCountryCode()}
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setPhone(val);
              setError('');
            }}
            placeholder="10-1234-5678"
            style={{
              flex: 1,
              padding: `${spacing[3]}px ${spacing[4]}px`,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily.body,
              border: `1.5px solid ${error ? colors.error : colors.border}`,
              borderRadius: borderRadius.default,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {error && (
        <p style={{
          fontSize: typography.fontSize.xs,
          color: colors.error,
          margin: `-${spacing[2]}px 0 ${spacing[4]}px`,
        }}>
          {error}
        </p>
      )}

      <Button fullWidth loading={loading} onClick={handleSendOTP}>
        {t('auth.sendOTP')}
      </Button>

      <p style={{
        fontSize: typography.fontSize.xs,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing[4],
        marginBottom: 0,
      }}>
        {t('auth.termsAgreement')}
      </p>
    </>
  );

  const renderStep2 = () => (
    <>
      <div style={{ textAlign: 'center', marginBottom: spacing[6] }}>
        <div style={{
          width: 64,
          height: 64,
          background: colors.backgroundSoft,
          borderRadius: borderRadius.circle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `0 auto ${spacing[4]}px`,
          fontSize: 28,
        }}>
          🔐
        </div>
        <h3 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          margin: `0 0 ${spacing[2]}px`,
          fontFamily: typography.fontFamily.heading,
          color: colors.text,
        }}>
          {t('auth.enterVerificationCode')}
        </h3>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          margin: 0,
        }}>
          {t('auth.sentCodeTo')}<br />
          <strong>{getCountryCode()} {phone}</strong>
        </p>
      </div>

      {/* OTP Input */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: spacing[2],
        marginBottom: spacing[5],
      }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => otpRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            onKeyDown={(e) => handleOTPKeyDown(index, e)}
            onPaste={index === 0 ? handleOTPPaste : undefined}
            style={{
              width: 44,
              height: 52,
              textAlign: 'center',
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.semibold,
              fontFamily: typography.fontFamily.mono,
              border: `2px solid ${digit ? colors.primary : colors.border}`,
              borderRadius: borderRadius.default,
              outline: 'none',
              transition: transitions.hover,
            }}
          />
        ))}
      </div>

      {error && (
        <p style={{
          fontSize: typography.fontSize.xs,
          color: colors.error,
          textAlign: 'center',
          marginBottom: spacing[4],
        }}>
          {error}
        </p>
      )}

      <Button fullWidth loading={loading} onClick={handleVerifyOTP}>
        {t('auth.verifyOTPButton')}
      </Button>

      {/* Resend */}
      <div style={{
        textAlign: 'center',
        marginTop: spacing[5],
      }}>
        {countdown > 0 ? (
          <p style={{
            fontSize: typography.fontSize.sm,
            color: colors.textMuted,
            margin: 0,
          }}>
            {t('auth.resendIn')} <strong>{countdown}s</strong>
          </p>
        ) : (
          <button
            onClick={handleResendOTP}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: colors.primary,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {t('auth.resendOTP')}
          </button>
        )}
      </div>

      {/* Change number */}
      <button
        onClick={() => {
          setStep(1);
          setOtp(['', '', '', '', '', '']);
          setError('');
        }}
        style={{
          display: 'block',
          width: '100%',
          marginTop: spacing[3],
          background: 'none',
          border: 'none',
          fontSize: typography.fontSize.xs,
          color: colors.textSecondary,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        {t('auth.changePhoneNumber')}
      </button>

      {/* Demo hint */}
      <div style={{
        marginTop: spacing[5],
        padding: spacing[3],
        background: colors.warningLight,
        border: `1px solid ${colors.warning}`,
        fontSize: typography.fontSize.xs,
        color: colors.textSecondary,
        textAlign: 'center',
        borderRadius: borderRadius.default,
      }}>
        {t('auth.demoHint')}
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div style={{ textAlign: 'center', marginBottom: spacing[6] }}>
        <div style={{
          width: 64,
          height: 64,
          background: colors.successLight,
          borderRadius: borderRadius.circle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: `0 auto ${spacing[4]}px`,
          fontSize: 28,
        }}>
          ✓
        </div>
        <h3 style={{
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          margin: `0 0 ${spacing[2]}px`,
          fontFamily: typography.fontFamily.heading,
          color: colors.text,
        }}>
          {t('auth.almostDone')}
        </h3>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          margin: 0,
        }}>
          {t('auth.completeDetails')}
        </p>
      </div>

      <Input
        label={t('auth.yourName')}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        placeholder={t('auth.enterFullName')}
        required
      />

      <div style={{
        padding: spacing[4],
        background: colors.backgroundSoft,
        marginBottom: spacing[4],
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        borderRadius: borderRadius.default,
      }}>
        <span style={{ fontSize: 20 }}>📱</span>
        <div>
          <p style={{
            fontSize: typography.fontSize.xs,
            color: colors.textMuted,
            margin: '0 0 2px',
            textTransform: 'uppercase',
            letterSpacing: typography.letterSpacing.wide,
          }}>
            {t('auth.verifiedPhone')}
          </p>
          <p style={{
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.medium,
            margin: 0,
            fontFamily: typography.fontFamily.mono,
            color: colors.text,
          }}>
            {getCountryCode()} {phone}
          </p>
        </div>
        <span style={{
          marginLeft: 'auto',
          color: colors.success,
          fontSize: 18,
        }}>
          ✓
        </span>
      </div>

      {error && (
        <p style={{
          fontSize: typography.fontSize.xs,
          color: colors.error,
          marginBottom: spacing[4],
        }}>
          {error}
        </p>
      )}

      <Button fullWidth loading={loading} onClick={handleCompleteSignup}>
        {t('auth.completeSignup')}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 1 ? t('auth.signInSignUp') : step === 2 ? t('auth.verifyOTP') : t('auth.completeProfile')}
      size="sm"
    >
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </Modal>
  );
}

export default AuthModal;
