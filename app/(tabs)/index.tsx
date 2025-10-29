import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCard from '../../components/EventCard';

const mockEvents = [
  { id: 1, title: "Tech Innovators Summit: Future of AI", date: "Oct 25, 2025", time: "10:00 AM", location: "Convention Center Hall A, 123 Tech Blvd", category: "Technology", imageUrl: "https://picsum.photos/id/1015/600/400" },
  { id: 2, title: "Jazz Night Live with the Blue Tones", date: "Nov 01, 2025", time: "7:30 PM", location: "The Blue Note Club, Downtown", category: "Music", imageUrl: "https://picsum.photos/id/1025/600/400" },
  { id: 3, title: "Local Farmers Market & Harvest Festival", date: "Oct 26, 2025", time: "9:00 AM", location: "Downtown Square, Central Park Area", category: "Community", imageUrl: "https://picsum.photos/id/1080/600/400" },
];


const screenWidth = Dimensions.get('window').width;
const isWideScreen = screenWidth > 768;

export default function HomeScreen() {
  const listStyle = isWideScreen ? styles.horizontalList : styles.verticalList;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Velkommen til EventHub 🎉</Text>
          <Text style={styles.subtitle}>Oppdag og delta på lokale events</Text>
        </View>



        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Populære Events</Text>
          <View style={listStyle}>
            {mockEvents.slice(0, 3).map((event) => (
              <View key={event.id} style={isWideScreen ? styles.cardContainerWide : styles.cardContainerNarrow}>
                <EventCard event={event} />
              </View>
            ))}
          </View>
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
  contentContainer: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  sectionContainer: {
    //Mulig vi bruker den senere
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  verticalList: {
    paddingHorizontal: 12,
  },
  horizontalList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  cardContainerNarrow: {
    width: '100%',
  },
  cardContainerWide: {
    width: '32%',
  },
});