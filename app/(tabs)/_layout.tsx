import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthProvider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLoggedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(events)"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="event" color={color} />,
        }}
      />

      <Tabs.Screen
        name="(myevents)"
        options={{
          title: 'My Events',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="event" color={color} />,
          href: isLoggedIn ? undefined : null, 
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
          href: isLoggedIn ? undefined : null, 
        }}
      />

      <Tabs.Screen
        name="sign-in"
        options={{
          title: 'Logg inn',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="login" color={color} />,
          href: isLoggedIn ? null : undefined, 
        }}
      />
    </Tabs>
  );
}
