import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import HotJobsSection from '../../components/HotJobs/HotJobsSection';
import TopCategoriesSection from '../../components/TopCategories/TopCategoriesSection';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main className="home-body">
        <Hero />
        <HotJobsSection />
        <TopCategoriesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
