import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Product } from '../../types';

const API_BASE = 'https://fakestoreapi.com';

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Feature 1: This data could come from API routes in production
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLongPress = (product: Product) => {
    // Feature 4: Open modal for quick view
    router.push({
      pathname: '/modal',
      params: { productId: product.id.toString() },
    });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <Link
      href={`/products/${item.id}`}
      asChild
    >
      <Pressable
        style={styles.productCard}
        onLongPress={() => handleLongPress(item)}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            {item.rating && (
              <Text style={styles.rating}>
                ⭐ {item.rating.rate} ({item.rating.count})
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    </Link>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Tip: Long press a product for quick view (Modal demo)
      </Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  hint: {
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    fontSize: 13,
  },
  listContent: {
    padding: 16,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productCategory: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
});
