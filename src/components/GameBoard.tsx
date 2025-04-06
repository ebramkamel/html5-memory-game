import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Timer } from './Timer';
import { RefreshCw, Info, PartyPopper } from 'lucide-react';

const CARD_IMAGES = [
  '/images/card1.png',
  '/images/card2.png',
  '/images/card3.png',
  '/images/card4.png',
];

const CENTER_IMAGE = '/images/center.png';

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
    const cardPairs = [...CARD_IMAGES, ...CARD_IMAGES].map((_, index) => ({
      id: index,
      imageIndex: Math.floor(index / 2),
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5);

    // Insert center card at position 4 (middle)
    shuffledCards.splice(4, 0, {
      id: 8,
      imageIndex: -1, // Special index for center card
      isFlipped: true,
      isMatched: true,
    });

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
      cards[clickedIndex].isFlipped ||
      clickedIndex === 4 // Center card
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

        // Check if game is complete
        if (matchedPairs + 1 === 4) {
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
          className="grid grid-cols-3 justify-items-center items-center"
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
              image={
                card.imageIndex === -1
                  ? CENTER_IMAGE
                  : CARD_IMAGES[card.imageIndex]
              }
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              isCenter={index === 4}
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
            <span className="font-semibold">Pairs:</span> {matchedPairs}/4
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
                <li>• Complete all 4 pairs</li>
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