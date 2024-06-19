import { ReactNode } from "react";

export interface ModelProfile {
  name: string;
  description: ReactNode;
}

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
  cityURL: string;
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
  avatar: string | undefined;
  id: number;
  modelProfile: ModelProfile;
  album: Album;
  modelDetails: ModelDetails;
  hasLocation: boolean;
  localInfo: LocalInfo;
  socialMedia: SocialMedia;
  hasVideoVerification: boolean;
  modelType: string;
  showFace: string;
}
