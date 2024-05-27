import { ReactNode } from "react";

export interface ModelDetails {
  age: number;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  bustType: string;
  bust: string;
  waist: string;
  hips: string;
  feet: string | number;
}

export interface LocalInfo {
  city: string;
  state: string;
  neighborhood?: string;
  address?: string;
  zipCode?: string;
}

export interface SocialMedia {
  whatsapp: string;
  onlyfans?: string;
  privacy?: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  tiktok?: string;
  telegram?: string;
}

export interface Album {
  profilePicture: string;
  avatar: string;
}

export interface Model {
  id: number;
  name: string;
  hasVideoVerification: any;
  description: ReactNode;
  modelType: string;
  showFace: string;
  album: Album;
  modelDetails: ModelDetails;
  localInfo: LocalInfo;
  socialMedia: SocialMedia;
}
