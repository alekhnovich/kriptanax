import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LanguageSelector } from '../../../../landing';
import { HeaderNav } from './header-nav.component';

interface HomeHeaderProps {
	onNavItemClick: (sectionId: string) => void;
}

export const HomeHeader = ({ onNavItemClick }: HomeHeaderProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const iconVariants = {
		hidden: { rotate: -180, scale: 0 },
		visible: { rotate: 0, scale: 1, transition: { duration: 0.3 } },
		exit: { rotate: 180, scale: 0, transition: { duration: 0.3 } },
	};
	const handleMobileMenuClick = () => {
		setIsMenuOpen(false);
	};

	return (
		<div className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
			<div className="w-full max-w-fit rounded-full bg-gradient-to-r from-brand-blue to-brand-purple p-px shadow-lg">
				<header className="flex w-full items-center justify-between rounded-full bg-background-light/80 p-2 backdrop-blur-xl">
					<div className="mr-4 flex items-center gap-3 pl-2">
						<img src="/logo.svg" alt="Bitraider Logo" className="h-10 w-10" />
						<span className="text-xl font-bold text-text-primary">Bitraider</span>
					</div>

					<div className="hidden items-center gap-2 pr-2 md:flex">
						<HeaderNav onNavItemClick={onNavItemClick} />
						<div className="h-6 w-px bg-border-color/50" />
						<LanguageSelector />
					</div>

					<div className="flex items-center md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="relative h-10 w-10 rounded-full text-text-primary hover:bg-white/10 focus:outline-none"
							aria-label="Открыть меню"
						>
							<AnimatePresence mode="wait" initial={false}>
								{isMenuOpen ? (
									<motion.div
										key="x"
										variants={iconVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										className="absolute inset-0 flex items-center justify-center"
									>
										<X size={24} />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										variants={iconVariants}
										initial="hidden"
										animate="visible"
										exit="exit"
										className="absolute inset-0 flex items-center justify-center"
									>
										<Menu size={24} />
									</motion.div>
								)}
							</AnimatePresence>
						</button>
					</div>
				</header>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}
						className="absolute top-full mt-2 w-full max-w-sm rounded-2xl border border-border-color bg-background-light/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
					>
						<div className="mb-4 flex justify-center">
							<LanguageSelector />
						</div>
						<HeaderNav onNavItemClick={onNavItemClick} onItemClick={handleMobileMenuClick} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
