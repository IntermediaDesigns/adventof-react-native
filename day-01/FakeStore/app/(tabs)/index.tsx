import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Product } from '../../types';

const API_BASE = 'https://fakestoreapi.com';

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/products?limit=4`);
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Welcome to FakeStore</Text>
        <Text style={styles.heroSubtitle}>
          Expo Router Day 1 Demo
        </Text>
        <Text style={styles.features}>
          Demonstrating: File-based routing, Protected routes, Modals & Tabs
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <View style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                asChild
              >
                <Pressable style={styles.productCard}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.title}
                  </Text>
                  <Text style={styles.productPrice}>
                    ${product.price.toFixed(2)}
                  </Text>
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Link href="/products" asChild>
          <Pressable style={styles.browseButton}>
            <Text style={styles.browseButtonText}>Browse All Products</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Expo Router Features Used:</Text>
        <Text style={styles.infoItem}>1. File-based routing (app/ directory)</Text>
        <Text style={styles.infoItem}>2. Dynamic routes (/products/[id])</Text>
        <Text style={styles.infoItem}>3. Protected routes (Stack.Protected)</Text>
        <Text style={styles.infoItem}>4. Modals & Bottom Sheets</Text>
        <Text style={styles.infoItem}>5. Tab Navigation</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hero: {
    backgroundColor: '#007AFF',
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
  },
  features: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
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
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    padding: 16,
    marginBottom: 32,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  infoItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    paddingLeft: 8,
  },
});
