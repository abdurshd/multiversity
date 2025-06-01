import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoricalEvent, TimelineVisualizationProps } from '../../types';

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  timeline,
  startYear: propStartYear,
  endYear: propEndYear,
  width,
  height,
  onEventClick,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<HistoricalEvent | null>(null);

  const events = timeline.keyEvents.sort((a, b) => a.year - b.year);
  const startYear = propStartYear || events[0]?.year || 1900;
  const endYear = propEndYear || events[events.length - 1]?.year || 2000;
  const totalYears = endYear - startYear;

  const getEventPosition = (event: HistoricalEvent, index: number) => {
    const yearProgress = (event.year - startYear) / totalYears;
    const x = width * 0.1 + yearProgress * (width * 0.8);
    const y = height * 0.25 + (index % 2) * (height * 0.15);
    return { x, y };
  };

  const getEventColor = (eventType: string) => {
    const colorMap: Record<string, string> = {
      political: '#DC2626',
      military: '#7F1D1D',
      economic: '#F59E0B',
      social: '#059669',
      cultural: '#8B5CF6',
      technological: '#06B6D4'
    };
    return colorMap[eventType] || '#6B7280';
  };

  const handleEventClick = (event: HistoricalEvent) => {
    setSelectedEvent(event);
    onEventClick?.(event);
  };

  return (
    <div className="relative w-full bg-dark-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-dark-700 to-dark-900" />
      
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary-500/10 to-transparent animate-pulse" />
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={timeline.color} stopOpacity="0.3" />
            <stop offset="50%" stopColor={timeline.color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={timeline.color} stopOpacity="0.3" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <line
          x1={width * 0.1}
          y1={height * 0.55}
          x2={width * 0.9}
          y2={height * 0.55}
          stroke="url(#timelineGradient)"
          strokeWidth="4"
          filter="url(#glow)"
        />

        {Array.from({ length: 6 }, (_, i) => {
          const year = startYear + (totalYears * i) / 5;
          const x = width * 0.1 + (i * width * 0.8) / 5;
          return (
            <g key={year}>
              <line
                x1={x}
                y1={height * 0.53}
                x2={x}
                y2={height * 0.57}
                stroke={timeline.color}
                strokeWidth="2"
              />
              <text
                x={x}
                y={height * 0.6}
                textAnchor="middle"
                className="fill-gray-300 text-xs font-semibold"
              >
                {Math.round(year)}
              </text>
            </g>
          );
        })}

        {events.map((event, index) => {
          const { x, y } = getEventPosition(event, index);
          const isHovered = hoveredEvent?.id === event.id;
          const isSelected = selectedEvent?.id === event.id;
          const eventColor = getEventColor(event.type);

          return (
            <g key={event.id}>
              <line
                x1={x}
                y1={y}
                x2={x}
                y2="275"
                stroke={eventColor}
                strokeWidth="2"
                strokeDasharray="5,5"
                opacity="0.6"
                className="transition-all duration-300"
              />

              <motion.circle
                cx={x}
                cy={y}
                r={isHovered || isSelected ? 12 : 8}
                fill={eventColor}
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="url(#glow)"
                className="cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => handleEventClick(event)}
              />

              <text
                x={x}
                y={y - 20}
                textAnchor="middle"
                className="fill-white text-xs font-bold pointer-events-none"
              >
                {event.year}
              </text>

              <AnimatePresence>
                {(isHovered || isSelected) && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <rect
                      x={x - 80}
                      y={y + 20}
                      width="160"
                      height="40"
                      rx="8"
                      fill="rgba(0, 0, 0, 0.9)"
                      stroke={eventColor}
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={y + 35}
                      textAnchor="middle"
                      className="fill-white text-xs font-semibold pointer-events-none"
                    >
                      {event.title.length > 25 
                        ? `${event.title.substring(0, 25)}...`
                        : event.title}
                    </text>
                    <text
                      x={x}
                      y={y + 50}
                      textAnchor="middle"
                      className="fill-gray-300 text-xs pointer-events-none"
                    >
                      {event.type.toUpperCase()}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          );
        })}

        <text
          x="500"
          y="50"
          textAnchor="middle"
          className="fill-white text-xl font-bold"
        >
          {timeline.title}
        </text>

        <text
          x="500"
          y="90"
          textAnchor="middle"
          className="text-4xl"
        >
          {timeline.icon}
        </text>

        <g>
          <rect
            x="850"
            y="30"
            width="120"
            height="30"
            rx="15"
            fill={timeline.color}
            opacity="0.9"
          />
          <text
            x="910"
            y="50"
            textAnchor="middle"
            className="fill-white text-sm font-bold"
          >
            {timeline.probability}% Likely
          </text>
        </g>
      </svg>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-dark-700 rounded-lg p-6 border border-gray-600"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedEvent.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>{selectedEvent.year}</span>
                  <span className="px-2 py-1 bg-primary-600 rounded-full text-xs">
                    {selectedEvent.type.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-300 mb-4">
              {selectedEvent.description}
            </p>
            
            <div className="bg-dark-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-primary-400 mb-2">Impact</h4>
              <p className="text-sm text-gray-300">
                {selectedEvent.impact}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-4 bg-dark-700/90 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-2">Event Types</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries({
            political: '#DC2626',
            military: '#7F1D1D',
            economic: '#F59E0B',
            social: '#059669',
            cultural: '#8B5CF6',
            technological: '#06B6D4'
          }).map(([type, color]) => (
            <div key={type} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-300 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;