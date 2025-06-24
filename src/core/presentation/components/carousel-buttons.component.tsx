import { ChevronLeft, ChevronRight } from 'lucide-react';

type PropType = {
  enabled: boolean;
  onClick: () => void;
};

export const CarouselPrevButton: React.FC<PropType> = ({ enabled, onClick }) => (
  <button
    className="
      absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rounded-full 
      bg-background-light p-3 border border-border-color shadow-lg 
      transition-all duration-200 
      disabled:opacity-30 disabled:cursor-not-allowed
      hover:enabled:bg-border-color hover:enabled:scale-110
      focus:outline-none focus:ring-2 focus:ring-brand-blue/50
    "
    onClick={onClick}
    disabled={!enabled}
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-6 w-6 text-text-primary" />
  </button>
);

export const CarouselNextButton: React.FC<PropType> = ({ enabled, onClick }) => (
  <button
    className="
      absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rounded-full 
      bg-background-light p-3 border border-border-color shadow-lg 
      transition-all duration-200 
      disabled:opacity-30 disabled:cursor-not-allowed
      hover:enabled:bg-border-color hover:enabled:scale-110
      focus:outline-none focus:ring-2 focus:ring-brand-blue/50
    "
    onClick={onClick}
    disabled={!enabled}
    aria-label="Next slide"
  >
    <ChevronRight className="h-6 w-6 text-text-primary" />
  </button>
);