export interface BrandingConfig {
  cardBack: string;
  centerLogo: string;
  cardFaces: string[];
  maxPairs: number;
  svgCards?: { [key: string]: string };
}