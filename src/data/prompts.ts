export interface PromptCategory {
  id: string;
  name: string;
  prompts: string[];
}

export const PROMPT_LIBRARY: PromptCategory[] = [
  {
    id: 'luxury',
    name: 'Luxury & Elegant',
    prompts: [
      "Soft golden hour lighting, luxury hotel background, high-end fashion magazine style, 8k resolution.",
      "Minimalist aesthetic, beige tones, soft shadows, elegant pose, expensive atmosphere.",
      "Evening gown vibe, dramatic lighting, sparkling chandelier background, cinematic depth of field.",
      "Old money aesthetic, tennis court or country club background, natural daylight, crisp details.",
      "High-fashion editorial shot, marble architecture background, sharp focus, sophisticated look."
    ]
  },
  {
    id: 'street',
    name: 'Streetwear & Urban',
    prompts: [
      "Urban street style, neon city lights background, night time, dynamic angles, high contrast.",
      "Graffiti wall background, raw and edgy vibe, daylight, wide angle shot, hypebeast style.",
      "Subway station setting, industrial vibe, moody lighting, candid shot style.",
      "Skate park background, sunny day, energetic vibe, fisheye lens effect.",
      "City rooftop at dusk, bokeh city lights, cool tones, modern streetwear vibe."
    ]
  },
  {
    id: 'casual',
    name: 'Casual & Daily',
    prompts: [
      "Cozy coffee shop atmosphere, warm lighting, holding a latte, relaxed and candid.",
      "Bright and airy living room, morning sunlight, soft pastel colors, comfortable vibe.",
      "Outdoor park setting, greenery background, natural sunlight, happy and smiling.",
      "Flower market background, colorful and vibrant, soft focus, romantic spring vibe.",
      "Weekend brunch vibe, outdoor cafe seating, sunny and cheerful, natural skin texture."
    ]
  },
  {
    id: 'professional',
    name: 'Professional & Office',
    prompts: [
      "Modern office background, glass walls, professional lighting, confident pose, business casual.",
      "Co-working space environment, laptop in background, smart casual look, bright and clean.",
      "City skyline view from high-rise window, powerful stance, corporate chic style.",
      "Minimalist studio background, grey backdrop, soft studio lighting, lookbook quality.",
      "Creative agency office, colorful background elements, bright and energetic professional look."
    ]
  }
];
