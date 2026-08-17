import { StorageService } from './storage';
import { User, UserRole } from '../types';

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string;
  role?: UserRole;
}

export interface RegisterMerchantData {
  fullName: string;
  storeName: string;
  phone: string;
  email: string;
  city: string;
  monthlyParcelsTarget: string;
  address?: string;
  bankName?: string;
  rib?: string;
  ice?: string;
}

export const AuthService = {
  getCurrentUser(): User | null {
    return StorageService.getActiveUser();
  },

  login(credentials: LoginCredentials): { success: boolean; user?: User; error?: string } {
    const users = StorageService.getUsers();
    
    // Find matching user by email or phone or role
    let foundUser = users.find((u) => {
      if (credentials.email && u.email.toLowerCase() === credentials.email.toLowerCase()) return true;
      if (credentials.phone && u.phone.replace(/\s+/g, '') === credentials.phone.replace(/\s+/g, '')) return true;
      if (credentials.role && u.role === credentials.role) return true;
      return false;
    });

    if (!foundUser && credentials.role) {
      foundUser = users.find((u) => u.role === credentials.role);
    }

    if (!foundUser) {
      return { success: false, error: 'المستخدم غير موجود. يرجى التأكد من البريد أو الهاتف.' };
    }

    StorageService.setActiveUser(foundUser);
    return { success: true, user: foundUser };
  },

  registerMerchant(data: RegisterMerchantData): { success: boolean; user: User } {
    const users = StorageService.getUsers();
    const newUser: User = {
      id: `usr_${Date.now()}`,
      role: 'merchant',
      name: data.fullName,
      fullName: data.fullName,
      storeName: data.storeName,
      email: data.email,
      phone: data.phone,
      city: data.city,
      address: data.address || '',
      monthlyParcelsTarget: data.monthlyParcelsTarget,
      bankName: data.bankName || 'Attijariwafa Bank',
      rib: data.rib || '',
      ice: data.ice || '',
      isVerified: true,
      createdAt: new Date().toISOString().split('T')[0],
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
    };

    const updatedUsers = [newUser, ...users];
    StorageService.setUsers(updatedUsers);
    StorageService.setActiveUser(newUser);

    return { success: true, user: newUser };
  },

  logout(): void {
    StorageService.setActiveUser(null);
  },

  switchRole(role: UserRole): User | null {
    if (role === 'guest') {
      StorageService.setActiveUser(null);
      return null;
    }
    const users = StorageService.getUsers();
    const user = users.find((u) => u.role === role) || users[0];
    StorageService.setActiveUser(user);
    return user;
  },

  updateProfile(userId: string, partial: Partial<User>): User | null {
    const users = StorageService.getUsers();
    const index = users.findIndex((u) => u.id === userId);
    if (index === -1) return null;

    const updated = { ...users[index], ...partial };
    users[index] = updated;
    StorageService.setUsers(users);

    const currentUser = StorageService.getActiveUser();
    if (currentUser && currentUser.id === userId) {
      StorageService.setActiveUser(updated);
    }
    return updated;
  },
};
