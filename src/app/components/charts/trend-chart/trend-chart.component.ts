import {
	Component,
	OnChanges,
	AfterViewInit,
	Input,
	ElementRef,
	ViewChild,
	ViewEncapsulation
} from '@angular/core';
import { TrendChartConfig } from './trend-chart-config';
import * as D3 from 'd3';
import * as Moment from 'moment';

@Component({
  selector: 'trend-chart-component',
  templateUrl: './trend-chart.component.html',
  styleUrls: ['./trend-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TrendChartComponent implements OnChanges, AfterViewInit {

	@Input() config: Array<TrendChartConfig>;
	@ViewChild('container') element: ElementRef;

	private host;        // D3 object referencing host dom object
	private svg;         // SVG in which we will print our chart
	private margin;      // Space between the svg borders and the actual chart graphic
	private width;       // Component width
	private height;      // Component height
	private xScale;      // D3 scale in X
	private yScale;      // D3 scale in Y
	private xAxis;       // D3 X Axis
	private yAxis;       // D3 Y Axis
	private htmlElement: HTMLElement; // Host HTMLElement

	/**
	* We request angular for the element reference 
	* and then we create a D3 Wrapper for our host element
	**/
	constructor() {}

	ngAfterViewInit() {
		this.htmlElement = this.element.nativeElement;
		this.host        = D3.select(this.htmlElement);
		this.setup();
	}

	/**
	* Everythime the @Input is updated, we rebuild the chart
	**/
	ngOnChanges(): void {
		if (!this.config || this.config.length === 0 || !this.host) return;
		this.setup();
		this.buildSVG();
		this.populate();
		this.drawXAxis();
		this.drawYAxis();
	}

	/**
	* Basically we get the dom element size and build the container configs
	* also we create the xScale and yScale ranges depending on calculations
	**/
	private setup(): void {
		this.margin = { top: 0, right: 10, bottom: 60, left: 50 };
		this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
		this.height = this.width * 0.5 - this.margin.top - this.margin.bottom;
		this.xScale = D3.time.scale().range([0, this.width]);
		this.yScale = D3.scale.linear().range([this.height, 0]);
	}

	/**
	* We can now build our SVG element using the configurations we created
	**/
	private buildSVG(): void {
		this.host.html('');
		this.svg = this.host.append('svg')
		  .attr('width', this.width + this.margin.left + this.margin.right)
		  .attr('height', this.height + this.margin.top + this.margin.bottom)
		  .append('g')
		  .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
	}

	/**
	* Method to create the X Axis, will use Month, Year as tick date format
	* Also adding some classes for CSS Stylimg
	**/
	private drawXAxis(): void {
		this.xAxis = D3.svg.axis().scale(this.xScale)
		  .tickFormat(t => Moment(t).format('MMM, YYYY').toUpperCase())
		  .tickPadding(15)
		  .ticks(10);
		this.svg.append('g')
		  .attr('class', 'x axis')
		  .attr('transform', 'translate(0,' + this.height + ')')
		  .call(this.xAxis)
		  .selectAll('text')  
            .style('text-anchor', 'end')
            .attr('dx', '60')
            .attr('dy', '-10')
            .attr('transform', 'rotate(60)');
	}

	/**
	* Method to create the Y Axis, will use numeric values as tick date format
	* Also adding some classes for CSS Stylimg and rotating the axis vertically
	**/
	private drawYAxis(): void {
		this.yAxis = D3.svg.axis().scale(this.yScale)
		  .orient('left')
		  .tickPadding(10)
		  .ticks(10);
		this.svg.append('g')
		  .attr('class', 'y axis')
		  .call(this.yAxis)
		  .selectAll('text')
		  	.attr('dx', '5');
	}

	/**
	* Will return the maximum value in any dataset inserted, so we use
	* it later for the maximum number in the Y Axis
	**/
	private getMaxY(): number {
		let maxValuesOfAreas = [];
		this.config.forEach(data => maxValuesOfAreas.push(Math.max.apply(Math, data.dataset.map(d => d.y))));
		return Math.max(...maxValuesOfAreas);
	}

	/**
	* Now we populate using our dataset, mapping the x and y values
	* into the x and y domains, also we set the interpolation so we decide
	* how the Area Chart is plotted.
	**/
	private populate(): void {
		this.config.forEach((area: any) => {
		  this.xScale.domain(D3.extent(area.dataset, (d: any) => d.x));
		  this.yScale.domain([0, this.getMaxY()]);
		  this.svg.append('path')
		    .datum(area.dataset)
		    .attr('class', 'area')
		    .style('fill', area.settings.fill)
		    .attr('d', D3.svg.area()
		      .x((d: any) => this.xScale(d.x))
		      .y0(this.height)
		      .y1((d: any) => this.yScale(d.y))
		      .interpolate(area.settings.interpolation));
		});
	}
}
