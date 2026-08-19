import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import PublicLayout from './components/PublicLayout';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import LabPage from './components/LabPage';
import UserProfile from './components/UserProfile';
import TrackOrderPage from './components/TrackOrderPage';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
