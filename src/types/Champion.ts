export type Champion = {
  name: string;
  role: string;
  lane: string;
  difficulty: number;
  blue_essence: number;
  damage_type: string;
  images: string[];
  description: string;
  id?: number;
};
