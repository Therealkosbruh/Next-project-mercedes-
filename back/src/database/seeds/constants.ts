export const MODEL_TYPES = [
  { name: 'S-Class', description: 'Flagship luxury sedan — pinnacle of comfort and technology.' },
  { name: 'G-Class', description: 'Iconic off-road SUV with military roots and modern luxury.' },
  { name: 'E-Class', description: 'Business-class sedan combining elegance and performance.' },
  { name: 'C-Class', description: 'Compact executive saloon with sporty character.' },
  { name: 'GLE', description: 'Premium mid-size SUV with AMG performance options.' },
] as const;

// Model numbers per class — only the specific variant, not the class name
export const MODEL_NUMBERS: Record<string, string[]> = {
  'S-Class': ['S 450', 'S 500', 'S 580', 'S 63 AMG', 'S 680 Maybach'],
  'G-Class': ['G 350 d', 'G 500', 'G 63 AMG', 'G 63 AMG Brabus'],
  'E-Class': ['E 200', 'E 300', 'E 350', 'E 53 AMG', 'E 63 AMG S'],
  'C-Class': ['C 200', 'C 300', 'C 43 AMG', 'C 63 AMG'],
  'GLE':     ['GLE 350', 'GLE 450', 'GLE 53 AMG', 'GLE 63 AMG S'],
};

export const COLORS_PALETTE = [
  { name: 'Obsidian Black', hex: '#0b0b0b' },
  { name: 'Polar White', hex: '#f5f5f0' },
  { name: 'Iridium Silver', hex: '#a8a9aa' },
  { name: 'Mojave Silver', hex: '#c4bfb6' },
  { name: 'Graphite Grey', hex: '#4a4a4a' },
  { name: 'Cavansite Blue', hex: '#2e5fa3' },
  { name: 'Brilliant Blue', hex: '#1b3f7a' },
  { name: 'Patagonia Red', hex: '#9b1a1a' },
  { name: 'Emerald Green', hex: '#2d6a4f' },
  { name: 'Designo Manufaktur Maybach Gold', hex: '#c5a028' },
] as const;
