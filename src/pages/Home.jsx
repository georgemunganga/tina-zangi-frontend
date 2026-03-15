import React from 'react';
import Hero from '../components/Hero';
import MeetZangi from '../components/MeetZangi';
import StoryWorld from '../components/StoryWorld';
import FeaturedBooks from '../components/FeaturedBooks';
import ForParents from '../components/ForParents';
import Testimonials from '../components/Testimonials';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <MeetZangi />
      <StoryWorld />
      <FeaturedBooks />
      <ForParents />
      <Testimonials />
      <FinalCTA />
    </div>
  );
};

export default Home;
