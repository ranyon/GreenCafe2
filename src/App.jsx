import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import HomePage from './components/HomePage';
import { AuthProvider } from './context/AuthContext';

// Lazy-loaded routes for optimal bundle splitting & performance
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const MenuPage = lazy(() => import('./components/MenuPage'));
const LabPage = lazy(() => import('./components/LabPage'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const TrackOrderPage = lazy(() => import('./components/TrackOrderPage'));

const PageLoader = () => (
  <div className="min-h-screen bg-[#071913] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-[#86EFAC] border-t-transparent animate-spin" />
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/track" element={<TrackOrderPage />} />
            <Route path="/track/:orderId" element={<TrackOrderPage />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

