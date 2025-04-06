import React from 'react';
import { motion } from 'framer-motion';
import { brandingConfig } from '../config/branding';

interface CardProps {
  id: number;
  image: string;
  isFlipped: boolean;
  isCenter: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ id, image, isFlipped, isCenter, isMatched, onClick }: CardProps) {
  return (
    <motion.div
      className={`relative w-[150px] h-[150px] cursor-pointer perspective-1000 transform-style-3d transition-transform duration-500 ${
        isCenter ? 'pointer-events-none' : ''
      }`}
      whileTap={{ scale: isCenter ? 1 : 0.95 }}
      onClick={onClick}
    >
      <div
        className={`absolute w-full h-full transition-all duration-500 transform-style-3d ${
          isFlipped || isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card (back image) */}
        <div className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden">
          <img
            src={brandingConfig.cardBack}
            alt="Card Back"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Back of card (actual image or SVG) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-lg overflow-hidden">
          {image.startsWith('svg:') && brandingConfig.svgCards ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{
                __html: brandingConfig.svgCards[image.substring(4)] || ''
              }}
            />
          ) : (
            <img
              src={image}
              alt={`Card ${id}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}