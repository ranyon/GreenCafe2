import React from 'react';
import HeroSection from './HeroSection';
import DiscoverMenuSection from './DiscoverMenuSection';
import StorySection from './StorySection';
import SpaceScrollSection from './SpaceScrollSection';
import MetricsSection from './MetricsSection';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main>
      <HeroSection
        onExplore={() => navigate('/menu')}
        onOpenLab={() => navigate('/lab')}
      />
      <DiscoverMenuSection />
      <SpaceScrollSection />
      <MetricsSection />
    </main>
  );
}

