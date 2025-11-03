import { APPWRITE_KEYS } from "@/constants/keys";
import { Event } from "@/types";
import { Models, Query } from 'react-native-appwrite';
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

export const hasUserEvents = async (userId: string): Promise<boolean> => {
  if (!userId) return false; 

  try {
    const response = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",
      'userevent',
      [
        Query.equal("userId", userId) 
      ],
    );
    return response.documents.length > 0;
  } catch (error) {
    console.error("Error checking user events:", error);
    return false;
  }
}

export const isAttending = async (userId: string, eventId: string): Promise<boolean> => {
  if (!userId || !eventId) return false;

  try {
    const entryExists = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",
      'userevent',
      [
        Query.equal('userId', userId),
        Query.equal('eventId', eventId)
      ],
    );
    
    if(entryExists.documents.length === 0){
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking user events:", error);
    return false;
  }
}

export const attendEvent = async (userId: string, eventId: string): Promise<boolean> => {
  if (!userId || !eventId) return false;

  try {
    const entryExists = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",
      'userevent',
      [
        Query.equal("userId", userId), 
        Query.equal("eventId", eventId)
      ],
    );
    
    if(entryExists.documents.length > 0){
      console.log("FAILED");
      return false;
    }

    const response = await databases.createDocument(
      DATABASE_ID || "DATABASE_ID",
      "userevent",
      "unique()",
      {
        eventId: eventId,
        userId: userId
      }
    );
    return !!response.$id; 
  } catch (error) {
    console.error("Error attending event:", error);
    return false;
  }
};

export const unAttendEvent = async (userId: string, eventId: string): Promise<boolean> => {
  if (!userId || !eventId) return false;

  try {
    const result = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",
      "userevent",
      [
        Query.equal("userId", userId),
        Query.equal("eventId", eventId),
      ]
    );

    if (result.total === 0) {
      console.log("No matching attendance record found.");
      return false;
    }

    const docId = result.documents[0].$id; 

    await databases.deleteDocument(
      DATABASE_ID || "DATABASE_ID",
      "userevent",
      docId
    );

    return true;
  } catch (error) {
    console.error(" Error unattending event:", error);
    return false;
  }
};

export const getMyAttendedEvents = async (userId: string): Promise<Event[]> => {
  try {
    const userEvents = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",  
      'userevent',
      [Query.equal('userId', userId)]
    );

    const eventIds = userEvents.documents.map(ue => ue.eventId);

    const eventsResponse = await databases.listDocuments(
      DATABASE_ID || "DATABASE_ID",  
      'Events',
      [Query.equal('$id', eventIds)] 
    );
   
    const events: Event[] = eventsResponse.documents.map((doc: Models.DefaultDocument) => ({
      id: doc.$id,
      title: doc.title as string,
      category: doc.category as string,
      imageUrl: doc.imageUrl as string,
      description: doc.description as string,
      date: doc.date as string,
      time: doc.time as string,
      location: doc.location as string,
    }));

    return events;
  } catch (error) {
    console.error('Error fetching attended events:', error);
    return [];
  }
};