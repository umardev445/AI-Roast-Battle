export enum RoastStyle {
  FUNNY = "funny",
  SAVAGE = "savage",
  FRIENDLY = "friendly",
  DARK_HUMOR = "dark_humor",
  GEN_Z = "gen_z"
}

export interface RoastRequest {
  name: string;
  friendName?: string;
  style: RoastStyle;
}

export interface RoastResponse {
  roast: string;
  style: RoastStyle;
  emoji: string;
  avatar: string;
  vibeScore: number; // Cyberpunk rating out of 100
  punchline: string;
}

export interface SavedRoast {
  id: string;
  name: string;
  friendName?: string;
  roast: string;
  style: RoastStyle;
  timestamp: number;
}
