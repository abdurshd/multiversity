import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import {
  GitBranch,
  Plus,
  X,
  Zap,
  TrendingUp,
  Globe,
  Clock,
  Percent,
  ArrowRight,
  Shuffle,
  Eye,
  BarChart3
} from 'lucide-react';
import { Timeline, Chapter, HistoricalEvent } from '../types';
import { allChapters } from '../data';
import { useTranslation } from 'react-i18next';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

const ComparisonMode: React.FC = () => {
  const { t } = useTranslation('pages-comparison-mode');
  const [selectedTimelines, setSelectedTimelines] = useState<Timeline[]>([]);
  const [availableChapters] = useState<Chapter[]>(allChapters);
  const [showSelector, setShowSelector] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions] = useState({ width: 1200, height: 800 });

  // Particle system for background
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    // Initialize particle system
    const createParticles = (): Particle[] => {
      const particles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3,
          size: Math.random() * 2 + 1
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const animateParticles = () => {
      const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Advanced D3 visualization for timeline comparison
  useEffect(() => {
    if (!svgRef.current || selectedTimelines.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 60, right: 60, bottom: 60, left: 60 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const allEvents = selectedTimelines.flatMap(t => t.keyEvents);
    const yearExtent = d3.extent(allEvents, d => d.year) as [number, number];

    const xScale = d3.scaleLinear()
      .domain(yearExtent)
      .range([0, width]);

    const yScale = d3.scaleBand()
      .domain(selectedTimelines.map(t => t.id))
      .range([0, height])
      .padding(0.2);

    // Create gradient definitions
    const defs = svg.append('defs');

    selectedTimelines.forEach(timeline => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${timeline.id}`)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', width).attr('y2', 0);

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', timeline.color)
        .attr('stop-opacity', 0.1);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', timeline.color)
        .attr('stop-opacity', 0.8);
    });

    // Create timeline paths with stunning animations
    selectedTimelines.forEach((timeline, timelineIndex) => {
      const timelineGroup = g.append('g')
        .attr('class', `timeline-${timeline.id}`);

      // Main timeline path
      const timelinePath = timelineGroup.append('path')
        .attr('d', `M 0 ${yScale(timeline.id)! + yScale.bandwidth() / 2} L ${width} ${yScale(timeline.id)! + yScale.bandwidth() / 2}`)
        .attr('stroke', `url(#gradient-${timeline.id})`)
        .attr('stroke-width', 8)
        .attr('filter', 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))')
        .style('opacity', 0);

      // Animate path drawing
      const pathLength = timelinePath.node()?.getTotalLength() || 0;
      timelinePath
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(2000)
        .delay(timelineIndex * 500 + (animationPhase * 500))
        .ease(d3.easeCubicInOut)
        .attr('stroke-dashoffset', 0)
        .style('opacity', 1);

      // Timeline label with glow effect
      timelineGroup.append('text')
        .attr('x', -10)
        .attr('y', yScale(timeline.id)! + yScale.bandwidth() / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .style('fill', timeline.color)
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('filter', 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))')
        .text(timeline.title)
        .style('opacity', 0)
        .transition()
        .duration(800)
        .delay(timelineIndex * 500 + 1000)
        .style('opacity', 1);

      // Event nodes with spectacular effects
      const events = timeline.keyEvents
        .filter(event => event.year >= yearExtent[0] && event.year <= yearExtent[1]);

      const eventGroups = timelineGroup.selectAll('.event-node')
        .data(events)
        .enter()
        .append('g')
        .attr('class', 'event-node')
        .attr('transform', d => `translate(${xScale(d.year)}, ${yScale(timeline.id)! + yScale.bandwidth() / 2})`);

      // Outer glow circle
      eventGroups.append('circle')
        .attr('r', 0)
        .attr('fill', 'none')
        .attr('stroke', timeline.color)
        .attr('stroke-width', 2)
        .attr('opacity', 0.3)
        .transition()
        .duration(800)
        .delay((_, i) => timelineIndex * 500 + 2000 + i * 100)
        .attr('r', 25);

      // Inner event circle
      eventGroups.append('circle')
        .attr('r', 0)
        .attr('fill', timeline.color)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .style('filter', 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))')
        .on('mouseover', function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 12)
            .style('filter', 'drop-shadow(0 0 15px rgba(255, 255, 255, 1))');

          // Show tooltip
          showTooltip(event, d, timeline);
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('r', 8)
            .style('filter', 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))');

          hideTooltip();
        })
        .transition()
        .duration(600)
        .delay((_, i) => timelineIndex * 500 + (animationPhase * 1000) + i * 100)
        .attr('r', 8);

      // Pulse animation for divergence points
      events.forEach((event) => {
        if (event.year === timeline.divergenceYear) {
          const divergenceGroup = timelineGroup.append('g')
            .attr('transform', `translate(${xScale(event.year)}, ${yScale(timeline.id)! + yScale.bandwidth() / 2})`);

          // Pulsing rings
          for (let i = 0; i < 3; i++) {
            divergenceGroup.append('circle')
              .attr('r', 8)
              .attr('fill', 'none')
              .attr('stroke', '#F59E0B')
              .attr('stroke-width', 2)
              .attr('opacity', 1)
              .transition()
              .duration(2000)
              .delay(i * 600)
              .ease(d3.easeCircleOut)
              .attr('r', 40)
              .attr('opacity', 0)
              .on('end', function () {
                // Repeat animation
                d3.select(this)
                  .attr('r', 8)
                  .attr('opacity', 1)
                  .transition()
                  .duration(2000)
                  .delay(1800)
                  .ease(d3.easeCircleOut)
                  .attr('r', 40)
                  .attr('opacity', 0);
              });
          }
        }
      });
    });

    // Create time axis with elegant styling
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format('d'))
      .ticks(10);

    g.append('g')
      .attr('transform', `translate(0, ${height + 20})`)
      .call(xAxis)
      .selectAll('text')
      .style('fill', '#9CA3AF')
      .style('font-size', '12px')
      .style('font-weight', '500');

    g.selectAll('.domain')
      .style('stroke', '#4B5563')
      .style('stroke-width', 2);

    g.selectAll('.tick line')
      .style('stroke', '#4B5563')
      .style('stroke-width', 1);

  }, [selectedTimelines, dimensions, animationPhase]);

  const showTooltip = (event: MouseEvent, data: HistoricalEvent, timeline: Timeline) => {
    const tooltip = d3.select('body').append('div')
      .attr('class', 'timeline-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0, 0, 0, 0.9)')
      .style('color', 'white')
      .style('padding', '12px')
      .style('border-radius', '8px')
      .style('border', `2px solid ${timeline.color}`)
      .style('font-size', '14px')
      .style('max-width', '300px')
      .style('z-index', '1000')
      .style('pointer-events', 'none')
      .style('opacity', 0);

    tooltip.html(`
      <div style="font-weight: bold; margin-bottom: 8px;">${data.title}</div>
      <div style="color: ${timeline.color}; margin-bottom: 4px;">${timeline.title}</div>
      <div style="opacity: 0.8; margin-bottom: 8px;">${data.year}</div>
      <div style="font-size: 12px; opacity: 0.9;">${data.description}</div>
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

  const toggleTimelineSelection = (timeline: Timeline) => {
    if (selectedTimelines.find(t => t.id === timeline.id)) {
      setSelectedTimelines(prev => prev.filter(t => t.id !== timeline.id));
    } else {
      setSelectedTimelines(prev => [...prev, timeline]);
    }
  };

  const removeTimeline = (timelineId: string) => {
    setSelectedTimelines(prev => prev.filter(t => t.id !== timelineId));
  };

  const clearAll = () => {
    setSelectedTimelines([]);
  };

  return (
    <div className="min-h-screen bg-blue-500/10 relative overflow-x-hidden">
      {/* Animated background canvas */}
      <canvas
        id="particle-canvas"
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-blue-500 opacity-10"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              transform: 'rotate(45deg)',
            }}
            animate={{
              rotate: [45, 135, 225, 315, 45],
              scale: [1, 1.2, 0.8, 1.1, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Header */}
        <motion.section
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="mb-8"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <GitBranch className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-blue-500 mx-auto mb-4" />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-200 mb-6"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.button
                onClick={() => setShowSelector(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-2xl text-sm sm:text-base"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">{t('buttons.add_timeline')}</span>
              </motion.button>

              {selectedTimelines.length > 0 && (
                <motion.button
                  onClick={clearAll}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-2xl text-sm sm:text-base"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Shuffle className="w-5 h-5" />
                  <span className="font-semibold">{t('buttons.clear_all')}</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Selected Timelines Overview */}
        {selectedTimelines.length > 0 && (
          <motion.section
            className="py-12 px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">{t('sections.selected_timelines')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <AnimatePresence>
                  {selectedTimelines.map((timeline, index) => (
                    <motion.div
                      key={timeline.id}
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative"
                    >
                      <motion.div
                        className="bg-slate-700 rounded-2xl p-4 sm:p-6 border-2 shadow-2xl relative overflow-hidden"
                        style={{ borderColor: timeline.color }}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 0 40px ${timeline.color}30`
                        }}
                      >
                        {/* Animated background gradient */}
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            background: `linear-gradient(45deg, ${timeline.color}00, ${timeline.color}40, ${timeline.color}00)`
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">{timeline.icon}</span>
                            <div className="flex items-center space-x-2">
                              <motion.div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: timeline.color }}
                                animate={{
                                  scale: [1, 1.2, 1],
                                  boxShadow: [`0 0 0px ${timeline.color}`, `0 0 20px ${timeline.color}`, `0 0 0px ${timeline.color}`]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <button
                                onClick={() => removeTimeline(timeline.id)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-white mb-2">{timeline.title}</h3>
                          <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">{timeline.description}</p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1 text-gray-400">
                              <Percent className="w-4 h-4" />
                              <span>{timeline.probability}% {t('stats.likely')}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{timeline.keyEvents.length} {t('stats.events')}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.section>
        )}

        {/* Main Visualization */}
        {selectedTimelines.length > 0 && (
          <motion.section
            className="py-12 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="max-w-full mx-auto">
              <div className="bg-dark-800/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white flex items-center space-x-3">
                    <BarChart3 className="w-8 h-8 text-primary-500" />
                    <span>{t('sections.timeline_visualization')}</span>
                  </h2>
                  <div className="text-sm text-gray-400">
                    {selectedTimelines.length} {selectedTimelines.length !== 1 ? t('stats.timelines') : t('stats.timeline')} {t('stats.selected')}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <svg
                    ref={svgRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="timeline-comparison-svg"
                    style={{ minWidth: '1200px' }}
                  />
                </div>

                {/* Interactive controls */}
                <div className="mt-8 flex justify-center space-x-4">
                  <motion.button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAnimationPhase(prev => prev + 1)}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t('buttons.animate')}</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Timeline Insights */}
        {selectedTimelines.length > 1 && (
          <motion.section
            className="py-12 px-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">{t('sections.timeline_insights')}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Probability comparison */}
                <motion.div
                  className="bg-green-700 rounded-2xl p-6 text-white"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrendingUp className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('insights.most_likely')}</h3>
                  <p className="text-green-100">
                    {selectedTimelines.reduce((max, t) => t.probability > max.probability ? t : max).title}
                  </p>
                  <p className="text-green-200 text-sm mt-2">
                    {Math.max(...selectedTimelines.map(t => t.probability))}% {t('stats.probability')}
                  </p>
                </motion.div>

                {/* Divergence comparison */}
                <motion.div
                  className="bg-yellow-600 rounded-2xl p-6 text-white"
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Zap className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('insights.earliest_divergence')}</h3>
                  <p className="text-yellow-100">
                    {selectedTimelines.reduce((min, t) => t.divergenceYear < min.divergenceYear ? t : min).title}
                  </p>
                  <p className="text-yellow-200 text-sm mt-2">
                    {t('insights.diverges_in')} {Math.min(...selectedTimelines.map(t => t.divergenceYear))}
                  </p>
                </motion.div>

                {/* Impact comparison */}
                <motion.div
                  className="bg-purple-700 rounded-2xl p-6 text-white"
                  whileHover={{ scale: 1.02, rotate: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Globe className="w-8 h-8 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{t('insights.most_events')}</h3>
                  <p className="text-purple-100">
                    {selectedTimelines.reduce((max, t) => t.keyEvents.length > max.keyEvents.length ? t : max).title}
                  </p>
                  <p className="text-purple-200 text-sm mt-2">
                    {Math.max(...selectedTimelines.map(t => t.keyEvents.length))} {t('stats.events')}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Empty state */}
        {selectedTimelines.length === 0 && (
          <motion.section
            className="py-20 px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="max-w-2xl mx-auto">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <GitBranch className="w-32 h-32 text-gray-600 mx-auto mb-8" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">{t('sections.no_timelines_selected')}</h2>
              <p className="text-xl text-gray-400 mb-8">
                {t('empty_state.description')}
              </p>
              <motion.button
                onClick={() => setShowSelector(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full transition-all duration-300 flex items-center space-x-3 mx-auto shadow-2xl"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 50px rgba(59, 130, 246, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-6 h-6" />
                <span className="text-lg font-semibold">{t('buttons.add_first_timeline')}</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.section>
        )}
      </div>

      {/* Timeline Selector Modal */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-800 rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-y-auto border-2 border-blue-500 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">{t('sections.select_timelines_to_compare')}</h2>
                  <button
                    onClick={() => setShowSelector(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {availableChapters.map(chapter => (
                  <div key={chapter.id} className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <span className="text-2xl">{chapter.icon}</span>
                      <span>{chapter.title}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {chapter.alternativeTimelines.map((timeline, index) => {
                        const isSelected = selectedTimelines.find(t => t.id === timeline.id);

                        return (
                          <motion.div
                            key={timeline.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                              relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300
                              ${isSelected
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-gray-600 bg-dark-700 hover:border-blue-500 hover:bg-blue-500/10'
                              }
                            `}
                            onClick={() => toggleTimelineSelection(timeline)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                              >
                                ✓
                              </motion.div>
                            )}

                            <div className="flex items-center space-x-3 mb-3">
                              <span className="text-2xl">{timeline.icon}</span>
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: timeline.color }}
                              />
                            </div>

                            <h4 className="text-lg font-semibold text-white mb-2">{timeline.title}</h4>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">{timeline.description}</p>

                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>{timeline.probability}% likely</span>
                              <span>{timeline.keyEvents.length} events</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonMode;
