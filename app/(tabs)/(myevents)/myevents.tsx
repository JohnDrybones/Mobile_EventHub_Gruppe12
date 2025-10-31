import EventCard from '@/components/EventCard';
import { getCurrentUserId, getMyAttendedEvents } from '@/providers/appwrite/database';
import { Event } from "@/types";
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyEventsScreen() {
const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const id = await getCurrentUserId();
        
        if (!id) {
          Alert.alert("Not Logged In", "Please log in to view your events.");
          return;
        }

        const fetchedEvents = await getMyAttendedEvents(id);
        setEvents(fetchedEvents);
      } catch (err) {
        const errorMessage = (err as Error).message || "Failed to load events.";
        console.error("Error loading events:", err);
        Alert.alert("Error", errorMessage);
      } finally {
        setLoading(false);
      }
      
    };

    loadEvents();
    
  }, []); // Run once on mount
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.header}>
          <Text style={styles.appTitle}>My events</Text>
          <Text style={styles.subtitle}>Explore your events</Text>
        </View>


        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.verticalList}>
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </View>
        </View>

        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Your other screen content goes here...</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#f9fafb',
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionContainer: {

  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  verticalList: {

    paddingHorizontal: 12,
  },
  placeholderContainer: {

    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9ca3af',
  }
});