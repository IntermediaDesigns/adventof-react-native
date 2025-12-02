import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout, cart } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#007AFF" />
        </View>
        {user && (
          <>
            <Text style={styles.userName}>
              {user.name
                ? `${user.name.firstname} ${user.name.lastname}`
                : user.username}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalItems}</Text>
          <Text style={styles.statLabel}>Items in Cart</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{cart.length}</Text>
          <Text style={styles.statLabel}>Unique Products</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <Pressable style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <Ionicons name="cart-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Order History</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </Pressable>

        <Pressable style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#333" />
          <Text style={styles.menuItemText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expo Router Demo</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            This profile is protected by Stack.Protected guard. You can only
            access it when logged in.
          </Text>
          <Text style={styles.infoText}>
            Logging out will redirect you to the login screen automatically.
          </Text>
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textTransform: 'capitalize',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 2,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    marginBottom: 12,
    marginLeft: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 8,
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
