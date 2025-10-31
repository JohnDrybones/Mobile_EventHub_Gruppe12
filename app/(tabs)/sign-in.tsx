import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn } = useAuth();
  const handleSignIn = async () => {
    try {
      await login(email, password);
      console.log("Logged in successfully!");
      router.replace("/profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logg inn</Text>
      <Text style={styles.subtitle}>Velkommen tilbake!</Text>

      <TextInput
        style={styles.input}
        placeholder="E-post"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Passord"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Logg inn</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/sign-up")}>
          <Text style={styles.link}>Registrer deg</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderColor: '#d1d5db',
    borderWidth: 1,
    marginBottom: 16,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '600',
  },
});
