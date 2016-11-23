export interface TrendChartConfig { 
	settings: { fill: string, interpolation: string };
	dataset: Array<{ x: Date, y: number }>
}