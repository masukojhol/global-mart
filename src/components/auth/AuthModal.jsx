import { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { Input, Select } from '../common/Input';
import { Button } from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';

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
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 64,
          height: 64,
          background: theme.colors.surfaceLight,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28,
        }}>
          📱
        </div>
        <h3 style={{
          fontSize: 18,
          fontWeight: 500,
          margin: '0 0 8px',
          fontFamily: theme.fonts.primary,
        }}>
          Enter Your Mobile Number
        </h3>
        <p style={{
          fontSize: 13,
          color: theme.colors.textSecondary,
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

      <div style={{ marginBottom: 16 }}>
        <label style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 500,
          color: theme.colors.textSecondary,
          marginBottom: 6,
          fontFamily: theme.fonts.primary,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}>
          Phone Number <span style={{ color: theme.colors.uiSale }}>*</span>
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{
            padding: '12px 14px',
            fontSize: 14,
            fontFamily: theme.fonts.body,
            border: `1.5px solid ${theme.colors.borderMedium}`,
            background: theme.colors.surfaceLight,
            color: theme.colors.textSecondary,
            minWidth: 70,
            textAlign: 'center',
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
              padding: '12px 14px',
              fontSize: 14,
              fontFamily: theme.fonts.body,
              border: `1.5px solid ${error ? theme.colors.uiError : theme.colors.borderMedium}`,
              borderRadius: 0,
              outline: 'none',
            }}
          />
        </div>
      </div>

      {error && (
        <p style={{
          fontSize: 12,
          color: theme.colors.uiError,
          margin: '-8px 0 16px',
        }}>
          {error}
        </p>
      )}

      <Button fullWidth loading={loading} onClick={handleSendOTP}>
        Send OTP
      </Button>

      <p style={{
        fontSize: 11,
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 0,
      }}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </>
  );

  const renderStep2 = () => (
    <>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 64,
          height: 64,
          background: theme.colors.surfaceLight,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28,
        }}>
          🔐
        </div>
        <h3 style={{
          fontSize: 18,
          fontWeight: 500,
          margin: '0 0 8px',
          fontFamily: theme.fonts.primary,
        }}>
          Enter Verification Code
        </h3>
        <p style={{
          fontSize: 13,
          color: theme.colors.textSecondary,
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
        gap: 8,
        marginBottom: 20,
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
              fontSize: 20,
              fontWeight: 600,
              fontFamily: theme.fonts.mono,
              border: `2px solid ${digit ? theme.colors.brandBlue : theme.colors.borderMedium}`,
              borderRadius: 0,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
          />
        ))}
      </div>

      {error && (
        <p style={{
          fontSize: 12,
          color: theme.colors.uiError,
          textAlign: 'center',
          marginBottom: 16,
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
        marginTop: 20,
      }}>
        {countdown > 0 ? (
          <p style={{
            fontSize: 13,
            color: theme.colors.textMuted,
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
              color: theme.colors.brandBlue,
              fontSize: 13,
              fontWeight: 600,
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
          marginTop: 12,
          background: 'none',
          border: 'none',
          fontSize: 12,
          color: theme.colors.textSecondary,
          cursor: 'pointer',
          textDecoration: 'underline',
        }}
      >
        Change phone number
      </button>

      {/* Demo hint */}
      <div style={{
        marginTop: 20,
        padding: 12,
        background: '#FFF9E6',
        border: `1px solid ${theme.colors.uiWarning}`,
        fontSize: 11,
        color: theme.colors.textSecondary,
        textAlign: 'center',
      }}>
        <strong>Demo:</strong> Enter any 6 digits to continue
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          width: 64,
          height: 64,
          background: '#E8F5E9',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 28,
        }}>
          ✓
        </div>
        <h3 style={{
          fontSize: 18,
          fontWeight: 500,
          margin: '0 0 8px',
          fontFamily: theme.fonts.primary,
        }}>
          Almost Done!
        </h3>
        <p style={{
          fontSize: 13,
          color: theme.colors.textSecondary,
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
        padding: 14,
        background: theme.colors.surfaceLight,
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <span style={{ fontSize: 20 }}>📱</span>
        <div>
          <p style={{
            fontSize: 11,
            color: theme.colors.textMuted,
            margin: '0 0 2px',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Verified Phone
          </p>
          <p style={{
            fontSize: 14,
            fontWeight: 500,
            margin: 0,
            fontFamily: theme.fonts.mono,
          }}>
            {getCountryCode()} {phone}
          </p>
        </div>
        <span style={{
          marginLeft: 'auto',
          color: theme.colors.uiSuccess,
          fontSize: 18,
        }}>
          ✓
        </span>
      </div>

      {error && (
        <p style={{
          fontSize: 12,
          color: theme.colors.uiError,
          marginBottom: 16,
        }}>
          {error}
        </p>
      )}

      <Button fullWidth loading={loading} onClick={handleCompleteSignup}>
        Complete Signup
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
