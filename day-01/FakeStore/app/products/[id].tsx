import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Product } from '../../types';
import { Ionicons } from '@expo/vector-icons';

const API_BASE = 'https://fakestoreapi.com';

// Feature 1: Dynamic route using [id] parameter
export default function ProductDetailScreen() {
  // Feature 1: useLocalSearchParams to get the dynamic id
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart, cart } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_BASE}/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const cartItem = cart.find((item) => item.productId === Number(id));
  const quantityInCart = cartItem?.quantity || 0;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: product.title.substring(0, 20) + '...',
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.priceRatingRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>
                  {product.rating.rate} ({product.rating.count} reviews)
                </Text>
              </View>
            )}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.routeInfo}>
            <Text style={styles.routeInfoTitle}>Expo Router Feature:</Text>
            <Text style={styles.routeInfoText}>
              This page uses dynamic routing with [id].tsx
            </Text>
            <Text style={styles.routeInfoText}>
              Route: /products/{id}
            </Text>
            <Text style={styles.routeInfoText}>
              Accessed via: useLocalSearchParams()
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {quantityInCart > 0 && (
          <Text style={styles.cartStatus}>
            {quantityInCart} in cart
          </Text>
        )}
        <Pressable
          style={styles.addToCartButton}
          onPress={() => addToCart(product.id)}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    backgroundColor: '#f9f9f9',
    padding: 24,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#007AFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  routeInfo: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartStatus: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
