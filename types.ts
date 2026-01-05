export interface FortuneResult {
  fortune: string; // e.g., "大吉"
  message: string;
  advice: string;
  lucky: string; // Lucky color
  luckyColorCode: string; // Hex code for the color
  action: string;
  artKey: string; // For placeholder image generation
  music: string;
}

export interface Choice {
  id: string; // 'c1', 'c2', etc.
  label: string;
  description: string;
  icon: string;
}

export type ScreenState = 'SPLASH' | 'QUESTION' | 'LOADING' | 'RESULT';
