import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Strategies from './Strategies';
import Recommendations from './Recommendations';
import HowItWorks from './HowItWorks';
import Performance from './Performance';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Features />
      <Strategies />
      <div id="recommendations">
        <Recommendations />
      </div>
      <HowItWorks />
      <Performance />
      <Footer />
    </div>
  );
};

export default Home;
