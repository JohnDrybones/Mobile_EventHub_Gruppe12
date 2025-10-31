import { useAuth } from "@/context/AuthProvider";
import { attendEvent, fetchEventById, isAttending, unAttendEvent } from "@/providers/appwrite/database";
import { Event } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventDetailScreen() {
    const { id } = useLocalSearchParams();
    const eventId = id.toLocaleString();
    const [userId, setUserId] = useState<string>("");
    const [event, setEvent] = useState<Event | null>(null);
    const [attending, setAttending] = useState<Boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.$id) {
            setUserId(user.$id);
        }
    }, []);

    useEffect(() => {
        const loadEvent = async () => {
            try {
                const fetchedEvent = await fetchEventById(eventId);
                setEvent(fetchedEvent);
            } catch (err) {
                const errorMessage = (err as { message?: string }).message || "An unknown error occurred."
            }
        };
        loadEvent();
    }, [id]);

     useEffect(() => {
              const loadAttending = async () => {
                  try {
                      const attendingFromDB = await isAttending(userId,eventId);
                      setAttending(attendingFromDB);
                      console.log("Attending", attendingFromDB)
                  } catch (err) {
                      const errorMessage = (err as { message?: string }).message || "An unknown error occurred."
                  }
              };
              loadAttending();
          }, [attending]);

    if (!event) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Event not found.</Text>
            </View>
        );
    }

    const handleAttend = async (eventId: string) => {
        try {
            if (userId !== "") {
                const result = await attendEvent(userId, eventId);
                setAttending(true);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const handleUnAttend = async (eventId: string) => {
        try {
            if (userId !== "") {
                const result = await unAttendEvent(userId, eventId);
                setAttending(false);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
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
                            {event.description}
                        </Text>

                        {attending ?
                            <Button
                                title="Unregister"
                                onPress={() => {
                                    handleUnAttend(eventId)
                                }}
                            /> :

                            <Button
                                title="Register"
                                onPress={() => {
                                    handleAttend(eventId)
                                }}
                            />
                        }

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    safeContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 6,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
        marginLeft: 8,
    },
    scrollContent: {
        minHeight: screenHeight,
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
