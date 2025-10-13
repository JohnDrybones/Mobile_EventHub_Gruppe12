import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    Alert.alert('Logger inn', `E-post: ${email}`);
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
      <Text style={styles.footerText}>Har du ikke en konto? </Text>
      {/* Vi bruker en vanlig TouchableOpacity som en plassholder */}
      <TouchableOpacity onPress={() => Alert.alert('Kommer senere', 'Registreringsside er ikke laget ennå.')}>
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
      footerText: {
        fontSize: 14,
        color: '#6b7280',
      },
      link: {
        fontSize: 14,
        color: '#4f46e5',
        fontWeight: '600',
      },
});