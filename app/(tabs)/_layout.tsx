import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="event" color={color} />,
        }}
      />

      {/* 👇 This keeps /event routes in the app but hides them from the tab bar */}
      <Tabs.Screen
        name="event"
        options={{
          href: null, // hides this tab from the bottom bar
          headerShown: false, // 👈 enable headers for this route group
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sign-in"
        options={{
          title: 'Logg inn',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="login" color={color} />,
        }}
      />
    </Tabs>
  );
}
