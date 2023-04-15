import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  title = 'Dynamic Bar Chart using D3.js';
  chartData = [];

  constructor() { }

  ngOnInit(): void {
    // Generate some random data for the chart
    this.chartData = [];
    for (let i = 0; i < 20; i++) { // увеличили количество данных до 20
      this.chartData.push(Math.random() * 10);
    }

    // Set up the chart
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const xAxis = d3.axisBottom(x);

    const yAxis = d3.axisLeft(y)
      .ticks(10, '%');

    const svg = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    x.domain(this.chartData.map((d, i) => i.toString()));
    y.domain([0, d3.max(this.chartData)]);

    // Set custom tick values for x-axis
    const tickValues = [];
    const increment = Math.ceil(this.chartData.length / 10);
    for (let i = 0; i < this.chartData.length; i += increment) {
      tickValues.push(i);
    }
    xAxis.tickValues(tickValues);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Frequency');

    svg.selectAll('.bar')
      .data(this.chartData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => x(i.toString()))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d))
      .attr('height', d => height - y(d));
  }
}
