import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Timeline } from '../../types';

interface AnimatedTimelineProps {
  timeline: Timeline;
  startYear: number;
  endYear: number;
  onEventClick?: (event: any) => void;
  showOnLoad?: boolean;
  animationDelay?: number;
  compactMode?: boolean;
}

// Event type colors matching the compare page
const eventTypeColors: Record<string, string> = {
  political: '#3B82F6',
  military: '#EF4444',
  social: '#10B981',
  economic: '#F59E0B',
  cultural: '#8B5CF6',
  technological: '#06B6D4'
};

export default function AnimatedTimeline({
  timeline,
  startYear,
  endYear,
  onEventClick,
  showOnLoad = true,
  animationDelay = 100,
  compactMode = false
}: AnimatedTimelineProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dimensions = { width: 800, height: 200 };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 40, right: 40, bottom: 60, left: 40 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Filter events within the time range
    const events = timeline.keyEvents
      .filter(event => event.year >= startYear && event.year <= endYear)
      .sort((a, b) => a.year - b.year);

    // Create scale
    const xScale = d3.scaleLinear()
      .domain([startYear, endYear])
      .range([0, width]);

    // Draw main timeline line
    g.append('line')
      .attr('x1', 0)
      .attr('y1', height / 2)
      .attr('x2', width)
      .attr('y2', height / 2)
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', 2);

    // Add year labels at start and end
    g.append('text')
      .attr('x', 0)
      .attr('y', height + 30)
      .attr('text-anchor', 'start')
      .style('fill', '#6B7280')
      .style('font-size', '12px')
      .text(startYear);

    g.append('text')
      .attr('x', width)
      .attr('y', height + 30)
      .attr('text-anchor', 'end')
      .style('fill', '#6B7280')
      .style('font-size', '12px')
      .text(endYear);

    // Add timeline title
    svg.append('text')
      .attr('x', dimensions.width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#111827')
      .text(timeline.title);

    // Add event count
    svg.append('text')
      .attr('x', dimensions.width / 2)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', '#6B7280')
      .text(`${events.length} Events`);

    // Create event groups
    const eventGroups = g.selectAll('.event-node')
      .data(events)
      .enter()
      .append('g')
      .attr('class', 'event-node')
      .attr('transform', d => `translate(${xScale(d.year)}, ${height / 2})`);

    // Add event circles
    eventGroups.append('circle')
      .attr('r', 0)
      .attr('fill', d => eventTypeColors[d.type] || eventTypeColors.political)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 8);
        
        // Show tooltip
        showTooltip(event, d);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', 6);
        
        hideTooltip();
      })
      .on('click', function(event, d) {
        if (onEventClick) onEventClick(d);
      })
      .transition()
      .duration(600)
      .delay((_, i) => showOnLoad ? i * animationDelay : 0)
      .attr('r', 6);

    // Highlight divergence point if it exists
    const divergenceEvent = events.find(e => e.year === timeline.divergenceYear);
    if (divergenceEvent) {
      const divergenceGroup = g.append('g')
        .attr('transform', `translate(${xScale(divergenceEvent.year)}, ${height / 2})`);

      // Add divergence point marker
      divergenceGroup.append('rect')
        .attr('x', -30)
        .attr('y', -40)
        .attr('width', 60)
        .attr('height', 25)
        .attr('rx', 4)
        .attr('fill', '#F59E0B')
        .style('opacity', 0)
        .transition()
        .duration(800)
        .delay(events.length * animationDelay)
        .style('opacity', 1);

      divergenceGroup.append('text')
        .attr('x', 0)
        .attr('y', -22)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .text('Divergence')
        .style('opacity', 0)
        .transition()
        .duration(800)
        .delay(events.length * animationDelay)
        .style('opacity', 1);
    }

    // Add legend
    const legendData = Object.entries(eventTypeColors);
    const legendWidth = 100;
    const legendX = (dimensions.width - (legendData.length * legendWidth)) / 2;

    const legend = svg.append('g')
      .attr('transform', `translate(${legendX}, ${dimensions.height - 20})`);

    legendData.forEach(([type, color], i) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(${i * legendWidth}, 0)`);

      legendItem.append('circle')
        .attr('r', 5)
        .attr('fill', color);

      legendItem.append('text')
        .attr('x', 10)
        .attr('y', 4)
        .style('font-size', '11px')
        .style('fill', '#6B7280')
        .text(type.charAt(0).toUpperCase() + type.slice(1));
    });

  }, [timeline, startYear, endYear, showOnLoad, animationDelay]);

  const showTooltip = (event: any, data: any) => {
    const tooltip = d3.select('body').append('div')
      .attr('class', 'timeline-tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('border', '1px solid #E5E7EB')
      .style('border-radius', '6px')
      .style('padding', '12px')
      .style('font-size', '12px')
      .style('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1)')
      .style('z-index', '1000')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    tooltip.html(`
      <div style="font-weight: bold; margin-bottom: 4px;">${data.title}</div>
      <div style="color: #6B7280; margin-bottom: 2px;">${data.year}</div>
      <div style="color: #6B7280;">${data.description}</div>
    `);

    tooltip.transition()
      .duration(200)
      .style('opacity', 1);

    tooltip.style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px');
  };

  const hideTooltip = () => {
    d3.selectAll('.timeline-tooltip').remove();
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}