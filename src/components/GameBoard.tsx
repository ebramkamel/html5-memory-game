import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Timer } from './Timer';
import { RefreshCw, Info, PartyPopper } from 'lucide-react';
import { brandingConfig } from '../config/branding';

// Constants are now sourced from brandingConfig
interface Card {
  id: number;
  imageIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

export function GameBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shouldResetTimer, setShouldResetTimer] = useState(false);

  const initializeGame = () => {
    // Create maxPairs pairs (maxPairs * 2 cards)
    const cardPairs = [...brandingConfig.cardFaces, ...brandingConfig.cardFaces].map((_, index) => ({
      id: index, // IDs 0 to (maxPairs * 2 - 1)
      imageIndex: Math.floor(index / 2),
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setMoves(0);
    setMatchedPairs(0);
    setIsGameComplete(false);
    setFirstCard(null);
    setShouldResetTimer((prev) => !prev);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedIndex: number) => {
    if (
      isProcessing ||
      cards[clickedIndex].isMatched ||
      cards[clickedIndex].isFlipped
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[clickedIndex].isFlipped = true;
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(clickedIndex);
    } else {
      setIsProcessing(true);
      setMoves((prev) => prev + 1);

      // Check for match
      if (cards[firstCard].imageIndex === cards[clickedIndex].imageIndex) {
        newCards[firstCard].isMatched = true;
        newCards[clickedIndex].isMatched = true;
        setCards(newCards);
        setMatchedPairs((prev) => prev + 1);
        setFirstCard(null);
        setIsProcessing(false);

        // Check if game is complete (maxPairs pairs)
        if (matchedPairs + 1 === brandingConfig.maxPairs) {
          setIsGameComplete(true);
        }
      } else {
        // No match - flip cards back
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[clickedIndex].isFlipped = false;
          setCards(newCards);
          setFirstCard(null);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-[962px] h-[500px] bg-gray-100 p-4 select-none flex">
      <div className="flex-1 flex items-center justify-center">
        <div
          className="grid grid-cols-4 justify-items-center items-center" // 4 columns for 4x3 grid
          style={{
            display: 'grid',
            gap: '13px',
            width: 'fit-content',
          }}
        >
          {cards.map((card, index) => (
            <Card
              key={card.id}
              id={card.id}
              image={brandingConfig.cardFaces[card.imageIndex]}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              isCenter={false}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>

      <div className="w-[200px] flex flex-col justify-end pl-4 pb-[13px]">
        <div className="space-y-3">
          <button
            onClick={initializeGame}
            className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600 flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={18} /> Restart
          </button>

          <div className="bg-white px-3 py-2 rounded-lg shadow">
            <Timer
              isComplete={isGameComplete}
              shouldReset={shouldResetTimer}
            />
          </div>

          <div className="bg-white px-3 py-2 rounded-lg shadow">
            <span className="font-semibold">Moves:</span> {moves}
          </div>

          <div className="bg-white px-3 py-2 rounded-lg shadow">
            <span className="font-semibold">Pairs:</span> {matchedPairs}/{brandingConfig.maxPairs}
          </div>

          {!isGameComplete ? (
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="flex items-center gap-1.5 text-gray-700 mb-2">
                <Info size={18} />
                <span className="font-semibold">How to Play</span>
              </div>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li>• Click cards to flip them</li>
                <li>• Find matching pairs</li>
                <li>• Complete all {brandingConfig.maxPairs} pairs</li>
              </ul>
            </div>
          ) : (
            <div className="bg-green-50 p-3 rounded-lg shadow border border-green-200">
              <div className="flex items-center gap-2 text-green-800 font-semibold mb-2">
                <PartyPopper size={18} />
                <span>Congratulations!</span>
              </div>
              <p className="text-sm text-green-700">
                You completed the game in {moves} moves! 🎉
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}