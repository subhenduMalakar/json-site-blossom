
/**
 * Directory data for businesses and places
 */

export interface DirectoryItem {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  image: string;
  rating: number;
  hours: string;
  features?: string[];
  priceRange?: string;
  yearEstablished?: number;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    pinterest?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}

export const categories = [
  "All",
  "Cafe",
  "Restaurant",
  "Technology",
  "Fitness",
  "Bookstore",
  "Hotel",
  "Education",
  "Entertainment",
  "Health",
  "Shopping",
  "Services"
];

export const directoryData: DirectoryItem[] = []; // Initialize as empty array or load asynchronously
