import { useLocalSearchParams } from "expo-router";
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const mockEvents = [
  { id: 1, title: "Tech Innovators Summit: Future of AI", date: "Oct 25, 2025", time: "10:00 AM", location: "Convention Center Hall A, 123 Tech Blvd", category: "Technology", imageUrl: "https://picsum.photos/id/1015/600/400" },
  { id: 2, title: "Jazz Night Live with the Blue Tones", date: "Nov 01, 2025", time: "7:30 PM", location: "The Blue Note Club, Downtown", category: "Music", imageUrl: "https://picsum.photos/id/1025/600/400" },
  { id: 3, title: "Local Farmers Market & Harvest Festival", date: "Oct 26, 2025", time: "9:00 AM", location: "Downtown Square, Central Park Area", category: "Community", imageUrl: "https://picsum.photos/id/1080/600/400" },
];

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const event = mockEvents.find(e => e.id.toString() === id);

  if (!event) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Event not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        
        <View style={styles.detailsBox}>
          <Text style={styles.title}>{event.title}</Text>

          <View style={styles.infoGroup}>
            <Text style={styles.detailItem}>📅 {event.date}</Text>
            <Text style={styles.detailItem}>⏰ {event.time}</Text>
            <Text style={styles.detailItem}>📍 {event.location}</Text>
            <Text style={styles.detailItem}>🏷️ {event.category}</Text>
          </View>

          <Text style={styles.description}>
            This is where detailed info about the event would go.
            You can add things like schedule, price, or host details.
          </Text>

          <Button title="Join Event" onPress={() => alert("You joined the event!")} />
        </View>
      </ScrollView>
    </View>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    minHeight: screenHeight,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  detailsBox: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  infoGroup: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
  detailItem: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#4b5563",
    marginVertical: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
