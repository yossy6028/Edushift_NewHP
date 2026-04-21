import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Home } from './pages/Home';
import { HomeScholarly } from './pages/HomeScholarly';
import { SchoolSupport } from './pages/services/SchoolSupport';
import { AiConsulting } from './pages/services/AiConsulting';
import { FreelanceSupport } from './pages/services/FreelanceSupport';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { BusinessLaw } from './pages/BusinessLaw';
import { HpProduction } from './pages/services/HpProduction';
import { usePageTracking } from './hooks/usePageTracking';

function PageTracker() {
  usePageTracking();
  return null;
}

function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function StandaloneLayout() {
  return <Outlet />;
}

function ThemeReset() {
  const location = useLocation();
  const isStandalone = location.pathname.startsWith('/v2');
  if (!isStandalone) {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'scholarly');
  }
  return null;
}

function App() {
  return (
    <Router>
      <PageTracker />
      <ScrollToTop />
      <ThemeReset />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/service/school-support" element={<SchoolSupport />} />
          <Route path="/service/ai-consulting" element={<AiConsulting />} />
          <Route path="/service/freelance-support" element={<FreelanceSupport />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/business-law" element={<BusinessLaw />} />
          <Route path="/service/hp-production" element={<HpProduction />} />
        </Route>
        <Route element={<StandaloneLayout />}>
          <Route path="/v2" element={<HomeScholarly />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
