import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard';

const mockEvents = [
  { id: 1, title: "Tech Innovators Summit: Future of AI", date: "Oct 25, 2025", time: "10:00 AM", location: "Convention Center Hall A, 123 Tech Blvd", category: "Technology", imageUrl: "https://picsum.photos/id/1015/600/400" },
  { id: 2, title: "Jazz Night Live with the Blue Tones", date: "Nov 01, 2025", time: "7:30 PM", location: "The Blue Note Club, Downtown", category: "Music", imageUrl: "https://picsum.photos/id/1025/600/400" },
  { id: 3, title: "Local Farmers Market & Harvest Festival", date: "Oct 26, 2025", time: "9:00 AM", location: "Downtown Square, Central Park Area", category: "Community", imageUrl: "https://picsum.photos/id/1080/600/400" },
  { id: 4, title: "Startup Pitch Competition Q4 Finals", date: "Nov 15, 2025", time: "2:00 PM", location: "Innovation Hub, East Side Tower", category: "Business", imageUrl: "https://picsum.photos/id/1043/600/400" },
  { id: 5, title: "Winter Art Exhibition: Modern Sculptures", date: "Dec 05, 2025", time: "6:00 PM", location: "City Art Gallery, Main Exhibition Room", category: "Art", imageUrl: "https://picsum.photos/id/1060/600/400" },
];

export default function EventsScreen() {

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>EventHub</Text>
          <Text style={styles.subtitle}>Explore upcoming events near you</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.verticalList}>
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
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
  container: { flex: 1, backgroundColor: '#f9fafb' },
  safeContainer: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollViewContent: { paddingTop: 40, paddingBottom: 20 },
  header: { paddingHorizontal: 20, marginBottom: 20 },
  appTitle: { fontSize: 32, fontWeight: 'bold', color: '#1f2937' },
  subtitle: { fontSize: 18, color: '#6b7280', marginTop: 4 },
  sectionContainer: {},
  sectionTitle: { fontSize: 22, fontWeight: '600', color: '#1f2937', paddingHorizontal: 20, marginBottom: 10 },
  verticalList: { paddingHorizontal: 12 },
  placeholderContainer: { marginTop: 20, marginHorizontal: 20, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16 },
  placeholderText: { fontSize: 16, color: '#9ca3af' }
});
