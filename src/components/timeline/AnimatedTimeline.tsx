import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { HistoricalEvent, Timeline } from '../../types';
import { useTranslation } from 'react-i18next';

interface AnimatedTimelineProps {
  timeline: Timeline;
  startYear: number;
  endYear: number;
  onEventClick?: (event: HistoricalEvent) => void;
  showOnLoad?: boolean;
  animationDelay?: number;
  compactMode?: boolean;
}

// Event type colors - Brighter, more neon-like for dark mode
const eventTypeColors: Record<string, string> = {
  political: '#60A5FA', // Blue-400
  military: '#F87171',  // Red-400
  social: '#34D399',    // Emerald-400
  economic: '#FBBF24',  // Amber-400
  cultural: '#A78BFA',  // Violet-400
  technological: '#22D3EE' // Cyan-400
};

const TIMELINE_DIMENSIONS = {
  width: 800,
  height: 350, // Increased height for better spacing and vertical stems
} as const;

export default function AnimatedTimeline({
  timeline,
  startYear,
  endYear,
  onEventClick,
  showOnLoad = true,
  animationDelay = 100,
}: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { t } = useTranslation('components-animated-timeline');
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Responsive dimensions
    const isMobile = width < 640;
    const margin = {
      top: 80,
      right: isMobile ? 20 : 60,
      bottom: isMobile ? 100 : 80, // More bottom space for wrapped legend
      left: isMobile ? 20 : 60
    };

    // Calculate height based on width to maintain aspect ratio but ensure minimum height
    const baseHeight = TIMELINE_DIMENSIONS.height;
    const height = isMobile ? 400 : baseHeight; // Taller on mobile for vertical spacing

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add definitions for glow effects
    const defs = svg.append('defs');

    // Strong Neon Glow Filter
    const glowFilter = defs.append('filter')
      .attr('id', 'neon-glow')
      .attr('x', '-100%')
      .attr('y', '-100%')
      .attr('width', '300%')
      .attr('height', '300%');

    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3.5')
      .attr('result', 'coloredBlur');

    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur'); // Double blur for intensity
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Subtle Glow Filter for text
    const textGlowFilter = defs.append('filter')
      .attr('id', 'text-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    textGlowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '1.5')
      .attr('result', 'coloredBlur');

    const textMerge = textGlowFilter.append('feMerge');
    textMerge.append('feMergeNode').attr('in', 'coloredBlur');
    textMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Gradient for the main line
    const lineGradient = defs.append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', innerWidth)
      .attr('y2', 0);

    lineGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0);

    lineGradient.append('stop')
      .attr('offset', '15%')
      .attr('stop-color', '#60A5FA')
      .attr('stop-opacity', 1);

    lineGradient.append('stop')
      .attr('offset', '85%')
      .attr('stop-color', '#60A5FA')
      .attr('stop-opacity', 1);

    lineGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#3B82F6')
      .attr('stop-opacity', 0);

    // Background Radial Gradient for depth
    const bgGradient = defs.append('radialGradient')
      .attr('id', 'bg-gradient')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');

    bgGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#1E293B') // Slate-800
      .attr('stop-opacity', 0.3);

    bgGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0F172A') // Slate-900
      .attr('stop-opacity', 0);

    // Draw subtle background glow
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#bg-gradient)');

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Filter events within the time range
    const events = timeline.keyEvents
      .filter(event => event.year >= startYear && event.year <= endYear)
      .sort((a, b) => a.year - b.year);

    // Create scale
    const xScale = d3.scaleLinear()
      .domain([startYear, endYear])
      .range([0, innerWidth]);

    // --- Draw Main Timeline (Neon Tube Effect) ---

    // 1. Dark core background
    g.append('line')
      .attr('x1', 0)
      .attr('y1', innerHeight / 2)
      .attr('x2', innerWidth)
      .attr('y2', innerHeight / 2)
      .attr('stroke', '#0F172A')
      .attr('stroke-width', 6)
      .attr('stroke-linecap', 'round');

    // 2. Colored glow layer (wide)
    g.append('line')
      .attr('x1', 0)
      .attr('y1', innerHeight / 2)
      .attr('x2', innerWidth)
      .attr('y2', innerHeight / 2)
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 4)
      .attr('stroke-linecap', 'round')
      .style('filter', 'blur(4px)')
      .style('opacity', 0.6);

    // 3. Main visible line
    g.append('line')
      .attr('x1', 0)
      .attr('y1', innerHeight / 2)
      .attr('x2', innerWidth)
      .attr('y2', innerHeight / 2)
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 2)
      .attr('stroke-linecap', 'round')
      .style('filter', 'url(#neon-glow)');

    // 4. White hot core (thin)
    g.append('line')
      .attr('x1', 0)
      .attr('y1', innerHeight / 2)
      .attr('x2', innerWidth)
      .attr('y2', innerHeight / 2)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 0.5)
      .attr('stroke-linecap', 'round')
      .style('opacity', 0.8);

    // --- Year Ticks ---
    // Reduce ticks on mobile
    const ticks = xScale.ticks(isMobile ? 3 : 5);
    g.selectAll('.tick')
      .data(ticks)
      .enter()
      .append('g')
      .attr('class', 'tick')
      .attr('transform', d => `translate(${xScale(d)}, ${innerHeight / 2})`)
      .each(function (d) {
        const tick = d3.select(this);

        // Tick mark (small dot)
        tick.append('circle')
          .attr('r', 2)
          .attr('fill', '#475569') // Slate-600
          .style('opacity', 0.8);

        // Year label
        tick.append('text')
          .attr('y', 35)
          .attr('text-anchor', 'middle')
          .style('fill', '#94A3B8') // Slate-400
          .style('font-size', '11px')
          .style('font-family', '"JetBrains Mono", monospace') // Technical font
          .style('font-weight', '500')
          .text(d);
      });

    // --- Timeline Title ---
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .style('font-size', isMobile ? '18px' : '24px')
      .style('font-weight', '800')
      .style('fill', '#F8FAFC') // Slate-50
      .style('text-transform', 'uppercase')
      .style('letter-spacing', '0.15em')
      .style('filter', 'url(#text-glow)')
      .text(timeline.title);

    // --- Event Nodes ---
    const eventGroups = g.selectAll('.event-node')
      .data(events)
      .enter()
      .append('g')
      .attr('class', 'event-node')
      .attr('transform', d => `translate(${xScale(d.year)}, ${innerHeight / 2})`);

    // Vertical Stems (Gradient Fade)
    const stemGradientId = (d: HistoricalEvent) => `stem-gradient-${d.id}`;

    eventGroups.each(function (d) {
      const group = d3.select(this);
      const isTop = events.indexOf(d) % 2 === 0;
      // Reduce offset on mobile to keep it compact
      const yOffset = isTop ? (isMobile ? -30 : -40) : (isMobile ? 30 : 40);
      const color = eventTypeColors[d.type] || eventTypeColors.political;

      // Define gradient for stem
      const gradient = defs.append('linearGradient')
        .attr('id', stemGradientId(d))
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', yOffset);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0); // Fade out near main line

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', color)
        .attr('stop-opacity', 0.8); // Solid near node

      // Draw Stem
      group.append('line')
        .attr('y1', 0)
        .attr('y2', yOffset)
        .attr('stroke', `url(#${stemGradientId(d)})`)
        .attr('stroke-width', 1.5);

      // Node Group (Container for circle animations)
      const nodeGroup = group.append('g')
        .attr('transform', `translate(0, ${yOffset})`)
        .style('cursor', 'pointer');

      // 1. Outer Ripple Ring (Animated on Hover)
      const ripple = nodeGroup.append('circle')
        .attr('r', 8)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1)
        .style('opacity', 0);

      // 2. Glow Halo
      nodeGroup.append('circle')
        .attr('r', 8)
        .attr('fill', color)
        .attr('fill-opacity', 0.3)
        .style('filter', 'url(#neon-glow)');

      // 3. Core
      nodeGroup.append('circle')
        .attr('r', 4)
        .attr('fill', '#0F172A')
        .attr('stroke', color)
        .attr('stroke-width', 2);

      // Interactions
      nodeGroup
        .on('mouseover', function (event) {
          // Animate Ripple
          ripple
            .style('opacity', 1)
            .attr('r', 8)
            .transition()
            .duration(1000)
            .ease(d3.easeCubicOut)
            .attr('r', 20)
            .style('opacity', 0)
            .on('end', function repeat() { // Loop the ripple
              d3.select(this)
                .attr('r', 8)
                .style('opacity', 1)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr('r', 20)
                .style('opacity', 0)
                .on('end', repeat);
            });

          // Scale up core
          d3.select(this).selectAll('circle:not(:first-child)') // Select core and halo
            .transition()
            .duration(200)
            .attr('transform', 'scale(1.2)');

          showTooltip(event, d);
        })
        .on('mouseout', function () {
          // Stop Ripple
          ripple.interrupt().style('opacity', 0).attr('r', 8);

          // Scale down
          d3.select(this).selectAll('circle:not(:first-child)')
            .transition()
            .duration(200)
            .attr('transform', 'scale(1)');

          hideTooltip();
        })
        .on('click', () => onEventClick && onEventClick(d));
    });

    // --- Divergence Point (HUD Style) ---
    const divergenceEvent = events.find(e => e.year === timeline.divergenceYear);
    if (divergenceEvent) {
      const divergenceGroup = g.append('g')
        .attr('transform', `translate(${xScale(divergenceEvent.year)}, ${innerHeight / 2})`);

      // Pulse Ring
      divergenceGroup.append('circle')
        .attr('r', 15)
        .attr('fill', 'none')
        .attr('stroke', '#F59E0B') // Amber
        .attr('stroke-width', 2)
        .style('opacity', 0)
        .transition()
        .duration(1500)
        .delay(500)
        .on('start', function repeat() {
          d3.select(this)
            .attr('r', 10)
            .style('opacity', 0.8)
            .transition()
            .duration(1500)
            .attr('r', 35)
            .style('opacity', 0)
            .on('end', repeat);
        });

      // Label Group
      const labelGroup = divergenceGroup.append('g')
        .attr('transform', 'translate(0, -70)')
        .style('opacity', 0);

      // HUD Brackets
      const bracketPath = `M -40 10 L -45 10 L -45 -10 L -40 -10 M 40 10 L 45 10 L 45 -10 L 40 -10`;
      labelGroup.append('path')
        .attr('d', bracketPath)
        .attr('stroke', '#F59E0B')
        .attr('stroke-width', 1.5)
        .attr('fill', 'none')
        .style('filter', 'url(#neon-glow)');

      // Label Text
      labelGroup.append('text')
        .attr('x', 0)
        .attr('y', 4)
        .attr('text-anchor', 'middle')
        .style('fill', '#F59E0B')
        .style('font-size', '12px')
        .style('font-weight', '700')
        .style('font-family', '"JetBrains Mono", monospace')
        .style('letter-spacing', '2px')
        .text(t('divergence_label'));

      labelGroup.transition()
        .duration(800)
        .delay(1000)
        .style('opacity', 1);
    }

    // --- Legend ---
    const legendData = Object.entries(eventTypeColors);
    const legendItemWidth = 110;
    const legendRowHeight = 25;

    // Calculate layout
    const maxItemsPerRow = Math.floor(width / legendItemWidth);
    const itemsPerRow = isMobile ? Math.min(2, maxItemsPerRow) : maxItemsPerRow;
    const totalRows = Math.ceil(legendData.length / itemsPerRow);

    // Center the block of legend items
    const legendBlockWidth = Math.min(legendData.length, itemsPerRow) * legendItemWidth;
    const legendX = (width - legendBlockWidth) / 2;
    const legendY = height - (totalRows * legendRowHeight) - 20;

    const legend = svg.append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`);

    legendData.forEach(([type, color], i) => {
      const row = Math.floor(i / itemsPerRow);
      const col = i % itemsPerRow;

      const legendItem = legend.append('g')
        .attr('transform', `translate(${col * legendItemWidth}, ${row * legendRowHeight})`)
        .style('cursor', 'default');

      legendItem.append('circle')
        .attr('r', 4)
        .attr('fill', color)
        .style('filter', 'url(#neon-glow)');

      legendItem.append('text')
        .attr('x', 10)
        .attr('y', 4)
        .style('font-size', '11px')
        .style('fill', '#94A3B8') // Slate-400
        .style('text-transform', 'capitalize')
        .style('font-family', '"JetBrains Mono", monospace')
        .text(type);
    });

  }, [timeline, startYear, endYear, showOnLoad, animationDelay, onEventClick, t, width]);

  const showTooltip = (event: MouseEvent, data: HistoricalEvent) => {
    const tooltip = d3.select('body').append('div')
      .attr('class', 'timeline-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(15, 23, 42, 0.8)') // Slate-900 transparent
      .style('backdrop-filter', 'blur(12px)') // Stronger blur
      .style('border', '1px solid rgba(255, 255, 255, 0.1)')
      .style('border-top', '1px solid rgba(255, 255, 255, 0.2)') // Top highlight
      .style('border-radius', '12px')
      .style('padding', '16px')
      .style('box-shadow', '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)') // Deep shadow
      .style('z-index', '1000')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('max-width', '280px')
      .style('transform', 'translateY(10px)')
      .style('transition', 'all 0.2s ease-out');

    tooltip.html(`
      <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: ${eventTypeColors[data.type] || '#fff'}; box-shadow: 0 0 10px ${eventTypeColors[data.type]};"></div>
        <div style="font-weight: 700; color: #F8FAFC; font-size: 14px; letter-spacing: 0.02em;">${data.title}</div>
      </div>
      <div style="color: #60A5FA; margin-bottom: 6px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 600;">${data.year}</div>
      <div style="color: #CBD5E1; line-height: 1.5; font-size: 12px;">${data.description}</div>
    `);

    // Animate in
    requestAnimationFrame(() => {
      tooltip
        .style('opacity', 1)
        .style('transform', 'translateY(0)');
    });

    tooltip.style('left', (event.pageX + 20) + 'px')
      .style('top', (event.pageY - 20) + 'px');
  };

  const hideTooltip = () => {
    d3.selectAll('.timeline-tooltip').remove();
  };

  return (
    <div
      ref={containerRef}
      className="w-full bg-slate-950/80 rounded-2xl border border-white/5 shadow-2xl overflow-hidden backdrop-blur-sm"
    >
      <svg
        ref={svgRef}
        width={width}
        height={width < 640 ? 400 : TIMELINE_DIMENSIONS.height}
        className="w-full"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
