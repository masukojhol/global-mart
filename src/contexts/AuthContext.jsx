import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/helpers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = storage.get('globalmart_user');
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const signup = async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser = {
      id: Date.now(),
      email: userData.email || '',
      name: userData.name,
      phone: userData.phone,
      address: userData.address || '',
      country: userData.country || 'Korea',
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage (simulating database)
    const users = storage.get('globalmart_users', []);

    // Check if phone already exists
    if (users.find(u => u.phone === userData.phone)) {
      throw new Error('Phone number already registered');
    }

    users.push({ ...newUser, password: userData.password });
    storage.set('globalmart_users', users);
    storage.set('globalmart_user', newUser);

    setUser(newUser);
    return newUser;
  };

  const login = async (phoneOrEmail, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const users = storage.get('globalmart_users', []);

    // Support OTP-verified login (no password check needed)
    if (password === 'otp-verified') {
      const foundUser = users.find(u => u.phone === phoneOrEmail);

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        storage.set('globalmart_user', userWithoutPassword);
        setUser(userWithoutPassword);
        return userWithoutPassword;
      }

      // User not found - they should go through signup flow
      throw new Error('User not found');
    }

    // Traditional email/password login
    const foundUser = users.find(u => u.email === phoneOrEmail && u.password === password);

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    storage.set('globalmart_user', userWithoutPassword);
    setUser(userWithoutPassword);
    return userWithoutPassword;
  };

  const logout = () => {
    storage.remove('globalmart_user');
    setUser(null);
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    storage.set('globalmart_user', updatedUser);

    // Also update in users list
    const users = storage.get('globalmart_users', []);
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storage.set('globalmart_users', users);
    }

    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      signup,
      login,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
