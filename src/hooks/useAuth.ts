import { useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';
import { AuthService, LoginCredentials, RegisterMerchantData } from '../services/authService';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => AuthService.getCurrentUser());
  const currentRole: UserRole = currentUser ? currentUser.role : 'guest';

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(AuthService.getCurrentUser());
    };
    window.addEventListener('livrih_storage_change', handleStorageChange);
    return () => window.removeEventListener('livrih_storage_change', handleStorageChange);
  }, []);

  const login = useCallback((credentials: LoginCredentials) => {
    const result = AuthService.login(credentials);
    if (result.success && result.user) {
      setCurrentUser(result.user);
    }
    return result;
  }, []);

  const register = useCallback((data: RegisterMerchantData) => {
    const result = AuthService.registerMerchant(data);
    if (result.success && result.user) {
      setCurrentUser(result.user);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    AuthService.logout();
    setCurrentUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const user = AuthService.switchRole(role);
    setCurrentUser(user);
  }, []);

  const updateProfile = useCallback((partial: Partial<User>) => {
    if (!currentUser) return;
    const updated = AuthService.updateProfile(currentUser.id, partial);
    if (updated) setCurrentUser(updated);
  }, [currentUser]);

  return {
    currentUser,
    currentRole,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    switchRole,
    updateProfile,
  };
}
