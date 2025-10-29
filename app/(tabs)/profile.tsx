import { useAuth } from "@/context/AuthProvider";
import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully!");
      router.navigate({
      pathname: '/sign-in',
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handlePress = (title: string) => {
    console.log(`Action: ${title}`);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://picsum.photos/150' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.johnson@example.com</Text>

          <View style={styles.infoFieldsContainer}>
            <View style={styles.detailRow}>
              <MaterialIcons name="phone" size={18} color="#777" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>+1 (555) 123-4567</Text>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={18} color="#777" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailValue}>San Francisco, CA</Text>
            </View>

            <View style={styles.detailRow}>
              <MaterialIcons name="cake" size={18} color="#777" style={styles.detailIcon} />
              <Text style={styles.detailLabel}>Birthday:</Text>
              <Text style={styles.detailValue}>January 1, 1990</Text>
            </View>
          </View>

        </View>

        <View style={styles.optionsContainer}>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handlePress('Edit Profile')}
          >
            <MaterialIcons name="edit" size={24} color="#4285F4" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handlePress('Settings')}
          >

            <MaterialIcons name="settings" size={24} color="#4285F4" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handlePress('Help & Feedback')}
          >

            <MaterialIcons name="help-outline" size={24} color="#4285F4" />
            <Text style={styles.optionText}>Help & Feedback</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => handleLogout()}
          >
            <MaterialIcons name="logout" size={24} color="#4285F4" />
            <Text style={styles.optionText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#e0e0e0',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },

  infoFieldsContainer: {
    width: '80%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 15,
    color: '#777',
    fontWeight: '500',
    marginRight: 8,
  },
  detailValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '400',
    flexShrink: 1,
  },

  optionsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
    color: '#333',
  },
});