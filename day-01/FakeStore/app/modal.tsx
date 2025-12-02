import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Product } from '../types';
import { Ionicons } from '@expo/vector-icons';

const API_BASE = 'https://fakestoreapi.com';

// Feature 4: Modal presentation with presentation: 'modal'
export default function ProductModal() {
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const { addToCart, cart } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_BASE}/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id);
    }
  };

  const handleViewDetails = () => {
    router.dismiss();
    router.push(`/products/${productId}`);
  };

  const cartItem = cart.find((item) => item.productId === Number(productId));
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
          title: 'Quick View',
          headerRight: () => (
            <Pressable onPress={() => router.dismiss()}>
              <Ionicons name="close-circle" size={28} color="#007AFF" />
            </Pressable>
          ),
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

          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>{product.rating.rate}</Text>
              </View>
            )}
          </View>

          <Text style={styles.description} numberOfLines={3}>
            {product.description}
          </Text>

          <View style={styles.modalInfo}>
            <Text style={styles.modalInfoTitle}>Expo Router Feature:</Text>
            <Text style={styles.modalInfoText}>
              presentation: 'modal'
            </Text>
            <Text style={styles.modalInfoText}>
              Opens as a native iOS/Android modal
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <Pressable style={styles.detailsButton} onPress={handleViewDetails}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </Pressable>
          <Pressable style={styles.addButton} onPress={handleAddToCart}>
            <Ionicons name="cart" size={20} color="white" />
            <Text style={styles.addButtonText}>
              {quantityInCart > 0 ? `Add More (${quantityInCart})` : 'Add to Cart'}
            </Text>
          </Pressable>
        </View>
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
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
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
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  modalInfo: {
    backgroundColor: '#F3E5F5',
    padding: 16,
    borderRadius: 12,
  },
  modalInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  modalInfoText: {
    fontSize: 13,
    color: '#9C27B0',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  detailsButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});
