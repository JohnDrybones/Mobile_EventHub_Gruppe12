// Definerer tilgjengelige roller i systemet som konstanter
export const ROLES = {
	ADMIN: "ADMIN",
	USER: "USER",
} as const;

// Typedefinisjon for roller basert på ROLES-objektet
export type Role = (typeof ROLES)[keyof typeof ROLES];

export type Event = {
  id: string;            
  title: string;          
  category: string;       
  imageUrl: string;
  description: string;       
  date: string;           
  time: string;           
  location: string;       
};