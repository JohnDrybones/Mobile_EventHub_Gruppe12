import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const { register, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [place, setPlace] = useState("");

  const [ageModalVisible, setAgeModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  const ages = Array.from({ length: 83 }, (_, i) => (i + 18).toString());
  const genders = ["Mann", "Kvinne", "Vil ikke oppgi"];

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
        Alert.alert("Feil", "Vennligst fyll ut e-post og passord");
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert("Feil", "Passordene er ikke like");
        return;
    }

    try {
        await register(email, password);
        
        router.replace("/profile");
    } catch (error) {
        console.error(error);
        Alert.alert("Feil", "Kunne ikke registrere bruker. Sjekk at e-posten er gyldig.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.title}>Opprett konto</Text>
        <Text style={styles.subtitle}>Registrer deg for å bruke EventHub</Text>

        {/* E-post */}
        <TextInput
          style={styles.input}
          placeholder="E-post"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="black"
        />

        {/* Passord */}
        <TextInput
          style={styles.input}
          placeholder="Passord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="black"
        />

        {/* Bekreft passord */}
        <TextInput
          style={styles.input}
          placeholder="Bekreft passord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="black"
        />

        {/* Alder dropdown */}
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setAgeModalVisible(true)}
        >
          <Text style={styles.dropdownLabel}>Alder</Text>
          <Text style={styles.dropdownText}>
            {age ? `${age} år` : "Velg alder"}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={ageModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setAgeModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Velg alder</Text>
              <FlatList
                data={ages}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setAge(item);
                      setAgeModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Kjønn dropdown */}
        <TouchableOpacity
          style={styles.dropdownContainer}
          onPress={() => setGenderModalVisible(true)}
        >
          <Text style={styles.dropdownLabel}>Kjønn</Text>
          <Text style={styles.dropdownText}>
            {gender ? gender : "Velg kjønn"}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={genderModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Velg kjønn</Text>
              {genders.map((g) => (
                <TouchableOpacity
                  key={g}
                  style={styles.modalItem}
                  onPress={() => {
                    setGender(g);
                    setGenderModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* Adresse */}
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          value={address}
          onChangeText={setAddress}
          placeholderTextColor="black"
        />

        {/* Postnummer */}
        <TextInput
          style={styles.input}
          placeholder="Postnummer"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
          placeholderTextColor="black"
        />

        {/* Sted */}
        <TextInput
          style={styles.input}
          placeholder="Sted"
          value={place}
          onChangeText={setPlace}
          placeholderTextColor="black"
        />

        <TouchableOpacity 
            style={[styles.button, isLoading && { opacity: 0.7 }]} 
            onPress={handleRegister}
            disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Registrerer..." : "Registrer deg"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Har du allerede en konto? </Text>
          <TouchableOpacity onPress={() => router.replace("/sign-in")}>
            <Text style={styles.link}>Logg inn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: "#d1d5db",
    borderWidth: 1,
    marginBottom: 16,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "black",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 15,
    marginBottom: 16,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: "#111827",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    maxHeight: "70%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  modalItemText: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
  },
  link: {
    fontSize: 14,
    color: "#4f46e5",
    fontWeight: "600",
  },
});
