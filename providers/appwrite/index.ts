// providers/appwrite/index.ts

import { APPWRITE_KEYS } from "@/constants/keys";
import { Account, Client, Databases, Storage } from "react-native-appwrite";

const API_URL = APPWRITE_KEYS.API_URL || ""
const PROJECT_ID = APPWRITE_KEYS.PROJECT_ID || ""
const DEV_KEY = APPWRITE_KEYS.DEV_KEY || ""

// Sette opp Appwrite-klienten
// og kontoen for autentisering
export const client = new Client();

client
	.setEndpoint(API_URL)
	.setProject(PROJECT_ID)
	.setDevKey(DEV_KEY);

// Sette opp Appwrite-konto api
export const account = new Account(client);
export const databases = new Databases(client);
export const storages = new Storage(client);