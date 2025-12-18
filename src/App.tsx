import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationHeader from './components/common/NavigationHeader';
import { Footer } from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import ChaptersPage from './pages/ChaptersPage';
import ChapterDetail from './pages/ChapterDetail';
import TimelineExplorer from './pages/TimelineExplorer';
import SimulationHub from './pages/SimulationHub';
import ComparisonMode from './pages/ComparisonMode';
import { NotFoundPage } from './pages/NotFoundPage';
import DocumentationPage from './pages/DocumentationPage';
import FAQPage from './pages/FAQPage';
import SupportPage from './pages/SupportPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AccessibilityPage from './pages/AccessibilityPage';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <NavigationHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chapters" element={<ChaptersPage />} />
            <Route path="/chapters/:id" element={<ChapterDetail />} />
            <Route path="/simulation/:chapterId" element={<SimulationHub />} />
            <Route path="/timeline/:chapterId/:timelineId" element={<TimelineExplorer />} />
            <Route path="/compare" element={<ComparisonMode />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes >
        </main >
        <Footer />
      </div >
    </Router >
  );
}

export default App;
