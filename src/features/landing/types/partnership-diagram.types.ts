export type PartnershipNodeData = {
	id: string;
	name: string;
	color: string;
	level: number;
	value: number;
	children?: PartnershipNodeData[];
};
