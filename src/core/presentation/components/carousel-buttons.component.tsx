import { ChevronLeft, ChevronRight } from 'lucide-react';

type PropType = {
	enabled: boolean;
	onClick: () => void;
};

export const CarouselPrevButton: React.FC<PropType> = ({ enabled, onClick }) => (
	<button
		className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-color bg-background-light p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 hover:enabled:scale-110 hover:enabled:bg-border-color disabled:cursor-not-allowed disabled:opacity-30"
		onClick={onClick}
		disabled={!enabled}
		aria-label="Previous slide"
	>
		<ChevronLeft className="h-6 w-6 text-text-primary" />
	</button>
);

export const CarouselNextButton: React.FC<PropType> = ({ enabled, onClick }) => (
	<button
		className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border border-border-color bg-background-light p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 hover:enabled:scale-110 hover:enabled:bg-border-color disabled:cursor-not-allowed disabled:opacity-30"
		onClick={onClick}
		disabled={!enabled}
		aria-label="Next slide"
	>
		<ChevronRight className="h-6 w-6 text-text-primary" />
	</button>
);
