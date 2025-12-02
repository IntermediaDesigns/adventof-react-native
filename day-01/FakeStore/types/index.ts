export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  name?: {
    firstname: string;
    lastname: string;
  };
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartItem[];
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}
