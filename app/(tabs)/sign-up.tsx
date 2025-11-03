import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [place, setPlace] = useState("");

  const handleRegister = () => {
    console.log({
      email,
      password,
      confirmPassword,
      age,
      gender,
      address,
      zipCode,
      place,
    });
    router.push("/");
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
        />

        {/* Passord */}
        <TextInput
          style={styles.input}
          placeholder="Passord"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Bekreft passord */}
        <TextInput
          style={styles.input}
          placeholder="Bekreft passord"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {/* Alder (Drop-down) */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Alder</Text>
          <Picker
            selectedValue={age}
            onValueChange={(value) => setAge(value)}
            style={styles.picker}
          >
            <Picker.Item label="Velg alder" value="" />
            {Array.from({ length: 83 }, (_, i) => i + 18).map((num) => (
              <Picker.Item key={num} label={num.toString()} value={num.toString()} />
            ))}
          </Picker>
        </View>

        {/* Kjønn (Drop-down) */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Kjønn</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
            style={styles.picker}
          >
            <Picker.Item label="Velg kjønn" value="" />
            <Picker.Item label="Mann" value="mann" />
            <Picker.Item label="Kvinne" value="kvinne" />
            <Picker.Item label="Vil ikke oppgi" value="ukjent" />
          </Picker>
        </View>

        {/* Adresse */}
        <TextInput
          style={styles.input}
          placeholder="Adresse"
          value={address}
          onChangeText={setAddress}
        />

        {/* Postnummer */}
        <TextInput
          style={styles.input}
          placeholder="Postnummer"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
        />

        {/* Sted */}
        <TextInput
          style={styles.input}
          placeholder="Sted"
          value={place}
          onChangeText={setPlace}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrer deg</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
        <Text style={styles.footerText}>Har du allerede en konto? </Text>
            <TouchableOpacity onPress={() => router.replace("/sign-up")}>
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
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "black",
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginLeft: 12,
    marginTop: 6,
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
