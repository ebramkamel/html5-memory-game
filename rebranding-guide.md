# Memory Card Game Rebranding Guide

This guide provides detailed instructions on how to customize and rebrand the Memory Card Game to match your organization's branding, theme, or specific requirements.

## Table of Contents

1. [Introduction](#introduction)
2. [Branding Configuration](#branding-configuration)
3. [Customizing Card Images](#customizing-card-images)
4. [Using SVG Cards](#using-svg-cards)
5. [Adjusting Game Parameters](#adjusting-game-parameters)
6. [Advanced Customization](#advanced-customization)
7. [Examples](#examples)

## Introduction

The Memory Card Game is designed with customization in mind. You can easily rebrand the game by:

- Replacing the card back and face images
- Implementing SVG-based cards for vector graphics
- Adjusting the number of card pairs
- Modifying colors, styles, and layouts

All branding-related configurations are centralized in the `src/config/branding.ts` file, making it easy to customize the game without modifying the core functionality.

## Branding Configuration

The branding configuration is defined in `src/config/branding.ts` and follows this structure:

```typescript
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
  svgCards: {
    // Optional SVG definitions
  }
};
```

### Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `cardBack` | string | Path to the image used for the back of all cards |
| `centerLogo` | string | Path to an optional center logo image |
| `cardFaces` | string[] | Array of paths to the card face images |
| `maxPairs` | number | Number of pairs in the game (must match the length of `cardFaces`) |
| `svgCards` | object | Optional object containing SVG definitions for vector-based cards |

## Customizing Card Images

### Image Requirements

- **Format**: PNG, JPG, or WebP (PNG recommended for transparency)
- **Size**: Recommended 300x300 pixels for optimal quality
- **Location**: Place all images in the `public/images/` directory

### Steps to Replace Card Images

1. Create your custom card images:
   - One image for the card back (shared by all cards)
   - One unique image for each card face (you need pairs of these)

2. Place the images in the `public/images/` directory

3. Update the `brandingConfig` in `src/config/branding.ts`:

```typescript
export const brandingConfig: BrandingConfig = {
  cardBack: '/images/your-custom-back.png',
  centerLogo: '/images/your-logo.png',
  cardFaces: [
    '/images/your-face1.png',
    '/images/your-face2.png',
    '/images/your-face3.png',
    // Add more as needed
  ],
  maxPairs: 6, // Update this to match the number of card faces
};
```

## Using SVG Cards

For better scaling and performance, you can use SVG-based cards instead of image files.

### Steps to Implement SVG Cards

1. Create your SVG designs or obtain SVG code

2. Add the SVG definitions to the `svgCards` object in `brandingConfig`:

```typescript
export const brandingConfig: BrandingConfig = {
  // ... other config options
  svgCards: {
    'card1': '<svg viewBox="0 0 150 150"><!-- SVG content here --></svg>',
    'card2': '<svg viewBox="0 0 150 150"><!-- SVG content here --></svg>',
    // Add more SVG definitions as needed
  }
};
```

3. Update the `cardFaces` array to reference the SVG definitions:

```typescript
cardFaces: [
  'svg:card1',
  'svg:card2',
  // Add more as needed
],
```

The `svg:` prefix tells the Card component to look for the SVG definition in the `svgCards` object rather than treating it as an image path.

## Adjusting Game Parameters

### Changing the Number of Pairs

To change the number of card pairs in the game:

1. Add or remove entries from the `cardFaces` array in `brandingConfig`
2. Update the `maxPairs` value to match the number of unique card faces
3. The game will automatically adjust the grid layout based on the number of cards

```typescript
export const brandingConfig: BrandingConfig = {
  // ... other config options
  cardFaces: [
    '/images/card1.png',
    '/images/card2.png',
    '/images/card3.png',
    '/images/card4.png',
    // Add or remove card faces as needed
  ],
  maxPairs: 4, // Update to match the number of card faces
};
```

Note: The current implementation is optimized for a 4x3 grid (6 pairs). If you significantly change the number of pairs, you may need to adjust the grid layout in `GameBoard.tsx`.

## Advanced Customization

### Modifying the UI Colors

The game uses Tailwind CSS for styling. To change the color scheme:

1. Modify the color classes in the component files:
   - `GameBoard.tsx` for the main game layout and sidebar
   - `Card.tsx` for the card appearance

2. For example, to change the restart button from blue to red:

```jsx
<button
  onClick={initializeGame}
  className="w-full bg-red-500 text-white px-3 py-2 rounded-lg shadow hover:bg-red-600 flex items-center justify-center gap-1.5"
>
  <RefreshCw size={18} /> Restart
</button>
```

### Adjusting Card Size and Layout

To change the card size or game layout:

1. Modify the card dimensions in `Card.tsx`:

```jsx
<motion.div
  className={`relative w-[200px] h-[200px] cursor-pointer perspective-1000 transform-style-3d transition-transform duration-500 ${
    isCenter ? 'pointer-events-none' : ''
  }`}
  // ...
>
```

2. Adjust the grid layout in `GameBoard.tsx`:

```jsx
<div
  className="grid grid-cols-3 justify-items-center items-center" // Change from grid-cols-4 to grid-cols-3 for a 3x4 layout
  style={{
    display: 'grid',
    gap: '20px', // Increase gap between cards
    width: 'fit-content',
  }}
>
```

## Examples

### Example 1: Corporate Branding

```typescript
export const brandingConfig: BrandingConfig = {
  cardBack: '/images/company-logo-back.png',
  centerLogo: '/images/company-logo.png',
  cardFaces: [
    '/images/product1.png',
    '/images/product2.png',
    '/images/product3.png',
    '/images/product4.png',
    '/images/product5.png',
    '/images/product6.png',
  ],
  maxPairs: 6,
};
```

### Example 2: Educational Theme with SVG Cards

```typescript
export const brandingConfig: BrandingConfig = {
  cardBack: '/images/school-logo.png',
  centerLogo: '/images/education-logo.png',
  cardFaces: [
    'svg:math',
    'svg:science',
    'svg:history',
    'svg:art',
  ],
  maxPairs: 4,
  svgCards: {
    'math': '<svg viewBox="0 0 150 150"><!-- Math symbol SVG --></svg>',
    'science': '<svg viewBox="0 0 150 150"><!-- Science symbol SVG --></svg>',
    'history': '<svg viewBox="0 0 150 150"><!-- History symbol SVG --></svg>',
    'art': '<svg viewBox="0 0 150 150"><!-- Art symbol SVG --></svg>',
  }
};
```

---

By following this guide, you can fully customize the Memory Card Game to match your specific requirements while maintaining the core functionality and user experience.