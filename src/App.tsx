import { BrowserRouter as Router, Routes, Route, Outlet, useLocation, Navigate, useParams } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
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

function StandaloneLayout() {
  return <Outlet />;
}

function ScholarlyTheme() {
  // Scholarly Navy is now the only theme — apply site-wide.
  useLocation(); // re-run on navigation so SPA route changes refresh attribute
  document.documentElement.setAttribute('data-theme', 'scholarly');
  return null;
}

function RedirectV2Service() {
  const { slug = '' } = useParams();
  return <Navigate to={`/service/${slug}`} replace />;
}

function App() {
  return (
    <Router>
      <PageTracker />
      <ScrollToTop />
      <ScholarlyTheme />
      <Routes>
        <Route element={<StandaloneLayout />}>
          {/* Primary site (Scholarly Navy) */}
          <Route path="/" element={<HomeScholarly />} />
          <Route path="/service/:slug" element={<ServiceDetailScholarly />} />
          <Route path="/business-law" element={<BusinessLawScholarly />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyScholarly />} />
          <Route path="/logo-preview" element={<LogoPreview />} />

          {/* Backward-compatibility: legacy /v2 prefix → root */}
          <Route path="/v2" element={<Navigate to="/" replace />} />
          <Route path="/v2/service/:slug" element={<RedirectV2Service />} />
          <Route path="/v2/business-law" element={<Navigate to="/business-law" replace />} />
          <Route path="/v2/privacypolicy" element={<Navigate to="/privacypolicy" replace />} />
          <Route path="/v2/logo-preview" element={<Navigate to="/logo-preview" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
