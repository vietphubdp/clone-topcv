import React, { useState } from 'react';
import SearchBar from './SearchBar';
import CategoryList from './CategoryList';
import BannerSlider from './BannerSlider';
import SubCategoryMenu from './SubCategoryMenu';
import './Hero.css';

const Hero = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="hero-section">
      <div className="hero-container topcv-container">
        {/* Top Header Title */}
        <h1 className="hero-title">
          TopCV - Tạo CV, Tìm việc làm, Tuyển dụng hiệu quả
        </h1>

        {/* Floating Search Bar */}
        <SearchBar />

        {/* Categories & Banner / SubCategory Menu Row */}
        <div
          className="hero-content-row"
          onMouseLeave={() => setActiveCategory(null)}
        >
          <CategoryList
            activeCategory={activeCategory}
            onHoverCategory={(cat) => setActiveCategory(cat)}
          />
          {activeCategory ? (
            <SubCategoryMenu category={activeCategory} />
          ) : (
            <BannerSlider />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
