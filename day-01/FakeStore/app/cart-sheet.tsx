import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Product } from '../types';
import { Ionicons } from '@expo/vector-icons';

const API_BASE = 'https://fakestoreapi.com';

// Feature 4: Bottom Sheet with presentation: 'formSheet'
export default function CartSheetScreen() {
  const { cart, clearCart, getCartTotal } = useAuth();
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

  const cartTotal = getCartTotal(products);
  const shipping = 5.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      `Your order of $${grandTotal.toFixed(2)} has been placed successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.dismiss();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Checkout',
          headerRight: () => (
            <Pressable onPress={() => router.dismiss()}>
              <Text style={styles.doneButton}>Done</Text>
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.sheetInfo}>
          <Ionicons name="information-circle" size={20} color="#7B1FA2" />
          <Text style={styles.sheetInfoText}>
            This is a native bottom sheet using presentation: 'formSheet'
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <View key={item.productId} style={styles.orderItem}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.itemImage}
                  resizeMode="contain"
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                </View>
                <Text style={styles.itemTotal}>
                  ${(product.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressCard}>
            <Ionicons name="location" size={24} color="#007AFF" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressName}>John Doe</Text>
              <Text style={styles.addressText}>123 Main Street</Text>
              <Text style={styles.addressText}>San Francisco, CA 94102</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentCard}>
            <Ionicons name="card" size={24} color="#007AFF" />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentType}>Credit Card</Text>
              <Text style={styles.paymentDetails}>**** **** **** 4242</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${cartTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text style={styles.priceValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax (8%)</Text>
            <Text style={styles.priceValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.routeInfo}>
          <Text style={styles.routeInfoTitle}>Expo Router Feature:</Text>
          <Text style={styles.routeInfoText}>presentation: 'formSheet'</Text>
          <Text style={styles.routeInfoText}>
            Native iOS bottom sheet behavior
          </Text>
          <Text style={styles.routeInfoText}>
            Drag to dismiss, respects safe areas
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>
            Place Order - ${grandTotal.toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  doneButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sheetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    padding: 12,
    margin: 16,
    marginBottom: 8,
    borderRadius: 12,
    gap: 8,
  },
  sheetInfoText: {
    flex: 1,
    fontSize: 13,
    color: '#7B1FA2',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 50,
    height: 50,
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
  itemQuantity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentDetails: {
    fontSize: 14,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
  },
  routeInfo: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  routeInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  routeInfoText: {
    fontSize: 13,
    color: '#388E3C',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  orderButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
