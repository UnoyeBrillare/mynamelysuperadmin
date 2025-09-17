export interface AdminUser {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: string;
  permissions: any;
  isSuperAdmin: boolean;
  isDeleted: boolean;
  isPasswordChanged: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
}

export interface AuthActions {
  login: (user: AdminUser, token: string) => void;
  logout: () => void;
  updateUser: (user: AdminUser) => void;
  setAuth: (isAuthenticated: boolean) => void;
  isTokenValid: () => boolean;
}
