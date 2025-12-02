📅
Day 1
 
💡
tip
5 Essential Features of Expo Router
Discover the hidden power of Expo Router and how it can help you build better React Native apps.

Expo
Navigation
Welcome to Day 1 of the React Native Advent Calendar!
Today we’re kicking things off by diving into Expo Router, the file-based routing solution that’s revolutionizing how we build React Native apps. If you’re still using the traditional navigation setup, these 5 features will show you why Expo Router might be the upgrade you’ve been waiting for - and we’ll have 5 more epic tips for you in the upcoming days!

1. File-Based Routing
Say goodbye to manually configuring navigation stacks! Expo Router uses your file structure to automatically generate routes - basically like Next or SvelteKit do for web apps.

app/home.tsx → Creates route: /home
app/profile/settings.tsx → Creates route: /profile/settings
app/index.tsx → Creates route: /
Why it matters: Every page automatically gets a deep-linkable URL that works on web, iOS, and Android. No more maintaining separate navigation configs!

It also simplifies creating a Tab Bar Navigation or Side Menu Navigation, and finding the right page in your IDE becomes super easy, just like accessing the params:

app/products/[id].tsx

import { useLocalSearchParams } from 'expo-router';

export default function ProductDetails() {
	const { id } = useLocalSearchParams();

	return (
		<View>
			<Text>Product ID: {id}</Text>
		</View>
	);
}
Benefits:

Universal deep-linking out of the box
Clear project organization
Built on React Navigation (your existing knowledge transfers!)
📖 Read the full documentation

Want to master Expo Router? Check out my complete Expo Router course where I build a full app from scratch.

2. API Routes
I can’t live without API routes in my apps - they’re a game-changer for building full-stack React Native apps!

API Routes live right next to your pages, so you can easily access them from your components.

app/api/users+api.ts

export function GET(request: Request) {
	return Response.json({
		users: ['Alice', 'Bob', 'Charlie']
	});
}

export async function POST(request: Request) {
	const body = await request.json();
	// Process user creation
	return Response.json(
		{
			success: true,
			user: body
		},
		{ status: 201 }
	);
}
Real-world use cases:

Keep API keys secure on the server
Handle OAuth token exchanges
Process payments server-side
Implement business logic that shouldn’t run on the client
If you haven’t used them before, give them a try - they’re incredibly powerful and can save you a lot of time!

Requirements:

Configure "output": "server" in your app.json
Deploy to EAS or any hosting provider with Node.js support
📖 Read the full documentation

🎥 Video: Build AI Powered Mobile Apps FASTER with Expo API Routes & Cursor

3. Protected Routes
Since Expo SDK 53 you can now protect routes using the new Stack.Protected component, which greatly simplifies authentication and authorization in your app.

You simply wrap your routes in a Stack.Protected component and pass a guard function that returns a boolean.

app/_layout.tsx

import { Stack } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function AppLayout() {
	const { isLoggedIn } = useAuth();

	return (
		<Stack>
			{/* Public routes */}
			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen name="login" />
				<Stack.Screen name="signup" />
			</Stack.Protected>

			{/* Protected routes */}
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="dashboard" />
				<Stack.Screen name="profile" />
				<Stack.Screen name="settings" />
			</Stack.Protected>
		</Stack>
	);
}
How it works:

When the guard evaluates to false, users get redirected to the first available screen
Works with Stack.Protected, Tabs.Protected, and Drawer.Protected
Automatic redirects when protection status changes
Important: This is client-side protection only. Always validate permissions on your server!

📖 Read the full documentation

🔐 Deep Dive: React Native Authentication with Expo Router v5 - A complete guide to implement authentication in your Expo Router app.

4. Bottom Sheets & Modals
The days when displaying a native bottom sheet was challenging are over - Expo Router now has a built-in component for that!

You can now create beautiful modals with a single prop. No more juggling React Native’s Modal component or external libraries.

Simply use the Stack.Screen component and set the presentation prop to modal or formSheet for a native bottom sheet.

app/_layout.tsx

import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen
				name="modal"
				options={{
					presentation: 'modal'
				}}
			/>
			<Stack.Screen
				name="sheet"
				options={{
					presentation: 'formSheet' // bottom sheet!
				}}
			/>
		</Stack>
	);
}
Besides that you get many more options to present pages in a modal way, like modal, fullScreenModal or transparentModal.

All of this from just changing the presentation prop of the Stack.Screen component!

📖 Read the full documentation

5. Native Tabs
Did you know that you are most likely using JS based tabs in your app?

But there’s actually a better way to get platform-specific tab bars are truly native!

Why choose Native Tabs:

✅ Automatic platform styling (iOS Safari-style, Android Material Design)
✅ Built-in behaviors (pop-to-top, scroll-to-top on iOS)
✅ Better performance than custom JavaScript tabs
✅ iOS 26 features (search tabs, minimize-on-scroll)
You can actually implement this by simply using the NativeTabs component from Expo Router.

app/(tabs)/_layout.tsx

import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name="index">
				<Label>Home</Label>
				<Icon sf="house.fill" drawable="custom_android_drawable" />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name="settings">
				<Icon sf="gear" drawable="custom_settings_drawable" />
				<Label>Settings</Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
Trade-offs:

Android limits to 5 tabs maximum
Cannot nest native tabs within other native tabs
Less customization than fully custom solutions
📖 Read the full documentation

Wrapping Up
That’s it for our first day of the React Native Advent Calendar!

These 5 core features of Expo Router show how modern React Native development can be both powerful and developer-friendly. From file-based routing to native tabs, you’re now equipped with the fundamentals to build better navigation experiences.

In the upcoming days we’ll explore 5 more advanced Expo Router features including React Server Components, Headless UI, Static Site Generation, and more!

Which feature are you most excited to try? Let me know on Twitter!

Tomorrow we’ll dive into Day 2’s topic - see you then! 🎄

