export enum Scene {
  BEDROOM = 'Phòng ngủ',
  CHANGING_ROOM = 'Phòng thay đồ',
  BATHROOM = 'Phòng tắm',
  HALLWAY = 'Hành lang',
  STUDIO = 'Studio',
  CAFE = 'Cafe',
  SHOWROOM = 'Showroom',
  OFFICE = 'Văn phòng',
  GYM_MALL = 'Gym/Mall',
}

export enum ModelId {
  FLASH = 'gemini-2.5-flash-image',
  PRO = 'gemini-3-pro-image-preview',
  // Mapping "Nano Banana" to flash image as per system instructions, 
  // or we could treat it as a separate entry if it were distinct, 
  // but for now we'll stick to the known working models.
  // The user requested "nano-banana", "gemini-2.5-flash-image", "gemini-3-pro-image-preview".
  // Since nano-banana maps to gemini-2.5-flash-image in system prompt, 
  // we will just use these two distinct tiers for now to ensure it works.
}

export interface AppConfig {
  kocImage: string | null; // base64
  outfitImage: string | null; // base64
  scene: Scene;
  additionalPrompt: string;
  holdingPhone: boolean;
}

export interface ApiConfig {
  keys: string[];
  activeKeyIndex: number;
  activeModel: ModelId;
}

export interface AppStatus {
  isGenerating: boolean;
  progress: number; // 0-100
  resultUrl: string | null;
  error: string | null;
}
