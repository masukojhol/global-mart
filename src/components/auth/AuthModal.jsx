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
      setError('Please enter a valid phone number');
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
      setError('Failed to send OTP. Please try again.');
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
      setError('Please enter the complete 6-digit OTP');
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
        await login(fullPhone, 'otp-verified');
        onClose();
      } catch (loginErr) {
        // User not found - go to profile step for signup
        setStep(3);
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fullPhone = `${getCountryCode()}${phone}`;
      await signup({
        phone: fullPhone,
        name: name.trim(),
        country,
        password: 'otp-verified', // Not used but required by auth context
        email: '', // Optional
      });
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
          Enter your mobile number
        </h3>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          margin: 0,
        }}>
          We'll send you a verification code
        </p>
      </div>

      <Select
        label="Country"
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
          Phone Number <span style={{ color: colors.sale }}>*</span>
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
        Send OTP
      </Button>

      <p style={{
        fontSize: typography.fontSize.xs,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing[4],
        marginBottom: 0,
      }}>
        By continuing, you agree to our Terms of Service and Privacy Policy
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
          Enter verification code
        </h3>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          margin: 0,
        }}>
          We sent a 6-digit code to<br />
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
        Verify OTP
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
            Resend code in <strong>{countdown}s</strong>
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
            Resend OTP
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
        Change phone number
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
        <strong>Demo:</strong> Enter any 6 digits to continue
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
          Almost done!
        </h3>
        <p style={{
          fontSize: typography.fontSize.sm,
          color: colors.textSecondary,
          margin: 0,
        }}>
          Just a few more details to complete your account
        </p>
      </div>

      <Input
        label="Your Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError('');
        }}
        placeholder="Enter your full name"
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
            Verified Phone
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
        Complete signup
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={step === 1 ? 'Sign In / Sign Up' : step === 2 ? 'Verify OTP' : 'Complete Profile'}
      size="sm"
    >
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </Modal>
  );
}

export default AuthModal;
