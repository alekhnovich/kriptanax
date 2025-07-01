import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Language } from '../../types';

const languages: Language[] = [
	{ code: 'ru', name: 'Русский' },
	{ code: 'en', name: 'English' },
	{ code: 'de', name: 'Deutsch' },
	{ code: 'es', name: 'Español' },
	{ code: 'tr', name: 'Türkçe' },
];

export const LanguageSelector = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSelectLanguage = (lang: Language) => {
		setSelectedLanguage(lang);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 rounded-full p-2 text-sm font-medium text-text-secondary transition-colors hover:bg-white/10 hover:text-text-primary focus:outline-none"
			>
				<Globe size={20} />
				<span>{selectedLanguage.code.toUpperCase()}</span>
				<ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className="absolute right-0 top-full mt-2 w-40 origin-top-right rounded-md border border-border-color bg-background-light p-1 shadow-lg"
					>
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick={() => handleSelectLanguage(lang)}
								className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm text-text-primary transition-colors hover:bg-white/10"
							>
								<span>{lang.name}</span>
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
