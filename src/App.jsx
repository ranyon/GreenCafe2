import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import PublicLayout from './components/PublicLayout';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import LabPage from './components/LabPage';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/lab" element={<LabPage />} />
      </Route>
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
