import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationHeader from './components/common/NavigationHeader';
import LandingPage from './pages/LandingPage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterDetail from './pages/ChapterDetail';
import TimelineExplorer from './pages/TimelineExplorer';
import ComparisonMode from './pages/ComparisonMode';

function App() {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/chapter/:chapterId" element={<ChapterDetail />} />
          <Route path="/timeline/:chapterId/:timelineId" element={<TimelineExplorer />} />
          <Route path="/compare" element={<ComparisonMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;