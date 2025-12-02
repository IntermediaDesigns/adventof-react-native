import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState, CartItem, Product } from '../types';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: (products: Product[]) => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = 'https://fakestoreapi.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    token: null,
  });
  const [cart, setCart] = useState<CartItem[]>([]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Call FakeStoreAPI login endpoint
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();

      // Fetch user data (using user 1 for demo)
      const userResponse = await fetch(`${API_BASE}/users/1`);
      const userData: User = await userResponse.json();

      setAuthState({
        isLoggedIn: true,
        user: userData,
        token: data.token,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isLoggedIn: false,
      user: null,
      token: null,
    });
    setCart([]);
  };

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter((item) => item.productId !== productId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = (products: Product[]): number => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
