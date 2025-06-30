import { useState } from 'react';
import { AnimatedSection } from '../../../../home';
import { faqData } from '../../../types';
import { FaqItem } from '../faq-item.component';

export const FaqSection = () => {
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const handleItemClick = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<AnimatedSection
			id="faq"
			className="relative w-full overflow-hidden bg-background-dark py-16 sm:py-24"
		>
			<div aria-hidden="true" className="aurora-layer" />

			<div className="container relative z-10 mx-auto max-w-7xl px-4">
				<h2 className="text-center text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
					Часто задаваемые вопросы
				</h2>
				<div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:mt-12 sm:gap-6">
					{faqData.map((item, index) => (
						<FaqItem
							key={item.id}
							question={item.question}
							answer={item.answer}
							isExpanded={expandedIndex === index}
							onClick={() => handleItemClick(index)}
						/>
					))}
				</div>
			</div>
		</AnimatedSection>
	);
};
