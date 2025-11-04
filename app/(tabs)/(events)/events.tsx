import EventCard from '@/components/Eventcard';
import { fetchEvents } from '@/providers/appwrite/database';
import { Event } from "@/types";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

    useEffect(() => {
      const loadEvents = async () => {
        try {
          const fetchedEvents = await fetchEvents();
          setAllEvents(fetchedEvents);
          setFilteredEvents(fetchedEvents);
        } catch (err) {
          const errorMessage = (err as { message?: string }).message || "Error occurred.";
        }      
      };
  
      loadEvents();
    }, []);
    
    useEffect(() => {
      if (searchTerm === "") {
        setFilteredEvents(allEvents);
       } else {
         const newFilteredEvents = allEvents.filter(event =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEvents(newFilteredEvents);
      }
    }, [searchTerm, allEvents]);


  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>EventHub</Text>
          <Text style={styles.subtitle}>Explore upcoming events near you</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
          style={styles.searchInput}
          placeholder="Søk etter events..."
          placeholderTextColor="#6b7280"
          value={searchTerm}
          onChangeText={setSearchTerm}
         />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.verticalList}>
             {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
            ) : (
            <Text style={styles.placeholderText}>Event not found.</Text>
            )}
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

  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: 'black',
  },

  sectionContainer: {},
  sectionTitle: { fontSize: 22, fontWeight: '600', color: '#1f2937', paddingHorizontal: 20, marginBottom: 10 },
  verticalList: { paddingHorizontal: 12 },
  placeholderContainer: { marginTop: 20, marginHorizontal: 20, padding: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16 },
  placeholderText: { fontSize: 16, color: '#9ca3af' }
});
