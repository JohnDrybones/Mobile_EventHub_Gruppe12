import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til EventHub 🎉</Text>
      <Text style={styles.subtitle}>Oppdag og delta på lokale events</Text>
      <Button title="Gå videre" onPress={() => alert("Navigasjon kommer senere")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
