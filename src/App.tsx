import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationHeader from './components/common/NavigationHeader';
import { Footer } from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterDetail from './pages/ChapterDetail';
import TimelineExplorer from './pages/TimelineExplorer';
import ComparisonMode from './pages/ComparisonMode';
import { NotFoundPage } from './pages/NotFoundPage';

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;