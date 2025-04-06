import { BrandingConfig } from './types';

// Define the branding configuration for the memory card game.
// This includes paths to images and the maximum number of pairs.
export const brandingConfig: BrandingConfig = {
  cardBack: '/images/card-back.png',
  centerLogo: '/images/center.png',
  cardFaces: [
    '/images/card1.png',
    '/images/card2.png',
    '/images/card3.png',
    '/images/card4.png',
    '/images/card5.png',
    '/images/card6.png',
  ],
  maxPairs: 6,
};