import { type EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { CarouselNextButton, CarouselPrevButton } from '../../../../core/presentation';

const screenshots = [
	{ id: 1, url: '#' },
	{ id: 2, url: '#' },
	{ id: 3, url: '#' },
	{ id: 4, url: '#' },
	{ id: 5, url: '#' },
];

export const ReviewsSection = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: 'center',
	});

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

	const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
	const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect(emblaApi);
		emblaApi.on('reInit', onSelect).on('select', onSelect);
	}, [emblaApi, onSelect]);

	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};

	return (
		<section className="w-full bg-background-dark py-20 sm:py-28">
			<div className="container mx-auto max-w-screen-xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">
						Реальные результаты наших инвесторов
					</h2>
					<p className="mt-6 text-lg leading-8 text-text-secondary">
						Никаких фейковых отзывов. Только настоящие скриншоты прибыли из нашего Telegram-бота.
					</p>
				</div>

				<div className="relative mt-16">
					<motion.div
						className="embla"
						ref={emblaRef}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{ duration: 0.8, ease: 'easeOut' }}
					>
						<div className="embla__container">
							{screenshots.map((item) => (
								<div
									className="embla__slide flex-[0_0_80%] px-4 sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_30%]"
									key={item.id}
								>
									<div className="aspect-[9/16] w-full rounded-2xl border-2 border-border-color bg-background-light p-2 shadow-2xl shadow-black/30 transition-transform duration-300 hover:scale-[1.03] hover:shadow-brand-blue/20">
										<div className="flex h-full w-full items-center justify-center rounded-lg bg-border-color/50">
											<p className="text-sm text-text-secondary">Скриншот #{item.id}</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</motion.div>

					<div className="hidden md:block">
						<CarouselPrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
						<CarouselNextButton onClick={scrollNext} enabled={nextBtnEnabled} />
					</div>
				</div>

				<div className="mt-16 text-center">
					<button
						onClick={handleGoToBot}
						className="transform rounded-lg bg-brand-blue px-10 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
					>
						Начать получать прибыль
					</button>
				</div>
			</div>
		</section>
	);
};
