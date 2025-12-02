import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { StatusBar } from 'expo-status-bar';

function RootLayoutNav() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Feature 3: Protected Routes using Stack.Protected */}

        {/* Public routes - shown when NOT logged in */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen
            name="login"
            options={{
              headerShown: true,
              title: 'Login',
            }}
          />
        </Stack.Protected>

        {/* Protected routes - shown when logged in */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="products/[id]"
            options={{
              headerShown: true,
              title: 'Product Details',
            }}
          />
          {/* Feature 4: Modal presentation */}
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Quick View',
            }}
          />
          {/* Feature 4: Bottom Sheet (formSheet) presentation */}
          <Stack.Screen
            name="cart-sheet"
            options={{
              presentation: 'formSheet',
              headerShown: true,
              title: 'Checkout',
            }}
          />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
