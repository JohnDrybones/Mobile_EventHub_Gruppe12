import { APPWRITE_KEYS } from "@/constants/keys";
import { Event } from "@/types";
import { databases } from ".";

const { DATABASE_ID } =
	APPWRITE_KEYS;

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",  
      'events',          
    );

    return response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title,
      category: doc.category,
      imageUrl: doc.imageUrl,
      description: doc.description,
      date: doc.date,
      time: doc.time,
      location: doc.location,
    })) as Event[];
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Could not fetch events');
  }
};

export const fetchEventById = async (eventId: string): Promise<Event> => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID || "DATABASE_ID",  
      'events',
       eventId          
    );

    const event: Event = {
      id: response.$id,       
      title: response.title,
      category: response.category,
      imageUrl: response.imageUrl,
      description: response.description,
      date: response.date,
      time: response.time,
      location: response.location,
    };

    return event; 
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw new Error('Could not fetch the event');
  }
};