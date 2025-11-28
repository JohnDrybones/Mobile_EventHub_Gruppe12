import { ID, type AppwriteException, type Models } from "react-native-appwrite";
import { account } from ".";
import type { Failure, Success } from "./types";

// Utvidet brukertype som inkluderer rolleinformasjon
export type User = Models.User<Models.Preferences>
export type Session = Models.Session;

//  Konverterer Appwrite feilkoder til brukervennlige feilmeldinger
//  Standardiserer feilresponser for enklere håndtering i UI

const handleError = (error: AppwriteException): Failure => {
	console.warn("ErrorHandler:", error);
	switch (error.code) {
		case 401:
			return { success: false, error: "Invalid credentials" };
		case 404:
			return { success: false, error: "User not found" };
		case 409:
			return { success: false, error: "Email already in use" };
		default:
			return {
				success: false,
				error: error.message ?? "An unknown error occurred",
			};
	}
};

// Hjelpefunksjon for å håndtere vellykkede API-responser
// Pakker inn vellykket API-respons i et standardisert Success-objekt
const handleResponse = <T>(response: T): Success<T> => {
	console.log("ResponseHandler:", response);
	return { success: true, data: response };
};

// Logg inn bruker med e-post og passord
// Bruker Promise-kjeding (.then/.catch) for å håndtere resultat og feil
export const login = (email: string, password: string) =>
	account
		.createEmailPasswordSession({ email, password })
		.then(handleResponse)
		.catch(handleError);

// Registrer ny bruker
export const register = (email: string, password: string, name?: string) =>
	account
		.create(ID.unique(), email, password, name)
		.then(handleResponse)
		.catch(handleError);

// Logg ut bruker (avslutter gjeldende sesjon)
export const logout = () =>
	account.deleteSession({ sessionId: "current" }).then(handleResponse).catch(handleError);

// Hent brukerinformasjon for pålogget bruker
export const getUser = () =>
	account.get().then(handleResponse).catch(handleError);

// Hent brukerinformasjon med rolle for pålogget bruker
// Bruker Promise.all for å kjøre to API-kall parallelt (mer effektivt)
// og deretter kombinere resultatene


// Kombiner innlogging og henting av brukerinformasjon
// Eksempel på sammensatt operasjon med sekvensiell flyt
export const loginAndGetUser = async (email: string, password: string) => {
	const loginResult = await login(email, password);
	if (!loginResult.success) {
		return loginResult;
	}
	return getUser();
};

// Registrer ny bruker og logg inn i samme operasjon
// For å sette opp en ny bruker og umiddelbart logge inn
// Oppretter også en profil for den nye brukeren
export const signUpAndLogin = async (email: string, password: string, name?: string) => {
	const registerResult = await register(email, password, name);
	if (!registerResult.success) {
		return registerResult;
	}

	const result = await loginAndGetUser(email, password);

	if (!result.success) {
		return result;
	}

	return result;
};