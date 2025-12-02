import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Product } from '../../types';
import { Ionicons } from '@expo/vector-icons';

const API_BASE = 'https://fakestoreapi.com';

export default function CartScreen() {
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (productId: number): Product | undefined => {
    return products.find((p) => p.id === productId);
  };

  const handleCheckout = () => {
    // Feature 4: Open bottom sheet for checkout
    router.push('/cart-sheet');
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  const cartTotal = getCartTotal(products);

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Add some products to get started!
        </Text>
        <Pressable
          style={styles.shopButton}
          onPress={() => router.push('/products')}
        >
          <Text style={styles.shopButtonText}>Browse Products</Text>
        </Pressable>
      </View>
    );
  }

  const renderCartItem = ({ item }: { item: { productId: number; quantity: number } }) => {
    const product = getProductById(item.productId);
    if (!product) return null;

    return (
      <View style={styles.cartItem}>
        <Image
          source={{ uri: product.image }}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.itemPrice}>${product.price.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityControls}>
          <Pressable
            style={styles.quantityButton}
            onPress={() => removeFromCart(item.productId)}
          >
            <Ionicons name="remove" size={20} color="#007AFF" />
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            style={styles.quantityButton}
            onPress={() => addToCart(item.productId)}
          >
            <Ionicons name="add" size={20} color="#007AFF" />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
        </Text>
        <Pressable onPress={handleClearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </Pressable>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.productId.toString()}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </Pressable>
        <Text style={styles.sheetHint}>
          Opens a bottom sheet (formSheet demo)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f5f5f5',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  shopButton: {
    marginTop: 24,
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clearText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  sheetHint: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
    color: '#888',
  },
});
