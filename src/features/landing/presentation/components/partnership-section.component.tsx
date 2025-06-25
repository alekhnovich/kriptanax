import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

// amCharts 5 Imports
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

// Ваши импорты данных и типов
import { LandingSections, partnershipData } from '../../constants';
import type { PartnershipNodeData } from '../../types';

// Функция-хелпер (без изменений)
const transformDataForAmCharts = (data: typeof partnershipData): PartnershipNodeData => {
	const levels = data.levels;

	return {
		id: 'you',
		name: 'Вы',
		color: '#58A6FF',
		level: 0,
		value: 35,
		children: [
			{
				id: 'level-1',
				name: `${levels[0].percentage}%`,
				color: levels[0].color,
				level: 1,
				value: 32,
				children: [
					{
						id: 'branch-left',
						name: '',
						color: 'transparent',
						level: -1,
						value: 0,
						children: [
							{
								id: 'level-2-a',
								name: `${levels[1].percentage}%`,
								color: levels[1].color,
								level: 2,
								value: 32,
								children: [
									{
										id: 'level-3-a',
										name: `${levels[2].percentage}%`,
										color: levels[2].color,
										level: 3,
										value: 32,
										children: [
											{
												id: 'level-4-a',
												name: `${levels[3].percentage}%`,
												color: levels[3].color,
												level: 4,
												value: 32,
												children: [
													{
														id: 'level-5-a',
														name: `${levels[4].percentage}%`,
														color: levels[4].color,
														level: 5,
														value: 28,
														children: [
															{
																id: 'level-6-a',
																name: `${levels[5].percentage}%`,
																color: levels[5].color,
																level: 6,
																value: 24,
																children: [
																	{
																		id: 'level-7-a',
																		name: `${levels[6].percentage}%`,
																		color: levels[6].color,
																		level: 7,
																		value: 20,
																	},
																],
															},
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
					{
						id: 'branch-right',
						name: '',
						color: 'transparent',
						level: -1,
						value: 0,
						children: [
							{
								id: 'level-2-b',
								name: `${levels[1].percentage}%`,
								color: levels[1].color,
								level: 2,
								value: 32,
								children: [
									{
										id: 'level-3-b',
										name: `${levels[2].percentage}%`,
										color: levels[2].color,
										level: 3,
										value: 32,
										children: [
											{
												id: 'level-4-b',
												name: `${levels[3].percentage}%`,
												color: levels[3].color,
												level: 4,
												value: 32,
												children: [
													{
														id: 'level-5-b',
														name: `${levels[4].percentage}%`,
														color: levels[4].color,
														level: 5,
														value: 28,
														children: [
															{
																id: 'level-6-b',
																name: `${levels[5].percentage}%`,
																color: levels[5].color,
																level: 6,
																value: 24,
																children: [
																	{
																		id: 'level-7-b',
																		name: `${levels[6].percentage}%`,
																		color: levels[6].color,
																		level: 7,
																		value: 20,
																	},
																],
															},
														],
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	};
};

export const PartnershipSectionAmCharts = () => {
	const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
	const chartRef = useRef<am5hierarchy.Tree | null>(null);

	const handleGoToBot = () => {
		window.open('https://t.me/bot_username', '_blank');
	};

	useLayoutEffect(() => {
		const root = am5.Root.new('chartdiv');
		root._logo?.dispose();
		root.setThemes([am5themes_Animated.new(root)]);

		const container = root.container.children.push(
			am5.Container.new(root, {
				width: am5.percent(100),
				height: am5.percent(100),
				layout: root.verticalLayout,
			}),
		);

		const series = container.children.push(
			am5hierarchy.Tree.new(root, {
				valueField: 'value',
				categoryField: 'name',
				childDataField: 'children',
				orientation: 'vertical',
				downDepth: 2,
				initialDepth: 10,
				paddingTop: 40,
				paddingBottom: 20,
			}),
		);

		// --- ИСПРАВЛЕНИЕ 1: Используем тип TreeLayout из 'am5', а не 'am5hierarchy' ---
		const layout = series.get('layout');
		if (layout) {
			(layout as am5.TreeLayout).set('levelDistance', 40);
		}

		chartRef.current = series;

		series.nodes.template.setAll({
			tooltipText: '',
			draggable: false,
			cursorOverStyle: 'pointer',
		});

		series.nodes.template.setup = (target) => {
			target.set(
				'background',
				am5.Circle.new(root, {
					fill: am5.color('#161B22'),
					strokeWidth: 2.5,
				}),
			);

			target.adapters.add('background', (background, target) => {
				const dataContext = target.dataItem?.dataContext as PartnershipNodeData | undefined;
				if (background instanceof am5.Circle && dataContext) {
					background.setAll({
						stroke: am5.color(dataContext.color),
						radius: dataContext.value,
					});
				}
				return background;
			});
		};

		series.labels.template.setAll({
			fill: am5.color('#E6EDF3'),
			fontSize: 18,
			fontWeight: 'bold',
			dy: 2,
		});

		series.labels.template.adapters.add('fontSize', (fontSize, target) => {
			const radius = (target.dataItem?.dataContext as PartnershipNodeData | undefined)?.value ?? 0;
			if (radius < 25) return 11;
			if (radius < 28) return 13;
			if (radius < 32) return 16;
			return 18;
		});

		// --- ИСПРАВЛЕНИЕ 2: Используем тип ILinkDataItem из 'am5', а не 'am5hierarchy' ---
		series.links.template.adapters.add('stroke', (stroke, target) => {
			const linkDataItem = target.dataItem as am5.DataItem<am5.ILinkDataItem>;
			const targetNode = linkDataItem?.get('target');
			const color = (targetNode?.dataItem?.dataContext as PartnershipNodeData | undefined)?.color;
			return color ? am5.color(color) : stroke;
		});

		series.links.template.adapters.add('strokeWidth', (strokeWidth, target) => {
			const linkDataItem = target.dataItem as am5.DataItem<am5.ILinkDataItem>;
			const targetNode = linkDataItem?.get('target');
			const level =
				(targetNode?.dataItem?.dataContext as PartnershipNodeData | undefined)?.level ?? 0;
			if (level > 5) return 1.5;
			if (level > 4) return 2;
			return 2.5;
		});

		const chartData = transformDataForAmCharts(partnershipData);
		series.data.setAll([chartData]);
		series.set('selectedDataItem', series.dataItems[0]);

		return () => {
			root.dispose();
		};
	}, []);

	useLayoutEffect(() => {
		const series = chartRef.current;
		if (!series) return;

		series.nodes.each((node) => {
			if (node.dataItem) {
				const dataContext = node.dataItem.dataContext as PartnershipNodeData | undefined;
				const isHovered =
					dataContext && dataContext.level > 0 && dataContext.level === hoveredLevel;

				node.animate({
					key: 'scale',
					to: isHovered ? 1.15 : 1,
					duration: 300,
					easing: am5.ease.out(am5.ease.cubic),
				});
			}
		});
	}, [hoveredLevel]);

	return (
		<section
			id={LandingSections.partnershipProgram.id}
			className="w-full overflow-hidden bg-background-light py-20 sm:py-28"
		>
			<div className="container mx-auto grid max-w-screen-xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
				<div id="chartdiv" style={{ width: '100%', height: '600px' }}></div>
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
				>
					<h2 className="text-4xl font-extrabold text-text-primary sm:text-5xl">
						{partnershipData.title}{' '}
						<span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
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
							className="transform rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
						>
							{partnershipData.buttonText}
						</button>
					</div>
				</motion.div>
			</div>
		</section>
	);
};
