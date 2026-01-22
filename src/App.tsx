import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Home } from './pages/Home';
import { SchoolSupport } from './pages/services/SchoolSupport';
import { AiConsulting } from './pages/services/AiConsulting';
import { FreelanceSupport } from './pages/services/FreelanceSupport';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { BusinessLaw } from './pages/BusinessLaw';
import { HpProduction } from './pages/services/HpProduction';
import { usePageTracking } from './hooks/usePageTracking';

// ページ計測コンポーネント（Router内で使用）
function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <Router>
      <PageTracker />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/school-support" element={<SchoolSupport />} />
            <Route path="/service/ai-consulting" element={<AiConsulting />} />
            <Route path="/service/freelance-support" element={<FreelanceSupport />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/business-law" element={<BusinessLaw />} />
            <Route path="/service/hp-production" element={<HpProduction />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
