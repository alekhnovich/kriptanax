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
		<AnimatedSection id="faq" className="relative w-full overflow-hidden py-20 sm:py-28">
			<div aria-hidden="true" className="aurora-layer" />
			<div className="container relative z-10 mx-auto max-w-7xl px-4">
				<h2 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
					Часто задаваемые вопросы
				</h2>
				<div className="mx-auto mt-12 flex max-w-4xl flex-col gap-6">
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
