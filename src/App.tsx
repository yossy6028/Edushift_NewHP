import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Home } from './pages/Home';
import { HomeScholarly } from './pages/HomeScholarly';
import { ServiceDetailScholarly } from './pages/v2/ServiceDetailScholarly';
import { BusinessLawScholarly } from './pages/v2/BusinessLawScholarly';
import { PrivacyPolicyScholarly } from './pages/v2/PrivacyPolicyScholarly';
import { LogoPreview } from './pages/v2/LogoPreview';
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

function RedirectServiceToV2() {
  const { slug = '' } = useParams();
  return <Navigate to={`/v2/service/${slug}`} replace />;
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
        </Route>
        <Route element={<StandaloneLayout />}>
          <Route path="/service/:slug" element={<RedirectServiceToV2 />} />
          <Route path="/privacypolicy" element={<Navigate to="/v2/privacypolicy" replace />} />
          <Route path="/business-law" element={<Navigate to="/v2/business-law" replace />} />
        </Route>
        <Route element={<StandaloneLayout />}>
          <Route path="/v2" element={<HomeScholarly />} />
          <Route path="/v2/service/:slug" element={<ServiceDetailScholarly />} />
          <Route path="/v2/business-law" element={<BusinessLawScholarly />} />
          <Route path="/v2/privacypolicy" element={<PrivacyPolicyScholarly />} />
          <Route path="/v2/logo-preview" element={<LogoPreview />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
