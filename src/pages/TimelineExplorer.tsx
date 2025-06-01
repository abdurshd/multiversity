import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  TrendingUp, 
  GitBranch, 
  Clock,
  Zap,
  Globe,
  BookOpen
} from 'lucide-react';
import { Chapter, Timeline, HistoricalEvent } from '../types';
import { getChapterById, getTimelineById } from '../data';
import TimelineVisualization from '../components/timeline/TimelineVisualization';

const TimelineExplorer: React.FC = () => {
  const { chapterId, timelineId } = useParams<{ chapterId: string; timelineId: string }>();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(1776);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  useEffect(() => {
    if (chapterId && timelineId) {
      const foundChapter = getChapterById(chapterId);
      const foundTimeline = getTimelineById(chapterId, timelineId);
      
      setChapter(foundChapter || null);
      setTimeline(foundTimeline || null);
      
      if (foundChapter) {
        setCurrentYear(foundChapter.startYear);
      }
    }
  }, [chapterId, timelineId]);

  if (!chapter || !timeline) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Timeline Not Found</h2>
          <p className="text-gray-300 mb-6">This timeline is not yet available.</p>
          <Link
            to="/chapters"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Chapters
          </Link>
        </div>
      </div>
    );
  }

  const currentEvents = timeline.keyEvents.filter(event => event.year <= currentYear);
  const futureEvents = timeline.keyEvents.filter(event => event.year > currentYear);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <section className="bg-dark-800 border-b border-dark-700 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to={`/chapter/${chapterId}`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{timeline.icon}</span>
                  <h1 className="text-2xl font-bold text-white">{timeline.title}</h1>
                </div>
                <p className="text-gray-400">{chapter.title} • {chapter.period}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Probability</div>
                <div className="text-lg font-bold text-primary-400">{timeline.probability}%</div>
              </div>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: timeline.color }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Description */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-dark-800 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4">Timeline Overview</h2>
            <p className="text-gray-300 mb-4">{timeline.description}</p>
            
            <div className="bg-linear-to-r from-yellow-600 to-orange-600 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-white" />
                <h3 className="text-lg font-semibold text-white">Divergence Point ({timeline.divergenceYear})</h3>
              </div>
              <p className="text-white opacity-90">{timeline.divergenceDescription}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-8 px-6">
        <div className="max-w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TimelineVisualization
              timeline={timeline}
              startYear={chapter.startYear}
              endYear={chapter.endYear}
              width={Math.min(1200, window.innerWidth - 100)}
              height={500}
              onEventClick={setSelectedEvent}
              onYearChange={setCurrentYear}
            />
          </motion.div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-8 px-6 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              World Status in {currentYear}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Events that have occurred */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-white">Events Completed</h3>
                </div>
                <div className="space-y-3">
                  {currentEvents.slice(-3).map((event, index) => (
                    <div 
                      key={event.id}
                      className="bg-dark-800 rounded-lg p-3 cursor-pointer hover:bg-dark-600 transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="text-sm font-semibold text-white">{event.title}</div>
                      <div className="text-xs text-gray-400">{event.year}</div>
                    </div>
                  ))}
                  {currentEvents.length > 3 && (
                    <div className="text-sm text-gray-400 text-center">
                      +{currentEvents.length - 3} more events
                    </div>
                  )}
                </div>
              </div>

              {/* Upcoming events */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                </div>
                <div className="space-y-3">
                  {futureEvents.slice(0, 3).map((event, index) => (
                    <div 
                      key={event.id}
                      className="bg-dark-800 rounded-lg p-3 cursor-pointer hover:bg-dark-600 transition-colors opacity-70"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="text-sm font-semibold text-white">{event.title}</div>
                      <div className="text-xs text-gray-400">{event.year}</div>
                    </div>
                  ))}
                  {futureEvents.length > 3 && (
                    <div className="text-sm text-gray-400 text-center">
                      +{futureEvents.length - 3} more events
                    </div>
                  )}
                </div>
              </div>

              {/* Consequences so far */}
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-white">Key Consequences</h3>
                </div>
                <div className="space-y-3">
                  {timeline.consequences.slice(0, 3).map((consequence, index) => (
                    <div key={consequence.id} className="bg-dark-800 rounded-lg p-3">
                      <div className="text-xs text-purple-400 mb-1">{consequence.category}</div>
                      <div className="text-sm text-white">{consequence.shortTerm}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Butterfly Effects */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Butterfly Effects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timeline.butterfly.map((effect, index) => (
                <motion.div
                  key={effect.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-linear-to-r from-purple-600 to-pink-600 rounded-lg p-6"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <GitBranch className="w-5 h-5 text-white" />
                    <span className="text-sm font-semibold text-white uppercase tracking-wide">
                      {effect.magnitude} Impact
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Trigger</h3>
                  <p className="text-white opacity-90 mb-3">{effect.trigger}</p>
                  <h3 className="text-lg font-bold text-white mb-2">Consequence</h3>
                  <p className="text-white opacity-90 mb-3">{effect.consequence}</p>
                  <div className="text-sm text-white opacity-75">
                    Timeline: {effect.timespan} years
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Present Day Status */}
      <section className="py-8 px-6 bg-dark-800">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Globe className="w-8 h-8 text-primary-500" />
              <h2 className="text-3xl font-bold text-white">Present Day (2025)</h2>
            </div>
            <div className="bg-dark-700 rounded-lg p-8">
              <p className="text-lg text-gray-300 leading-relaxed">
                {timeline.presentDayStatus}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={`/chapter/${chapterId}`}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors text-center"
            >
              Back to Chapter
            </Link>
            <Link
              to="/compare"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors text-center flex items-center justify-center space-x-2"
            >
              <GitBranch className="w-4 h-4" />
              <span>Compare Timelines</span>
            </Link>
            <Link
              to="/chapters"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors text-center flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Other Chapters</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-dark-800 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedEvent.title}</h3>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.year}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedEvent.type}</span>
                  </div>
                </div>
                
                <p className="text-gray-300">{selectedEvent.description}</p>
                
                <div className="bg-dark-700 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Historical Impact</h4>
                  <p className="text-sm text-gray-300">{selectedEvent.impact}</p>
                </div>
                
                {selectedEvent.relatedFigures.length > 0 && (
                  <div className="bg-dark-700 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Related Figures</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.relatedFigures.map(figureId => {
                        const figure = chapter.keyFigures.find(f => f.id === figureId);
                        return figure ? (
                          <span 
                            key={figureId}
                            className="bg-primary-600 text-white px-2 py-1 rounded-sm text-xs"
                          >
                            {figure.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TimelineExplorer;