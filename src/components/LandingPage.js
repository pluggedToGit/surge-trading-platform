import React from 'react';
import Hero from './Hero';
import AuthBanner from './AuthBanner';
import Features from './Features';
import Strategies from './Strategies';
import HowItWorks from './HowItWorks';
import Performance from './Performance';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero />
      <AuthBanner />
      <Features />
      <Strategies />
      <HowItWorks />
      <Performance />
      <Footer />
    </div>
  );
};

export default LandingPage;
