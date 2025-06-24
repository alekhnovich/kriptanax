import { motion, type Variants } from 'framer-motion';
import { useState } from 'react';
import { partnershipData } from '../../constants';

const draw: Variants = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: (i: number) => ({
		pathLength: 1,
		opacity: 1,
		transition: {
			pathLength: { delay: i * 0.1, duration: 0.9, ease: 'easeOut' },
			opacity: { delay: i * 0.1, duration: 0.01 },
		},
	}),
};

const pop: Variants = {
	hidden: { scale: 0, opacity: 0 },
	visible: (i: number) => ({
		scale: 1,
		opacity: 1,
		transition: {
			delay: 0.2 + i * 0.1,
			type: 'spring',
			stiffness: 150,
			damping: 12,
		},
	}),
};

export const PartnershipSection = () => {
	const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};

	return (
		<section className="w-full overflow-hidden bg-background-light py-20 sm:py-28">
			<div className="container mx-auto grid max-w-screen-xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
				<div className="flex items-center justify-center">
					<motion.svg
						width="100%"
						viewBox="0 0 500 600"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.5 }}
					>
						<motion.path
							d="M250 75 V 98"
							stroke={partnershipData.levels[0].color}
							strokeWidth="3"
							variants={draw}
							custom={0}
						/>
						<motion.path
							d="M180 200 C 205 165, 295 165, 320 200"
							stroke={partnershipData.levels[1].color}
							strokeWidth="3"
							variants={draw}
							custom={1}
						/>
						<motion.path
							d="M250 162 V 175"
							stroke={partnershipData.levels[1].color}
							strokeWidth="3"
							variants={draw}
							custom={1}
						/>
						<motion.path
							d="M180 232 V 258"
							stroke={partnershipData.levels[2].color}
							strokeWidth="3"
							variants={draw}
							custom={2}
						/>
						<motion.path
							d="M320 232 V 258"
							stroke={partnershipData.levels[2].color}
							strokeWidth="3"
							variants={draw}
							custom={2}
						/>
						<motion.path
							d="M180 322 V 348"
							stroke={partnershipData.levels[3].color}
							strokeWidth="3"
							variants={draw}
							custom={3}
						/>
						<motion.path
							d="M320 322 V 348"
							stroke={partnershipData.levels[3].color}
							strokeWidth="3"
							variants={draw}
							custom={3}
						/>
						<motion.path
							d="M180 412 L 180 423"
							stroke={partnershipData.levels[4].color}
							strokeWidth="3"
							variants={draw}
							custom={4}
						/>
						<motion.path
							d="M320 412 L 320 423"
							stroke={partnershipData.levels[4].color}
							strokeWidth="3"
							variants={draw}
							custom={4}
						/>
						<motion.path
							d="M180 412 L 120 454"
							stroke={partnershipData.levels[5].color}
							strokeWidth="2.5"
							variants={draw}
							custom={5}
						/>
						<motion.path
							d="M320 412 L 380 454"
							stroke={partnershipData.levels[5].color}
							strokeWidth="2.5"
							variants={draw}
							custom={5}
						/>
						<motion.path
							d="M180 412 L 60 483"
							stroke={partnershipData.levels[6].color}
							strokeWidth="2"
							variants={draw}
							custom={6}
						/>
						<motion.path
							d="M320 412 L 440 483"
							stroke={partnershipData.levels[6].color}
							strokeWidth="2"
							variants={draw}
							custom={6}
						/>

						<motion.g variants={pop} custom={0}>
							<circle cx="250" cy="40" r="35" fill="#161B22" stroke="#388BFD" strokeWidth="3" />
							<text
								x="250"
								y="46"
								textAnchor="middle"
								fill="#E6EDF3"
								fontSize="22"
								fontWeight="bold"
							>
								Вы
							</text>
						</motion.g>
						<motion.g
							variants={pop}
							custom={1}
							animate={{ scale: hoveredLevel === 1 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<circle
								cx="250"
								cy="130"
								r="32"
								fill="#161B22"
								stroke={partnershipData.levels[0].color}
								strokeWidth="2.5"
							/>
							<text x="250" y="136" textAnchor="middle" fill="#FFF" fontSize="18" fontWeight="bold">
								7%
							</text>
						</motion.g>
						<motion.g
							variants={pop}
							custom={2}
							animate={{ scale: hoveredLevel === 2 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{[180, 320].map((cx) => (
								<g key={cx}>
									<circle
										cx={cx}
										cy="200"
										r="32"
										fill="#161B22"
										stroke={partnershipData.levels[1].color}
										strokeWidth="2.5"
									/>
									<text
										x={cx}
										y="206"
										textAnchor="middle"
										fill="#FFF"
										fontSize="18"
										fontWeight="bold"
									>
										5%
									</text>
								</g>
							))}
						</motion.g>
						<motion.g
							variants={pop}
							custom={3}
							animate={{ scale: hoveredLevel === 3 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{[180, 320].map((cx) => (
								<g key={cx}>
									<circle
										cx={cx}
										cy="290"
										r="32"
										fill="#161B22"
										stroke={partnershipData.levels[2].color}
										strokeWidth="2.5"
									/>
									<text
										x={cx}
										y="296"
										textAnchor="middle"
										fill="#FFF"
										fontSize="18"
										fontWeight="bold"
									>
										3%
									</text>
								</g>
							))}
						</motion.g>
						<motion.g
							variants={pop}
							custom={4}
							animate={{ scale: hoveredLevel === 4 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{[180, 320].map((cx) => (
								<g key={cx}>
									<circle
										cx={cx}
										cy="380"
										r="32"
										fill="#161B22"
										stroke={partnershipData.levels[3].color}
										strokeWidth="2.5"
									/>
									<text
										x={cx}
										y="386"
										textAnchor="middle"
										fill="#FFF"
										fontSize="18"
										fontWeight="bold"
									>
										2%
									</text>
								</g>
							))}
						</motion.g>
						<motion.g
							variants={pop}
							custom={5}
							animate={{ scale: hoveredLevel === 5 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{[180, 320].map((cx) => (
								<g key={cx}>
									<circle
										cx={cx}
										cy="455"
										r="28"
										fill="#161B22"
										stroke={partnershipData.levels[4].color}
										strokeWidth="2.5"
									/>
									<text
										x={cx}
										y="460"
										textAnchor="middle"
										fill="#FFF"
										fontSize="16"
										fontWeight="bold"
									>
										1%
									</text>
								</g>
							))}
						</motion.g>
						<motion.g
							variants={pop}
							custom={6}
							animate={{ scale: hoveredLevel === 6 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{[120, 380].map((cx) => (
								<g key={cx}>
									<circle
										cx={cx}
										cy="480"
										r="24"
										fill="#161B22"
										stroke={partnershipData.levels[5].color}
										strokeWidth="2"
									/>
									<text
										x={cx}
										y="485"
										textAnchor="middle"
										fill="#FFF"
										fontSize="13"
										fontWeight="bold"
									>
										0.5%
									</text>
								</g>
							))}
						</motion.g>
						<motion.g
							variants={pop}
							custom={7}
							animate={{ scale: hoveredLevel === 7 ? 1.15 : 1 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{[60, 440].map((cx) => (
								<g key={cx}>
									<circle
										cx={cx}
										cy="505"
										r="20"
										fill="#161B22"
										stroke={partnershipData.levels[6].color}
										strokeWidth="1.5"
									/>
									<text
										x={cx}
										y="509"
										textAnchor="middle"
										fill="#FFF"
										fontSize="11"
										fontWeight="bold"
									>
										0.1%
									</text>
								</g>
							))}
						</motion.g>
					</motion.svg>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
				>
					<h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">
						{partnershipData.title}:{' '}
						<span className="bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
							{partnershipData.highlightedTitle}
						</span>
					</h2>
					<p className="mt-6 text-lg leading-8 text-text-secondary">
						{partnershipData.description}
					</p>
					<div className="mt-8 flex flex-col gap-2">
						{partnershipData.levels.map((item) => (
							<div
								key={item.level}
								className="flex cursor-pointer items-center justify-between rounded-lg bg-background-dark p-4 transition-all duration-200"
								onMouseEnter={() => setHoveredLevel(item.level)}
								onMouseLeave={() => setHoveredLevel(null)}
								style={{
									borderLeft: `4px solid ${hoveredLevel === item.level ? item.color : 'transparent'}`,
									backgroundColor: hoveredLevel === item.level ? 'rgba(255, 255, 255, 0.05)' : '',
									transform: `scale(${hoveredLevel === item.level ? 1.05 : 1})`,
								}}
							>
								<span className="font-medium text-text-secondary">Уровень {item.level}</span>
								<span className="text-xl font-bold" style={{ color: item.color }}>
									{item.percentage}%
								</span>
							</div>
						))}
					</div>
					<div className="mt-10">
						<button
							onClick={handleGoToBot}
							className="transform rounded-lg bg-brand-blue px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-opacity-50"
						>
							{partnershipData.buttonText}
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
