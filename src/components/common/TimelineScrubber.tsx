import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, ArrowRight, Play, Pause } from 'lucide-react';

interface TimelineScrubberProps {
  startYear: number;
  endYear: number;
  currentYear: number;
  onYearChange: (year: number) => void;
  majorEvents?: Array<{
    year: number;
    title: string;
    type: 'political' | 'military' | 'social' | 'economic' | 'cultural' | 'technological';
  }>;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  playbackSpeed?: number;
  className?: string;
}

const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  startYear,
  endYear,
  currentYear,
  onYearChange,
  majorEvents = [],
  isPlaying = false,
  onPlayPause,
  playbackSpeed: _playbackSpeed = 1,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  const totalYears = endYear - startYear;
  const progress = ((currentYear - startYear) / totalYears) * 100;

  // Generate decade markers
  const decadeMarkers = useMemo(() => {
    const markers = [];
    const startDecade = Math.ceil(startYear / 10) * 10;
    for (let year = startDecade; year <= endYear; year += 10) {
      if (year >= startYear) {
        markers.push(year);
      }
    }
    return markers;
  }, [startYear, endYear]);

  const handleSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value);
    onYearChange(newYear);
  }, [onYearChange]);

  const handleEventClick = useCallback((eventYear: number) => {
    onYearChange(eventYear);
  }, [onYearChange]);

  const jumpToYear = useCallback((direction: 'prev' | 'next') => {
    const step = Math.ceil(totalYears / 100); // Jump by 1% of total range
    const newYear = direction === 'prev' 
      ? Math.max(startYear, currentYear - step)
      : Math.min(endYear, currentYear + step);
    onYearChange(newYear);
  }, [currentYear, startYear, endYear, totalYears, onYearChange]);

  const getEventTypeColor = (type: string) => {
    const colorMap: Record<string, string> = {
      political: '#DC2626',
      military: '#059669',
      social: '#7C3AED',
      economic: '#EA580C',
      cultural: '#0891B2',
      technological: '#65A30D'
    };
    return colorMap[type] || '#6B7280';
  };

  return (
    <div className={`bg-slate-800 rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-white">Timeline Navigator</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Playback Controls */}
          {onPlayPause && (
            <button
              onClick={onPlayPause}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          )}
          
          {/* Current Year Display */}
          <div className="flex items-center space-x-2 bg-slate-700 px-4 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-white font-mono text-lg">{currentYear}</span>
          </div>
        </div>
      </div>

      {/* Year Range Display */}
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>{startYear}</span>
        <span>{endYear}</span>
      </div>

      {/* Main Timeline Slider */}
      <div className="relative mb-6">
        {/* Background Track */}
        <div className="h-2 bg-slate-700 rounded-full relative overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: isDragging ? 0 : 0.3 }}
          />
          
          {/* Major Events Markers */}
          {majorEvents.map((event, index) => {
            const eventProgress = ((event.year - startYear) / totalYears) * 100;
            const isHovered = hoveredEvent === index;
            
            return (
              <motion.div
                key={index}
                className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
                style={{ left: `${eventProgress}%` }}
                onClick={() => handleEventClick(event.year)}
                onMouseEnter={() => setHoveredEvent(index)}
                onMouseLeave={() => setHoveredEvent(null)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 border-white ${
                    isHovered ? 'scale-125' : ''
                  } transition-transform`}
                  style={{ backgroundColor: getEventTypeColor(event.type) }}
                />
                
                {/* Event Tooltip */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap z-10 border border-slate-600 shadow-lg"
                  >
                    <div className="font-semibold">{event.title}</div>
                    <div className="text-gray-400">{event.year}</div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-t border-slate-600"></div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Hidden Range Slider */}
        <input
          type="range"
          min={startYear}
          max={endYear}
          value={currentYear}
          onChange={handleSliderChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Current Year Indicator */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${progress}%` }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: isDragging ? 0 : 0.3 }}
        >
          <div className="w-4 h-4 bg-white rounded-full shadow-lg border-2 border-blue-500"></div>
        </motion.div>
      </div>

      {/* Decade Markers */}
      <div className="relative mb-4">
        <div className="flex justify-between text-xs text-gray-500">
          {decadeMarkers.map((decade) => {
            const decadeProgress = ((decade - startYear) / totalYears) * 100;
            return (
              <button
                key={decade}
                onClick={() => onYearChange(decade)}
                className="hover:text-white transition-colors cursor-pointer"
                style={{ position: 'absolute', left: `${decadeProgress}%`, transform: 'translateX(-50%)' }}
              >
                {decade}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => jumpToYear('prev')}
          disabled={currentYear <= startYear}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Previous</span>
        </button>

        <div className="text-center">
          <div className="text-xs text-gray-400 mb-1">Progress</div>
          <div className="text-sm font-mono text-white">
            {Math.round(progress)}% complete
          </div>
        </div>

        <button
          onClick={() => jumpToYear('next')}
          disabled={currentYear >= endYear}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <span className="text-sm">Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Event Legend */}
      {majorEvents.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="text-sm font-medium text-gray-300 mb-3">Event Types</div>
          <div className="flex flex-wrap gap-3">
            {Object.entries({
              political: 'Political',
              military: 'Military', 
              social: 'Social',
              economic: 'Economic',
              cultural: 'Cultural',
              technological: 'Technological'
            }).map(([type, label]) => (
              <div key={type} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getEventTypeColor(type) }}
                />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineScrubber;