import { ReactNode } from "react";

export interface Model {
  hasVideoVerification: any;
  description: ReactNode;
  id: number;
  name: string;
  album: {
    profilePicture: string;
    avatar: string;
  };
  profilePicture?: string;
  avatar?: string;
  age: number;
  height: string;
  weight: string;
  eyeColor: string;
  bust: string;
  waist: string;
  hips: string;
  feet: string;
  modelType: string;
  showFace: string;
  localInfo: {
    city: string;
    state: string;
    neighborhood?: string;
    address?: string;
    zipCode?: string;
  };
  socialMedia: {
    whatsapp: string;
    onlyfans?: string;
    privacy?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
    telegram?: string;
  };
}
