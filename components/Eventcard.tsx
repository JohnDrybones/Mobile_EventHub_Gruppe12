import { Event as EventType } from '@/types';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Technology': return { background: '#e0f2fe', text: '#0284c7' };
    case 'Music': return { background: '#fee2e2', text: '#ef4444' };
    case 'Community': return { background: '#dcfce7', text: '#16a34a' };
    case 'Business': return { background: '#fef3c7', text: '#f59e0b' };
    case 'Art': return { background: '#f3e8ff', text: '#a855f7' };
    default: return { background: '#f3f4f6', text: '#4b5563' };
  }
};

const EventCard = ({ event }: { event: EventType }) => {
  const colors = getCategoryColor(event.category);
  const router = useRouter();

  const handleViewDetails = () => {
    router.push({
      pathname: '../(tabs)/event/[id]',
      params: { id: event.id },
    });
  };

  const imageSource = { uri: event.imageUrl };

  return (
    <View style={styles.card}>
      <Image
        source={imageSource}
        style={styles.image}
        onError={(e) => console.log('Image failed to load:', e.nativeEvent.error)}
      />

      <View style={styles.contentContainer}>
        <View style={[styles.badge, { backgroundColor: colors.background }]}>
          <Text style={[styles.badgeText, { color: colors.text }]}>
            {event.category}
          </Text>
        </View>

        <Text style={styles.title} numberOfLines={2}>
          {event.title}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.icon}>{"\u{1F4C5}"}</Text>
            <Text style={styles.detailText}>{event.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.icon}>{"\u{23F0}"}</Text>
            <Text style={styles.detailText}>{event.time}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.icon}>{"\u{1F4CD}"}</Text>
            <Text style={styles.detailText} numberOfLines={1}>{event.location}</Text>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={handleViewDetails}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
  },
  image: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
    gap: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
    color: '#4f46e5',
  },
  detailText: {
    fontSize: 15,
    color: '#4b5563',
    flexShrink: 1,
  },
  button: {
    width: '100%',
    marginTop: 8,
    paddingVertical: 12,
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventCard;
