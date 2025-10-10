import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// Import the card component
import EventCard from './../../components/Eventcard';

// --- Mock Data (Moved here for easy access in the screen) ---
const mockEvents = [
  { id: 1, title: "Tech Innovators Summit: Future of AI", date: "Oct 25, 2025", time: "10:00 AM", location: "Convention Center Hall A, 123 Tech Blvd", category: "Technology", imageUrl: "https://placehold.co/600x400/3b82f6/ffffff?text=Tech+Summit" },
  { id: 2, title: "Jazz Night Live with the Blue Tones", date: "Nov 01, 2025", time: "7:30 PM", location: "The Blue Note Club, Downtown", category: "Music", imageUrl: "https://placehold.co/600x400/ef4444/ffffff?text=Jazz+Live" },
  { id: 3, title: "Local Farmers Market & Harvest Festival", date: "Oct 26, 2025", time: "9:00 AM", location: "Downtown Square, Central Park Area", category: "Community", imageUrl: "https://placehold.co/600x400/22c55e/ffffff?text=Market+Day" },
  { id: 4, title: "Startup Pitch Competition Q4 Finals", date: "Nov 15, 2025", time: "2:00 PM", location: "Innovation Hub, East Side Tower", category: "Business", imageUrl: "https://placehold.co/600x400/f59e0b/ffffff?text=Startup+Pitch" },
  { id: 5, title: "Winter Art Exhibition: Modern Sculptures", date: "Dec 05, 2025", time: "6:00 PM", location: "City Art Gallery, Main Exhibition Room", category: "Art", imageUrl: "https://placehold.co/600x400/8b5cf6/ffffff?text=Art+Show" },
];

export default function EventsScreen() {
  return (
    // Change the root View to a ScrollView to enable vertical scrolling for the whole page content
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>EventHub</Text>
        <Text style={styles.subtitle}>Explore upcoming events near you</Text>
      </View>

      {/* Events List Section (Now vertically oriented and full width) */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        
        {/*
          Removed the inner horizontal ScrollView. 
          The cards are now mapped directly, creating a vertical list.
          The EventCard component should now be full-width (see EventCard.js update below).
        */}
        <View style={styles.verticalList}>
          {mockEvents.map((event) => (
            // The card will use the available horizontal space (most of the page)
            <EventCard 
              key={event.id} 
              event={event} 
            />
          ))}
        </View>
      </View>

      {/* Placeholder for other content */}
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Your other screen content goes here...</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // We use padding on the ScrollView itself, so flex: 1 is needed on ScrollView
    flex: 1, 
    backgroundColor: '#f9fafb', // light gray background
    // REMOVED: justifyContent: 'center' was moved to scrollViewContent
  },
  scrollViewContent: {
    paddingTop: 40, // Space for status bar on iOS/Android
    paddingBottom: 20, // Padding at the bottom of the scrollable area
    justifyContent: 'center', // ADDED: Correctly applies centering to the content
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
    // Container for the list, no need for large margins here
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  verticalList: {
    // Adds small horizontal padding/margin around the cards
    paddingHorizontal: 12, 
  },
  placeholderContainer: {
    // Using marginTop instead of margin for better vertical flow
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