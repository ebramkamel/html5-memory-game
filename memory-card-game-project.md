# Memory Card Game Project

## Project Overview

The Memory Card Game is an interactive web-based concentration challenge where players test their memory by matching pairs of cards. This project is built using React with TypeScript and Vite as the build tool, styled with Tailwind CSS, and enhanced with Framer Motion for smooth animations.

## Game Description

After examining the code and seeing the game in action, the Memory Card Game offers a visually appealing memory challenge with the following features:

- Players test their memory by matching pairs of cards arranged in a 3x3 grid
- Each card features a unique, modern geometric design on its face, with a shared back design
- A special center card (displaying "MOVE" logo) remains face-up throughout the game as an anchor point
- Players click cards to flip them over with smooth 3D animations powered by Framer Motion
- When a player reveals two cards that match, those cards remain face-up
- If the revealed cards don't match, they automatically flip face-down after a brief moment (1 second)
- The game tracks performance metrics in a clean sidebar interface:
  - Number of moves taken
  - Time elapsed (in minutes:seconds format)
  - Number of pairs matched (displayed as X/4)
- A blue "Restart" button with a refresh icon allows players to reset the game at any time
- A "How to Play" section provides simple instructions for new players
- A congratulatory message in green appears when all pairs are matched

## Project Structure

### Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Directory Structure

```
project/
├── public/
│   └── images/           # Card images
│       ├── card-back.png # Back of all cards
│       ├── card1.png     # Card face images
│       ├── card2.png
│       ├── card3.png
│       ├── card4.png
│       └── center.png    # Center card image
├── src/
│   ├── components/       # React components
│   │   ├── Card.tsx      # Individual card component
│   │   ├── GameBoard.tsx # Main game logic and layout
│   │   └── Timer.tsx     # Game timer component
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles and Tailwind imports
│   ├── main.tsx          # Application entry point
│   └── vite-env.d.ts     # TypeScript environment declarations
└── configuration files   # Various config files for the project
```

### Key Components

#### GameBoard.tsx
The core component that manages the game state and logic:
- Initializes and shuffles cards in a 3x3 grid layout
- Handles card flipping and matching logic
- Tracks game progress (moves, matches, completion)
- Manages the game UI layout with a main game area and sidebar
- Provides game controls (restart button)
- Displays game instructions and congratulatory message

#### Card.tsx
Represents an individual card in the game:
- Uses Framer Motion for smooth flip animations with whileTap scale effect
- Implements 3D card flip effect using CSS transforms and perspective
- Manages different card states (flipped, matched, center)
- Renders the appropriate card image based on state
- Handles touch interactions with -webkit-tap-highlight-color removal

#### Timer.tsx
Tracks and displays the elapsed game time:
- Starts when the game begins
- Stops when all pairs are matched
- Resets when the game is restarted
- Formats time in minutes:seconds (e.g., 1:45)

## Code Implementation Details

### Game Initialization
The game initializes with 8 cards (4 pairs) plus a center card arranged in a 3x3 grid. The cards are shuffled randomly at the start of each game, with the center card (displaying the "MOVE" logo) always placed in the middle position (index 4).

### Game State Management
The game uses React's useState and useEffect hooks to manage various aspects of the game state:
- Card positions and states
- Selected cards
- Match tracking
- Game completion status
- Timer control

### Card Matching Logic
When a player clicks on a card:
1. The card flips to reveal its face
2. If it's the first card selected, it remains flipped
3. If it's the second card:
   - If it matches the first card, both remain face-up
   - If it doesn't match, both cards flip back after a delay
4. The moves counter increments after each pair selection

### UI/UX Features
- Clean 3x3 card grid layout with modern geometric card designs
- Right sidebar with game controls and statistics
- Visual feedback for card interactions (scale effect when tapped)
- Smooth 3D flip animations for cards
- Color-coded congratulations message upon game completion
- Simple "How to Play" instructions panel for new players
- Blue and white color scheme with clean, modern aesthetic

## Development and Build Process

The project uses Vite for fast development and optimized builds:

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm run preview`: Preview the production build locally

## Conclusion

The Memory Card Game project provides an engaging and interactive memory challenge with a clean, modern implementation. The game features smooth animations, intuitive controls, and a polished user interface. The codebase is well-structured and uses current best practices in React development, making it maintainable and extensible for future enhancements. The project successfully implements the core memory card game mechanics while providing a foundation for the additional features described in the project brief, particularly the session tracking and branding customization requirements.