import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      const success = await login(username, password);
      if (!success) {
        Alert.alert('Login Failed', 'Invalid username or password');
      }
      // If successful, the protected route guard will redirect automatically
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillTestCredentials = () => {
    setUsername('mor_2314');
    setPassword('83r5^_');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Ionicons name="storefront" size={80} color="#007AFF" />
        <Text style={styles.title}>FakeStore</Text>
        <Text style={styles.subtitle}>Expo Router Demo</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </Pressable>
        </View>

        <Pressable
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>

        <Pressable style={styles.testButton} onPress={fillTestCredentials}>
          <Text style={styles.testButtonText}>Fill Test Credentials</Text>
        </Pressable>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Test Credentials (FakeStoreAPI):</Text>
        <Text style={styles.infoText}>Username: mor_2314</Text>
        <Text style={styles.infoText}>Password: 83r5^_</Text>
      </View>

      <View style={styles.routeInfo}>
        <Text style={styles.routeInfoTitle}>Expo Router Feature:</Text>
        <Text style={styles.routeInfoText}>
          This is a public route protected by Stack.Protected guard.
        </Text>
        <Text style={styles.routeInfoText}>
          When !isLoggedIn is true, this route is accessible.
        </Text>
        <Text style={styles.routeInfoText}>
          After login, you'll be redirected to tabs automatically.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#99c9ff',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  testButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E65100',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#F57C00',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  routeInfo: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
  },
  routeInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1565C0',
    marginBottom: 8,
  },
  routeInfoText: {
    fontSize: 13,
    color: '#1976D2',
    marginBottom: 4,
    lineHeight: 18,
  },
});
